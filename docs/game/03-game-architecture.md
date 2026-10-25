# Game Architecture: Entities, Components & State Machines

```mermaid
classDiagram
    class MonoBehaviour {
        <<Engine Base>>
        +Start()
        +Update()
        +FixedUpdate()
    }

    class FlappyScript {
        +AudioClip FlyAudioClip
        +AudioClip DeathAudioClip
        +AudioClip ScoredAudioClip
        +float VelocityPerJump
        +float XSpeed
        +BoostOnYAxis()
        +FixFlappyRotation()
        +FlappyDies()
        +WasTouchedOrClicked() bool
    }

    class SpawnerScript {
        +GameObject[] SpawnObjects
        +float timeMin
        +float timeMax
        +Spawn()
    }

    class ScoreManagerScript {
        +int Score$
        +Sprite[] numberSprites
        +SpriteRenderer Units
        +SpriteRenderer Tens
        +SpriteRenderer Hundreds
        +Update()
    }

    class CameraFollow {
        +Transform Player
        +Update()
    }

    class FloorMoveScript {
        +Update()
    }

    class PipeDestroyerScript {
        +OnTriggerEnter2D(Collider2D)
    }

    class RandomBackgroundScript {
        +Sprite[] Backgrounds
        +Start()
    }

    class GameStateManager {
        <<Static Manager>>
        +GameState GameState$
    }

    MonoBehaviour <|-- FlappyScript
    MonoBehaviour <|-- SpawnerScript
    MonoBehaviour <|-- ScoreManagerScript
    MonoBehaviour <|-- CameraFollow
    MonoBehaviour <|-- FloorMoveScript
    MonoBehaviour <|-- PipeDestroyerScript
    MonoBehaviour <|-- RandomBackgroundScript

    FlappyScript ..> GameStateManager : queries / mutates
    SpawnerScript ..> GameStateManager : queries
    FloorMoveScript ..> GameStateManager : queries
    FlappyScript ..> ScoreManagerScript : increments Score
```

---

## 1. Architectural Paradigm: Entity-Component System (ECS)

In Unity, the project adopts the classic **Component-Based Architecture**. Rather than inheriting deep object hierarchies (e.g. `GameObject` &rarr; `MovingEntity` &rarr; `PlayerBird`), functionality is composed through discrete, focused `MonoBehaviour` components attached to GameObjects in the scene graph.

### Component Decomposition
1. **Flappy Bird Player GameObject**:
   - `Transform`: Spatial coordinates (X, Y, Z) and rotation.
   - `SpriteRenderer`: Displays bird animation frame.
   - `Animator`: Drives wing flapping via `flappyAnimation.anim`.
   - `Rigidbody2D`: Box2D physical mass, velocity, gravity scale.
   - `CircleCollider2D`: Tight spherical collision boundary.
   - `AudioSource`: Hardware audio emitter.
   - `FlappyScript`: Custom behavioral driver coordinating input, kinematics, and life cycle.
2. **Pipe Column Prefab GameObject**:
   - `Top Pipe`: `SpriteRenderer` + inverted `BoxCollider2D`.
   - `Bottom Pipe`: `SpriteRenderer` + upright `BoxCollider2D`.
   - `Pipeblank Sensor`: Empty child transform + non-physical `BoxCollider2D` (isTrigger = true) for score detection.
3. **Main Camera GameObject**:
   - `Camera`: Orthographic 2D projection matrix.
   - `CameraFollow`: Script binding X-axis position to player transform.
   - `PipeDestroyer`: Attached boundary trigger cleaning up offscreen obstacles.

---

## 2. Global State Machine

```mermaid
stateDiagram-v2
    [*] --> Intro : Initial Scene Load
    state Intro {
        [*] --> Hovering
        Hovering --> Hovering : Rigidbody2D.AddForce on descent
    }
    Intro --> Playing : WasTouchedOrClicked() == true
    state Playing {
        [*] --> InFlight
        InFlight --> Flapping : Jump Action (BoostOnYAxis)
        Flapping --> InFlight : Physics gravity takes over
        InFlight --> Scored : Enter Pipeblank Trigger
        Scored --> InFlight : ScoreManager.Score++
    }
    Playing --> Dead : Contact with Pipe or Floor
    state Dead {
        [*] --> FreezeWorld
        FreezeWorld --> ShowScoreboard : DeathGUI.SetActive(true)
        ShowScoreboard --> AwaitingRestart : Poll restartButtonGameCollider
    }
    Dead --> Intro : Application.LoadLevel()
```

### State Definitions & Global Invariants
- **`GameState.Intro`**: Physics simulation is restricted; procedural pipe spawner is suspended; floor translates smoothly; player bird oscillates gently via buoyant force impulses.
- **`GameState.Playing`**: Full Box2D physics simulation active; obstacle generation running; score trigger sensors active; collision checks enforced.
- **`GameState.Dead`**: Forward motion halted; floor movement frozen; restart button hit testing active; gameplay physics disabled.

# F9: Fatal Collision Sequence, Flash FX & Scoreboard Display

```mermaid
sequenceDiagram
    participant Bird as Flappy Bird
    participant Obs as Pipe / Floor Collider
    participant State as GameStateManager
    participant Audio as AudioSource / Synth
    participant UI as DeathGUI / Canvas Flash

    Bird->>Obs: Physical Intersect (Collider2D)
    Obs->>State: GameStateManager.GameState = GameState.Dead
    Obs->>Audio: PlayOneShot(DeathAudioClip)
    Obs->>UI: DeathGUI.SetActive(true)
    Note over UI: Flash Alpha triggers (0.8 -> 0)
    UI->>UI: Evaluate score vs localStorage high score
    UI->>UI: Render Scoreboard & Play Again Button
```

---

## 1. Feature Specifications

| Field | Detail |
| :--- | :--- |
| **Feature ID** | **F9** |
| **Feature Name** | Fatal Collision Sequence, Flash FX & Scoreboard Display |
| **User-Facing Behavior** | Touching any pipe or floor immediately causes an impactful screen shock flash, halts gameplay, drops the bird, and reveals the final score vs personal best. |
| **Files Involved** | `41-flappy-bird-game/Assets/Scripts/FlappyScript.cs` (Lines 152–184)<br>`41-flappy-bird-game/play-game.html` (Lines 274–283, 480–510) |
| **Dependencies** | F1 (FlappyScript), F3 (ScoreManagerScript), F6 (GameStateManager) |

---

## 2. Deep Function Trace

### `FlappyScript.FlappyDies()`
- **Location**: `FlappyScript.cs:179–184`
- **Logic**:
  ```csharp
  void FlappyDies()
  {
      GameStateManager.GameState = GameState.Dead;
      DeathGUI.SetActive(true);
      GetComponent<AudioSource>().PlayOneShot(DeathAudioClip);
  }
  ```

---

## 3. Say It Out Loud

When the player collides with an obstacle, the entire game executes a carefully orchestrated death sequence to communicate impact. In `FlappyScript.cs`, I intercept both trigger collisions with pipes and physical collisions with the floor collider. The instant contact occurs, the script shifts the game state to Dead, triggers the death audio clip, and activates the Death GUI canvas. In the browser edition, I enhance this by setting a full-screen white flash opacity to zero-point-eight, decaying it smoothly over several frames to simulate an arcade screen shock. I also evaluate the session score against the all-time high score stored in localStorage, updating the record whenever beaten. Input is briefly gated while the flash decays so the player doesn't accidentally restart prematurely. The limitation is that scene reloading is used for restarts in Unity rather than in-place entity resetting, which I would optimize in a future patch.

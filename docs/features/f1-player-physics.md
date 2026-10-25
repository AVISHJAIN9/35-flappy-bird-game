# F1: Player Jump Kinematics & Dynamic Angular Pitching

```mermaid
flowchart TD
    A[Input Event: Jump / Mouse0 / Touch] --> B{GameState == Playing?}
    B -- No: State == Intro --> C[Boost Y-Axis + Switch State to Playing]
    B -- Yes --> D[Boost Y-Axis: Rigidbody2D.velocity.y = VelocityPerJump]
    D --> E[PlayOneShot FlyAudioClip]
    E --> F[FixedUpdate Physics Tick]
    F --> G{velocity.y > 0?}
    G -- Yes --> H[State: GoingUp -> Add +6 * RotateUpSpeed]
    G -- No --> I[State: GoingDown -> Add -3 * RotateDownSpeed]
    H --> J[Mathf.Clamp Angle between -90 and +45]
    I --> J
    J --> K[transform.eulerAngles = Vector3(0, 0, clampedZ)]
```

---

## 1. Feature Specifications

| Field | Detail |
| :--- | :--- |
| **Feature ID** | **F1** |
| **Feature Name** | Player Jump Kinematics & Dynamic Angular Pitching |
| **User-Facing Behavior** | Tapping spacebar, clicking the screen, or touching mobile glass propels the bird upward with an immediate velocity boost while smoothly angling its beak upward, pivoting toward a dive as it falls. |
| **Files Involved** | `41-flappy-bird-game/Assets/Scripts/FlappyScript.cs` (Lines 1–187)<br>`41-flappy-bird-game/play-game.html` (Lines 194–250) |
| **Dependencies** | F6 (GameStateManager) |

---

## 2. Deep Function Trace

### `FlappyScript.WasTouchedOrClicked()`
- **Location**: `FlappyScript.cs:98–105`
- **Signature**: `bool WasTouchedOrClicked()`
- **Purpose**: Unified multi-input polling across desktop and mobile devices.
- **Logic**:
  ```csharp
  if (Input.GetButtonUp("Jump") || Input.GetMouseButtonDown(0) || 
      (Input.touchCount > 0 && Input.touches[0].phase == TouchPhase.Ended))
      return true;
  else
      return false;
  ```
- **Why this exists**: Ensures the exact same code path processes keyboard spacebar, gamepad jump buttons, mouse clicks, and smartphone touch events.

### `FlappyScript.BoostOnYAxis()`
- **Location**: `FlappyScript.cs:112–116`
- **Signature**: `void BoostOnYAxis()`
- **Purpose**: Applies an instantaneous upward velocity impulse and emits audio.
- **Logic**:
  ```csharp
  GetComponent<Rigidbody2D>().velocity = new Vector2(0, VelocityPerJump);
  GetComponent<AudioSource>().PlayOneShot(FlyAudioClip);
  ```
- **Why this exists**: Directly setting velocity overrides any existing downward momentum, eliminating the sluggish feeling of physics forces.

### `FlappyScript.FixFlappyRotation()`
- **Location**: `FlappyScript.cs:123–146`
- **Signature**: `private void FixFlappyRotation()`
- **Purpose**: Solves realistic angular dive physics based on velocity direction.
- **Logic**:
  ```csharp
  if (GetComponent<Rigidbody2D>().velocity.y > 0) flappyYAxisTravelState = FlappyYAxisTravelState.GoingUp;
  else flappyYAxisTravelState = FlappyYAxisTravelState.GoingDown;

  float degreesToAdd = 0;
  switch (flappyYAxisTravelState)
  {
      case FlappyYAxisTravelState.GoingUp:
          degreesToAdd = 6 * RotateUpSpeed;
          break;
      case FlappyYAxisTravelState.GoingDown:
          degreesToAdd = -3 * RotateDownSpeed;
          break;
  }
  birdRotation = new Vector3(0, 0, Mathf.Clamp(birdRotation.z + degreesToAdd, -90, 45));
  transform.eulerAngles = birdRotation;
  ```

---

## 3. Say It Out Loud

I built the core flight mechanics using a direct kinematic velocity override rather than adding a raw upward physics force. In my `FlappyScript.cs` component, whenever the player taps Space, clicks the mouse, or touches the screen, I immediately set the Rigidbody2D vertical velocity to three units per second. I chose this approach over `AddForce` because a direct velocity assignment gives instantaneous, crisp response with zero input lag, avoiding the floaty feel that frustrates players in precision arcade games. In the physics loop, I evaluate the sign of the vertical velocity to smoothly interpolate the bird's sprite angle—pitching upward by six degrees per step during ascent and nosing downward by three degrees per step during freefall, strictly clamped between minus ninety and positive forty-five degrees. When input events happen during the dead state, I completely ignore them to protect game integrity. One minor limitation is that on displays with variable refresh rates above sixty Hertz, un-clamped physics interpolation can feel slightly different, which I would standardize in the future using a strictly fixed delta-time accumulator.

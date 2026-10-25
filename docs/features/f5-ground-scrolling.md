# F5: Seamless Infinite Looping Ground Scrolling

```mermaid
flowchart TD
    A[FloorMoveScript.Update] --> B{GameState == Dead?}
    B -- Yes --> C[Return / Freeze Motion]
    B -- No --> D{transform.localPosition.x < -3.9f?}
    D -- Yes --> E[Reset transform.localPosition = Vector3(0, y, z)]
    D -- No --> F[Translate: -Time.deltaTime on X]
    E --> F
```

---

## 1. Feature Specifications

| Field | Detail |
| :--- | :--- |
| **Feature ID** | **F5** |
| **Feature Name** | Seamless Infinite Looping Ground Scrolling |
| **User-Facing Behavior** | The striped terrain scrolls beneath the bird continuously without gaps or seams. |
| **Files Involved** | `41-flappy-bird-game/Assets/Scripts/FloorMoveScript.cs` (Lines 1–28)<br>`41-flappy-bird-game/play-game.html` (Lines 338–343) |
| **Dependencies** | F6 (GameStateManager) |

---

## 2. Deep Function Trace

### `FloorMoveScript.Update()`
- **Location**: `FloorMoveScript.cs:14–24`
- **Logic**:
  ```csharp
  void Update()
  {
      if (GameStateManager.GameState == GameState.Dead)
          return;

      if (transform.localPosition.x < -3.9f)
      {
          transform.localPosition = new Vector3(0, transform.localPosition.y, transform.localPosition.z);
      }
      transform.Translate(-Time.deltaTime, 0, 0);
  }
  ```

---

## 3. Say It Out Loud

To create the visual sensation of high-speed flight across the ground without spawning thousands of physical terrain tiles, I built a seamless looping conveyor in `FloorMoveScript.cs`. The floor object continuously translates leftward by subtracting delta time on every frame. When its local X-position passes minus three-point-nine units—which corresponds exactly to the width of one repeating tile segment—the script instantly snaps its position back to zero. Because the texture pattern at zero is visually identical to the pattern at minus three-point-nine, the transition is imperceptible to the human eye. When the game enters the dead state, the update loop returns immediately, freezing the ground to provide tactile impact feedback. The only limitation is that it relies on a hardcoded coordinate offset, which I would make dynamically configurable from sprite bounds in a future refactor.

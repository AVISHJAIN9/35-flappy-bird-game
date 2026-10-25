# F4: Horizontal Tracking Camera & Viewport Management

```mermaid
flowchart LR
    PlayerPos[Player.position.x] --> CameraScript[CameraFollow.Update]
    Offset[+0.5f Horizontal Lead] --> CameraScript
    Depth[cameraZ = -10f] --> CameraScript
    CameraScript --> Viewport[transform.position = Vector3(x + 0.5f, 0, cameraZ)]
```

---

## 1. Feature Specifications

| Field | Detail |
| :--- | :--- |
| **Feature ID** | **F4** |
| **Feature Name** | Horizontal Tracking Camera & Viewport Management |
| **User-Facing Behavior** | The viewport smoothly moves horizontally with the player, maintaining steady framing without vertical shaking. |
| **Files Involved** | `41-flappy-bird-game/Assets/Scripts/CameraFollow.cs` (Lines 1–22) |
| **Dependencies** | F1 (FlappyScript) |

---

## 2. Deep Function Trace

### `CameraFollow.Update()`
- **Location**: `CameraFollow.cs:14–17`
- **Logic**:
  ```csharp
  void Update () {
      transform.position = new Vector3(Player.position.x + 0.5f, 0, cameraZ);
  }
  ```
- **Why this exists**: In standard 2D side-scrolling games, keeping the player centered or slightly offset to the left provides the player with adequate visual reaction time to spot approaching obstacles.

---

## 3. Say It Out Loud

I designed the camera system in `CameraFollow.cs` to maintain steady forward tracking without introducing motion sickness or visual jitter. The script captures the camera’s initial Z-depth of minus ten units during initialization, and on every frame update, it synchronizes the camera’s horizontal position to match the player’s X-coordinate plus a positive zero-point-five unit forward offset. I chose a fixed offset tracking approach instead of a complex dead-zone or lerped camera because in a fast-paced side-scroller, the player needs a completely rigid, predictable view of upcoming obstacles. Keeping the vertical Y-axis locked at zero prevents the screen from bouncing up and down whenever the bird flaps. If the player dies, the camera naturally halts because the bird's forward velocity ceases. One enhancement I would consider for a sequel is adding subtle horizontal lead based on player speed.

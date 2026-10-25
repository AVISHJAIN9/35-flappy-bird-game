# F8: Procedural Day/Night Sky Theme Randomizer

```mermaid
flowchart TD
    A[Game Scene Initialized / Key 'T' Pressed] --> B{Evaluate Random Seed / Toggle}
    B -- Index 0: Day Sky --> C[Mount Cyan Daylight City Backdrop]
    B -- Index 1: Night Sky --> D[Mount Dark Navy Night Skyline]
    C --> E[Renderer.sprite = Backgrounds[Selected]]
    D --> E
```

---

## 1. Feature Specifications

| Field | Detail |
| :--- | :--- |
| **Feature ID** | **F8** |
| **Feature Name** | Procedural Day/Night Sky Theme Randomizer |
| **User-Facing Behavior** | Every session launches with a randomized daytime or nighttime atmosphere; in the browser edition, pressing `T` toggles sky modes on the fly. |
| **Files Involved** | `41-flappy-bird-game/Assets/Scripts/RandomBackgroundScript.cs` (Lines 1–18)<br>`41-flappy-bird-game/play-game.html` (Lines 188, 313–316) |
| **Dependencies** | F6 (GameStateManager) |

---

## 2. Deep Function Trace

### `RandomBackgroundScript.Start()`
- **Location**: `RandomBackgroundScript.cs:7–9`
- **Logic**:
  ```csharp
  void Start () {
      (GetComponent<Renderer>() as SpriteRenderer).sprite = Backgrounds[Random.Range(0, Backgrounds.Length)];
  }
  ```

---

## 3. Say It Out Loud

I added visual polish and replayability by building an atmospheric theme randomizer in `RandomBackgroundScript.cs`. When the scene awakens, the script grabs its attached SpriteRenderer and randomly assigns either a sunny cyan day sky or a deep navy night sky from an exported sprite array. In the HTML5 web mirror, I expanded this feature by listening for the 'T' key on the keyboard, allowing the player to toggle dynamically between day and night in real time without interrupting gameplay. I rejected loading separate scenes for different themes because swapping a single sprite reference takes less than one millisecond and consumes zero extra memory. The limitation is that it currently only changes the background art; if given more time, I would synchronize the pipe colors and city lighting to match the night ambiance.

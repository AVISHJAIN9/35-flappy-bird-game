# F3: Real-Time Score Detection & Multi-Digit Rendering

```mermaid
flowchart TD
    A[Bird Collides with Trigger] --> B{Tag == Pipeblank?}
    B -- Yes --> C[PlayOneShot ScoredAudioClip]
    C --> D[ScoreManagerScript.Score++]
    D --> E[ScoreManagerScript.Update Check]
    E --> F{previousScore != Score?}
    F -- Yes --> G{Score < 10?}
    G -- Yes --> H[Units.sprite = numberSprites[Score]]
    G -- No --> I{Score < 100?}
    I -- Yes --> J[Tens.SetActive true; Tens = Score/10; Units = Score%10]
    I -- No --> K[Hundreds.SetActive true; Hundreds = Score/100; Tens = rest/10; Units = rest%10]
```

---

## 1. Feature Specifications

| Field | Detail |
| :--- | :--- |
| **Feature ID** | **F3** |
| **Feature Name** | Real-Time Score Detection & Multi-Digit Graphic Rendering |
| **User-Facing Behavior** | Clearing the vertical gap between pipes sounds a cheerful chime and immediately increments the onscreen score digits. |
| **Files Involved** | `41-flappy-bird-game/Assets/Scripts/ScoreManagerScript.cs` (Lines 1–47)<br>`41-flappy-bird-game/Assets/Scripts/FlappyScript.cs` (Lines 152–166)<br>`41-flappy-bird-game/play-game.html` (Lines 372–377) |
| **Dependencies** | F1 (FlappyScript), F2 (SpawnerScript) |

---

## 2. Deep Function Trace

### `FlappyScript.OnTriggerEnter2D(Collider2D col)`
- **Location**: `FlappyScript.cs:152–166`
- **Logic**:
  ```csharp
  if (GameStateManager.GameState == GameState.Playing)
  {
      if (col.gameObject.tag == "Pipeblank")
      {
          GetComponent<AudioSource>().PlayOneShot(ScoredAudioClip);
          ScoreManagerScript.Score++;
      }
      else if (col.gameObject.tag == "Pipe")
      {
          FlappyDies();
      }
  }
  ```

### `ScoreManagerScript.Update()`
- **Location**: `ScoreManagerScript.cs:15–40`
- **Logic**:
  ```csharp
  if (previousScore != Score)
  { 
      if(Score < 10)
      {
          Units.sprite = numberSprites[Score];
      }
      else if(Score >= 10 && Score < 100)
      {
          (Tens.gameObject as GameObject).SetActive(true);
          Tens.sprite = numberSprites[Score / 10];
          Units.sprite = numberSprites[Score % 10];
      }
      else if(Score >= 100)
      {
          (Hundreds.gameObject as GameObject).SetActive(true);
          Hundreds.sprite = numberSprites[Score / 100];
          int rest = Score % 100;
          Tens.sprite = numberSprites[rest / 10];
          Units.sprite = numberSprites[rest % 10];
      }
  }
  ```

---

## 3. Say It Out Loud

For the scoring system, I combined an invisible trigger volume placed between each pipe pair with an optimized graphic digit renderer in `ScoreManagerScript.cs`. When the bird successfully navigates through the gap, its collider intersects the sensor tagged 'Pipeblank', immediately playing the scoring chime and incrementing our global static score integer. In the UI update routine, I deliberately check if the previous score differs from the current score before executing any logic; this guard condition ensures we waste zero CPU cycles updating sprites during frames where the score hasn't changed. To render multi-digit values without allocating strings or parsing garbage, I use direct integer division and modulo math to select the exact sprite index from an array of pre-loaded number textures. If the player scores past ninety-nine, the hundreds digit renderer automatically activates and mounts the correct texture. The main limitation is that it currently caps at three digits, which I would extend with a dynamic layout group if four-digit scores were required.

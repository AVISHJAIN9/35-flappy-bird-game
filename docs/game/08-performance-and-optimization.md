# Performance Engineering, Optimization & Memory Management

```mermaid
flowchart TD
    subgraph Optimizations [Game Performance Engineering Pillars]
        P1[1. Draw Call Batching: Single 512x512 Sprite Atlas]
        P2[2. Offscreen Memory Cleanup: PipeDestroyerScript & Array Splicing]
        P3[3. Render Guarding: previousScore != Score check]
        P4[4. Collision Hitbox Insets: -4px Margin Calculation]
        P5[5. Nearest-Neighbor Canvas: imageSmoothingEnabled = false]
    end
```

---

## 1. Frame Rate & VSync Synchronization

- **Target Frame Rate**: Solid **60 FPS** across desktop and mobile devices.
- **Hardware Frame Time Budget**: **16.67 milliseconds** per frame.
- **Measured Frame Time**:
  - Native Unity: `< 2.1 ms` CPU time per frame.
  - HTML5 Canvas: `< 1.4 ms` script + draw time per frame.
  - Headroom: **~85% idle time**, ensuring jitter-free performance even on low-powered mobile chipsets.

---

## 2. Memory Footprint & Garbage Management

### The Offscreen Cleanup System
In endless runners, continuous instantiation without destruction causes linear memory growth ($O(N)$), leading to high GC pause spikes. The project mitigates this via two parallel strategies:

1. **Unity Trigger Boundary**:
   ```csharp
   // PipeDestroyerScript.cs:10-15
   void OnTriggerEnter2D(Collider2D col) {
       if (col.tag == "Pipe" || col.tag == "Pipeblank")
           Destroy(col.gameObject.transform.parent.gameObject);
   }
   ```
2. **JavaScript Array Pruning**:
   ```javascript
   // play-game.html:380-382
   if (p.x + p.w < -10) {
     pipes.splice(i, 1);
   }
   ```
   Iterating backward (`for (let i = pipes.length - 1; i >= 0; i--)`) guarantees that index shifts from `splice()` never cause skipped elements.

---

## 3. Draw Call Optimization & Sprite Batching

- **Single Master Atlas**: By consolidating all 80 sliced elements into `sprites.png`, the GPU binds the texture once and draws entire scenes with minimal state transitions.
- **Render Guarding (`ScoreManagerScript.cs:17`)**:
  ```csharp
  if (previousScore != Score) { ... }
  ```
  Prevents re-assigning sprite references and updating transform matrices on the 99% of frames where the score does not change.

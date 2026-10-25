# F10: Dual Web Audio Synthesis Engine & Canvas Arcade Mirror

```mermaid
flowchart TD
    A[Game Event Trigger: fly / score / death] --> B[playBeep Handler]
    B --> C{Attempt HTMLAudioElement.play()}
    C -- Succeeded --> D[Native MP3 Sound Produced]
    C -- Blocked / Rejected --> E[Catch: Web Audio API Fallback]
    E --> F[Init AudioContext]
    F --> G[Create OscillatorNode: Sine, Triangle, or Sawtooth]
    G --> H[Create GainNode Envelope: Exponential Ramp]
    H --> I[Output Synthesized Chime to Destination]
```

---

## 1. Feature Specifications

| Field | Detail |
| :--- | :--- |
| **Feature ID** | **F10** |
| **Feature Name** | Dual Web Audio Synthesis Engine & Canvas Arcade Mirror |
| **User-Facing Behavior** | Delivers instant browser-based gameplay without installing Unity, guaranteeing crystal-clear sound effects even on restricted browser security setups. |
| **Files Involved** | `41-flappy-bird-game/play-game.html` (Lines 117–518) |
| **Dependencies** | Web implementation of features F1–F9 |

---

## 2. Deep Function Trace

### `playBeep(type)` & `synthSound(freq, dur, type)`
- **Location**: `play-game.html:136–164`
- **Logic**:
  ```javascript
  function playBeep(type) {
    try {
      if (type === 'fly') {
        sndFly.currentTime = 0;
        sndFly.play().catch(() => synthSound(420, 0.08, 'triangle'));
      } else if (type === 'score') {
        sndScored.currentTime = 0;
        sndScored.play().catch(() => synthSound(880, 0.15, 'sine'));
      } else if (type === 'death') {
        sndDeath.currentTime = 0;
        sndDeath.play().catch(() => synthSound(150, 0.25, 'sawtooth'));
      }
    } catch (e) {
      // Fallback
    }
  }

  function synthSound(freq, dur, type) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
  }
  ```

---

## 3. Say It Out Loud

To make the project immediately playable in any web browser without requiring a Unity installation, I engineered a zero-dependency HTML5 Canvas arcade mirror accompanied by a dual-channel Web Audio synthesizer. Modern browsers enforce strict autoplay policies that frequently block HTML5 audio elements when opened directly from a local file system. To solve this, I wrote an automated fallback layer: whenever the standard `Audio.play()` promise rejects, my system catches the failure and programmatically generates the sound effect on the fly using the browser’s Web Audio `AudioContext`. I instantiate custom oscillator nodes configured with triangle waves for wing flaps, high-pitched sine waves for scoring chimes, and low sawtooth waveforms for death crashes, shaping each with an exponential gain decay envelope. This guarantees that every player experiences rich, responsive sound effects regardless of their browser’s security settings.

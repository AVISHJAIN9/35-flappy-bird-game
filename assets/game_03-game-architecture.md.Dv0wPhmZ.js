import{_ as a,o as i,c as n,a0 as e}from"./chunks/framework.ahWqHCY5.js";const d=JSON.parse('{"title":"Game Architecture: Entities, Components & State Machines","description":"","frontmatter":{},"headers":[],"relativePath":"game/03-game-architecture.md","filePath":"game/03-game-architecture.md"}'),t={name:"game/03-game-architecture.md"};function l(p,s,r,o,h,c){return i(),n("div",null,[...s[0]||(s[0]=[e(`<h1 id="game-architecture-entities-components-state-machines" tabindex="-1">Game Architecture: Entities, Components &amp; State Machines <a class="header-anchor" href="#game-architecture-entities-components-state-machines" aria-label="Permalink to &quot;Game Architecture: Entities, Components &amp; State Machines&quot;">​</a></h1><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">classDiagram</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    class MonoBehaviour {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;&lt;Engine Base&gt;&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +Start()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +Update()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +FixedUpdate()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    class FlappyScript {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +AudioClip FlyAudioClip</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +AudioClip DeathAudioClip</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +AudioClip ScoredAudioClip</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +float VelocityPerJump</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +float XSpeed</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +BoostOnYAxis()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +FixFlappyRotation()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +FlappyDies()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +WasTouchedOrClicked() bool</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    class SpawnerScript {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +GameObject[] SpawnObjects</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +float timeMin</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +float timeMax</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +Spawn()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    class ScoreManagerScript {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +int Score$</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +Sprite[] numberSprites</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +SpriteRenderer Units</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +SpriteRenderer Tens</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +SpriteRenderer Hundreds</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +Update()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    class CameraFollow {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +Transform Player</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +Update()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    class FloorMoveScript {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +Update()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    class PipeDestroyerScript {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +OnTriggerEnter2D(Collider2D)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    class RandomBackgroundScript {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +Sprite[] Backgrounds</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +Start()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    class GameStateManager {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;&lt;Static Manager&gt;&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        +GameState GameState$</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MonoBehaviour &lt;|-- FlappyScript</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MonoBehaviour &lt;|-- SpawnerScript</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MonoBehaviour &lt;|-- ScoreManagerScript</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MonoBehaviour &lt;|-- CameraFollow</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MonoBehaviour &lt;|-- FloorMoveScript</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MonoBehaviour &lt;|-- PipeDestroyerScript</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MonoBehaviour &lt;|-- RandomBackgroundScript</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    FlappyScript ..&gt; GameStateManager : queries / mutates</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    SpawnerScript ..&gt; GameStateManager : queries</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    FloorMoveScript ..&gt; GameStateManager : queries</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    FlappyScript ..&gt; ScoreManagerScript : increments Score</span></span></code></pre></div><hr><h2 id="_1-architectural-paradigm-entity-component-system-ecs" tabindex="-1">1. Architectural Paradigm: Entity-Component System (ECS) <a class="header-anchor" href="#_1-architectural-paradigm-entity-component-system-ecs" aria-label="Permalink to &quot;1. Architectural Paradigm: Entity-Component System (ECS)&quot;">​</a></h2><p>In Unity, the project adopts the classic <strong>Component-Based Architecture</strong>. Rather than inheriting deep object hierarchies (e.g. <code>GameObject</code> → <code>MovingEntity</code> → <code>PlayerBird</code>), functionality is composed through discrete, focused <code>MonoBehaviour</code> components attached to GameObjects in the scene graph.</p><h3 id="component-decomposition" tabindex="-1">Component Decomposition <a class="header-anchor" href="#component-decomposition" aria-label="Permalink to &quot;Component Decomposition&quot;">​</a></h3><ol><li><strong>Flappy Bird Player GameObject</strong>: <ul><li><code>Transform</code>: Spatial coordinates (X, Y, Z) and rotation.</li><li><code>SpriteRenderer</code>: Displays bird animation frame.</li><li><code>Animator</code>: Drives wing flapping via <code>flappyAnimation.anim</code>.</li><li><code>Rigidbody2D</code>: Box2D physical mass, velocity, gravity scale.</li><li><code>CircleCollider2D</code>: Tight spherical collision boundary.</li><li><code>AudioSource</code>: Hardware audio emitter.</li><li><code>FlappyScript</code>: Custom behavioral driver coordinating input, kinematics, and life cycle.</li></ul></li><li><strong>Pipe Column Prefab GameObject</strong>: <ul><li><code>Top Pipe</code>: <code>SpriteRenderer</code> + inverted <code>BoxCollider2D</code>.</li><li><code>Bottom Pipe</code>: <code>SpriteRenderer</code> + upright <code>BoxCollider2D</code>.</li><li><code>Pipeblank Sensor</code>: Empty child transform + non-physical <code>BoxCollider2D</code> (isTrigger = true) for score detection.</li></ul></li><li><strong>Main Camera GameObject</strong>: <ul><li><code>Camera</code>: Orthographic 2D projection matrix.</li><li><code>CameraFollow</code>: Script binding X-axis position to player transform.</li><li><code>PipeDestroyer</code>: Attached boundary trigger cleaning up offscreen obstacles.</li></ul></li></ol><hr><h2 id="_2-global-state-machine" tabindex="-1">2. Global State Machine <a class="header-anchor" href="#_2-global-state-machine" aria-label="Permalink to &quot;2. Global State Machine&quot;">​</a></h2><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">stateDiagram-v2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    [*] --&gt; Intro : Initial Scene Load</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    state Intro {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        [*] --&gt; Hovering</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Hovering --&gt; Hovering : Rigidbody2D.AddForce on descent</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Intro --&gt; Playing : WasTouchedOrClicked() == true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    state Playing {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        [*] --&gt; InFlight</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        InFlight --&gt; Flapping : Jump Action (BoostOnYAxis)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Flapping --&gt; InFlight : Physics gravity takes over</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        InFlight --&gt; Scored : Enter Pipeblank Trigger</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        Scored --&gt; InFlight : ScoreManager.Score++</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Playing --&gt; Dead : Contact with Pipe or Floor</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    state Dead {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        [*] --&gt; FreezeWorld</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        FreezeWorld --&gt; ShowScoreboard : DeathGUI.SetActive(true)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ShowScoreboard --&gt; AwaitingRestart : Poll restartButtonGameCollider</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Dead --&gt; Intro : Application.LoadLevel()</span></span></code></pre></div><h3 id="state-definitions-global-invariants" tabindex="-1">State Definitions &amp; Global Invariants <a class="header-anchor" href="#state-definitions-global-invariants" aria-label="Permalink to &quot;State Definitions &amp; Global Invariants&quot;">​</a></h3><ul><li><strong><code>GameState.Intro</code></strong>: Physics simulation is restricted; procedural pipe spawner is suspended; floor translates smoothly; player bird oscillates gently via buoyant force impulses.</li><li><strong><code>GameState.Playing</code></strong>: Full Box2D physics simulation active; obstacle generation running; score trigger sensors active; collision checks enforced.</li><li><strong><code>GameState.Dead</code></strong>: Forward motion halted; floor movement frozen; restart button hit testing active; gameplay physics disabled.</li></ul>`,12)])])}const k=a(t,[["render",l]]);export{d as __pageData,k as default};

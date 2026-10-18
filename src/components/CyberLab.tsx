"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Gamepad2,
  KeyRound,
  Radar,
  Volume2,
  VolumeX,
  Tv,
  RotateCcw,
  Play,
  Pause,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Trophy,
  Terminal as TerminalIcon,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
  Lightbulb,
} from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

// ─────────────────────────────────────────────────────────────
// Audio Synthesizer (Native Web Audio API, Zero dependencies)
// ─────────────────────────────────────────────────────────────
function playCyberTone(freq: number, duration: number, type: OscillatorType = "sine", enabled: boolean) {
  if (!enabled || typeof window === "undefined") return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    /* safe audio fallback */
  }
}

// ─────────────────────────────────────────────────────────────
// GAME 1: PACKET RUNNER (Firewall Bypass Grid Game)
// ─────────────────────────────────────────────────────────────
const GRID_COLS = 20;
const GRID_ROWS = 14;

type Point = { x: number; y: number };
type TokenType = "PAYLOAD" | "TOKEN" | "FLAG";

interface TokenItem extends Point {
  type: TokenType;
  points: number;
}

export function CyberLab() {
  const [activeTab, setActiveTab] = useState<"packet" | "cipher" | "radar">("packet");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [crtFilter, setCrtFilter] = useState(true);

  // ── PACKET RUNNER STATE ──
  const [snake, setSnake] = useState<Point[]>([
    { x: 6, y: 7 },
    { x: 5, y: 7 },
    { x: 4, y: 7 },
  ]);
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 });
  const [token, setToken] = useState<TokenItem>({ x: 14, y: 7, type: "PAYLOAD", points: 10 });
  const [firewalls, setFirewalls] = useState<Point[]>([
    { x: 10, y: 3 },
    { x: 10, y: 10 },
  ]);
  const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "PAUSED" | "GAMEOVER">("IDLE");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [logs, setLogs] = useState<string[]>([
    "session ready: eth0 initialized",
    "ready to bypass corporate firewalls",
  ]);

  const dirRef = useRef(dir);
  const nextDirRef = useRef(dir);

  useEffect(() => {
    dirRef.current = dir;
  }, [dir]);

  // Load highscore from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ha_packet_high");
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHighScore(parseInt(saved, 10));
      }
    } catch {}
  }, []);

  const addLog = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString("en-GB", { hour12: false });
    setLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 5)]);
  }, []);

  const spawnToken = useCallback((currentSnake: Point[], currentFirewalls: Point[]): TokenItem => {
    let randX: number;
    let randY: number;
    let collision = true;

    while (collision) {
      randX = Math.floor(Math.random() * GRID_COLS);
      randY = Math.floor(Math.random() * GRID_ROWS);
      const inSnake = currentSnake.some((s) => s.x === randX && s.y === randY);
      const inWall = currentFirewalls.some((w) => w.x === randX && w.y === randY);
      if (!inSnake && !inWall) {
        collision = false;
        const rand = Math.random();
        const type: TokenType = rand > 0.85 ? "FLAG" : rand > 0.5 ? "TOKEN" : "PAYLOAD";
        const points = type === "FLAG" ? 50 : type === "TOKEN" ? 25 : 10;
        return { x: randX, y: randY, type, points };
      }
    }
    return { x: 10, y: 5, type: "PAYLOAD", points: 10 };
  }, []);

  const restartGame = useCallback(() => {
    const initSnake = [
      { x: 6, y: 7 },
      { x: 5, y: 7 },
      { x: 4, y: 7 },
    ];
    const initFirewalls = [
      { x: 10, y: 3 },
      { x: 10, y: 10 },
    ];
    setSnake(initSnake);
    setDir({ x: 1, y: 0 });
    nextDirRef.current = { x: 1, y: 0 };
    setFirewalls(initFirewalls);
    setToken(spawnToken(initSnake, initFirewalls));
    setScore(0);
    setLevel(1);
    setGameState("PLAYING");
    addLog("packet injection started");
    playCyberTone(440, 0.1, "sine", soundEnabled);
  }, [addLog, soundEnabled, spawnToken]);

  // Handle keyboard inputs
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (activeTab !== "packet") return;

      const key = e.key.toLowerCase();
      let handled = false;

      if (["arrowup", "w"].includes(key) && dirRef.current.y !== 1) {
        nextDirRef.current = { x: 0, y: -1 };
        handled = true;
      } else if (["arrowdown", "s"].includes(key) && dirRef.current.y !== -1) {
        nextDirRef.current = { x: 0, y: 1 };
        handled = true;
      } else if (["arrowleft", "a"].includes(key) && dirRef.current.x !== 1) {
        nextDirRef.current = { x: -1, y: 0 };
        handled = true;
      } else if (["arrowright", "d"].includes(key) && dirRef.current.x !== -1) {
        nextDirRef.current = { x: 1, y: 0 };
        handled = true;
      } else if (key === " " || key === "p") {
        if (gameState === "PLAYING") setGameState("PAUSED");
        else if (gameState === "PAUSED") setGameState("PLAYING");
        else if (gameState === "IDLE" || gameState === "GAMEOVER") restartGame();
        handled = true;
      }

      if (handled) {
        e.preventDefault();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, gameState, restartGame]);

  // Game Loop
  useEffect(() => {
    if (gameState !== "PLAYING") return;

    const speed = Math.max(75, 140 - (level - 1) * 10);
    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const curDir = nextDirRef.current;
        setDir(curDir);

        const head = prevSnake[0];
        const newHead = {
          x: head.x + curDir.x,
          y: head.y + curDir.y,
        };

        // Wall collision check
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_COLS ||
          newHead.y < 0 ||
          newHead.y >= GRID_ROWS
        ) {
          setGameState("GAMEOVER");
          playCyberTone(150, 0.35, "sawtooth", soundEnabled);
          addLog("FIREWALL DROP: Out of subnet bounds!");
          return prevSnake;
        }

        // Firewall obstacle collision check
        if (firewalls.some((w) => w.x === newHead.x && w.y === newHead.y)) {
          setGameState("GAMEOVER");
          playCyberTone(140, 0.35, "sawtooth", soundEnabled);
          addLog("BLOCKED: IDS Rule triggered!");
          return prevSnake;
        }

        // Self-collision check
        if (prevSnake.some((s, idx) => idx > 0 && s.x === newHead.x && s.y === newHead.y)) {
          setGameState("GAMEOVER");
          playCyberTone(130, 0.35, "sawtooth", soundEnabled);
          addLog("LOOP: Packet sequence collision!");
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Token consumed check
        if (newHead.x === token.x && newHead.y === token.y) {
          const earned = token.points;
          const newScore = score + earned;
          setScore(newScore);

          if (newScore > highScore) {
            setHighScore(newScore);
            try {
              localStorage.setItem("ha_packet_high", String(newScore));
            } catch {}
          }

          playCyberTone(earned >= 50 ? 880 : earned >= 25 ? 660 : 520, 0.1, "triangle", soundEnabled);
          addLog(`EXFIL: ${token.type} (+${earned} pts)`);

          // Level up check
          if (Math.floor(newScore / 60) + 1 > level) {
            const nextLvl = level + 1;
            setLevel(nextLvl);
            addLog(`SECURITY ESCALATION: Level ${nextLvl}`);
            playCyberTone(990, 0.2, "sine", soundEnabled);

            const newWallX = Math.floor(Math.random() * (GRID_COLS - 4)) + 2;
            const newWallY = Math.floor(Math.random() * (GRID_ROWS - 4)) + 2;
            setFirewalls((w) => [...w, { x: newWallX, y: newWallY }]);
          }

          setToken(spawnToken(newSnake, firewalls));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [gameState, level, token, firewalls, score, highScore, soundEnabled, spawnToken, addLog]);

  // ─────────────────────────────────────────────────────────────
  // GAME 2: CRYPTOGRAPHIC MEMORY DECRYPTION (HEX WORDLE / MASTERMIND)
  // ─────────────────────────────────────────────────────────────
  type AttemptCharStatus = "exact" | "present" | "miss";
  interface AttemptRecord {
    guess: string;
    charStatuses: AttemptCharStatus[];
    exactCount: number;
    presentCount: number;
  }

  const [secretHex, setSecretHex] = useState("B7E2");
  const [currentGuess, setCurrentGuess] = useState("");
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [cipherSolved, setCipherSolved] = useState(false);
  const [cipherFailed, setCipherFailed] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [flagCopied, setFlagCopied] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);

  const resetCipher = useCallback(() => {
    const chars = "0123456789ABCDEF";
    let gen = "";
    for (let i = 0; i < 4; i++) {
      gen += chars[Math.floor(Math.random() * chars.length)];
    }
    setSecretHex(gen);
    setCurrentGuess("");
    setAttempts([]);
    setCipherSolved(false);
    setCipherFailed(false);
    setHintUsed(false);
    setHintMessage(null);
    setFlagCopied(false);
    playCyberTone(350, 0.1, "sine", soundEnabled);
  }, [soundEnabled]);

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== 4) return;
    const guessUpper = currentGuess.toUpperCase();
    const secretChars = secretHex.split("");
    const guessChars = guessUpper.split("");

    const charStatuses: AttemptCharStatus[] = Array(4).fill("miss");
    const secretUsed = Array(4).fill(false);
    const guessUsed = Array(4).fill(false);

    let exactCount = 0;
    let presentCount = 0;

    // Pass 1: Exact matches (Green)
    for (let i = 0; i < 4; i++) {
      if (guessChars[i] === secretChars[i]) {
        charStatuses[i] = "exact";
        secretUsed[i] = true;
        guessUsed[i] = true;
        exactCount++;
      }
    }

    // Pass 2: Present matches (Yellow)
    for (let i = 0; i < 4; i++) {
      if (guessUsed[i]) continue;
      for (let j = 0; j < 4; j++) {
        if (!secretUsed[j] && guessChars[i] === secretChars[j]) {
          charStatuses[i] = "present";
          secretUsed[j] = true;
          presentCount++;
          break;
        }
      }
    }

    const newAttempts = [...attempts, { guess: guessUpper, charStatuses, exactCount, presentCount }];
    setAttempts(newAttempts);
    setCurrentGuess("");

    if (exactCount === 4) {
      setCipherSolved(true);
      playCyberTone(880, 0.3, "triangle", soundEnabled);
    } else if (newAttempts.length >= 5) {
      setCipherFailed(true);
      playCyberTone(160, 0.35, "sawtooth", soundEnabled);
    } else {
      playCyberTone(520, 0.08, "sine", soundEnabled);
    }
  }, [currentGuess, secretHex, attempts, soundEnabled]);

  const useHint = useCallback(() => {
    if (hintUsed || cipherSolved || cipherFailed) return;
    setHintUsed(true);
    const unrevealed = secretHex[Math.floor(Math.random() * 4)];
    setHintMessage(`DECRYPTION TELEMETRY: Character "${unrevealed}" is confirmed present in memory.`);
    playCyberTone(650, 0.15, "triangle", soundEnabled);
  }, [hintUsed, cipherSolved, cipherFailed, secretHex, soundEnabled]);

  // ── RADAR SCANNER STATE ──
  const [selectedTarget, setSelectedTarget] = useState<string | null>("t1");
  const radarTargets = [
    { id: "t1", label: "Web Portal API", port: "443/HTTPS", status: "SECURE", auth: "OAuth2 / JWT", threat: "Low", desc: "Monitored reverse proxy with rate limiting and TLS 1.3 encryption." },
    { id: "t2", label: "GraphQL Gateway", port: "8080/TCP", status: "AUDITED", auth: "Role-Based / RBAC", threat: "None", desc: "Introspection disabled; query depth limits and query cost analysis active." },
    { id: "t3", label: "SSH Bastion", port: "22/SSH", status: "HARDENED", auth: "Ed25519 Keys", threat: "Low", desc: "Password auth disabled, fail2ban active, strict IP allowlist enforced." },
    { id: "t4", label: "SIEM Wazuh Node", port: "1514/TCP", status: "ACTIVE", auth: "mTLS Certs", threat: "None", desc: "Real-time log ingestion, Linux auditd events, and MITRE ATT&CK alerting." },
  ];

  return (
    <section id="lab" className="scroll-mt-28 border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="INTERACTIVE LAB"
          title="Security sandbox & terminal arcade."
          lede="Playable utilities engineered for visitors. Test your reflexes in Packet Runner, deduce cryptographic hex ciphers, or observe real-time port telemetry."
        />

        <Reveal>
          {/* Main Cyber Chassis Card with Uiverse-style Glowing Edges */}
          <div className="relative overflow-hidden rounded-2xl border border-line bg-card shadow-2xl transition hover:border-accent/70">
            {/* Top Toolbar / Mode Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-code/50 px-5 py-3.5 backdrop-blur">
              {/* Tab Switchers */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("packet")}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-[12px] font-medium transition ${
                    activeTab === "packet"
                      ? "bg-ink text-paper dark:bg-paper dark:text-ink shadow-sm"
                      : "text-muted hover:bg-paper hover:text-ink"
                  }`}
                >
                  <Gamepad2 size={14} className="text-accent" />
                  <span>PACKET RUNNER</span>
                </button>

                <button
                  onClick={() => setActiveTab("cipher")}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-[12px] font-medium transition ${
                    activeTab === "cipher"
                      ? "bg-ink text-paper dark:bg-paper dark:text-ink shadow-sm"
                      : "text-muted hover:bg-paper hover:text-ink"
                  }`}
                >
                  <KeyRound size={14} className="text-accent" />
                  <span>HEX CIPHER</span>
                </button>

                <button
                  onClick={() => setActiveTab("radar")}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-[12px] font-medium transition ${
                    activeTab === "radar"
                      ? "bg-ink text-paper dark:bg-paper dark:text-ink shadow-sm"
                      : "text-muted hover:bg-paper hover:text-ink"
                  }`}
                >
                  <Radar size={14} className="text-accent" />
                  <span>PORT RADAR</span>
                </button>
              </div>

              {/* Utility Toggles (CRT / Audio) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCrtFilter(!crtFilter)}
                  className={`inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 font-mono text-[11px] transition ${
                    crtFilter ? "bg-accent/10 border-accent text-accent" : "text-faint hover:text-ink"
                  }`}
                  title="Toggle CRT Scanlines"
                >
                  <Tv size={13} />
                  <span>CRT</span>
                </button>

                <button
                  onClick={() => {
                    setSoundEnabled(!soundEnabled);
                    if (!soundEnabled) playCyberTone(550, 0.1, "sine", true);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 font-mono text-[11px] transition ${
                    soundEnabled ? "bg-accent/10 border-accent text-accent" : "text-faint hover:text-ink"
                  }`}
                  title="Toggle 8-bit sound effects"
                >
                  {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                  <span>{soundEnabled ? "SFX ON" : "MUTED"}</span>
                </button>
              </div>
            </div>

            {/* TAB 1: PACKET RUNNER (SNAKE FIREWALL BYPASS) */}
            {activeTab === "packet" && (
              <div className="relative p-5 sm:p-7">
                <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
                  {/* Left: Interactive Canvas Screen */}
                  <div className="flex flex-col">
                    {/* Game Header Bar */}
                    <div className="flex items-center justify-between border-b border-line/60 pb-3 font-mono text-[12px]">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-muted">
                          <Trophy size={13} className="text-accent" />
                          <span>HIGH: <strong className="text-ink">{highScore}</strong></span>
                        </span>
                        <span className="text-faint">|</span>
                        <span>SCORE: <strong className="text-accent">{score}</strong></span>
                        <span className="text-faint">|</span>
                        <span>LVL: <strong className="text-ink">{level}</strong></span>
                      </div>

                      <div className="flex items-center gap-2">
                        {gameState === "PLAYING" ? (
                          <button
                            onClick={() => setGameState("PAUSED")}
                            className="inline-flex items-center gap-1 rounded bg-paper px-2.5 py-1 text-[11px] text-muted hover:text-ink border border-line"
                          >
                            <Pause size={12} /> Pause
                          </button>
                        ) : gameState === "PAUSED" ? (
                          <button
                            onClick={() => setGameState("PLAYING")}
                            className="inline-flex items-center gap-1 rounded bg-accent px-2.5 py-1 text-[11px] text-white"
                          >
                            <Play size={12} /> Resume
                          </button>
                        ) : (
                          <button
                            onClick={restartGame}
                            className="shimmer-button inline-flex items-center gap-1 rounded bg-accent px-3 py-1 text-[11px] font-medium text-white shadow-sm"
                          >
                            <Play size={12} /> {gameState === "GAMEOVER" ? "Try Again" : "Start Game"}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* The Grid Arena */}
                    <div className="relative mt-3 aspect-[20/14] w-full overflow-hidden rounded-xl border border-line/80 bg-[#090b09] p-2 font-mono">
                      {crtFilter && <div className="crt-scanlines pointer-events-none absolute inset-0 z-10 opacity-30" />}

                      {gameState === "IDLE" && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/75 p-6 text-center backdrop-blur-xs">
                          <Gamepad2 size={40} className="text-accent animate-bounce" />
                          <p className="mt-3 font-display text-xl font-bold text-white">Packet Runner: Firewall Bypass</p>
                          <p className="mt-1 max-w-sm text-[13px] text-gray-400">
                            Guide your exploit packet through network nodes. Eat payloads to boost score and evade IDS firewalls!
                          </p>
                          <button
                            onClick={restartGame}
                            className="shimmer-button mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-[13px] font-semibold text-white shadow-lg transition hover:scale-105"
                          >
                            <Play size={14} /> Start Bypass Session
                          </button>
                          <p className="mt-3 text-[11px] text-gray-500">Controls: Arrow keys / WASD (or D-Pad below)</p>
                        </div>
                      )}

                      {gameState === "GAMEOVER" && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/85 p-6 text-center backdrop-blur-xs">
                          <ShieldAlert size={40} className="text-red-400 animate-pulse" />
                          <p className="mt-2 font-display text-xl font-bold text-red-400">SESSION TERMINATED</p>
                          <p className="mt-1 text-[13px] text-gray-300">
                            Final Score: <strong className="text-accent">{score}</strong> points (Level {level})
                          </p>
                          {score >= highScore && score > 0 && (
                            <span className="mt-2 inline-flex items-center gap-1 rounded bg-[#d7ff3e]/20 px-2.5 py-0.5 text-[11px] font-bold text-[#d7ff3e]">
                              <Trophy size={12} /> NEW HIGH SCORE!
                            </span>
                          )}
                          <button
                            onClick={restartGame}
                            className="shimmer-button mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-[13px] font-semibold text-white shadow-lg transition hover:scale-105"
                          >
                            <RotateCcw size={14} /> Re-Inject Packet
                          </button>
                        </div>
                      )}

                      <div
                        className="grid h-full w-full gap-[1px]"
                        style={{
                          gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
                          gridTemplateRows: `repeat(${GRID_ROWS}, minmax(0, 1fr))`,
                        }}
                      >
                        {Array.from({ length: GRID_ROWS }).map((_, r) =>
                          Array.from({ length: GRID_COLS }).map((_, c) => {
                            const isHead = snake[0]?.x === c && snake[0]?.y === r;
                            const isSnakeBody = snake.slice(1).some((s) => s.x === c && s.y === r);
                            const isToken = token.x === c && token.y === r;
                            const isWall = firewalls.some((w) => w.x === c && w.y === r);

                            return (
                              <div
                                key={`${r}-${c}`}
                                className={`rounded-[2px] transition-colors duration-75 ${
                                  isHead
                                    ? "bg-[#2b4eff] shadow-[0_0_8px_#2b4eff]"
                                    : isSnakeBody
                                    ? "bg-[#7d96ff]/80"
                                    : isWall
                                    ? "bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.6)]"
                                    : isToken
                                    ? token.type === "FLAG"
                                      ? "bg-[#a855f7] shadow-[0_0_10px_#a855f7] animate-pulse"
                                      : token.type === "TOKEN"
                                      ? "bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]"
                                      : "bg-[#22c55e] shadow-[0_0_8px_#22c55e]"
                                    : "bg-white/[0.03]"
                                }`}
                              />
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* Mobile On-Screen D-Pad Controller */}
                    <div className="mt-4 flex items-center justify-between sm:hidden">
                      <p className="font-mono text-[11px] text-faint">Touch Controls</p>
                      <div className="grid grid-cols-3 gap-1.5 w-36">
                        <div />
                        <button
                          onClick={() => {
                            if (dirRef.current.y !== 1) nextDirRef.current = { x: 0, y: -1 };
                          }}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-paper active:bg-accent active:text-white"
                        >
                          <ArrowUp size={16} />
                        </button>
                        <div />
                        <button
                          onClick={() => {
                            if (dirRef.current.x !== 1) nextDirRef.current = { x: -1, y: 0 };
                          }}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-paper active:bg-accent active:text-white"
                        >
                          <ArrowLeft size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (dirRef.current.y !== -1) nextDirRef.current = { x: 0, y: 1 };
                          }}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-paper active:bg-accent active:text-white"
                        >
                          <ArrowDown size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (dirRef.current.x !== -1) nextDirRef.current = { x: 1, y: 0 };
                          }}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-paper active:bg-accent active:text-white"
                        >
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Live Packet Telemetry & Console Log */}
                  <div className="flex flex-col justify-between rounded-xl border border-line bg-code p-4 font-mono text-[12px]">
                    <div>
                      <div className="flex items-center justify-between border-b border-line pb-2.5 text-faint text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <TerminalIcon size={13} className="text-accent" />
                          <span>PACKET INTERCEPTOR</span>
                        </span>
                        <span className="flex items-center gap-1 text-green-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping" />
                          LIVE
                        </span>
                      </div>

                      <div className="mt-3 space-y-1.5 border-b border-line pb-3 text-[11.5px] text-muted">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-sm bg-[#22c55e]" />
                            <span>Payload</span>
                          </span>
                          <span className="text-faint">+10 pts</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-sm bg-[#06b6d4]" />
                            <span>API Token</span>
                          </span>
                          <span className="text-faint">+25 pts</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-sm bg-[#a855f7]" />
                            <span>Zero-Day Flag</span>
                          </span>
                          <span className="text-accent font-semibold">+50 pts</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-sm bg-red-500" />
                            <span>Firewall / WAF</span>
                          </span>
                          <span className="text-red-400">Blocks</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-[11px] text-faint uppercase tracking-wider">Console Activity</p>
                        <div className="mt-2 space-y-1.5 text-[11.5px]">
                          {logs.map((l, i) => (
                            <p
                              key={i}
                              className={
                                i === 0
                                  ? "text-ink font-medium"
                                  : "text-muted"
                              }
                            >
                              <span className="text-accent">&gt;</span> {l}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-line/70 pt-3 text-[11px] text-faint">
                      <span>Pro-tip: Keyboard arrows or WASD to navigate. Spacebar to pause.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CRYPTOGRAPHIC MEMORY DECRYPTION (HEX CIPHER PUZZLE) */}
            {activeTab === "cipher" && (
              <div className="p-5 sm:p-7">
                {/* Header with Title & How-to-play toggle */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 font-mono text-[11px] text-muted">
                      <KeyRound size={13} className="text-accent" />
                      <span>CRYPTOGRAPHIC MEMORY DECRYPTION</span>
                    </div>
                    <h4 className="mt-1.5 font-display text-xl font-semibold sm:text-2xl">
                      Brute-Force Hex PIN Decoder
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowHowToPlay(!showHowToPlay)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-[12px] transition ${
                        showHowToPlay ? "border-accent bg-accent/10 text-accent font-semibold" : "border-line bg-paper text-muted hover:text-ink"
                      }`}
                    >
                      <HelpCircle size={14} />
                      <span>{showHowToPlay ? "Close Tutorial" : "How to Play?"}</span>
                    </button>

                    <button
                      onClick={useHint}
                      disabled={hintUsed || cipherSolved || cipherFailed}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper px-3 py-1.5 font-mono text-[12px] text-muted hover:text-accent disabled:opacity-40"
                      title="Reveal 1 character contained in the key"
                    >
                      <Lightbulb size={14} />
                      <span>Hint</span>
                    </button>
                  </div>
                </div>

                {/* Collapsible / Interactive "HOW TO PLAY" Guide Drawer */}
                {showHowToPlay && (
                  <div className="my-5 rounded-xl border border-accent/40 bg-accent-soft/20 p-5 font-mono text-[12.5px] leading-relaxed">
                    <div className="flex items-center gap-2 font-semibold text-accent">
                      <HelpCircle size={16} />
                      <span>HOW TO PLAY: STEP-BY-STEP RULES</span>
                    </div>
                    <p className="mt-2 text-muted">
                      The computer has generated a secret 4-character Hexadecimal PIN using digits `0` to `9` and letters `A` to `F` (e.g. <code className="text-ink font-bold">B7E2</code>). You have <strong>5 attempts</strong> to decrypt it before the memory lock triggers!
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3">
                        <span className="flex items-center gap-1.5 font-bold text-green-500">
                          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                          🟢 EXACT MATCH
                        </span>
                        <p className="mt-1 text-[11.5px] text-muted">
                          The character is in the secret PIN <strong>and</strong> in the exact position you guessed!
                        </p>
                      </div>

                      <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3">
                        <span className="flex items-center gap-1.5 font-bold text-yellow-500">
                          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                          🟡 PRESENT MATCH
                        </span>
                        <p className="mt-1 text-[11.5px] text-muted">
                          The character is part of the secret PIN, but belongs in a <strong>different slot</strong>!
                        </p>
                      </div>

                      <div className="rounded-lg border border-line bg-paper p-3">
                        <span className="flex items-center gap-1.5 font-bold text-faint">
                          <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                          ⚪ MISS
                        </span>
                        <p className="mt-1 text-[11.5px] text-muted">
                          That character does <strong>not</strong> exist anywhere in the secret PIN. Eliminate it!
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-[11.5px] text-faint">
                      💡 <strong>Strategy:</strong> Use elimination. Keep characters that lit up Green, swap slots for Yellow ones, and don&apos;t reuse Gray characters.
                    </p>
                  </div>
                )}

                {/* Game Arena: Keypad on Left, Interactive Color-Coded Matrix on Right */}
                <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                  <div>
                    {/* Guess Input & Virtual Keypad */}
                    <div className="rounded-xl border border-line bg-paper p-5 font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] text-faint">INPUT 4-HEX PIN:</span>
                        <button
                          onClick={resetCipher}
                          className="text-[11.5px] text-accent hover:underline flex items-center gap-1"
                        >
                          <RotateCcw size={12} /> New Game
                        </button>
                      </div>

                      {/* Hint Message Banner */}
                      {hintMessage && (
                        <div className="mt-3 flex items-center gap-2 rounded-lg border border-yellow-500/50 bg-yellow-500/10 px-3 py-2 text-[11.5px] text-yellow-500">
                          <Lightbulb size={14} className="shrink-0" />
                          <span>{hintMessage}</span>
                        </div>
                      )}

                      {/* 4 Digit Boxes */}
                      <div className="mt-4 flex items-center justify-center gap-3">
                        {Array.from({ length: 4 }).map((_, idx) => (
                          <div
                            key={idx}
                            className={`flex h-16 w-14 items-center justify-center rounded-xl border-2 font-display text-2xl font-bold shadow-inner transition ${
                              currentGuess[idx]
                                ? "border-accent bg-accent/10 text-accent"
                                : "border-line bg-card text-faint"
                            }`}
                          >
                            {currentGuess[idx] || "—"}
                          </div>
                        ))}
                      </div>

                      {/* Hex Keypad (0-9, A-F) */}
                      <div className="mt-5 grid grid-cols-4 gap-1.5 sm:grid-cols-8">
                        {"0123456789ABCDEF".split("").map((ch) => (
                          <button
                            key={ch}
                            disabled={currentGuess.length >= 4 || cipherSolved || cipherFailed}
                            onClick={() => {
                              if (currentGuess.length < 4) {
                                setCurrentGuess((prev) => prev + ch);
                                playCyberTone(500, 0.05, "sine", soundEnabled);
                              }
                            }}
                            className="h-11 rounded-lg border border-line bg-card font-mono text-[14px] font-semibold text-ink transition hover:border-accent hover:bg-accent hover:text-white disabled:opacity-30"
                          >
                            {ch}
                          </button>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <button
                          onClick={() => setCurrentGuess((prev) => prev.slice(0, -1))}
                          disabled={currentGuess.length === 0}
                          className="rounded-lg border border-line bg-card px-5 py-2.5 text-[12px] text-muted hover:text-ink disabled:opacity-30 font-medium"
                        >
                          Backspace ⌫
                        </button>
                        <button
                          onClick={submitGuess}
                          disabled={currentGuess.length !== 4 || cipherSolved || cipherFailed}
                          className="shimmer-button rounded-lg bg-ink px-7 py-2.5 text-[12px] font-semibold text-paper hover:bg-accent hover:text-white dark:bg-paper dark:text-ink disabled:opacity-30 shadow-md"
                        >
                          Verify Guess →
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Color-Coded Wordle-Style Attempt Matrix */}
                  <div className="rounded-xl border border-line bg-code p-5 font-mono text-[12px]">
                    <div className="flex items-center justify-between border-b border-line pb-3 text-faint text-[11px]">
                      <span>MEMORY ATTEMPT MATRIX</span>
                      <span className="font-semibold text-ink">
                        {attempts.length} / 5 ATTEMPTS
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      {attempts.length === 0 && (
                        <div className="text-center py-10 text-faint text-[12px]">
                          <p>Subsystem waiting for input...</p>
                          <p className="mt-1 text-[11px]">Type 4 hex digits and press Verify Guess.</p>
                        </div>
                      )}

                      {attempts.map((att, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-xl border border-line bg-paper p-3 shadow-xs"
                        >
                          {/* 4 Color-coded squares */}
                          <div className="flex items-center gap-2">
                            {att.guess.split("").map((ch, idx) => {
                              const status = att.charStatuses[idx];
                              return (
                                <span
                                  key={idx}
                                  className={`flex h-9 w-8 items-center justify-center rounded-md font-display text-[15px] font-bold border transition ${
                                    status === "exact"
                                      ? "border-green-500 bg-green-500/20 text-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                                      : status === "present"
                                      ? "border-yellow-500 bg-yellow-500/20 text-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.3)]"
                                      : "border-line bg-paper text-faint"
                                  }`}
                                >
                                  {ch}
                                </span>
                              );
                            })}
                          </div>

                          {/* Summary Badges */}
                          <div className="flex items-center gap-1.5 font-mono text-[10.5px]">
                            {att.exactCount > 0 && (
                              <span className="rounded bg-green-500/15 px-2 py-0.5 font-bold text-green-500">
                                {att.exactCount} EXACT
                              </span>
                            )}
                            {att.presentCount > 0 && (
                              <span className="rounded bg-yellow-500/15 px-2 py-0.5 font-bold text-yellow-500">
                                {att.presentCount} PRESENT
                              </span>
                            )}
                            {att.exactCount === 0 && att.presentCount === 0 && (
                              <span className="rounded bg-gray-500/15 px-2 py-0.5 text-faint">
                                0 MATCH
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Solved Victory State */}
                    {cipherSolved && (
                      <div className="mt-6 rounded-xl border border-green-500/60 bg-green-500/15 p-4 text-center">
                        <p className="flex items-center justify-center gap-2 text-[14px] font-bold text-green-500">
                          <Sparkles size={16} /> CIPHER CRACKED: {secretHex}
                        </p>
                        <p className="mt-1 text-[12px] text-muted">
                          You successfully bypassed the cryptographic lock in {attempts.length} attempts!
                        </p>
                        <div className="mt-3 flex items-center justify-center gap-2">
                          <code className="rounded bg-card px-3 py-1 font-mono text-[12px] text-ink border border-line">
                            FLAG&#123;h4rsh_c1ph3r_br0k3n&#125;
                          </code>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText("FLAG{h4rsh_c1ph3r_br0k3n}");
                              setFlagCopied(true);
                              setTimeout(() => setFlagCopied(false), 2000);
                            }}
                            className="rounded-lg bg-accent px-3 py-1 font-mono text-[11px] text-white hover:bg-accent/80 flex items-center gap-1"
                          >
                            {flagCopied ? <Check size={12} /> : <Copy size={12} />}
                            <span>{flagCopied ? "Copied!" : "Copy"}</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Failed Lockout State */}
                    {cipherFailed && (
                      <div className="mt-6 rounded-xl border border-red-500/50 bg-red-500/15 p-4 text-center">
                        <p className="text-[14px] font-bold text-red-400">MEMORY DUMPED: LOCKOUT</p>
                        <p className="mt-1 text-[12px] text-muted">
                          5 failed attempts exceeded. The correct root PIN was: <strong className="text-ink">{secretHex}</strong>
                        </p>
                        <button
                          onClick={resetCipher}
                          className="shimmer-button mt-3 rounded-lg bg-accent px-4 py-1.5 font-mono text-[12px] font-semibold text-white"
                        >
                          Generate New PIN
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PORT RADAR (UIVERSE-STYLE SWEEPING SCANNER) */}
            {activeTab === "radar" && (
              <div className="p-5 sm:p-7">
                <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
                  {/* Left: Sweeping Radar Display */}
                  <div className="relative mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center rounded-full border border-accent/30 bg-[#090b09] p-4 shadow-[0_0_40px_-15px_var(--accent)]">
                    <div className="absolute inset-4 rounded-full border border-line/40" />
                    <div className="absolute inset-14 rounded-full border border-line/30" />
                    <div className="absolute inset-24 rounded-full border border-line/20" />
                    <div className="absolute inset-32 rounded-full border border-line/10" />

                    <div className="absolute inset-x-0 top-1/2 h-px bg-line/40" />
                    <div className="absolute inset-y-0 left-1/2 w-px bg-line/40" />

                    <div className="radar-sweep-beam pointer-events-none absolute inset-0 rounded-full">
                      <div
                        className="h-1/2 w-1/2 origin-bottom-right rounded-tl-full opacity-60"
                        style={{
                          background: "conic-gradient(from 270deg, var(--accent) 0deg, transparent 65deg)",
                        }}
                      />
                    </div>

                    <button
                      onClick={() => setSelectedTarget("t1")}
                      className="absolute top-[28%] left-[72%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_8px_var(--accent)] transition hover:scale-125"
                      title="Web Portal API"
                    />
                    <button
                      onClick={() => setSelectedTarget("t2")}
                      className="absolute top-[68%] left-[26%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4] transition hover:scale-125"
                      title="GraphQL Gateway"
                    />
                    <button
                      onClick={() => setSelectedTarget("t3")}
                      className="absolute top-[22%] left-[34%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e] transition hover:scale-125"
                      title="SSH Bastion"
                    />
                    <button
                      onClick={() => setSelectedTarget("t4")}
                      className="absolute top-[76%] left-[64%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7] transition hover:scale-125"
                      title="Internal DB Cluster"
                    />

                    <div className="relative z-10 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_6px_#fff]" />
                  </div>

                  {/* Right: Target Inspection Telemetry */}
                  <div className="rounded-xl border border-line bg-code p-5 font-mono text-[12.5px] leading-relaxed">
                    <div className="flex items-center justify-between border-b border-line pb-2.5 text-faint text-[11px]">
                      <span>RADAR TELEMETRY</span>
                      <span className="text-accent">HOST AUDIT</span>
                    </div>

                    {selectedTarget ? (
                      (() => {
                        const target = radarTargets.find((t) => t.id === selectedTarget)!;
                        return (
                          <div className="mt-4 space-y-3">
                            <div>
                              <p className="text-[11px] text-faint">SERVICE IDENTITY</p>
                              <p className="mt-0.5 font-display text-lg font-semibold text-ink">
                                {target.label}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[12px]">
                              <div className="rounded border border-line bg-paper p-2">
                                <span className="text-faint text-[10.5px]">PORT / PROTO</span>
                                <p className="font-semibold text-ink">{target.port}</p>
                              </div>
                              <div className="rounded border border-line bg-paper p-2">
                                <span className="text-faint text-[10.5px]">STATUS</span>
                                <p className="font-semibold text-green-500">{target.status}</p>
                              </div>
                            </div>

                            <div className="rounded border border-line bg-paper p-2.5 text-[12px]">
                              <span className="text-faint text-[10.5px]">AUTHENTICATION SCHEME</span>
                              <p className="font-medium text-ink">{target.auth}</p>
                            </div>

                            <p className="text-[12px] text-muted">
                              {target.desc}
                            </p>

                            <p className="text-[11.5px] text-faint">
                              Click any blip on the radar circle to inspect real-time port telemetry.
                            </p>
                          </div>
                        );
                      })()
                    ) : (
                      <p className="mt-4 text-faint">Select a blip on the radar screen to view details.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

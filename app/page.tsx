"use client";

import { useEffect, useRef, useState } from "react";

/* ---------- Halo mark: a glossy dark orb wrapped in a luminous, tilted halo.
   The inner light drifts toward your cursor — a calm gaze, not googly eyes. ---------- */
function HaloMark() {
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(dist / 22, 14);
      setGaze({ x: (dx / dist) * reach, y: (dy / dist) * reach });
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="relative animate-float" ref={ref}>
      {/* ambient bloom */}
      <div className="absolute inset-0 -z-10 scale-150 animate-pulse-glow rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.55),rgba(217,70,239,0.25)_45%,transparent_70%)] blur-2xl" />

      {/* tilted halo ring */}
      <div className="absolute left-1/2 top-1/2 h-[13rem] w-[13rem] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] [transform:translate(-50%,-50%)_rotateX(72deg)_rotateZ(0deg)]">
        <div className="h-full w-full animate-spin-slow rounded-full border-[3px] border-transparent [background:conic-gradient(from_0deg,#818cf8,#e879f9,#38bdf8,#818cf8)_border-box] [mask:linear-gradient(#000_0_0)_padding-box,linear-gradient(#000_0_0)] [mask-composite:exclude] [-webkit-mask-composite:xor] shadow-[0_0_30px_rgba(129,140,248,0.6)]" />
      </div>

      {/* glossy core */}
      <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-slate-800 via-slate-900 to-black shadow-[inset_0_-10px_30px_rgba(0,0,0,0.8),inset_0_8px_20px_rgba(129,140,248,0.25),0_20px_50px_rgba(0,0,0,0.6)]">
        {/* rim light */}
        <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />

        {/* the drifting inner light — Halo's presence */}
        <div
          className="h-16 w-16 rounded-full bg-[radial-gradient(circle_at_35%_30%,#c7d2fe,#6366f1_45%,#7c3aed_80%)] shadow-[0_0_40px_rgba(129,140,248,0.9)] transition-transform duration-150 ease-out"
          style={{ transform: `translate(${gaze.x}px, ${gaze.y}px)` }}
        >
          <div className="absolute left-4 top-3 h-3 w-3 rounded-full bg-white/80 blur-[1px]" />
        </div>

        {/* top sheen */}
        <div className="pointer-events-none absolute left-8 top-6 h-6 w-16 -rotate-[20deg] rounded-full bg-white/15 blur-md" />
      </div>
    </div>
  );
}

/* ---------- faint line doodles, like Halo sketching in the margins ---------- */
function Doodle({
  className,
  delay = 0,
  children,
}: {
  className: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`pointer-events-none absolute text-indigo-400/25 opacity-0 ${className}`}
      style={{
        animation: `pop-in 0.8s ease ${delay}s forwards, float 9s ease-in-out ${delay}s infinite`,
      }}
    >
      {children}
    </div>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ---------- installer downloads (hosted on GitHub Releases) ---------- */
const REPO = "kavan010/haloWeb";
const VERSION = "v1.0.0";
const RELEASE = `https://github.com/${REPO}/releases/download/${VERSION}`;
const DL = {
  macArm: `${RELEASE}/HALO-1.0.0-arm64.dmg`,
  macIntel: `${RELEASE}/HALO-1.0.0.dmg`,
  // GitHub replaces spaces with dots in release asset names.
  win: `${RELEASE}/HALO.Setup.1.0.0.exe`,
};

/* Best-effort Mac chip detection via the GPU renderer string. */
function detectMacChip(): "arm" | "intel" | null {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return null;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = ext
      ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))
      : "";
    if (/intel|amd|radeon/i.test(renderer)) return "intel";
    if (/apple/i.test(renderer)) return "arm";
  } catch {
    /* ignore — fall back to default */
  }
  return null;
}

/* ---------- download buttons ---------- */
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M16.365 1.43c0 1.14-.42 2.2-1.12 3-.75.86-1.98 1.52-3.02 1.44-.13-1.09.44-2.24 1.11-2.98.76-.85 2.05-1.48 3.03-1.46zM20.5 17.02c-.55 1.27-.82 1.84-1.53 2.96-.99 1.56-2.39 3.5-4.12 3.51-1.54.02-1.94-1.01-4.03-1-2.09.01-2.53 1.02-4.07 1-1.73-.02-3.05-1.77-4.04-3.33C.02 17.9-.28 13.6 1.4 11.32c1.19-1.62 3.07-2.57 4.83-2.57 1.8 0 2.93 1 4.42 1 1.44 0 2.32-1 4.4-1 1.58 0 3.25.86 4.44 2.35-3.9 2.14-3.27 7.71.61 9.02z" />
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M0 3.45 9.75 2.1v9.4H0zM10.95 1.93 24 0v11.4H10.95zM0 12.6h9.75V22L0 20.66zM10.95 12.6H24V24l-13.05-1.82z" />
    </svg>
  );
}

function DownloadButtons() {
  // Default to Apple Silicon (works without JS); refine once we detect the chip.
  const [macHref, setMacHref] = useState(DL.macArm);
  const [chip, setChip] = useState<"arm" | "intel" | null>(null);

  useEffect(() => {
    const detected = detectMacChip();
    if (detected === "intel") {
      setChip("intel");
      setMacHref(DL.macIntel);
    } else if (detected === "arm") {
      setChip("arm");
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <a
          href={macHref}
          className="flex w-64 items-center justify-center gap-3 rounded-xl bg-white px-7 py-3.5 text-base font-extrabold text-slate-900 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/10 active:translate-y-0 sm:w-auto"
        >
          <AppleIcon />
          Download for Mac
        </a>

        <a
          href={DL.win}
          className="group relative flex w-64 items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-7 py-3.5 text-base font-extrabold text-white shadow-lg shadow-fuchsia-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-fuchsia-500/40 active:translate-y-0 sm:w-auto"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <WindowsIcon />
          Download for Windows
        </a>
      </div>

      {/* Mac arch fallback — the button auto-picks, this lets people override */}
      <p className="text-xs font-medium text-slate-500">
        Mac build:{" "}
        <a
          href={DL.macArm}
          className={`underline-offset-2 hover:text-slate-300 hover:underline ${
            chip !== "intel" ? "text-slate-300" : ""
          }`}
        >
          Apple Silicon
        </a>{" "}
        ·{" "}
        <a
          href={DL.macIntel}
          className={`underline-offset-2 hover:text-slate-300 hover:underline ${
            chip === "intel" ? "text-slate-300" : ""
          }`}
        >
          Intel
        </a>
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07070c] text-slate-100">
      {/* backdrop layers */}
      <div className="paper-grid absolute inset-0" />
      <div className="absolute left-1/2 top-[-10%] -z-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.18),transparent_60%)]" />
      <div className="absolute bottom-[-10%] right-[-5%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(217,70,239,0.14),transparent_60%)]" />

      {/* line doodles */}
      <Doodle className="left-[9%] top-[22%]" delay={0.5}>
        <svg width="90" height="60" viewBox="0 0 90 60">
          {/* sine wave */}
          <path d="M4 30 Q 15 4 26 30 T 48 30 T 70 30 T 86 30" {...stroke} />
        </svg>
      </Doodle>
      <Doodle className="right-[10%] top-[20%]" delay={0.8}>
        <svg width="72" height="72" viewBox="0 0 72 72">
          {/* orbit / atom */}
          <ellipse cx="36" cy="36" rx="30" ry="12" {...stroke} />
          <ellipse cx="36" cy="36" rx="12" ry="30" {...stroke} />
          <circle cx="36" cy="36" r="4" fill="currentColor" stroke="none" />
        </svg>
      </Doodle>
      <Doodle className="left-[13%] bottom-[20%]" delay={1.1}>
        <svg width="80" height="60" viewBox="0 0 80 60">
          {/* right triangle w/ angle */}
          <path d="M10 50 L70 50 L10 8 Z" {...stroke} />
          <path d="M22 50 A 12 12 0 0 0 10 38" {...stroke} strokeWidth={1.8} />
        </svg>
      </Doodle>
      <Doodle className="right-[13%] bottom-[22%]" delay={1.3}>
        <svg width="84" height="44" viewBox="0 0 84 44">
          {/* E = mc^2 style squiggle underline of an equation */}
          <path d="M6 22 h20 M6 12 h16 M6 32 h16" {...stroke} strokeWidth={2} />
          <path d="M40 30 q 10 -20 20 0" {...stroke} />
          <path d="M66 8 l8 8 M74 8 l-8 8" {...stroke} strokeWidth={2} />
        </svg>
      </Doodle>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        {/* badge */}
        <span className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-bold text-indigo-200 backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          Now on Mac &amp; Windows
        </span>

        <HaloMark />

        <h1 className="mt-16 text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl">
          Meet{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent">
            Halo
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-lg font-semibold text-slate-300 sm:text-xl">
          An AI tutor that lives on your screen —{" "}
          <span className="relative whitespace-nowrap text-white">
            it draws problems out
            <svg
              className="absolute -bottom-2 left-0 w-full text-indigo-400"
              viewBox="0 0 220 12"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8 Q 55 2 110 7 T 218 5"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="1000"
                className="animate-draw-in"
              />
            </svg>
          </span>{" "}
          and actually explains them.
        </p>

        <div className="mt-12">
          <DownloadButtons />
        </div>

        <p className="mt-6 text-sm font-medium text-slate-500">
          Free to try · No sign-up · macOS 12+ and Windows 10+
        </p>
      </div>

      <footer className="relative z-10 pb-8 text-center text-sm font-medium text-slate-600">
        © {new Date().getFullYear()} Halo
      </footer>
    </main>
  );
}

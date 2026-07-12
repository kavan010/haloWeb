/* ---------- Halo mark: a clean, static halo ring over a dark core ---------- */
function HaloMark({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* soft ambient glow */}
      <div className="absolute inset-0 -z-10 scale-[1.6] animate-breathe rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.35),transparent_65%)] blur-2xl" />

      {/* outer ring with a slowly rotating gradient sheen */}
      <div className="relative flex h-full w-full items-center justify-center rounded-full">
        <div className="absolute inset-0 animate-spin-slow rounded-full [background:conic-gradient(from_0deg,rgba(129,140,248,0.9),rgba(56,189,248,0.15),rgba(129,140,248,0.9))] [mask:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-2px))]" />
        <div className="absolute inset-[6px] rounded-full ring-1 ring-white/10" />

        {/* dark glossy core */}
        <div className="relative h-[62%] w-[62%] rounded-full bg-gradient-to-br from-slate-800 via-slate-900 to-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),inset_0_-12px_24px_rgba(0,0,0,0.7)]">
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
          {/* inner light point */}
          <div className="absolute left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#c7d2fe,#6366f1_55%,#4338ca_90%)] shadow-[0_0_28px_rgba(99,102,241,0.7)]" />
          {/* top sheen */}
          <div className="pointer-events-none absolute left-[22%] top-[16%] h-[16%] w-[44%] -rotate-[18deg] rounded-full bg-white/15 blur-md" />
        </div>
      </div>
    </div>
  );
}

/* ---------- installer downloads (hosted on GitHub Releases) ---------- */
const REPO = "kavan010/haloWeb";
const VERSION = "v1.0.0";
const RELEASE = `https://github.com/${REPO}/releases/download/${VERSION}`;
// Universal DMG runs on both Apple Silicon and Intel; single Windows installer.
const DL = {
  mac: `${RELEASE}/HALO-1.0.0-universal.dmg`,
  win: `${RELEASE}/HALO-Setup-1.0.0.exe`,
};

/* ---------- icons ---------- */
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden>
      <path d="M16.365 1.43c0 1.14-.42 2.2-1.12 3-.75.86-1.98 1.52-3.02 1.44-.13-1.09.44-2.24 1.11-2.98.76-.85 2.05-1.48 3.03-1.46zM20.5 17.02c-.55 1.27-.82 1.84-1.53 2.96-.99 1.56-2.39 3.5-4.12 3.51-1.54.02-1.94-1.01-4.03-1-2.09.01-2.53 1.02-4.07 1-1.73-.02-3.05-1.77-4.04-3.33C.02 17.9-.28 13.6 1.4 11.32c1.19-1.62 3.07-2.57 4.83-2.57 1.8 0 2.93 1 4.42 1 1.44 0 2.32-1 4.4-1 1.58 0 3.25.86 4.44 2.35-3.9 2.14-3.27 7.71.61 9.02z" />
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden>
      <path d="M0 3.45 9.75 2.1v9.4H0zM10.95 1.93 24 0v11.4H10.95zM0 12.6h9.75V22L0 20.66zM10.95 12.6H24V24l-13.05-1.82z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.31-.54-1.53.12-3.19 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.19.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

/* ---------- download buttons ---------- */
function DownloadButtons() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <a
          href={DL.mac}
          className="flex w-64 items-center justify-center gap-2.5 rounded-lg bg-white px-6 py-3 text-[15px] font-semibold text-slate-900 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_8px_24px_rgba(0,0,0,0.35)] transition-colors hover:bg-slate-100 sm:w-auto"
        >
          <AppleIcon />
          Download for Mac
        </a>

        <a
          href={DL.win}
          className="flex w-64 items-center justify-center gap-2.5 rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3 text-[15px] font-semibold text-slate-100 transition-colors hover:border-white/25 hover:bg-white/[0.08] sm:w-auto"
        >
          <WindowsIcon />
          Download for Windows
        </a>
      </div>

      <p className="text-[13px] text-slate-500">
        Universal build · runs on Apple Silicon &amp; Intel
      </p>

      {/* Honest note: the build isn't notarized yet, so first-run needs an unblock */}
      <details className="group mt-1 w-full max-w-md text-left">
        <summary className="cursor-pointer list-none text-[13px] text-slate-500 transition-colors hover:text-slate-300">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-slate-600 transition-transform group-open:rotate-90">
              ›
            </span>
            macOS says the app is &ldquo;damaged&rdquo;?
          </span>
        </summary>
        <div className="mt-3 rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 text-[13px] leading-relaxed text-slate-400">
          <p>
            HALO isn&rsquo;t notarized by Apple yet, so Gatekeeper blocks it on
            first launch. Move HALO to Applications, then run this once in
            Terminal:
          </p>
          <code className="mt-3 block overflow-x-auto rounded-md bg-black/40 px-3 py-2 font-mono text-[12px] text-slate-200 ring-1 ring-inset ring-white/10">
            xattr -dr com.apple.quarantine /Applications/HALO.app
          </code>
        </div>
      </details>
    </div>
  );
}

/* ---------- feature row ---------- */
const features = [
  {
    title: "Sees your screen",
    body: "Halo reads what you're working on — a problem set, a diagram, a slide — and follows along in real time.",
  },
  {
    title: "Works it out visually",
    body: "Instead of a wall of text, it sketches steps and annotations directly over your work so the logic is clear.",
  },
  {
    title: "Explains, not just answers",
    body: "Ask a follow-up and Halo breaks the reasoning down until it actually clicks. No sign-up required.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06070a] text-slate-100">
      {/* backdrop */}
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-[-14rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(79,70,229,0.16),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline" />

      {/* nav */}
      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <HaloMark className="h-7 w-7" />
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Halo
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`https://github.com/${REPO}`}
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white sm:flex"
          >
            <GithubIcon />
            GitHub
          </a>
          <a
            href="#download"
            className="rounded-lg bg-white/[0.06] px-3.5 py-2 text-sm font-medium text-slate-200 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.1]"
          >
            Download
          </a>
        </div>
      </header>

      {/* hero */}
      <section className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pt-16 text-center sm:pt-24">
        <span className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] font-medium text-slate-300 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          Now available on macOS &amp; Windows
        </span>

        <HaloMark className="h-28 w-28 animate-fade-up" />

        <h1 className="mt-12 text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl">
          The AI tutor that
          <br className="hidden sm:block" /> lives on your screen
        </h1>

        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-slate-400 sm:text-lg">
          Halo sees what you&rsquo;re working on, works problems out visually,
          and explains them step by step &mdash; right where you need it.
        </p>

        <div id="download" className="mt-10 scroll-mt-24">
          <DownloadButtons />
        </div>

        <p className="mt-6 text-[13px] text-slate-500">
          Free to try · No account needed · macOS 12+ and Windows 10+
        </p>
      </section>

      {/* features */}
      <section className="relative z-10 mx-auto mt-28 max-w-5xl px-6 sm:mt-36">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#08090d] p-7 transition-colors hover:bg-[#0b0c12]"
            >
              <h3 className="text-[15px] font-semibold text-white">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* footer */}
      <footer className="relative z-10 mx-auto mt-28 max-w-6xl px-6 pb-10 sm:mt-36">
        <div className="mb-8 h-px w-full hairline" />
        <div className="flex flex-col items-center justify-between gap-4 text-[13px] text-slate-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <HaloMark className="h-5 w-5" />
            <span className="font-medium text-slate-400">Halo</span>
          </div>
          <span>© {new Date().getFullYear()} Halo. All rights reserved.</span>
          <a
            href={`https://github.com/${REPO}`}
            className="flex items-center gap-2 transition-colors hover:text-slate-300"
          >
            <GithubIcon />
            GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}

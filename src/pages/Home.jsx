import { Link } from "react-router-dom";
import Header from "../components/Header";

const tools = [
  {
    to: "/jpg-compressor",
    label: "JPG",
    title: "JPG Compressor",
    description: "Shrink JPG and JPEG images while keeping them looking sharp.",
    color: "from-orange-500 to-rose-500",
    icon: "▧",
    category: "Compress",
  },
  {
    to: "/png-compressor",
    label: "PNG",
    title: "PNG Compressor",
    description: "Reduce PNG file sizes for websites, forms and sharing.",
    color: "from-sky-500 to-blue-600",
    icon: "◈",
    category: "Compress",
  },
  {
    to: "/webp-compressor",
    label: "WEBP",
    title: "WebP Compressor",
    description: "Make WebP images lighter for a faster, smoother workflow.",
    color: "from-emerald-500 to-teal-600",
    icon: "◉",
    category: "Compress",
  },
  {
    to: "/jpg-to-webp",
    label: "JPG →",
    title: "JPG to WebP",
    description: "Convert JPG images to the modern WebP format.",
    color: "from-violet-500 to-purple-600",
    icon: "⇄",
    category: "Convert",
  },
  {
    to: "/png-to-webp",
    label: "PNG →",
    title: "PNG to WebP",
    description: "Convert PNG files into web-friendly WebP images.",
    color: "from-fuchsia-500 to-pink-600",
    icon: "⇆",
    category: "Convert",
  },
  {
    to: "/image-resizer",
    label: "SIZE",
    title: "Image Resizer",
    description: "Resize images to the dimensions you actually need.",
    color: "from-amber-500 to-orange-600",
    icon: "⤢",
    category: "Resize",
  },
  {
    to: "/compress-to-kb",
    label: "KB",
    title: "Compress to KB",
    description: "Aim for a target file size such as 50 KB, 100 KB or 200 KB.",
    color: "from-indigo-500 to-blue-600",
    icon: "↓",
    category: "Compress",
  },
];

function ArrowIcon({ className = "h-5 w-5" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleIcon({ className = "h-5 w-5" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="m12 3 2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen overflow-hidden bg-white text-slate-900">
        {/* HERO */}
        <section className="relative isolate overflow-hidden border-b border-violet-100 bg-[radial-gradient(ellipse_at_top_left,_rgba(221,214,254,0.65),_transparent_42%),radial-gradient(ellipse_at_top_right,_rgba(191,219,254,0.55),_transparent_38%),linear-gradient(to_bottom,_#faf8ff,_#ffffff_78%)]">
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-48 -z-10 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 -z-10 h-96 w-96 rounded-full bg-violet-300/40 blur-3xl" />

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-10 lg:py-24">
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/90 px-4 py-2 text-xs font-bold text-violet-700 shadow-sm shadow-violet-900/5">
                <SparkleIcon className="h-4 w-4" />
                YOUR ALL-IN-ONE IMAGE TOOLKIT
              </div>

              <h1
                className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl"
                style={{ color: "#0f172a", opacity: 1, WebkitTextFillColor: "#0f172a" }}
              >
                Make Images Smaller.
                <span
                  className="mt-2 block bg-gradient-to-r from-violet-700 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                  style={{ WebkitTextFillColor: "transparent" }}
                >
                  Keep Them Beautiful.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Compress, convert and resize images with simple online tools. Get lighter image files in just a few clicks—without a complicated workflow.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/compress-to-kb"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-extrabold text-white no-underline shadow-lg shadow-violet-600/25 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-600/30 focus:outline-none focus:ring-4 focus:ring-violet-200"
                >
                  Start compressing <ArrowIcon />
                </Link>
                <a
                  href="#image-tools"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 no-underline shadow-sm transition hover:border-violet-200 hover:bg-violet-50 focus:outline-none focus:ring-4 focus:ring-violet-100"
                >
                  Explore all tools
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-slate-600">
                <span className="inline-flex items-center gap-2"><span className="text-emerald-600"><CheckIcon /></span> Free to use</span>
                <span className="inline-flex items-center gap-2"><span className="text-emerald-600"><CheckIcon /></span> JPG, PNG & WebP</span>
                <span className="inline-flex items-center gap-2"><span className="text-emerald-600"><CheckIcon /></span> Easy workflow</span>
              </div>

              <div className="mt-9 flex items-center gap-3 border-t border-violet-100 pt-6">
                <div className="flex -space-x-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-violet-100 text-xs font-extrabold text-violet-700">JPG</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-[10px] font-extrabold text-blue-700">PNG</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-emerald-100 text-[9px] font-extrabold text-emerald-700">WEBP</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Everyday image tasks, made easier</p>
                  <p className="mt-0.5 text-xs text-slate-500">Compression · Conversion · Resizing</p>
                </div>
              </div>
            </div>

            {/* VISUAL TOOL PREVIEW */}
            <div className="relative mx-auto w-full max-w-lg">
              <div aria-hidden="true" className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-300/60 via-purple-200/30 to-blue-200/60 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/90 bg-white/95 p-4 shadow-[0_30px_90px_rgba(76,29,149,0.16)] backdrop-blur sm:p-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">Pixnora workspace</p>
                    <p className="mt-1 text-xs text-slate-500">A simpler way to work with images</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-500/25">
                    <SparkleIcon className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-dashed border-violet-200 bg-gradient-to-br from-violet-50 via-white to-blue-50 p-6 text-center sm:p-8">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-md shadow-violet-900/5 ring-1 ring-violet-100">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-8 w-8">
                      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.7" />
                      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.7" />
                      <path d="m21 15-5-5L5 21" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 className="mt-4 text-lg font-extrabold text-slate-900">What would you like to do?</h2>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-600">
                    Choose a tool to reduce file size, convert formats or resize an image.
                  </p>
                  <Link to="/compress-to-kb" className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white no-underline transition hover:bg-violet-700">
                    Open image compressor <ArrowIcon className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { name: "Compress", to: "/jpg-compressor", icon: "↓", tint: "text-violet-700 bg-violet-50" },
                    { name: "Resize", to: "/image-resizer", icon: "⤢", tint: "text-blue-700 bg-blue-50" },
                    { name: "Convert", to: "/jpg-to-webp", icon: "⇄", tint: "text-emerald-700 bg-emerald-50" },
                  ].map((item) => (
                    <Link key={item.name} to={item.to} className="rounded-xl border border-slate-100 bg-white p-3 text-center no-underline transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md">
                      <span className={`mx-auto flex h-9 w-9 items-center justify-center rounded-xl text-xl font-bold ${item.tint}`}>{item.icon}</span>
                      <span className="mt-2 block text-xs font-bold text-slate-700">{item.name}</span>
                    </Link>
                  ))}
                </div>
                <p className="mt-4 text-center text-[11px] font-medium tracking-wide text-slate-400">JPG · PNG · WEBP · RESIZE</p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST / BENEFITS */}
        <section className="border-b border-slate-100 bg-white px-5 py-7 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
            {[
              ["01", "Simple to use", "Straightforward tools with a clean workflow."],
              ["02", "Flexible image tools", "Compress, convert and resize in one place."],
              ["03", "Made for everyday tasks", "Useful for websites, sharing and uploads."],
            ].map(([number, title, description]) => (
              <div key={number} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 text-xs font-extrabold text-violet-700">{number}</span>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">{title}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TOOLS */}
        <section id="image-tools" className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-11 max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-violet-700">
                <SparkleIcon className="h-3.5 w-3.5" /> Explore Pixnora
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">The right tool for every image</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Pick a tool and get straight to work. No clutter, just practical image utilities for everyday needs.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <Link
                  key={tool.to}
                  to={tool.to}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 no-underline shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_20px_50px_rgba(76,29,149,0.10)] focus:outline-none focus:ring-4 focus:ring-violet-100"
                >
                  <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-50 opacity-0 blur-2xl transition group-hover:opacity-100" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.color} text-lg font-extrabold text-white shadow-md`}>
                      {tool.icon}
                    </div>
                    <span className="rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">{tool.category}</span>
                  </div>
                  <h3 className="relative mt-6 text-lg font-extrabold tracking-tight text-slate-900">{tool.title}</h3>
                  <p className="relative mt-2 min-h-[3rem] text-sm leading-6 text-slate-600">{tool.description}</p>
                  <div className="relative mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-violet-700">
                    Open tool <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURE PANEL */}
        <section className="px-5 pb-16 sm:px-8 lg:px-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-blue-50 p-7 sm:p-10 lg:p-12">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />
            <div className="relative grid gap-9 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-violet-700">Built for a smoother workflow</span>
                <h2 className="mt-3 max-w-xl text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Your image workflow, without the hassle.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  Pixnora brings image compression, format conversion and resizing together in one easy-to-use experience. Choose the tool you need and get started in a few clicks.
                </p>
                <Link to="/jpg-compressor" className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-violet-700 no-underline hover:text-violet-900">
                  Try an image tool <ArrowIcon className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["01", "Image compression", "Reduce file size with supported tools."],
                  ["02", "Format conversion", "Switch JPG or PNG images to WebP."],
                  ["03", "Flexible sizing", "Resize images or target a file size."],
                  ["04", "Simple experience", "Clear steps from upload to download."],
                ].map(([number, title, description]) => (
                  <div key={number} className="rounded-2xl border border-white/90 bg-white/85 p-4 shadow-sm shadow-violet-900/5 backdrop-blur">
                    <span className="text-xs font-extrabold text-violet-700">{number}</span>
                    <h3 className="mt-2 text-sm font-extrabold text-slate-900">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-600">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* POPULAR LINKS */}
        <section className="px-5 pb-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-950">Popular image tools</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Jump directly to the tool you need.</p>
              </div>
              <span className="text-xs font-semibold text-slate-400">7 useful tools</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {[
                ["JPG Compressor", "/jpg-compressor"],
                ["PNG Compressor", "/png-compressor"],
                ["WebP Compressor", "/webp-compressor"],
                ["JPG to WebP", "/jpg-to-webp"],
                ["PNG to WebP", "/png-to-webp"],
                ["Image Resizer", "/image-resizer"],
                ["Compress to KB", "/compress-to-kb"],
              ].map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 no-underline transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800"
                >
                  {label} <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

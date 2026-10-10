import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "Compressor", to: "/jpg-compressor" },
  { label: "JPG", to: "/jpg-compressor" },
  { label: "PNG", to: "/png-compressor" },
  { label: "WebP", to: "/webp-compressor" },
  { label: "Resizer", to: "/image-resizer" },
  { label: "Specific KB", to: "/compress-to-kb" },
];

function PixnoraLogoMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="none"
      className="h-10 w-10 shrink-0 sm:h-11 sm:w-11"
    >
      <defs>
        <linearGradient id="pixnora-mark-bg" x1="4" y1="3" x2="43" y2="46">
          <stop offset="0" stopColor="#A855F7" />
          <stop offset=".52" stopColor="#6D28D9" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="pixnora-mark-glow" x1="12" y1="11" x2="37" y2="37">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#C4B5FD" />
        </linearGradient>
      </defs>

      <rect x="1" y="1" width="46" height="46" rx="15" fill="url(#pixnora-mark-bg)" />
      <path
        d="M10 31.5V16.2c0-2.3 1.8-4.2 4.2-4.2h8.2c7.5 0 12 3.8 12 10.2 0 6.2-4.5 10-12 10h-5.2V38H10v-6.5Z"
        fill="white"
        fillOpacity=".14"
      />
      <circle cx="17" cy="16.5" r="3.1" fill="white" />
      <path
        d="M7.5 35.5 17.5 24l5.1 5.4 7.3-9.1 10.6 12.5V36a4 4 0 0 1-4 4H11.5a4 4 0 0 1-4-4v-.5Z"
        fill="url(#pixnora-mark-glow)"
      />
      <path
        d="m7.5 35.5 10-11.5 5.1 5.4 7.3-9.1 10.6 12.5"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="35.5" y="4" width="5" height="5" rx="1.5" fill="#67E8F9" />
      <rect x="40.5" y="10.5" width="3.5" height="3.5" rx="1" fill="#DDD6FE" />
    </svg>
  );
}

function PixnoraWordmark() {
  return (
    <span className="flex min-w-0 flex-col">
      <span className="whitespace-nowrap text-[25px] font-black leading-[0.95] tracking-[-1.2px] sm:text-[28px]">
        <span className="text-slate-950">Pix</span>
        <span className="bg-gradient-to-r from-fuchsia-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
          nora
        </span>
      </span>
      <span className="mt-1.5 hidden text-[8px] font-bold uppercase tracking-[0.19em] text-slate-400 sm:block">
        Image tools, simplified
      </span>
    </span>
  );
}

function MenuIcon({ open }) {
  return open ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1800px] items-center justify-between gap-4 px-4 sm:px-6 lg:min-h-[80px] lg:px-10 xl:px-16 2xl:px-20">
        <Link
          to="/"
          onClick={closeMenu}
          aria-label="Pixnora homepage"
          className="group inline-flex min-w-0 items-center gap-2.5 no-underline"
        >
          <PixnoraLogoMark />
          <PixnoraWordmark />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item, index) => (
            <NavLink
              key={`${item.label}-${index}`}
              to={item.to}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2.5 text-[13px] font-semibold no-underline transition xl:px-3.5 ${
                  isActive
                    ? "bg-violet-50 text-violet-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-violet-700"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 lg:hidden"
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 shadow-lg lg:hidden sm:px-6"
        >
          <div className="mx-auto grid w-full max-w-[1800px] grid-cols-2 gap-2">
            {navItems.map((item, index) => (
              <NavLink
                key={`${item.label}-${index}`}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold no-underline transition ${
                    isActive
                      ? "bg-violet-50 text-violet-700"
                      : "bg-slate-50 text-slate-700 hover:bg-violet-50 hover:text-violet-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

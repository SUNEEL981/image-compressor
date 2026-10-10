
import { Link } from "react-router-dom";

const toolLinks = [
  { to: "/jpg-compressor", label: "JPG Image Compressor" },
  { to: "/png-compressor", label: "PNG Image Compressor" },
  { to: "/webp-compressor", label: "WebP Image Compressor" },
  { to: "/jpg-to-webp", label: "JPG to WebP Converter" },
  { to: "/png-to-webp", label: "PNG to WebP Converter" },
  { to: "/image-resizer", label: "Image Resizer" },
  { to: "/compress-to-kb", label: "Compress Image to Specific KB" },
];

const companyLinks = [
  { to: "/about", label: "About Pixnora" },
  { to: "/contact", label: "Contact Us" },
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Use" },
];

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-violet-100 bg-gradient-to-b from-white via-violet-50/70 to-blue-50/80">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-violet-300/20 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        {/* Footer content */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.8fr] lg:gap-16">
          {/* Brand */}
          <div className="min-w-0">
            <Link
              to="/"
              aria-label="Pixnora home"
              className="inline-flex items-center gap-3 no-underline"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-xl font-black text-white shadow-lg shadow-violet-200">
                P
              </span>

              <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                Pix<span className="text-violet-600">nora</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
              Free, fast and privacy-friendly online image compression,
              conversion and resizing tools. Optimize your images in a few
              simple steps.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Simple tools. Better images.
            </div>
          </div>

          {/* Image Tools */}
          <nav aria-label="Image tools" className="min-w-0">
            <h2 className="mb-5 text-sm font-extrabold uppercase tracking-[0.14em] text-slate-900">
              Image Tools
            </h2>

            <ul className="space-y-3">
              {toolLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex max-w-full items-start gap-2 text-sm leading-6 text-slate-600 no-underline transition-colors duration-200 hover:text-violet-700"
                  >
                    <span className="mt-0.5 text-violet-500" aria-hidden="true">
                      →
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company information" className="min-w-0">
            <h2 className="mb-5 text-sm font-extrabold uppercase tracking-[0.14em] text-slate-900">
              Company
            </h2>

            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex items-start gap-2 text-sm leading-6 text-slate-600 no-underline transition-colors duration-200 hover:text-violet-700"
                  >
                    <span className="mt-0.5 text-violet-500" aria-hidden="true">
                      →
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-violet-200/70 pt-6 text-center sm:mt-14 sm:flex-row sm:text-left">
          <p className="m-0 text-xs leading-6 text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} Pixnora. All rights reserved.
          </p>

          <Link
            to="/"
            className="text-xs font-semibold text-violet-700 no-underline transition-colors hover:text-blue-700 sm:text-sm"
          >
            Made for easier image optimization ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}

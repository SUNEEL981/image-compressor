
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const CONTACT_TOOLS = [
  {
    to: "/jpg-compressor",
    title: "JPG Image Compressor",
    description: "Compress JPG and JPEG images online.",
    icon: "JPG",
  },
  {
    to: "/png-compressor",
    title: "PNG Image Compressor",
    description: "Reduce PNG image file sizes.",
    icon: "PNG",
  },
  {
    to: "/webp-compressor",
    title: "WebP Image Compressor",
    description: "Optimize WebP images for the web.",
    icon: "WEBP",
  },
  {
    to: "/image-resizer",
    title: "Image Resizer",
    description: "Resize images to custom dimensions.",
    icon: "SIZE",
  },
];

const CONTACT_REASONS = [
  {
    icon: "?",
    title: "Questions",
    description: "Ask us about using Pixnora and its image tools.",
  },
  {
    icon: "!",
    title: "Report a problem",
    description: "Tell us if a tool is not working as expected.",
  },
  {
    icon: "✦",
    title: "Suggestions",
    description: "Share ideas that could make Pixnora better.",
  },
];

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Pixnora | Image Compression Support";

    const description =
      "Contact Pixnora for questions, suggestions, feedback or problems with our online image compression, conversion and resizing tools.";

    let metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute("content", description);

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute(
      "href",
      "https://pixnora.devs.surf/contact"
    );
  }, []);

  return (
    <>
      <Header />

      <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-violet-50/70 via-white to-blue-50/50 text-slate-900">
        {/* Background accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[min(90%,900px)] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-200/40 via-blue-100/40 to-purple-200/40 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          {/* HERO */}
          <section className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-violet-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-500" />
              Get in touch
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Contact{" "}
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-500 bg-clip-text text-transparent">
                Pixnora
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Have a question, suggestion or found a problem? We would
              love to hear from you. Your feedback helps us improve
              Pixnora and make our image tools more useful.
            </p>
          </section>

          {/* CONTACT CARD */}
          <section className="mx-auto mt-10 w-full max-w-3xl sm:mt-12">
            <div className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-[0_24px_80px_rgba(91,33,182,0.09)]">
              <div className="border-b border-violet-100 bg-gradient-to-r from-violet-50 via-white to-blue-50 p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-lg shadow-violet-200">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-6 w-6"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="3"
                      />
                      <path
                        d="m4 7 8 6 8-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-extrabold text-slate-950 sm:text-xl">
                      Email Support
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      For questions, feedback, suggestions or technical
                      problems, contact us by email.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
                  Support email
                </p>

                {/* Replace this placeholder with your real email */}
                <a
                  href="mailto:support@yourdomain.com"
                  className="mt-3 block w-full break-all rounded-xl border border-violet-100 bg-violet-50/60 px-4 py-4 text-sm font-bold text-slate-800 no-underline transition hover:border-violet-300 hover:bg-violet-50 sm:text-base"
                >
                  support@yourdomain.com
                </a>

                <p className="mt-3 text-xs leading-6 text-slate-500">
                  Replace this placeholder with your actual Pixnora
                  support email before publishing the website.
                </p>

                <a
                  href="mailto:support@yourdomain.com"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3.5 text-sm font-bold text-white no-underline shadow-md shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
                >
                  Send us an email
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </section>

          {/* CONTACT REASONS */}
          <section className="mx-auto mt-10 w-full max-w-3xl sm:mt-12">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {CONTACT_REASONS.map((reason) => (
                <article
                  key={reason.title}
                  className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 text-lg font-extrabold text-violet-700">
                    {reason.icon}
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-slate-900">
                    {reason.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {reason.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* IMAGE TOOLS */}
          <section className="mx-auto mt-14 w-full max-w-3xl sm:mt-16">
            <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-violet-600">
                  Pixnora Tools
                </p>

                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                  Try our image tools
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-600">
                  Explore our tools to compress and resize images for
                  your everyday needs.
                </p>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CONTACT_TOOLS.map((tool) => (
                  <Link
                    key={tool.to}
                    to={tool.to}
                    className="group flex min-h-[76px] items-center gap-3 rounded-xl border border-slate-100 bg-gradient-to-r from-white to-violet-50/40 p-4 no-underline transition hover:border-violet-200 hover:shadow-md hover:shadow-violet-100/50"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 px-1 text-[10px] font-extrabold text-violet-700">
                      {tool.icon}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-slate-900 transition-colors group-hover:text-violet-700">
                        {tool.title}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">
                        {tool.description}
                      </span>
                    </span>

                    <span className="shrink-0 text-lg text-violet-400 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* PRIVACY POLICY */}
          <section className="mx-auto max-w-3xl pb-4 pt-10 text-center">
            <p className="text-sm leading-7 text-slate-500">
              Have questions about how your information is handled?
              {" "}
              <Link
                to="/privacy-policy"
                className="font-bold text-violet-700 underline decoration-violet-200 underline-offset-4 transition hover:text-blue-700"
              >
                Read our Privacy Policy
              </Link>
              .
            </p>
          </section>

          {/* BOTTOM BRAND ACCENT */}
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-violet-600 to-blue-500" />
        </div>
      </main>
    </>
  );
}

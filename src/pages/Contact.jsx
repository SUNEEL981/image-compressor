``
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const CONTACT_EMAIL = "yadavsuneel48282@gmail.com";

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

function SectionHeading({ eyebrow, children, description }) {
  return (
    <div className="mb-7">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-violet-700">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-black tracking-tight !text-slate-950 sm:text-3xl">
        {children}
      </h2>

      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-7 !text-slate-600 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function MailIcon({ className = "h-6 w-6" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export default function Contact() {
  useEffect(() => {
    const previousTitle = document.title;

    const description =
      "Contact Pixnora for questions, suggestions, feedback or problems with our online image compression, conversion and resizing tools.";

    document.title = "Contact Pixnora | Image Compression Support";

    let metaDescription = document.querySelector(
      'meta[name="description"]'
    );
    const createdMeta = !metaDescription;

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    const previousDescription = metaDescription.getAttribute("content");
    metaDescription.setAttribute("content", description);

    let canonical = document.querySelector('link[rel="canonical"]');
    const createdCanonical = !canonical;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    const previousCanonical = canonical.getAttribute("href");

    canonical.setAttribute(
      "href",
      "https://pixnora.devs.surf/contact"
    );

    return () => {
      document.title = previousTitle;

      if (createdMeta) {
        metaDescription.remove();
      } else if (previousDescription !== null) {
        metaDescription.setAttribute("content", previousDescription);
      }

      if (createdCanonical) {
        canonical.remove();
      } else if (previousCanonical !== null) {
        canonical.setAttribute("href", previousCanonical);
      }
    };
  }, []);

  return (
    <>
      <Header />

      <main className="relative isolate min-h-screen w-full overflow-x-clip bg-gradient-to-b from-violet-50 via-white to-sky-50 text-slate-900">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] overflow-hidden"
        >
          <div className="absolute left-1/2 top-[-150px] h-[400px] w-[min(90%,900px)] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-300/40 via-blue-200/40 to-purple-300/40 blur-3xl" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          {/* Hero */}
          <section className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-violet-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Get in touch
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight !text-slate-950 sm:text-5xl lg:text-6xl">
              Contact{" "}
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-500 bg-clip-text text-transparent">
                Pixnora
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 !text-slate-600 sm:text-base sm:leading-8">
              Have a question, suggestion or found a problem? We would
              love to hear from you. Your feedback helps us improve
              Pixnora and make our image tools more useful.
            </p>
          </section>

          {/* Main contact section */}
          <section className="mx-auto mt-10 grid w-full max-w-5xl gap-6 lg:mt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            {/* Email card */}
            <div className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-xl shadow-violet-950/[0.06]">
              <div className="border-b border-violet-100 bg-gradient-to-r from-violet-50 via-white to-sky-50 p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-lg shadow-violet-500/20">
                    <MailIcon />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-black !text-slate-950 sm:text-2xl">
                      Email Support
                    </h2>

                    <p className="mt-2 text-sm leading-7 !text-slate-600">
                      Contact us for questions, feedback, suggestions
                      or technical problems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="text-xs font-extrabold uppercase tracking-wider text-violet-700">
                  Contact email
                </p>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-3 block w-full min-w-0 break-all rounded-2xl border border-violet-100 bg-violet-50/70 px-4 py-4 text-sm font-extrabold !text-violet-800 no-underline transition hover:border-violet-300 hover:bg-violet-50 sm:text-base"
                >
                  {CONTACT_EMAIL}
                </a>

                <p className="mt-3 text-sm leading-6 !text-slate-600">
                  Click the email address to open your default email app.
                  You can also use the button below.
                </p>

                <div className="mt-auto pt-6">
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                      "Pixnora Support"
                    )}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3.5 text-sm font-extrabold text-white no-underline shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:from-violet-700 hover:to-blue-700 hover:shadow-xl sm:w-auto"
                  >
                    <MailIcon className="h-4 w-4" />
                    Send us an email
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Reasons to contact */}
            <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-violet-950/[0.04] sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-violet-700">
                How can we help?
              </p>

              <h2 className="mt-3 text-2xl font-black !text-slate-950">
                We're here to help
              </h2>

              <p className="mt-3 text-sm leading-7 !text-slate-600">
                Choose the topic that best describes your message.
              </p>

              <div className="mt-6 space-y-3">
                {CONTACT_REASONS.map((reason) => (
                  <article
                    key={reason.title}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-violet-200 hover:bg-violet-50/60"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 text-lg font-black text-violet-800">
                      {reason.icon}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-extrabold !text-slate-950">
                        {reason.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 !text-slate-600">
                        {reason.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-auto pt-6">
                <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>

                  <p className="text-xs leading-6 text-emerald-900">
                    Pixnora processes images in your browser. Please
                    don't email sensitive personal documents unless
                    necessary for your support request.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Related tools */}
          <section className="mx-auto mt-16 w-full max-w-5xl lg:mt-20">
            <SectionHeading
              eyebrow="Pixnora tools"
              description="Explore our free online tools for everyday image tasks."
            >
              Try our image tools
            </SectionHeading>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CONTACT_TOOLS.map((tool) => (
                <Link
                  key={tool.to}
                  to={tool.to}
                  className="group flex min-w-0 items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 no-underline shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-950/5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 px-1 text-[10px] font-black text-violet-800">
                    {tool.icon}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block break-words text-sm font-extrabold !text-slate-950 transition-colors group-hover:!text-violet-700">
                      {tool.title}
                    </span>

                    <span className="mt-2 block text-xs leading-5 !text-slate-600">
                      {tool.description}
                    </span>

                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-violet-700">
                      Try tool <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Privacy link */}
          <section className="mx-auto max-w-3xl pb-5 pt-12 text-center">
            <p className="text-sm leading-7 !text-slate-600">
              Have questions about how your information is handled?{" "}
              <Link
                to="/privacy-policy"
                className="font-extrabold text-violet-800 underline decoration-violet-200 underline-offset-4 transition hover:text-blue-700"
              >
                Read our Privacy Policy
              </Link>
              .
            </p>

            <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-violet-600 to-blue-500" />
          </section>
        </div>
      </main>
    </>
  );
}

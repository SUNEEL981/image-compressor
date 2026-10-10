import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

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

      <main className="min-h-screen w-full overflow-x-hidden bg-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

          {/* ================= HERO ================= */}

          <section className="mx-auto max-w-3xl text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] !text-gray-500 sm:px-4 sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />

              <span className="!text-gray-500">
                Get in touch
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-[-1.2px] !text-gray-950 sm:text-4xl lg:text-5xl">
              Contact Pixnora
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 !text-gray-500 sm:text-base">
              Have a question, suggestion or found a problem?
              We would love to hear from you.
            </p>

          </section>

          {/* ================= CONTACT CARD ================= */}

          <section className="mx-auto mt-8 w-full max-w-3xl sm:mt-10">

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.05)] sm:rounded-3xl">

              {/* Card Header */}

              <div className="border-b border-gray-100 bg-gray-50/70 p-5 sm:p-7">

                <div className="flex items-start gap-3 sm:gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-sm font-bold !text-white">
                    @
                  </div>

                  <div className="min-w-0">

                    <h2 className="text-base font-bold !text-gray-950 sm:text-lg">
                      Email Support
                    </h2>

                    <p className="mt-1.5 text-xs leading-6 !text-gray-500 sm:text-sm">
                      For questions, feedback, suggestions or technical
                      problems, send us an email.
                    </p>

                  </div>

                </div>

              </div>

              {/* Email */}

              <div className="p-5 sm:p-7">

                <p className="text-xs font-bold uppercase tracking-[0.1em] !text-gray-400">
                  Support email
                </p>

                <a
                  href="mailto:support@yourdomain.com"
                  className="mt-3 block w-full break-all rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm font-bold !text-gray-900 no-underline transition hover:border-gray-300 hover:bg-white sm:text-base"
                >
                  support@yourdomain.com
                </a>

                <p className="mt-3 text-xs leading-6 !text-gray-400">
                  Replace this placeholder with your actual Pixnora
                  support email before publishing the website.
                </p>

                <a
                  href="mailto:support@yourdomain.com"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-bold !text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 active:scale-[0.98] sm:w-auto"
                >
                  <span className="!text-white">
                    Send us an email
                  </span>

                  <span className="!text-white">
                    →
                  </span>
                </a>

              </div>

            </div>

          </section>

          {/* ================= CONTACT REASONS ================= */}

          <section className="mx-auto mt-8 w-full max-w-3xl sm:mt-10">

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold !text-gray-600">
                  ?
                </div>

                <h3 className="mt-4 text-sm font-bold !text-gray-950">
                  Questions
                </h3>

                <p className="mt-2 text-xs leading-6 !text-gray-500">
                  Ask us about using Pixnora and our image tools.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold !text-gray-600">
                  !
                </div>

                <h3 className="mt-4 text-sm font-bold !text-gray-950">
                  Report a problem
                </h3>

                <p className="mt-2 text-xs leading-6 !text-gray-500">
                  Tell us if you find a bug or something isn't working.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold !text-gray-600">
                  +
                </div>

                <h3 className="mt-4 text-sm font-bold !text-gray-950">
                  Suggestions
                </h3>

                <p className="mt-2 text-xs leading-6 !text-gray-500">
                  Share ideas that could make Pixnora better.
                </p>
              </div>

            </div>

          </section>

          {/* ================= IMAGE TOOLS ================= */}

          <section className="mx-auto mt-10 w-full max-w-3xl">

            <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5 sm:p-7">

              <div className="text-center">

                <p className="text-[10px] font-bold uppercase tracking-[0.14em] !text-gray-400">
                  Pixnora Tools
                </p>

                <h2 className="mt-2 text-xl font-bold tracking-[-0.5px] !text-gray-950 sm:text-2xl">
                  Try our image tools
                </h2>

                <p className="mx-auto mt-2 max-w-lg text-xs leading-6 !text-gray-500 sm:text-sm">
                  Compress, convert and resize images directly in
                  your browser.
                </p>

              </div>

              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">

                <Link
                  to="/jpg-compressor"
                  className="group flex min-h-[58px] items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 !text-gray-800 no-underline transition hover:border-gray-300 hover:shadow-sm"
                >
                  <span className="!text-gray-800 text-sm font-semibold">
                    JPG Image Compressor
                  </span>

                  <span className="!text-gray-400 transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  to="/png-compressor"
                  className="group flex min-h-[58px] items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 !text-gray-800 no-underline transition hover:border-gray-300 hover:shadow-sm"
                >
                  <span className="!text-gray-800 text-sm font-semibold">
                    PNG Image Compressor
                  </span>

                  <span className="!text-gray-400 transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  to="/webp-compressor"
                  className="group flex min-h-[58px] items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 !text-gray-800 no-underline transition hover:border-gray-300 hover:shadow-sm"
                >
                  <span className="!text-gray-800 text-sm font-semibold">
                    WebP Image Compressor
                  </span>

                  <span className="!text-gray-400 transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  to="/image-resizer"
                  className="group flex min-h-[58px] items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 !text-gray-800 no-underline transition hover:border-gray-300 hover:shadow-sm"
                >
                  <span className="!text-gray-800 text-sm font-semibold">
                    Image Resizer
                  </span>

                  <span className="!text-gray-400 transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>

              </div>

            </div>

          </section>

          {/* ================= PRIVACY LINK ================= */}

          <div className="pb-5 pt-8 text-center">

            <p className="text-xs !text-gray-400">
              Before contacting us, you can also read our{" "}
              <Link
                to="/privacy-policy"
                className="font-semibold !text-gray-700 underline decoration-gray-300 underline-offset-4 hover:!text-gray-950"
              >
                Privacy Policy
              </Link>
              .
            </p>

          </div>

        </div>
      </main>
    </>
  );
}
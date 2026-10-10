
import Header from "../components/Header";

export default function About() {
  return (
    <>
      <Header />

      <main className="container mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border border-violet-100 bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-violet-200/40 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-blue-200/40 blur-3xl"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-sm font-semibold text-violet-700">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-500" />
              About Pixnora
            </span>

            <h1 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Image tools,{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                simplified.
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Pixnora is an online image optimization platform designed to make
              image compression and conversion simple, fast, and accessible.
              Whether you are preparing images for a website, a project, or
              everyday use, our goal is to make the process straightforward.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <article className="rounded-2xl border border-slate-200 bg-white/90 p-6 transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-md shadow-violet-200">
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 3v12m0 0 4-4m-4 4-4-4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 17v3h14v-3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="mt-5 text-lg font-bold text-slate-900">Our goal</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  To provide fast, easy-to-use image tools for everyday users,
                  developers, creators, and websites.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white/90 p-6 transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-md shadow-violet-200">
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
                    <rect x="5" y="10" width="14" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round" />
                    <path d="m10 15 1.5 1.5L14.5 13" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="mt-5 text-lg font-bold text-slate-900">Privacy first</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Wherever possible, image processing happens directly in your
                  browser rather than requiring an image upload to our servers.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white/90 p-6 transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-md shadow-violet-200">
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="16" rx="3" />
                    <circle cx="8.5" cy="9" r="1.5" />
                    <path d="m4 17 5-5 3 3 3-4 5 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="mt-5 text-lg font-bold text-slate-900">Made for everyday use</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  A clear, approachable experience for optimizing and converting
                  images without an unnecessarily complicated workflow.
                </p>
              </article>
            </div>

            <div className="mt-8 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-blue-50 p-5 sm:p-6">
              <h2 className="text-lg font-bold text-slate-900">Why Pixnora?</h2>
              <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
                We believe useful image tools should be easy to understand and
                convenient to use. Pixnora brings essential image optimization
                features together in one simple place.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

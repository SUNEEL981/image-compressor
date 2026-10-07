import Header from "../components/Header";

export default function Terms() {
  return (
    <>
      <Header />

      <main className="container">
        <section className="content-page">
          <h1>Terms of Use</h1>

          <p>
            Last updated: October 2026
          </p>

          <h2>Use of the service</h2>

          <p>
            Compressly provides online image compression,
            conversion and resizing tools for general use.
          </p>

          <h2>Acceptable use</h2>

          <p>
            You agree not to use the website for unlawful activities,
            abusive automated requests or activities that could
            interfere with the service.
          </p>

          <h2>Service availability</h2>

          <p>
            We aim to keep the tools available and reliable, but
            availability cannot be guaranteed at all times.
          </p>

          <h2>Changes</h2>

          <p>
            These terms may be updated as the service develops.
          </p>
        </section>
      </main>
    </>
  );
}
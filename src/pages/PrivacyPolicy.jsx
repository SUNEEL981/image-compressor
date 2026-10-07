import Header from "../components/Header";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />

      <main className="container">
        <section className="content-page">
          <h1>Privacy Policy</h1>

          <p>
            Last updated: October 2026
          </p>

          <h2>Information we collect</h2>

          <p>
            Compressly is designed so that image processing can
            happen directly in your browser. We do not need to
            receive your images to perform normal compression and
            conversion.
          </p>

          <h2>Analytics</h2>

          <p>
            We may use analytics services in the future to understand
            general website usage, traffic and performance.
          </p>

          <h2>Advertising</h2>

          <p>
            We may display advertisements from third-party advertising
            providers. These providers may use cookies or similar
            technologies according to their own policies.
          </p>

          <h2>Contact</h2>

          <p>
            If you have privacy questions, please contact us through
            the Contact page.
          </p>
        </section>
      </main>
    </>
  );
}
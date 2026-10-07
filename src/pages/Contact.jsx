import Header from "../components/Header";

export default function Contact() {
  return (
    <>
      <Header />

      <main className="container">
        <section className="content-page">
          <h1>Contact Compressly</h1>

          <p>
            Have a question, suggestion or found a problem?
            We would like to hear from you.
          </p>

          <div className="contact-card">
            <h3>Email</h3>

            <p>
              Replace this address with your actual support email:
            </p>

            <a href="mailto:support@yourdomain.com">
              support@yourdomain.com
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
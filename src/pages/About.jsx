import Header from "../components/Header";

export default function About() {
  return (
    <>
      <Header />

      <main className="container">
        <section className="content-page">
          <h1>About Pixnora</h1>

          <p>
            Pixnora is an online image optimization platform
            designed to make image compression and conversion
            simple and accessible.
          </p>

          <h2>Our goal</h2>

          <p>
            Our goal is to provide fast, easy-to-use image tools
            for everyday users, developers, creators and websites.
          </p>

          <h2>Privacy first</h2>

          <p>
            Wherever possible, image processing happens directly
            inside your browser instead of requiring an image upload
            to our servers.
          </p>
        </section>
      </main>
    </>
  );
}
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        Compressly
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end>
          Compressor
        </NavLink>

        <NavLink to="/jpg-compressor">
          JPG
        </NavLink>

        <NavLink to="/png-compressor">
          PNG
        </NavLink>

        <NavLink to="/webp-compressor">
          WebP
        </NavLink>

        <NavLink to="/image-resizer">
          Resizer
        </NavLink>

        <NavLink to="/compress-to-kb">
          Specific KB
        </NavLink>
      </nav>
    </header>
  );
}
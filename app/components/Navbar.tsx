import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/optimized/logo-128.jpg"
            srcSet="/optimized/logo-96.jpg 96w, /optimized/logo-128.jpg 128w, /optimized/logo-192.jpg 192w"
            sizes="48px"
            alt="Homeschool Hub Logo"
            className="h-12 w-12 rounded-full object-cover border-2 border-yellow"
            decoding="async"
          />
          <span className="text-[var(--color-yellow)] font-bold text-lg leading-tight hidden sm:block">
            Homeschool Hub
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-yellow font-semibold text-sm tracking-wide hover:text-amber transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <a
          href="/contact"
          className="hidden md:inline-block bg-yellow text-navy font-bold text-sm px-5 py-2 rounded-full hover:bg-amber transition-colors"
        >
          Get Started
        </a>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span
            className={`block h-0.5 w-6 bg-yellow transition-all duration-300 ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-yellow transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-yellow transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-navy/95 backdrop-blur-sm ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-5 py-6 border-t border-white/10">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={() => setOpen(false)}
                className="text-yellow font-semibold text-base hover:text-amber transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="bg-yellow text-navy font-bold text-sm px-6 py-2 rounded-full hover:bg-amber transition-colors"
            >
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

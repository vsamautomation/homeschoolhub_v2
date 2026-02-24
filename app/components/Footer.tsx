const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

const resources = [
  {
    label: "Kenya Institute of Curriculum Development",
    href: "https://kicd.ac.ke",
  },
];


function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}


export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.5fr_1fr_1fr] gap-10">
          {/* Brand column */}
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/optimized/logo-128.jpg"
                srcSet="/optimized/logo-96.jpg 96w, /optimized/logo-128.jpg 128w, /optimized/logo-192.jpg 192w"
                sizes="56px"
                alt="HomeSchoolHub logo"
                className="w-14 h-14 rounded-xl object-cover"
                loading="lazy"
                decoding="async"
              />
              <span className="text-yellow font-bold text-2xl">
                HomeSchoolHub
              </span>
            </div>

            {/* Tagline */}
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Give your child a world-class education tailored to their unique
              learning style.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 text-sm hover:text-yellow transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-6">Resources</h4>
            <ul className="flex flex-col gap-4">
              {resources.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 text-sm hover:text-yellow transition-colors leading-snug"
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          {/* Connect With Us */}
          <div>
            <h4 className="font-bold text-lg mb-6">Connect With Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/homeschoolhub.ke?igsh=YjZiZGtkcDJyNXZu&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 bg-yellow text-navy rounded-full flex items-center justify-center hover:bg-amber transition-colors"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center">
          <p className="text-white font-semibold text-sm">
            © &nbsp;2026 Kenya.&nbsp; All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

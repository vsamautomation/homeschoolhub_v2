const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Curricula", href: "#curricula" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#contact" },
  { label: "Careers", href: "#careers" },
];

const resources = [
  { label: "Home School Legal Defense Association", href: "https://hslda.org" },
  {
    label: "Kenya Institute of Curriculum Development",
    href: "https://kicd.ac.ke",
  },
  { label: "Homeschool.Com", href: "https://homeschool.com" },
];

const legal = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
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

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
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

            {/* CTA Button */}
            <a
              href="#contact"
              className="inline-block bg-yellow text-navy font-bold text-sm py-4 px-8 rounded-xl hover:bg-amber transition-colors text-center w-fit"
            >
              Start Free
              <br />
              Consultation
            </a>
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

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="flex flex-col gap-3">
              {legal.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-white/70 text-sm hover:text-yellow transition-colors"
                  >
                    {l.label}
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
              <a
                href="https://wa.me/254794922599"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-12 h-12 bg-yellow text-navy rounded-full flex items-center justify-center hover:bg-amber transition-colors"
              >
                <WhatsAppIcon />
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

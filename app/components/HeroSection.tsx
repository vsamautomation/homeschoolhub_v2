export default function HeroSection() {
  return (
    <section
      className="relative max-h-[90vh] flex items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('/a-teacher-with-children-looking-at-a-globe.jpg')",
      }}
    >
      {/* Gradient overlay: solid navy left → transparent right */}
      <div className="absolute inset-0 bg-linear-to-r from-navy via-navy/80 to-navy/10" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-lg">
          {/* Eyebrow */}
          {/* <p className="text-yellow text-sm font-semibold uppercase tracking-widest mb-5">
            🎓 Homeschool Hub
          </p> */}

          {/* Headline */}
          <h1 className="text-white font-bold text-5xl md:text-6xl leading-tight mb-4">
            HomeSchool <br /> Hub
          </h1>

          {/* Subheading */}
          <p className="text-yellow font-semibold text-xl md:text-2xl leading-snug mb-5">
            Empowering Kenyan Families with Quality HomeSchool Education
          </p>

          {/* Body */}
          <p className="text-white/75 text-base leading-relaxed mb-9">
            Give your child a world-class education tailored to their unique
            learning style. Connect with expert Kenyan educators, access
            CBC-aligned curriculum, and join a supportive community of
            homeschooling families across Kenya.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="bg-yellow text-navy font-bold text-sm px-7 py-3 rounded-full hover:bg-amber transition-colors shadow-md"
            >
              Start Free Consultation
            </a>
            <a
              href="/about"
              className="border-2 border-white text-white font-bold text-sm px-7 py-3 rounded-full hover:bg-white hover:text-navy transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

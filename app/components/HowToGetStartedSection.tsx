const steps = [
  {
    number: "01",
    title: "Free Consultation",
    description:
      "Schedule a free consultation call with our education experts. We'll discuss your child's needs, your goals, and answer all your questions about homeschooling in Kenya.",
  },
  {
    number: "02",
    title: "Custom Learning Plan",
    description:
      "We create a personalised curriculum and learning plan tailored to your child's grade level, learning style, and interests while ensuring CBC compliance.",
  },
  {
    number: "03",
    title: "Connect with Educators",
    description:
      "Get matched with qualified Kenyan teachers who specialise in your child's subjects. Begin regular lessons, receive materials, and access our learning platform.",
  },
  {
    number: "04",
    title: "Learn and Grow Together",
    description:
      "Start your homeschooling journey with ongoing support, regular assessments, community events, and continuous guidance from our team.",
  },
];

export default function HowToGetStartedSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-4">
            How to get started with<br />HomeSchoolHub
          </h2>
          <div className="h-1 w-24 bg-yellow rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-base">
            Begin your homeschooling journey in four easy steps. We guide you every step of the way.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-16">

          {/* Connector line — sits behind the circles at their vertical midpoint */}
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gray-200 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {steps.map(({ number, title, description }) => (
              <div key={number} className="flex flex-col items-center text-center">

                {/* Number circle */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-navy flex items-center justify-center mb-5 shadow-md">
                  <span className="text-yellow font-bold text-2xl tracking-tight">
                    {number}
                  </span>
                </div>

                <h3 className="text-navy font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

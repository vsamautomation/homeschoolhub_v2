const DOT_PATTERN = `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.8' fill='rgba(255%2C255%2C255%2C0.12)'/%3E%3C/svg%3E")`;

const services = [
  {
    title: "Competency-Based Curriculum (CBC)",
    description:
      "Kenya's national curriculum delivered at home. Our CBC programme is fully aligned with national education standards while giving your child the flexibility to learn at their own pace with personalised support from certified Kenyan educators.",
  },
  {
    title: "Montessori Method",
    description:
      "A child-led approach to learning that nurtures independence, creativity, and intrinsic motivation. Our Montessori-trained educators guide your child through hands-on, self-paced exploration tailored to their natural curiosity and developmental stage.",
  },
  {
    title: "Cambridge International",
    description:
      "An internationally recognised curriculum that opens doors to global opportunities. Our Cambridge programme prepares your child for IGCSE and A-Level examinations with rigorous academics and dedicated expert guidance throughout.",
  },
];

export default function WhatWeOfferSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            What&nbsp; We Offer
          </h2>
          {/* Yellow accent line */}
          <div className="h-1 w-24 bg-yellow rounded-full mx-auto" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ title, description }) => (
            <div
              key={title}
              className="flex flex-col rounded-2xl border border-lavender shadow-md overflow-hidden"
            >
              {/* Card header */}
              <div
                className="bg-navy px-6 py-8 text-center h-32 flex items-center justify-center rounded-b-2xl"
                style={{ backgroundImage: DOT_PATTERN }}
              >
                <h3 className="text-white font-bold text-xl leading-snug">
                  {title}
                </h3>
              </div>

              {/* Card body */}
              <div className="flex-1 bg-white px-6 pt-7 pb-4 text-center">
                <p className="text-gray-500 text-sm leading-relaxed">
                  {description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

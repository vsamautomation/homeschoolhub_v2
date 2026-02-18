const features = [
  {
    title: "Personalized Learning Curriculum",
    body: "CBC-aligned curriculum adapted to your child's pace, interests, and learning style. Our flexible approach ensures your child excels while meeting national education standards.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Expert Kenyan Educators",
    body: "Learn from TSC-certified teachers who understand the Kenyan education system. Get personalised guidance, regular assessments, and expert support throughout your journey.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Flexible Learning Schedule",
    body: "Design a learning schedule that works for your family. Balance academics with life responsibilities and extracurricular activities without compromising quality.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: "Community Support",
    body: "Join a vibrant and supportive community of homeschooling families. Share experiences, organise meet-ups, access shared activities, and never feel alone on your journey.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
];

export default function WhyUsSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-navy mb-4">
            Why HomeSchoolHub?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            We provide comprehensive support to make the homeschooling journey
            smooth, effective, and enjoyable for both parents and children.
          </p>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Photo collage */}
          <div className="relative h-[480px]">
            <div className="grid grid-cols-2 gap-3 h-full">

              {/* Left column — two stacked images */}
              <div className="flex flex-col gap-3">
                <img
                  src="/portrait-of-happy-young-girl.jpg"
                  alt="Child learning at home"
                  className="rounded-2xl object-cover w-full flex-1"
                />
                <img
                  src="/woman-daughter-and-black-family-in-drawing-lounge-for.jpg"
                  alt="Parent and child learning together"
                  className="rounded-2xl object-cover w-full flex-1"
                />
              </div>

              {/* Right column — one tall image */}
              <img
                src="/black-female-teacher-instructs-primary-girls-group-students.jpg"
                alt="Expert teacher with students"
                className="rounded-2xl object-cover w-full h-full"
              />
            </div>

            {/* Yellow badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:bottom-6 lg:left-[38%] w-32 h-32 rounded-full bg-yellow shadow-xl flex items-center justify-center text-center z-10">
              <span className="text-navy font-bold text-sm leading-snug px-4">
                Join the<br />HomeSchoolHub
              </span>
            </div>
          </div>

          {/* Right: Feature list */}
          <div className="flex flex-col gap-8">
            {features.map(({ title, body, icon }) => (
              <div key={title} className="flex gap-5 items-start">
                {/* Icon bubble */}
                <div className="shrink-0 w-12 h-12 rounded-full bg-navy flex items-center justify-center shadow-sm">
                  {icon}
                </div>
                <div>
                  <h3 className="text-navy font-bold text-lg mb-1">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

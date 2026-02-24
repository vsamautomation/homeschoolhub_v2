import { useFetcher } from "react-router";

const contactDetails = [
  {
    label: "Nairobi, Kenya",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    ),
  },
  {
    lines: ["+254 794 922599", "+254 743 707136"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z"
        />
      </svg>
    ),
  },
  {
    lines: ["info@homeschoolhub.co.ke", "homeschoolhub.ke@gmail.com"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    lines: ["Mon – Fri: 8:00 AM – 6:00 PM", "Sat: 9:00 AM – 2:00 PM"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
];

const inputClass =
  "w-full bg-white/20 border border-white/20 rounded-lg px-4 py-1 text-white placeholder:text-white/40 outline-none focus:border-white/60 transition-colors";

const labelClass = "text-white font-bold text-sm block mb-2";

function ContactInfo() {
  return (
    <>
      <h3 className="text-white font-bold text-xl mb-8">Contact Us</h3>
      <div className="flex flex-col gap-6">
        {contactDetails.map((item, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="shrink-0 w-10 h-10 md:w-7 md:h-7 lg:w-10 lg:h-10 bg-white/10 rounded-lg flex items-center justify-center">
              {item.icon}
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              {item.label ? (
                <p className="text-white/80 text-sm break-all">{item.label}</p>
              ) : (
                item.lines?.map((line) => (
                  <p key={line} className="text-white/80 text-sm break-all">
                    {line}
                  </p>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function ContactSection() {
  const fetcher = useFetcher<{ ok: boolean; error?: string }>();
  const actionData = fetcher.data;
  const isSubmitting = fetcher.state !== "idle";

  return (
    <section id="contact" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-4">
            Ready to Transform
            <br />
            Your Child's Education?
          </h2>
          <div className="h-1 w-24 bg-yellow rounded-full mx-auto mb-6" />
          <p className="text-gray-400 max-w-lg mx-auto text-base leading-relaxed">
            Join hundreds of Kenyan families who have discovered the joy of
            personalised, flexible, and effective homeschooling. Start with a
            free consultation today!
          </p>
        </div>

        {/* Body */}
        <div className="relative">
          {/* Mobile: navy card stacked above form */}
          <div className="lg:hidden bg-navy rounded-2xl p-8 mb-6">
            <ContactInfo />
          </div>

          {/* Sky-blue form panel */}
          <div className="bg-sky rounded-2xl px-8 py-10 lg:ml-[20%] lg:pl-[15%]">
            <h3 className="text-white font-bold text-xl mb-8">
              Get Your Free Consultation
            </h3>

            {actionData?.ok ? (
              /* Success state */
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-xl">Message Sent!</h4>
                <p className="text-white/80 text-sm max-w-sm">
                  Thank you! We'll be in touch within one business day to schedule your free consultation.
                </p>
              </div>
            ) : (
              <fetcher.Form method="post" className="flex flex-col gap-5">

                {/* Error banner */}
                {actionData?.error && (
                  <div className="bg-red-500/30 border border-white/40 rounded-lg px-4 py-3 text-white text-sm">
                    {actionData.error}
                  </div>
                )}

                {/* Mobile: horizontal pairs */}
                <div className="flex flex-col gap-4 lg:hidden">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className={labelClass}>First Name</label>
                      <input name="firstName" type="text" className={inputClass} />
                    </div>
                    <div className="flex-1">
                      <label className={labelClass}>Last Name</label>
                      <input name="lastName" type="text" className={inputClass} />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className={labelClass}>Email Address</label>
                      <input name="email" type="email" className={inputClass} />
                    </div>
                    <div className="flex-1">
                      <label className={labelClass}>Phone Number</label>
                      <input name="phone" type="tel" className={inputClass} />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className={labelClass}>Child's Grade Level</label>
                      <input name="gradeLevel" type="text" className={inputClass} />
                    </div>
                    <div className="flex-1">
                      <label className={labelClass}>Your Location</label>
                      <input name="location" type="text" className={inputClass} />
                    </div>
                  </div>
                </div>

                {/* Desktop: 2 vertical column groups */}
                <div className="hidden lg:grid lg:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className={labelClass}>First Name</label>
                      <input name="firstName" type="text" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input name="email" type="email" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Child's Grade Level</label>
                      <input name="gradeLevel" type="text" className={inputClass} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className={labelClass}>Last Name</label>
                      <input name="lastName" type="text" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input name="phone" type="tel" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Your Location</label>
                      <input name="location" type="text" className={inputClass} />
                    </div>
                  </div>
                </div>

                {/* Always full-width */}
                <div>
                  <label className={labelClass}>Message/Enquiry</label>
                  <textarea name="message" rows={3} className={`${inputClass} resize-none`} />
                </div>
                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-yellow text-navy font-bold text-base py-4 rounded-xl hover:bg-amber transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending…" : "Request a Free Consultation"}
                  </button>
                </div>

              </fetcher.Form>
            )}
          </div>

          {/* Desktop: navy card absolutely overlapping the left of the blue panel */}
          <div className="hidden lg:flex absolute left-0 top-20 bottom-20 w-[30%] bg-navy rounded-2xl py-8 pl-6 flex-col">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
}

import { useFetcher } from "react-router";

type PreferredContactMethod = "whatsapp" | "phone" | "email";
type PreferredContactTime = "morning" | "afternoon" | "evening" | "anytime";
type Urgency = "immediately" | "this_week" | "this_month" | "just_exploring";

type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gradeLevel: string;
  location: string;
  preferredContactMethod: PreferredContactMethod;
  preferredContactTime: PreferredContactTime;
  urgency: Urgency;
  message: string;
};

type ContactFormActionData = {
  ok: boolean;
  error?: string;
  values?: ContactFormValues;
  fieldErrors?: Partial<Record<keyof ContactFormValues, string>>;
};

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
    lines: [
      <a
        key="instagram"
        href="https://www.instagram.com/homeschoolhub.ke?igsh=YjZiZGtkcDJyNXZu&utm_source=qr"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-yellow transition-colors"
      >
        @homeschoolhub.ke
      </a>,
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
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
  "w-full bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 outline-none focus:border-white/60 transition-colors";
const labelClass = "text-white font-bold text-sm block mb-2";
const errorClass = "text-red-100 text-xs mt-1";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className={errorClass}>{message}</p>;
}

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
                item.lines?.map((line, index) => (
                  <p
                    key={`${i}-${index}`}
                    className="text-white/80 text-sm break-all"
                  >
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
  const fetcher = useFetcher<ContactFormActionData>();
  const actionData = fetcher.data;
  const values = actionData?.values;
  const fieldErrors = actionData?.fieldErrors ?? {};
  const isSubmitting = fetcher.state !== "idle";

  return (
    <section id="contact" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
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
            free consultation today.
          </p>
        </div>

        <div className="relative">
          <div className="lg:hidden bg-navy rounded-2xl p-8 mb-6">
            <ContactInfo />
          </div>

          <div className="bg-sky rounded-2xl px-8 py-10 lg:ml-[20%] lg:pl-[15%]">
            <h3 className="text-white font-bold text-xl mb-2">
              Get Your Free Consultation
            </h3>
            <p className="text-white/80 text-sm mb-8">
              Fill this form and we will reply within one business day.
            </p>

            {actionData?.ok ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-xl">Request Received</h4>
                <p className="text-white/80 text-sm max-w-md">
                  Thank you. We have received your enquiry and sent a
                  confirmation email. Our team will contact you within one
                  business day.
                </p>
              </div>
            ) : (
              <fetcher.Form method="post" className="flex flex-col gap-5" noValidate>
                <div className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none">
                  <label htmlFor="website">Leave this field empty</label>
                  <input id="website" name="website" type="text" autoComplete="off" />
                </div>

                {actionData?.error && (
                  <div className="bg-red-500/30 border border-white/40 rounded-lg px-4 py-3 text-white text-sm">
                    {actionData.error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>First Name *</label>
                    <input
                      name="firstName"
                      type="text"
                      required
                      autoComplete="given-name"
                      className={inputClass}
                      defaultValue={values?.firstName ?? ""}
                    />
                    <FieldError message={fieldErrors.firstName} />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      className={inputClass}
                      defaultValue={values?.lastName ?? ""}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                      defaultValue={values?.email ?? ""}
                    />
                    <FieldError message={fieldErrors.email} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={inputClass}
                      defaultValue={values?.phone ?? ""}
                    />
                    <FieldError message={fieldErrors.phone} />
                  </div>
                  <div>
                    <label className={labelClass}>Child's Grade Level</label>
                    <input
                      name="gradeLevel"
                      type="text"
                      className={inputClass}
                      defaultValue={values?.gradeLevel ?? ""}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Your Location</label>
                    <input
                      name="location"
                      type="text"
                      className={inputClass}
                      defaultValue={values?.location ?? ""}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Preferred Contact</label>
                    <select
                      name="preferredContactMethod"
                      className={inputClass}
                      defaultValue={values?.preferredContactMethod ?? "whatsapp"}
                    >
                      <option className="text-navy" value="whatsapp">
                        WhatsApp
                      </option>
                      <option className="text-navy" value="phone">
                        Phone Call
                      </option>
                      <option className="text-navy" value="email">
                        Email
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Best Time to Reach You</label>
                    <select
                      name="preferredContactTime"
                      className={inputClass}
                      defaultValue={values?.preferredContactTime ?? "anytime"}
                    >
                      <option className="text-navy" value="morning">
                        Morning
                      </option>
                      <option className="text-navy" value="afternoon">
                        Afternoon
                      </option>
                      <option className="text-navy" value="evening">
                        Evening
                      </option>
                      <option className="text-navy" value="anytime">
                        Anytime
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>When Do You Need Support?</label>
                    <select
                      name="urgency"
                      className={inputClass}
                      defaultValue={values?.urgency ?? "just_exploring"}
                    >
                      <option className="text-navy" value="immediately">
                        Immediately
                      </option>
                      <option className="text-navy" value="this_week">
                        This Week
                      </option>
                      <option className="text-navy" value="this_month">
                        This Month
                      </option>
                      <option className="text-navy" value="just_exploring">
                        Just Exploring
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Message / Enquiry *</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    minLength={20}
                    className={`${inputClass} resize-none`}
                    defaultValue={values?.message ?? ""}
                  />
                  <FieldError message={fieldErrors.message} />
                </div>

                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-yellow text-navy font-bold text-base py-4 rounded-xl hover:bg-amber transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Request a Free Consultation"}
                  </button>
                </div>
              </fetcher.Form>
            )}
          </div>

          <div className="hidden lg:flex absolute left-0 top-20 bottom-20 w-[30%] bg-navy rounded-2xl py-8 pl-6 flex-col">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
}

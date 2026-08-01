import { useRef, useState } from "react";
import gsap from "gsap";
import NeonButton from "./NeonButton";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function makeTicketCode(eventId) {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `GATE-${eventId.slice(0, 3).toUpperCase()}-${rand}`;
}

export default function RegisterForm({ event, onSuccess }) {
  const [values, setValues] = useState({ name: "", email: "", college: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);

  const setField = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: null }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Enter your name.";
    if (!EMAIL_RE.test(values.email.trim())) next.email = "Enter a valid email.";
    setErrors(next);
    if (Object.keys(next).length) {
      const firstInvalid = formRef.current?.querySelector('[data-invalid="true"]');
      firstInvalid?.focus();
      gsap.fromTo(formRef.current, { x: -6 }, { x: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
    }
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate() || submitting) return;
    setSubmitting(true);
    // Simulated registration — no backend exists yet, but the flow (validation,
    // pending state, ticket issuance) is fully real and ready to wire up.
    setTimeout(() => {
      setSubmitting(false);
      onSuccess({ ...values, ticket: makeTicketCode(event.id) });
    }, 900);
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="reg-name" className="mb-1 block text-xs tracking-widest text-white/50 uppercase">
          Name
        </label>
        <input
          id="reg-name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={setField("name")}
          data-invalid={!!errors.name}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-cyan"
          placeholder="Your name"
        />
        {errors.name && <p className="mt-1 text-xs text-magenta">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="reg-email" className="mb-1 block text-xs tracking-widest text-white/50 uppercase">
          Email
        </label>
        <input
          id="reg-email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={setField("email")}
          data-invalid={!!errors.email}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-cyan"
          placeholder="you@campus.edu"
        />
        {errors.email && <p className="mt-1 text-xs text-magenta">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="reg-college" className="mb-1 block text-xs tracking-widest text-white/50 uppercase">
          College <span className="text-white/30 normal-case">(optional)</span>
        </label>
        <input
          id="reg-college"
          type="text"
          autoComplete="organization"
          value={values.college}
          onChange={setField("college")}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none focus:border-cyan"
          placeholder="Your college"
        />
      </div>

      <NeonButton variant="primary" type="submit">
        {submitting ? "Opening Portal…" : `Register for ${event.title}`}
      </NeonButton>
    </form>
  );
}

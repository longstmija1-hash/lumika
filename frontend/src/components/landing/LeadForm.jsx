"use client";

import { useState, useEffect, useRef } from "react";
import { trackFunnel } from "../../lib/funnelAnalytics";
import { Loader2 } from "lucide-react";
import { useLeadSubmit } from "../../hooks/useLeadSubmit";
import { EMPTY_FORM, formatPhone } from "../../lib/leadFormUtils";
import { TARIFF_LABELS, SOCIAL_PROOF_LINE } from "../../data/landingContent";

const AVATAR_COLORS = ["#7c91f9", "#111111", "#94a3b8", "#a78bfa", "#64748b"];
const AVATAR_INITIALS = ["А", "М", "К", "Д", "С"];

function SoftInput({ id, label, error, className = "", ...props }) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`ums-input ${error ? "ring-2 ring-red-400/60" : ""} ${className}`}
        {...props}
      />
      {error && (
        <span
          id={`${id}-error`}
          className="text-red-500 text-xs mt-1.5 block"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
}

function SocialProof() {
  return (
    <div className="mt-5 sm:mt-6 rounded-2xl bg-ums-coral text-white px-4 py-3.5 sm:px-5 sm:py-4">
      <p className="text-[0.8rem] sm:text-sm font-semibold leading-snug mb-2.5 sm:mb-3 font-display">
        {SOCIAL_PROOF_LINE}
      </p>
      <div className="flex items-center">
        {AVATAR_INITIALS.map((letter, i) => (
          <div
            key={letter}
            className="w-9 h-9 rounded-full border-2 border-ums-coral flex items-center justify-center text-xs font-bold text-white -ml-2 first:ml-0"
            style={{
              backgroundColor: AVATAR_COLORS[i],
              zIndex: AVATAR_INITIALS.length - i,
            }}
            aria-hidden
          >
            {letter}
          </div>
        ))}
        <span className="ml-3 text-xs text-white/80">
          и другие достигли желаемого результата
        </span>
      </div>
    </div>
  );
}

export default function LeadForm({
  variant = "inline",
  initialData = {},
  onSuccess,
  className = "",
  showTitle = true,
  showSocialProof = true,
  id = "lead-form",
  title,
  submitLabel,
}) {
  const tariffLabel = initialData.selectedTariff
    ? (TARIFF_LABELS[initialData.selectedTariff] ?? initialData.selectedTariff)
    : null;

  const { submit, isSubmitting, errors, setErrors, submissionError } =
    useLeadSubmit({
      variant,
      tariffLabel,
      onSuccess,
    });

  const [form, setForm] = useState({
    ...EMPTY_FORM,
    consent: false,
    program: initialData.selectedProgram || "",
  });
  const started = useRef(false);
  const trackStart = () => {
    if (!started.current) {
      started.current = true;
      trackFunnel("lead_start", initialData.selectedProgram || "");
    }
  };

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      program: initialData.selectedProgram || prev.program,
    }));
  }, [initialData.selectedProgram]);

  const set = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handlePhone = (e) => {
    setForm((f) => ({ ...f, phone: formatPhone(e.target.value) }));
    if (errors.phone) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await submit(form);
    if (!ok)
      requestAnimationFrame(() => {
        const invalid = document
          .getElementById(id)
          ?.querySelector('[aria-invalid="true"]');
        const details = invalid?.closest("details");
        if (details) details.open = true;
        invalid?.focus();
      });
    if (ok) {
      trackFunnel("lead_success", initialData.selectedProgram || "");
      started.current = false;
      setForm({
        ...EMPTY_FORM,
        consent: false,
        program: initialData.selectedProgram || "",
      });
    }
  };

  const heading =
    title ||
    (variant === "inline"
      ? "Заполни форму, чтобы узнать подробнее"
      : "Заполни форму, чтобы записаться");

  const cta =
    submitLabel ||
    (variant === "inline" ? "Получить консультацию" : "Отправить заявку");

  return (
    <form
      id={id}
      onChange={trackStart}
      onSubmit={handleSubmit}
      noValidate
      className={`${className}`}
    >
      {showTitle && (
        <div className="mb-5">
          <h3 className="text-lg sm:text-2xl font-bold text-[#111] font-display leading-tight text-left">
            {heading}
          </h3>
          {tariffLabel && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5f5] text-[#111] text-xs font-medium">
              Тариф: {tariffLabel}
            </div>
          )}
          {initialData.selectedProgram && !tariffLabel && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5f5] text-[#111] text-xs font-medium">
              {initialData.selectedProgram}
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        <SoftInput
          id={`${id}-name`}
          type="text"
          label="Ваше имя"
          placeholder="Как к вам обращаться?"
          error={errors.parentName}
          value={form.parentName}
          onChange={set("parentName")}
          autoComplete="name"
        />
        <SoftInput
          id={`${id}-phone`}
          type="tel"
          label="Телефон"
          autoComplete="tel"
          placeholder="+7 000 000-00-00"
          error={errors.phone}
          value={form.phone}
          onChange={handlePhone}
          inputMode="tel"
        />
        <details className="optional-email">
          <summary>Добавить email — необязательно</summary>
          <SoftInput
            id={`${id}-email`}
            type="email"
            label="Электронная почта"
            placeholder="name@example.com"
            error={errors.email}
            value={form.email}
            onChange={set("email")}
            autoComplete="email"
          />
        </details>
      </div>

      <div className="flex items-start gap-2.5 mt-4">
        <input
          id={`${id}-consent`}
          type="checkbox"
          checked={form.consent}
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
          onChange={set("consent")}
          className="mt-0.5 w-4 h-4 rounded-[4px] border-[#d1d5db] bg-white text-[#111] accent-[#111] cursor-pointer"
        />
        <label
          htmlFor={`${id}-consent`}
          className="text-xs text-ums-muted leading-relaxed cursor-pointer"
        >
          Даю согласие на{" "}
          <span className="text-[#111] underline underline-offset-2">
            обработку персональных данных
          </span>
        </label>
      </div>
      {errors.consent && (
        <span
          id={`${id}-consent-error`}
          className="text-red-500 text-xs block mt-1"
          role="alert"
        >
          {errors.consent}
        </span>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 w-full rounded-xl bg-ums-coral text-white font-bold text-base py-3.5 px-6 transition-colors duration-200 hover:bg-[#ff5a48] cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
            Отправка...
          </span>
        ) : (
          cta
        )}
      </button>

      {submissionError && (
        <p role="alert" className="text-red-600 text-sm mt-3">
          {submissionError}
        </p>
      )}

      <p className="lead-next-step">
        После заявки команда Люмики свяжется с вами по указанному телефону,
        чтобы согласовать время знакомства.
      </p>

      {showSocialProof && <SocialProof />}
    </form>
  );
}

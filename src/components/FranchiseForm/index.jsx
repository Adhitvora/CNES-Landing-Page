import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { formData } from "../../data/formData";
import { siteData } from "../../data/siteData";
import { submitFranchiseEnquiry } from "../../services/franchiseService";
import { trackEvent } from "../../utils/analytics";
import { franchiseFormSchema } from "../../utils/formSchema";
import { Button, Loader, Reveal, SectionTitle } from "../UI";
import styles from "./FranchiseForm.module.css";

const defaultValues = {
  fullName: "",
  mobile: "",
  email: "",
  city: "",
  profession: "",
  investmentRange: "",
  message: "",
};

function InputField({ name, config, register, error, type = "text", full = false }) {
  return (
    <div className={`${styles.field} ${full ? styles.full : ""}`}>
      <label htmlFor={name}>{config.label}</label>
      <input
        id={name}
        type={type}
        autoComplete={config.autoComplete}
        placeholder={config.placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={error ? styles.invalid : ""}
        {...register(name)}
      />
      {error ? (
        <span className={styles.error} id={`${name}-error`}>
          {error.message}
        </span>
      ) : null}
    </div>
  );
}

export default function FranchiseForm() {
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");
  const startedRef = useRef(false);
  const abortRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(franchiseFormSchema), defaultValues, mode: "onBlur" });

  useEffect(() => () => abortRef.current?.abort(), []);

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("form_start", { form: "franchise_enquiry" });
  }

  async function onSubmit(values) {
    if (isSubmitting) return;
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setServerError("");
    setStatus("submitting");

    try {
      await submitFranchiseEnquiry(
        { ...values, source: "cnes_franchise_landing_page", submittedAt: new Date().toISOString() },
        { signal: abortRef.current.signal },
      );
      setStatus("success");
      trackEvent("form_success", { form: "franchise_enquiry" });
    } catch (error) {
      if (error.name === "CanceledError" || error.name === "AbortError") return;
      setStatus("error");
      setServerError(formData.error.message);
      trackEvent("form_error", { form: "franchise_enquiry", error_type: "submission" });
    }
  }

  function onInvalid(fieldErrors) {
    trackEvent("form_validation_error", {
      form: "franchise_enquiry",
      fields: Object.keys(fieldErrors).join(","),
    });
  }

  function handleReset() {
    reset(defaultValues);
    setStatus("idle");
    startedRef.current = false;
  }

  return (
    <section className={styles.section} id="enquiry">
      <div className={`container ${styles.layout}`}>
        <Reveal className={styles.intro}>
          <SectionTitle eyebrow={formData.eyebrow} title={formData.title} />
          <p>{formData.intro}</p>
          <div className={styles.contact}>
            <a href={`tel:${siteData.contact.phoneHref}`}>
              <span className={styles.contactIcon}>
                <Phone size={19} aria-hidden="true" />
              </span>
              {siteData.contact.phoneDisplay}
            </a>
            <a href={`mailto:${siteData.contact.email}`}>
              <span className={styles.contactIcon}>
                <Mail size={19} aria-hidden="true" />
              </span>
              {siteData.contact.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {status === "success" ? (
            <div className={styles.success} role="status">
              <div>
                <span className={styles.successIcon}>
                  <Check size={34} aria-hidden="true" />
                </span>
                <h3>{formData.success.title}</h3>
                <p>{formData.success.message}</p>
                <Button variant="primary" onClick={handleReset}>
                  {siteData.actions.reset}
                </Button>
              </div>
            </div>
          ) : (
            <div className={styles.formCard}>
              <form
                className={styles.form}
                noValidate
                onFocusCapture={markStarted}
                onSubmit={handleSubmit(onSubmit, onInvalid)}
              >
                <InputField
                  name="fullName"
                  config={formData.fields.fullName}
                  register={register}
                  error={errors.fullName}
                />
                <InputField
                  name="mobile"
                  config={formData.fields.mobile}
                  register={register}
                  error={errors.mobile}
                  type="tel"
                />
                <InputField
                  name="email"
                  config={formData.fields.email}
                  register={register}
                  error={errors.email}
                  type="email"
                />
                <InputField name="city" config={formData.fields.city} register={register} error={errors.city} />

                {["profession", "investmentRange"].map((name) => {
                  const config = formData.fields[name];
                  return (
                    <div className={styles.field} key={name}>
                      <label htmlFor={name}>{config.label}</label>
                      <select
                        id={name}
                        defaultValue=""
                        aria-invalid={Boolean(errors[name])}
                        aria-describedby={errors[name] ? `${name}-error` : undefined}
                        className={errors[name] ? styles.invalid : ""}
                        {...register(name)}
                      >
                        <option value="" disabled>
                          {config.placeholder}
                        </option>
                        {config.options.map((option) => (
                          <option value={option} key={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors[name] ? (
                        <span className={styles.error} id={`${name}-error`}>
                          {errors[name].message}
                        </span>
                      ) : null}
                    </div>
                  );
                })}

                <div className={`${styles.field} ${styles.full}`}>
                  <label htmlFor="message">{formData.fields.message.label}</label>
                  <textarea
                    id="message"
                    placeholder={formData.fields.message.placeholder}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : "message-hint"}
                    className={errors.message ? styles.invalid : ""}
                    {...register("message")}
                  />
                  {errors.message ? (
                    <span className={styles.error} id="message-error">
                      {errors.message.message}
                    </span>
                  ) : (
                    <span className={styles.hint} id="message-hint">
                      {formData.fields.message.hint}
                    </span>
                  )}
                </div>

                {serverError ? (
                  <div className={styles.serverError} role="alert">
                    <strong>{formData.error.title}</strong>
                    {serverError}
                  </div>
                ) : null}

                <div className={styles.submitRow}>
                  <Button type="submit" full magnetic disabled={isSubmitting}>
                    <span className={styles.submitContent}>
                      {isSubmitting ? <Loader /> : null}
                      {isSubmitting ? siteData.actions.submitting : siteData.actions.submit}
                    </span>
                  </Button>
                  <p className={styles.privacy}>{formData.privacy}</p>
                </div>
              </form>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

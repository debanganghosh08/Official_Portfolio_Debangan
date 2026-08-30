import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Icon } from './Icon';
import ShinyText from './ShinyText';
import { crossFade, springSheet } from '../lib/motion';

type FieldName = 'fullname' | 'email' | 'message';

const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Web3Forms relays the submission to the inbox the key was issued for. The key
 * is public by design — it identifies the destination, it does not authorise
 * reading anything — so shipping it in the bundle is the intended use.
 *
 * Set VITE_WEB3FORMS_KEY in .env (see .env.example). Without it the form tells
 * the visitor to email directly rather than silently swallowing their message.
 */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
const CONTACT_EMAIL = 'debanganghoshcse@gmail.com';

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

/** Warn about the specific problem, in plain language, next to the field. */
const validate = (values: Record<FieldName, string>): Partial<Record<FieldName, string>> => {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!values.fullname.trim()) errors.fullname = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!isEmailValid(values.email)) errors.email = "That doesn't look like an email address.";
  if (!values.message.trim()) errors.message = 'Please write a message.';
  return errors;
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<Record<FieldName, string>>({
    fullname: '',
    email: '',
    message: '',
  });
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<SubmitState>('idle');
  const reduceMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);

  const errors = validate(formData);

  /**
   * Validate inline rather than on submit, but only once a field has been left
   * — flagging an email as malformed while it is still being typed is correct
   * and useless at the same time.
   */
  const errorFor = (name: FieldName) => (touched[name] ? errors[name] : undefined);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    const firstInvalid = (Object.keys(errors) as FieldName[])[0];

    /*
      The button stays enabled even when the form is incomplete. A dead button
      with no explanation leaves you guessing what it wants; pressing it and
      being shown the answer keeps you in control.
    */
    if (firstInvalid) {
      setTouched({ fullname: true, email: true, message: true });
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }

    if (!ACCESS_KEY) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      /*
        Sent as FormData rather than JSON on purpose. A JSON body needs a
        `Content-Type: application/json` header, which is not CORS-safelisted,
        so the browser fires a preflight OPTIONS first — and Web3Forms answers
        that preflight without an Access-Control-Allow-Origin header, so the
        request dies before it is ever sent. FormData keeps this a simple
        request: no preflight, no CORS failure.
      */
      const payload = new FormData();
      payload.append('access_key', ACCESS_KEY);
      payload.append('subject', `Portfolio message from ${formData.fullname}`);
      payload.append('from_name', 'Portfolio Contact Form');
      payload.append('name', formData.fullname);
      payload.append('email', formData.email);
      payload.append('message', formData.message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) throw new Error(`Web3Forms responded ${response.status}`);

      const result = (await response.json()) as { success?: boolean };
      if (!result.success) throw new Error('Web3Forms rejected the submission');

      setStatus('sent');
      setFormData({ fullname: '', email: '', message: '' });
      setTouched({});
    } catch {
      // Never report success we cannot verify — a message that silently
      // vanished is worse than one the sender knows to retry.
      setStatus('error');
    }
  };

  const renderField = (name: FieldName, node: React.ReactNode) => {
    const error = errorFor(name);
    return (
      <div className="field">
        {node}
        <AnimatePresence initial={false}>
          {error && (
            <motion.p
              className="field-error"
              id={`${name}-error`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={reduceMotion ? crossFade : springSheet}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const fieldProps = (name: FieldName) => ({
    name,
    value: formData[name],
    onChange: handleInputChange,
    onBlur: handleBlur,
    className: `form-input ${errorFor(name) ? 'has-error' : ''}`,
    'aria-invalid': errorFor(name) ? true : undefined,
    'aria-describedby': errorFor(name) ? `${name}-error` : undefined,
    'data-form-input': true,
  });

  return (
    <article className="contact active" data-page="contact">
      <header>
        <h2 className="h2 article-title">
          <ShinyText text="Contact" speed={3} />
        </h2>
      </header>

      {/* Mapbox */}
      <section className="mapbox" data-mapbox>
        <figure>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31112.929447657352!2d77.61825085099767!3d12.900250194130352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14a4b3d45ebf%3A0x191e34a78fe6ed0c!2sBengaluru%2C%20Karnataka%20560068!5e0!3m2!1sen!2sin!4v1780945167581!5m2!1sen!2sin"
            width="400"
            height="300"
            loading="lazy"
            title="Location Map"
          ></iframe>
        </figure>
      </section>

      {/* Contact Form */}
      <section className="contact-form">
        <h3 className="h3 form-title">Contact Form</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="form" noValidate data-form>
          <div className="input-wrapper">
            {renderField(
              'fullname',
              <input type="text" placeholder="Full name" {...fieldProps('fullname')} />
            )}
            {renderField(
              'email',
              <input type="email" placeholder="Email address" {...fieldProps('email')} />
            )}
          </div>

          {renderField(
            'message',
            <textarea placeholder="Your Message" {...fieldProps('message')} />
          )}

          <div className="form-footer">
            {/* Completion is confirmed where the action happened, not in a dialog
                that has to be dismissed before the page can be used again. */}
            <AnimatePresence initial={false}>
              {status === 'sent' && (
                <motion.p
                  className="form-status"
                  role="status"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={reduceMotion ? crossFade : springSheet}
                >
                  <Icon name="checkmark-circle" />
                  <span>Thanks — your message has been sent.</span>
                </motion.p>
              )}

              {status === 'error' && (
                <motion.p
                  className="form-status form-status--error"
                  role="alert"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={reduceMotion ? crossFade : springSheet}
                >
                  <span>
                    That didn&apos;t send. Please email me directly at{' '}
                    <a className="inline-link" href={`mailto:${CONTACT_EMAIL}`}>
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </span>
                </motion.p>
              )}
            </AnimatePresence>

            {/* Disabled only while the request is genuinely in flight, so a
                second press cannot send the same message twice. */}
            <button
              className="form-btn"
              type="submit"
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
              data-form-btn
            >
              <Icon name="paper-plane" />
              <span>{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
            </button>
          </div>
        </form>
      </section>
    </article>
  );
};

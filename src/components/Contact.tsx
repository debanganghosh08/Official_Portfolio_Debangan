import React, { useState } from 'react';
import { Icon } from './Icon';
import ShinyText from './ShinyText';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Basic email pattern validation
  const isEmailValid = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const isFormValid =
    formData.fullname.trim() !== '' &&
    isEmailValid(formData.email) &&
    formData.message.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      alert(`Message sent successfully!\nName: ${formData.fullname}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
      setFormData({ fullname: '', email: '', message: '' });
    }
  };

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

        <form onSubmit={handleSubmit} className="form" data-form>
          <div className="input-wrapper">
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Full name"
              required
              data-form-input
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Email address"
              required
              data-form-input
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Your Message"
            required
            data-form-input
          ></textarea>

          <button className="form-btn" type="submit" disabled={!isFormValid} data-form-btn>
            <Icon name="paper-plane" />
            <span>Send Message</span>
          </button>
        </form>
      </section>
    </article>
  );
};

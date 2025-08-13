// src/components/FormSection.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { services, budgetRanges } from '../constants/contactConstants';

const FormSection = ({ inView }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowSuccess(false);
    setErrorMessage('');

    const form = new FormData();
    form.append('access_key', import.meta.env.VITE_WEB3FORM_ACCESS_KEY);
    form.append('from_name', 'Kiggla Website');
    form.append(
      'subject',
      `New Inquiry from ${formData.firstName} ${formData.lastName}`
    );

    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      // 1. Submit to Web3Forms
      const web3formsRes = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: form,
      });

      const web3formsData = await web3formsRes.json();

      if (!web3formsData.success) {
        throw new Error(
          web3formsData.message || 'Web3Forms submission failed!'
        );
      }

      // 2. Insert into Supabase database
      const { data: supabaseData, error: supabaseError } = await supabase
        .from('contact_inquiries')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            service: formData.service,
            budget: formData.budget,
            message: formData.message,
          },
        ]);

      if (supabaseError) {
        console.error('Supabase insert error:', supabaseError);
        throw new Error(supabaseError.message || 'Supabase submission failed!');
      }

      // If both succeeded
      setShowSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        message: '',
      });
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage(
        error.message || 'Failed to send. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`tw-relative tw-bg-card tw-border tw-border-border tw-rounded-3xl tw-p-6 md:tw-p-10 lg:tw-p-12 tw-shadow-2xl tw-shadow-primary/5 tw-transition-all tw-duration-700 tw-ease-out ${
        inView
          ? 'tw-translate-y-0 tw-opacity-100'
          : 'tw-translate-y-8 tw-opacity-0'
      }`}
    >
      {showSuccess && (
        <div className="tw-absolute tw-inset-0 tw-bg-card tw-rounded-3xl tw-flex tw-items-center tw-justify-center tw-z-50 tw-bg-opacity-80 tw-backdrop-blur-sm">
          <div className="tw-text-center tw-p-8">
            <div className="tw-w-20 tw-h-20 tw-bg-primary/20 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-6">
              <div className="tw-w-10 tw-h-10 tw-bg-primary tw-rounded-full tw-flex tw-items-center tw-justify-center">
                <svg
                  className="tw-w-6 tw-h-6 tw-text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="tw-text-2xl md:tw-text-3xl tw-font-bold tw-text-text tw-mb-4">
              Message Sent!
            </h3>
            <p className="tw-text-base md:tw-text-lg tw-text-muted">
              We'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="tw-space-y-6">
        <div className="tw-text-center tw-mb-8">
          <h3 className="tw-text-2xl md:tw-text-3xl tw-font-bold tw-text-text tw-mb-2">
            Let's Connect
          </h3>
          <p className="tw-text-muted tw-text-sm md:tw-text-base">
            Fill out the form below and we'll be in touch soon.
          </p>
        </div>
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
          <div className="tw-space-y-2">
            <label
              htmlFor="firstName"
              className="tw-block tw-text-sm tw-font-semibold tw-text-text"
            >
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="tw-w-full tw-px-4 tw-py-3 tw-bg-background tw-border tw-border-border tw-rounded-xl tw-text-text tw-placeholder-muted tw-transition-all tw-duration-300 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary/20 hover:tw-border-primary/50"
              placeholder="John"
            />
          </div>
          <div className="tw-space-y-2">
            <label
              htmlFor="lastName"
              className="tw-block tw-text-sm tw-font-semibold tw-text-text"
            >
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="tw-w-full tw-px-4 tw-py-3 tw-bg-background tw-border tw-border-border tw-rounded-xl tw-text-text tw-placeholder-muted tw-transition-all tw-duration-300 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary/20 hover:tw-border-primary/50"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
          <div className="tw-space-y-2">
            <label
              htmlFor="email"
              className="tw-block tw-text-sm tw-font-semibold tw-text-text"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="tw-w-full tw-px-4 tw-py-3 tw-bg-background tw-border tw-border-border tw-rounded-xl tw-text-text tw-placeholder-muted tw-transition-all tw-duration-300 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary/20 hover:tw-border-primary/50"
              placeholder="john@company.com"
            />
          </div>
          <div className="tw-space-y-2">
            <label
              htmlFor="phone"
              className="tw-block tw-text-sm tw-font-semibold tw-text-text"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="tw-w-full tw-px-4 tw-py-3 tw-bg-background tw-border tw-border-border tw-rounded-xl tw-text-text tw-placeholder-muted tw-transition-all tw-duration-300 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary/20 hover:tw-border-primary/50"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
        <div className="tw-space-y-2">
          <label
            htmlFor="company"
            className="tw-block tw-text-sm tw-font-semibold tw-text-text"
          >
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="tw-w-full tw-px-4 tw-py-3 tw-bg-background tw-border tw-border-border tw-rounded-xl tw-text-text tw-placeholder-muted tw-transition-all tw-duration-300 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary/20 hover:tw-border-primary/50"
            placeholder="Your Company Name"
          />
        </div>
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
          <div className="tw-space-y-2">
            <label
              htmlFor="service"
              className="tw-block tw-text-sm tw-font-semibold tw-text-text"
            >
              Service Needed *
            </label>
            <div className="tw-relative">
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
                className="tw-w-full tw-px-4 tw-py-3 tw-bg-background tw-border tw-border-border tw-rounded-xl tw-text-text tw-transition-all tw-duration-300 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary/20 hover:tw-border-primary/50 tw-appearance-none tw-cursor-pointer"
              >
                {services.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
              <div className="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-4 tw-pointer-events-none">
                <svg
                  className="tw-w-5 tw-h-5 tw-text-muted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="tw-space-y-2">
            <label
              htmlFor="budget"
              className="tw-block tw-text-sm tw-font-semibold tw-text-text"
            >
              Budget Range
            </label>
            <div className="tw-relative">
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="tw-w-full tw-px-4 tw-py-3 tw-bg-background tw-border tw-border-border tw-rounded-xl tw-text-text tw-transition-all tw-duration-300 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary/20 hover:tw-border-primary/50 tw-appearance-none tw-cursor-pointer"
              >
                {budgetRanges.map((budget) => (
                  <option key={budget.value} value={budget.value}>
                    {budget.label}
                  </option>
                ))}
              </select>
              <div className="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-4 tw-pointer-events-none">
                <svg
                  className="tw-w-5 tw-h-5 tw-text-muted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="tw-space-y-2">
          <label
            htmlFor="message"
            className="tw-block tw-text-sm tw-font-semibold tw-text-text"
          >
            Project Details *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={5}
            className="tw-w-full tw-px-4 tw-py-3 tw-bg-background tw-border tw-border-border tw-rounded-xl tw-text-text tw-placeholder-muted tw-transition-all tw-duration-300 focus:tw-border-primary focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary/20 hover:tw-border-primary/50 tw-resize-none"
            placeholder="Tell us about your project requirements, goals, and any specific details you'd like us to know..."
          />
        </div>
        <div className="tw-flex tw-justify-center tw-flex-col tw-items-center">
          {errorMessage && (
            <div className="tw-flex tw-items-center tw-justify-between tw-w-full tw-p-4 tw-mt-4 tw-rounded-xl tw-bg-red-50 tw-border tw-border-red-200 tw-text-red-700 tw-font-medium">
              <div className="tw-flex tw-items-center tw-gap-2">
                <svg
                  className="tw-w-5 tw-h-5 tw-text-red-500 tw-flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="tw-font-bold">Error!</span> {errorMessage}
              </div>
              <button
                type="button"
                onClick={() => setErrorMessage('')}
                className="tw-text-red-500 hover:tw-text-red-700 focus:tw-outline-none"
              >
                <svg
                  className="tw-w-5 tw-h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
          <div className="tw-pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="tw-bg-primary tw-text-white tw-font-bold tw-py-4 tw-px-8 tw-rounded-full tw-text-lg tw-transition-all tw-duration-300 hover:tw-bg-secondary hover:tw-shadow-lg hover:tw-shadow-primary/25 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed tw-transform hover:tw-scale-[1.01] active:tw-scale-[0.99]"
            >
              {isSubmitting ? (
                <div className="tw-flex tw-items-center tw-justify-center tw-gap-3">
                  <div className="tw-w-5 tw-h-5 tw-border-2 tw-border-white/30 tw-border-t-white tw-rounded-full tw-animate-spin" />
                  Sending Message...
                </div>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </div>
        <p className="tw-text-sm tw-text-muted tw-text-center tw-mt-4">
          We respect your privacy and will never share your information with
          third parties.
        </p>
      </form>
    </div>
  );
};

export default FormSection;

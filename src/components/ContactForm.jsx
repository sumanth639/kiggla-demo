import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Refined useInView hook for better behavior
const useInView = (threshold = 0.2, triggerOnce = true) => {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold, triggerOnce]);

  return [setRef, inView];
};

const ContactForm = () => {
  const [ref, inView] = useInView(0.2);
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

  const services = [
    { value: '', label: 'Select a Service' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-app', label: 'Mobile App Development' },
    { value: 'ui-ux-design', label: 'UI/UX Design' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'ecommerce', label: 'E-commerce Solutions' },
    { value: 'cloud-services', label: 'Cloud Services' },
    { value: 'data-analytics', label: 'Data Analytics' },
    { value: 'ai-ml', label: 'AI & Machine Learning' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'consulting', label: 'IT Consulting' },
    { value: 'other', label: 'Other Services' },
  ];

  const budgetRanges = [
    { value: '', label: 'Select Budget Range' },
    { value: 'under-10k', label: 'Under $10,000' },
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: 'over-100k', label: 'Over $100,000' },
    { value: 'discuss', label: "Let's Discuss" },
  ];

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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form after success
    setTimeout(() => {
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
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="tw-relative tw-bg-background tw-text-text tw-py-12 md:tw-py-24 lg:tw-py-26">
      <div className="tw-container tw-mx-auto tw-px-6 lg:tw-px-12">
        {/* Main flex container with order classes */}
        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-items-start tw-gap-16">
          {/* Right Column - Content (ordered first on mobile) */}
          <div className="tw-w-full lg:tw-w-2/5 tw-flex tw-flex-col tw-justify-center tw-space-y-8 tw-order-1 lg:tw-order-2">
            <div className="tw-space-y-6 tw-text-center md:tw-text-left">
              <motion.span
                className="tw-text-sm tw-font-bold tw-uppercase tw-tracking-widest tw-text-primary tw-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                Get In Touch
              </motion.span>
              <motion.h2
                className="tw-mt-3 tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Ready to Start Your Project?
              </motion.h2>
              <p className="tw-text-base md:tw-text-lg tw-text-muted tw-leading-relaxed">
                Let's discuss how Kiggla can help transform your ideas into
                reality with our innovative solutions.
              </p>
            </div>
            {/* New Contact Info Cards Section */}
            <div className="tw-space-y-6 tw-pt-8">
              <div className="tw-bg-card tw-border tw-border-border tw-rounded-2xl tw-p-6 tw-flex tw-items-start tw-gap-4 tw-transition-all hover:tw-border-primary/50">
                <div className="tw-flex-shrink-0 tw-w-10 tw-h-10 tw-rounded-full tw-bg-background tw-flex tw-items-center tw-justify-center tw-text-primary tw-border tw-border-border">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="tw-w-5 tw-h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <div className="tw-text-sm tw-font-bold tw-text-muted">
                    Email Address
                  </div>
                  <a
                    href="mailto:andrew@kiggla.com"
                    className="transition-colors tw-mt-1 tw-text-lg tw-font-semibold tw-text-text hover:tw-text-primary"
                  >
                    andrew@kiggla.com
                  </a>
                </div>
              </div>

              <div className="tw-bg-card tw-border tw-border-border tw-rounded-2xl tw-p-6 tw-flex tw-items-start tw-gap-4 tw-transition-all hover:tw-border-primary/50">
                <div className="tw-flex-shrink-0 tw-w-10 tw-h-10 tw-rounded-full tw-bg-background tw-flex tw-items-center tw-justify-center tw-text-primary tw-border tw-border-border">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="tw-w-5 tw-h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <div className="tw-text-sm tw-font-bold tw-text-muted">
                    Phone Number
                  </div>
                  <a
                    href="tel:+1215797034"
                    className="transition-colors tw-mt-1 tw-text-lg tw-font-semibold tw-text-text hover:tw-text-primary"
                  >
                    +1215797034
                  </a>
                </div>
              </div>

              <div className="tw-bg-card tw-border tw-border-border tw-rounded-2xl tw-p-6 tw-flex tw-items-start tw-gap-4 tw-transition-all hover:tw-border-primary/50">
                <div className="tw-flex-shrink-0 tw-w-10 tw-h-10 tw-rounded-full tw-bg-background tw-flex tw-items-center tw-justify-center tw-text-primary tw-border tw-border-border">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="tw-w-5 tw-h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
                    <circle cx="12" cy="9" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <div className="tw-text-sm tw-font-bold tw-text-muted">
                    Office Address
                  </div>
                  <p className="tw-mt-1 tw-text-lg tw-font-semibold tw-text-text">
                    5400 NW 22nd Ave, Miami, FL
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Left Column - Form (ordered second on mobile) */}
          <div
            ref={ref}
            className="tw-w-full lg:tw-w-3/5 tw-order-2 lg:tw-order-1"
          >
            <div
              className={`tw-relative tw-bg-card tw-border tw-border-border tw-rounded-3xl tw-p-6 md:tw-p-10 lg:tw-p-12 tw-shadow-2xl tw-shadow-primary/5 tw-transition-all tw-duration-700 tw-ease-out ${
                inView
                  ? 'tw-translate-y-0 tw-opacity-100'
                  : 'tw-translate-y-8 tw-opacity-0'
              }`}
            >
              {/* Success Message */}
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
                {/* Name Fields */}
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
                {/* Email and Phone */}
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
                {/* Company */}
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
                {/* Service and Budget */}
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
                {/* Message */}
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
                {/* Submit Button */}
                <div className=" tw-flex tw-justify-center">
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
                  We respect your privacy and will never share your information
                  with third parties.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

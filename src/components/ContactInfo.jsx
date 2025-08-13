import React from 'react';
import { motion } from 'framer-motion';

const ContactInfo = () => {
  return (
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
          Let's discuss how Kiggla can help transform your ideas into reality
          with our innovative solutions.
        </p>
      </div>
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
              href="tel:+1 940 275 1336"
              className="transition-colors tw-mt-1 tw-text-lg tw-font-semibold tw-text-text hover:tw-text-primary"
            >
              +1 940 275 1336
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
  );
};

export default ContactInfo;

import React, { useState, useEffect } from 'react';
import ContactInfo from './ContactInfo';
import FormSection from './FormSection';

// Custom hook remains the same
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

  return (
    <div className="tw-relative tw-bg-background tw-text-text tw-py-12 md:tw-py-24 lg:tw-py-26">
      <div className="tw-container tw-mx-auto tw-px-6 lg:tw-px-12">
        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-items-start tw-gap-16">
          <ContactInfo />
          <div
            ref={ref}
            className="tw-w-full lg:tw-w-3/5 tw-order-2 lg:tw-order-1"
          >
            <FormSection inView={inView} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

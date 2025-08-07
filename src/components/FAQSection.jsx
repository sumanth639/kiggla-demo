import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FAQItem from './FAQItem';

const faqData = [
  {
    question: 'How do you ensure data security?',
    answer:
      'We use industry-leading encryption protocols and regularly conduct security audits to protect your data. Our infrastructure is built on secure cloud platforms with robust access controls.',
  },
  {
    question: 'What is your pricing model?',
    answer:
      'Our pricing is based on a tiered subscription model, with options for small businesses, growing enterprises, and custom solutions. You can find a detailed breakdown on our pricing page.',
  },
  {
    question: 'Can I integrate my existing systems?',
    answer:
      'Yes, our platform is designed for seamless integration. We offer a comprehensive API and support for various third-party applications to ensure a smooth transition and workflow.',
  },
  {
    question: 'Do you offer customer support?',
    answer:
      'We provide 24/7 customer support via chat, email, and phone. Our dedicated team is available to assist you with any questions or issues you may encounter.',
  },
  {
    question: 'What makes your solution unique?',
    answer:
      'Our solution is unique due to its combination of advanced AI-driven analytics, customizable dashboards, and a dedicated team of experts who provide personalized support to ensure your success.',
  },
];

const FAQSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="tw-relative tw-bg-background tw-text-text tw-py-20 lg:tw-py-16 tw-mx-6 md:tw-mx-16">
      <div className="tw-container tw-mx-auto ">
        <div className="tw-text-center tw-mb-10 lg:tw-mb-12">
          <motion.span
            className="tw-text-sm tw-font-bold tw-uppercase tw-tracking-widest tw-text-primary tw-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Got Questions?
          </motion.span>
          <motion.h2
            className="tw-mt-3 tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We've Got Answers
          </motion.h2>
        </div>
        <div className="tw-w-full tw-mx-auto tw-flex tw-flex-col md:tw-flex-row tw-gap-16 tw-items-stretch">
          {/* Left Column: FAQ List (60% width on desktop) */}
          <div className="md:tw-w-7/12">
            <div className="tw-bg-card tw-rounded-xl tw-shadow-2xl tw-overflow-hidden tw-h-full">
              {faqData.map((faq, i) => (
                <FAQItem
                  key={i}
                  i={i}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Image (40% width on desktop, hidden on mobile) */}
          <div className="tw-hidden md:tw-block md:tw-w-5/12 tw-h-full tw-relative tw-p-4">
            <div className="tw-h-full tw-rounded-3xl tw-shadow-2xl tw-overflow-hidden">
              <img
                src="https://picsum.photos/seed/faq/800/600"
                alt="An abstract image related to FAQs"
                className="tw-w-full tw-h-full tw-object-cover"
              />
              <div className="tw-absolute tw-inset-0 tw-bg-primary/10 tw-z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer, expanded, setExpanded, i }) => {
  const isOpen = i === expanded;

  const itemVariants = {
    open: { opacity: 1, height: 'auto' },
    collapsed: { opacity: 0, height: 0 },
  };

  const arrowVariants = {
    open: { rotate: 180 },
    collapsed: { rotate: 0 },
  };

  return (
    <motion.div
      initial={false}
      className="tw-border-b tw-border-border last:tw-border-b-0 tw-transition-colors tw-duration-200"
    >
      <motion.header
        className="tw-flex tw-justify-between tw-items-center tw-cursor-pointer tw-py-6 tw-px-6 md:tw-px-8 hover:tw-bg-card tw-transition-colors tw-duration-200"
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        <h3 className="tw-text-lg md:tw-text-xl tw-font-semibold tw-text-text">
          {question}
        </h3>
        <motion.div
          variants={arrowVariants}
          animate={isOpen ? 'open' : 'collapsed'}
          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <svg
            className="tw-h-6 tw-w-6 tw-text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={itemVariants}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="tw-overflow-hidden tw-px-6 md:tw-px-8"
          >
            <p className="tw-pb-6 tw-text-base tw-font-light tw-leading-relaxed tw-text-muted">
              {answer}
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const backgroundImages = [
    '/assets/img/kiggla/hero-1.jpg',
    '/assets/img/kiggla/hero-2.jpg',
    '/assets/img/kiggla/hero-3.jpg',
    '/assets/img/kiggla/hero-4.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const imageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.5, ease: 'easeInOut' } },
    exit: { opacity: 0, transition: { duration: 1.5, ease: 'easeInOut' } },
  };

  return (
    <div className="tw-relative tw-min-h-screen tw-pt-[90px] tw-bg-background tw-text-text tw-overflow-hidden tw-flex tw-flex-col">
      {/* Rotating Background Images */}
      <AnimatePresence>
        <motion.div
          key={backgroundImages[currentSlide]}
          className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-bg-cover tw-bg-center tw-filter tw-grayscale"
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ backgroundImage: `url(${backgroundImages[currentSlide]})` }}
        />
      </AnimatePresence>
      {/* Semi-transparent dark overlay */}
      <div className="tw-absolute tw-inset-0 tw-bg-black/70 tw-z-10"></div>

      {/* Main Content Area */}
      <div className="tw-container tw-mx-auto tw-px-6 sm:tw-px-8 md:tw-px-16 tw-relative tw-z-20 tw-flex tw-flex-1 tw-items-center tw-justify-center tw-w-full">
        <motion.div
          className="tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-between tw-w-full tw-gap-16 tw-py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text and CTA Buttons */}
          <div className="tw-flex tw-flex-col tw-justify-center tw-space-y-8 tw-flex-1 tw-text-center md:tw-text-left">
            <motion.div variants={itemVariants}>
              <p className="tw-text-white tw-text-sm tw-font-light tw-uppercase tw-tracking-[0.2em] tw-mb-4">
                Enterprise & Cloud
              </p>
              <h1 className="tw-text-5xl sm:tw-text-6xl md:tw-text-7xl tw-font-bold tw-leading-tight tw-tracking-tight tw-text-white">
                Accelerate <br />
                Your Vision.
              </h1>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="tw-max-w-md tw-text-lg tw-font-extralight tw-leading-relaxed tw-text-white tw-mx-auto md:tw-mx-0">
                We empower businesses with bespoke technology solutions,
                providing the tools and support to thrive in the digital age.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-pt-4 tw-justify-center md:tw-justify-start"
            >
              <button className="tw-px-8 tw-py-4 tw-text-base tw-font-semibold tw-text-black tw-bg-primary tw-rounded-full tw-transition-all tw-duration-300 hover:tw-scale-105 hover:tw-bg-secondary tw-shadow-lg">
                Explore Services
              </button>
              <button className="tw-px-8 tw-py-4 tw-text-base tw-font-light tw-text-white tw-border tw-border-primary tw-rounded-full tw-transition-all tw-duration-300 hover:tw-scale-105 hover:tw-bg-primary/10 tw-backdrop-blur-sm">
                Get a Quote
              </button>
            </motion.div>
          </div>
          {/* Frosted Glass Info Card */}
          <motion.div
            className="tw-flex tw-flex-1 tw-items-center tw-justify-center md:tw-justify-end"
            variants={itemVariants}
          >
            <div className="tw-relative tw-p-6 md:tw-p-8 tw-rounded-3xl tw-bg-card/50 tw-shadow-2xl tw-backdrop-blur-xl tw-w-full tw-max-w-md tw-text-white">
              <h3 className="tw-text-xl sm:tw-text-2xl tw-font-semibold tw-mb-4">
                Our Core Expertise
              </h3>
              <p className="tw-text-muted tw-text-sm tw-mb-6">
                Our team provides end-to-end support, from initial strategy to
                ongoing maintenance, ensuring your technology infrastructure is
                robust and future-proof.
              </p>
              <ul className="tw-space-y-3">
                <li className="tw-flex tw-items-center tw-text-sm tw-font-light tw-text-muted">
                  <span className="tw-w-2 tw-h-2 tw-bg-primary tw-rounded-full tw-mr-3"></span>
                  Advanced Security Protocols
                </li>
                <li className="tw-flex tw-items-center tw-text-sm tw-font-light tw-text-muted">
                  <span className="tw-w-2 tw-h-2 tw-bg-primary tw-rounded-full tw-mr-3"></span>
                  Dedicated 24/7 Support
                </li>
                <li className="tw-flex tw-items-center tw-text-sm tw-font-light tw-text-muted">
                  <span className="tw-w-2 tw-h-2 tw-bg-primary tw-rounded-full tw-mr-3"></span>
                  Seamless Integration
                </li>
              </ul>
              <motion.button
                className="tw-mt-8 tw-w-full tw-text-center tw-py-3 tw-text-base tw-font-semibold tw-text-white tw-border tw-border-primary tw-rounded-full tw-transition-all tw-duration-300 hover:tw-bg-primary/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

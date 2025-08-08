import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const backgroundImages = useMemo(
    () => [
      '/assets/img/kiggla/hero-1.webp',
      '/assets/img/kiggla/hero-2.webp',
      '/assets/img/kiggla/hero-3.webp',
      '/assets/img/kiggla/hero-4.webp',
    ],
    []
  );

  const typingTexts = useMemo(
    () => [
      'Kickstart Innovation, Guide Growth, Lead Advancement.',
      'Create digital dreams, launch systems, and scale success.',
      'Empower your vision, shape futures, embrace new change.',
      'Craft bold ideas, build strong tools, achieve real value.',
    ],
    []
  );

  const [currentTypingText, setCurrentTypingText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dots, setDots] = useState('...');

  // Effect for the background image slider (now separate)
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);

    return () => {
      clearInterval(bgInterval);
    };
  }, [backgroundImages, currentSlide]);

  // Effect for the typing animation
  useEffect(() => {
    const typingSpeed = 60;
    const deletingSpeed = 30;
    const delayBetweenTexts = 1500;

    const handleTyping = () => {
      const fullText = typingTexts[textIndex % typingTexts.length];
      if (isDeleting) {
        setCurrentTypingText(fullText.substring(0, typingIndex - 1));
        setTypingIndex((prev) => prev - 1);
        if (typingIndex === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => prev + 1);
        }
      } else {
        if (typingIndex <= fullText.length) {
          setCurrentTypingText(fullText.substring(0, typingIndex + 1));
          setTypingIndex((prev) => prev + 1);
        }

        if (
          typingIndex > fullText.length - 3 &&
          typingIndex < fullText.length
        ) {
          setDots((prevDots) => prevDots.slice(0, -1));
        } else if (typingIndex === fullText.length) {
          setDots('');
          setTimeout(() => {
            setIsDeleting(true);
          }, delayBetweenTexts);
        }
      }
    };

    const typingInterval = setInterval(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => {
      clearInterval(typingInterval);
    };
  }, [typingIndex, isDeleting, textIndex, typingTexts, dots]);

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
      <div className="tw-absolute tw-inset-0 tw-bg-black/70 tw-z-10"></div>
      <div className="tw-container tw-mx-auto tw-px-6 sm:tw-px-8 md:tw-px-16 tw-relative tw-z-20 tw-flex tw-flex-1 tw-items-center tw-justify-center tw-w-full">
        <motion.div
          className="tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-center tw-w-full tw-py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="tw-flex tw-flex-col tw-justify-center tw-space-y-8 tw-flex-1 tw-text-center">
            <motion.div variants={itemVariants}>
              <h1 className="tw-text-5xl sm:tw-text-6xl md:tw-text-7xl tw-font-bold tw-leading-tight tw-tracking-tight tw-text-white">
                Transform <br />
                Your Digital Future.
              </h1>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="tw-max-w-xl tw-text-xl tw-font-extralight tw-leading-relaxed tw-text-white tw-mx-auto tw-min-h-[50px]">
                {currentTypingText}
                <span className="tw-text-primary">{dots}</span>
                <span className="tw-border-r-2 tw-border-solid tw-border-white tw-animate-pulse">
                  &nbsp;
                </span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

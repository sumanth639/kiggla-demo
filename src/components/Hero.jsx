import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState, useMemo, useRef } from 'react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const h1Ref = useRef(null);

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

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);

    return () => {
      clearInterval(bgInterval);
    };
  }, [backgroundImages]);

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
  }, [typingIndex, isDeleting, textIndex, typingTexts]);

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

  const originalText = 'Transform\nYour Digital Future.';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
  let interval = null;

  const handleMouseEnter = () => {
    if (!h1Ref.current) return;
    const element = h1Ref.current;
    let iterations = 0;
    const maxIterations = 15;

    if (interval) clearInterval(interval);

    interval = setInterval(() => {
      const scrambledText = element.innerText
        .split('')
        .map((char, index) => {
          if (char === ' ' || char === '\n' || index > iterations)
            return originalText[index];
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join('');

      element.innerText = scrambledText;

      if (iterations >= originalText.length) {
        clearInterval(interval);
        interval = null;
        element.innerText = originalText;
      }

      iterations += 1 / 3;
    }, 30);
  };

  const handleMouseLeave = () => {
    if (interval) clearInterval(interval);
    interval = null;
    if (h1Ref.current) {
      h1Ref.current.innerText = originalText;
    }
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

      <div
        className="tw-absolute tw-inset-0 tw-pointer-events-none tw-z-10"
        style={{ opacity: 0.05 }}
      >
        <div
          className="tw-w-full tw-h-full"
          style={{
            backgroundImage: `
          linear-gradient(var(--color-primary) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)
        `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="tw-container tw-mx-auto tw-px-6 sm:tw-px-8 md:tw-px-16 tw-relative tw-z-20 tw-flex tw-flex-1 tw-items-center tw-justify-center tw-w-full">
        <motion.div
          className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="tw-flex tw-flex-col tw-justify-center tw-space-y-8 tw-flex-1 tw-text-center tw-relative">
            <motion.div variants={itemVariants}>
              <h1
                ref={h1Ref}
                className="tw-text-5xl tw-text-white sm:tw-text-6xl md:tw-text-7xl tw-font-bold tw-leading-snug tw-tracking-wider tw-cursor-pointer tw-select-none"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Transform
                <br />
                Your Digital Future.
              </h1>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="tw-max-w-xl tw-text-xl tw-text-white tw-font-extralight tw-leading-relaxed tw-mx-auto tw-min-h-[50px]">
                {currentTypingText}
                <span style={{ color: 'var(--color-primary)' }}>{dots}</span>
                <span
                  className="tw-animate-pulse"
                  style={{
                    borderRight: '2px solid var(--color-text)',
                  }}
                >
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

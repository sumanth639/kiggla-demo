import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState, useMemo } from 'react';

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
  const [dots, setDots] = useState('...'); // Effect for the background image slider

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);

    return () => {
      clearInterval(bgInterval);
    };
  }, [backgroundImages, currentSlide]); // Effect for the typing animation

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

  // Scramble text effect
  const [isHovered, setIsHovered] = useState(false);
  const [scrambledText, setScrambledText] = useState(
    'Transform\nYour Digital Future.'
  );
  const originalText = 'Transform\nYour Digital Future.';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';

  useEffect(() => {
    if (isHovered) {
      let iterations = 0;
      const maxIterations = 15; // Decreased from 20 for faster reveal

      const scrambleInterval = setInterval(() => {
        setScrambledText((prevText) =>
          prevText
            .split('')
            .map((char, index) => {
              if (char === ' ' || char === '\n') return char;

              if (iterations < maxIterations * 0.7) {
                // Scrambling phase
                return characters[
                  Math.floor(Math.random() * characters.length)
                ];
              } else {
                // Revealing phase - progressively show correct characters
                const revealThreshold =
                  (iterations - maxIterations * 0.7) / (maxIterations * 0.3);
                const shouldReveal =
                  index / originalText.length < revealThreshold;
                return shouldReveal
                  ? originalText[index]
                  : characters[Math.floor(Math.random() * characters.length)];
              }
            })
            .join('')
        );

        iterations++;

        if (iterations >= maxIterations) {
          setScrambledText(originalText);
          clearInterval(scrambleInterval);
        }
      }, 30); // Decreased from 50ms for faster animation

      return () => clearInterval(scrambleInterval);
    } else {
      setScrambledText(originalText);
    }
  }, [isHovered]);

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
              <motion.h1
                className="tw-text-5xl tw-text-white sm:tw-text-6xl md:tw-text-7xl tw-font-bold tw-leading-snug tw-tracking-wider tw-cursor-pointer tw-select-none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {scrambledText.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < scrambledText.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </motion.h1>
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

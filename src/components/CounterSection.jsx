import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

// The CountUp component remains the same
const CountUp = ({ end, duration = 2000, startCounting }) => {
  const [count, setCount] = useState(startCounting ? 0 : end);

  useEffect(() => {
    if (!startCounting) {
      setCount(end); // Immediately set to the final value when not counting
      return;
    }

    let startTime = null;
    const startValue = 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(
        startValue + (end - startValue) * easeOutExpo
      );

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, startCounting]);

  return <span>{count.toLocaleString()}</span>;
};

const getCardImage = (index) => {
  const id = index + 1;
  return `/assets/img/kiggla/counter/img-${id}.jpg`;
};

const CounterSection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [activeIndex, setActiveIndex] = useState(0);

  const stats = [
    {
      number: 3000,
      suffix: '+',
      label: 'Successful Projects',
      metric: 'DELIVERED',
    },
    {
      number: 23,
      suffix: '+',
      label: 'Countries Supported',
      metric: 'GLOBAL',
    },
    {
      number: 236,
      suffix: '+',
      label: 'Active Clients',
      metric: 'TRUSTED',
    },
    {
      number: 15,
      suffix: '+',
      label: 'Years Experience',
      metric: 'PROVEN',
    },
  ];

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stats.length);
    }, 4000); // Cycle every 4 seconds
    return () => clearInterval(interval);
  }, [inView, stats.length]);

  return (
    <section className="tw-relative tw-py-16 lg:tw-py-24 md:tw-mx-8 tw-overflow-hidden tw-bg-background tw-text-text">
      <div className="tw-absolute tw-inset-0">
        <div className="tw-absolute tw-top-1/4 tw-left-1/4 tw-w-72 tw-h-72 tw-bg-primary/10 tw-rounded-full tw-mix-blend-overlay tw-filter tw-blur-xl tw-opacity-50 tw-animate-blob-1"></div>
        <div className="tw-absolute tw-bottom-1/4 tw-right-1/4 tw-w-72 tw-h-72 tw-bg-secondary/10 tw-rounded-full tw-mix-blend-overlay tw-filter tw-blur-xl tw-opacity-50 tw-animate-blob-2"></div>
      </div>
      <div className="tw-container tw-mx-auto tw-px-6 md:tw-px-12 tw-relative tw-z-10">
        <div className="tw-grid tw-grid-cols-1 xl:tw-grid-cols-[40%_60%] tw-gap-12 tw-items-center">
          <div className="tw-space-y-8">
            <div className="tw-space-y-6 tw-text-center md:tw-text-left">
              <motion.span
                className="tw-text-sm tw-font-bold tw-uppercase tw-tracking-widest tw-text-primary tw-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                Kiggla Impact
              </motion.span>
              <motion.h2
                className="tw-mt-3 tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Empowering Global Digital Transformation
              </motion.h2>
              <p className="tw-text-base md:tw-text-lg tw-text-muted tw-leading-relaxed tw-max-w-lg tw-mx-auto md:tw-mx-0">
                At Kiggla, our numbers reflect a legacy of delivering secure,
                scalable, and transformative IT solutions that drive real
                business impact across industries.
              </p>
            </div>
            {/* Centered on mobile, left-aligned on md and up */}
            <div className="tw-pt-4 tw-space-y-4 tw-text-center md:tw-text-left">
              <h3 className="tw-text-2xl tw-font-bold tw-text-text">
                Why Choose Kiggla?
              </h3>
              <ul className="tw-space-y-2 tw-text-muted tw-list-disc tw-list-inside tw-inline-block md:tw-text-left">
                <li>
                  <strong>Global Expertise:</strong> Serving clients across 23+
                  countries with localized solutions.
                </li>
                <li>
                  <strong>Proven Track Record:</strong> 15+ years of consistent
                  delivery with 3000+ successful projects.
                </li>
              </ul>
            </div>
            <div className="tw-pt-4">
              {/* REMOVED: md:tw-justify-start to keep it centered on all screens */}
              <div className="tw-flex tw-items-center tw-gap-3 tw-text-muted tw-justify-center">
                <div className="tw-w-8 tw-h-px tw-bg-primary" />
                <span className="tw-text-sm tw-font-medium">
                  Where Innovation Meets Excellence
                </span>
                <div className="tw-w-8 tw-h-px tw-bg-primary" />
              </div>
            </div>
          </div>
          <div
            ref={ref}
            className="tw-grid tw-grid-cols-2 tw-gap-4 md:tw-gap-6 lg:tw-gap-8 tw-w-full tw-max-w-xl tw-mx-auto"
          >
            {stats.map((stat, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={index}
                  className={`tw-relative tw-w-full tw-aspect-square tw-rounded-2xl tw-overflow-hidden tw-shadow-lg tw-transition-all tw-duration-500 tw-ease-in-out tw-cursor-pointer ${
                    isActive ? 'tw-scale-105 tw-shadow-2xl' : 'tw-scale-100'
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div
                    className={`tw-absolute tw-inset-0 tw-bg-cover tw-bg-center tw-transition-all tw-duration-500 tw-ease-in-out ${
                      isActive
                        ? 'tw-grayscale-0 tw-scale-110'
                        : 'tw-grayscale tw-scale-100'
                    }`}
                    style={{ backgroundImage: `url(${getCardImage(index)})` }}
                  ></div>
                  <div
                    className={`tw-absolute tw-inset-0 tw-transition-colors tw-duration-500 tw-ease-in-out ${
                      isActive ? 'tw-bg-primary/50' : 'tw-bg-background/95'
                    }`}
                  ></div>
                  <div className="tw-relative tw-z-10 tw-p-6 tw-h-full tw-flex tw-flex-col tw-justify-between">
                    <div className="tw-flex-grow tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
                      <div
                        className={`tw-absolute tw-inset-0 tw-bg-black/50 tw-backdrop-blur-sm tw-transition-opacity tw-duration-500 ${
                          isActive ? 'tw-opacity-100' : 'tw-opacity-0'
                        }`}
                      ></div>
                      <div className="tw-relative tw-z-20">
                        <div
                          className={`tw-text-sm tw-font-bold tw-uppercase tw-tracking-wider tw-transition-colors tw-duration-500 ${
                            isActive ? 'tw-text-white' : 'tw-text-primary'
                          }`}
                        >
                          {stat.metric}
                        </div>
                        <div
                          className={`tw-mt-2 tw-text-4xl md:tw-text-5xl tw-font-black tw-transition-all tw-duration-500 tw-text-white`}
                        >
                          <CountUp
                            end={stat.number}
                            startCounting={inView && isActive}
                            duration={2000}
                          />
                          {stat.suffix}
                        </div>
                        <div
                          className={`tw-mt-1 tw-text-sm tw-font-medium tw-leading-tight tw-transition-colors tw-duration-500 tw-text-white`}
                        >
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;

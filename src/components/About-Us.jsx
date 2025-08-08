import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const image = [
  '/assets/img/kiggla/about/img-1.jpg',
  '/assets/img/kiggla/about/img-2.jpg',
  '/assets/img/kiggla/about/img-3.jpg',
  '/assets/img/kiggla/about/img-4.jpg',
  '/assets/img/kiggla/about/img-5.jpg',
  '/assets/img/kiggla/about/img-6.jpg',
  '/assets/img/kiggla/about/img-7.jpg',
  '/assets/img/kiggla/about/img-8.jpg',
];

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [activeColumnImage, setActiveColumnImage] = useState({
    col1: 0,
    col2: 3,
    col3: 6,
  });
  const [transformY, setTransformY] = useState(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  const tabs = [
    {
      id: 'mission',
      label: 'Our Mission',
      content: (
        <>
          <h3 className="tw-text-3xl tw-font-bold tw-text-text">
            Empowering Digital Growth, One Solution at a Time
          </h3>

          <p className="tw-mt-4 tw-text-lg tw-text-muted tw-hidden sm:tw-block">
            At Kiggla, our mission is to bridge the gap between cutting-edge
            technology and real business outcomes. We help organizations of all
            sizes unlock their full potential through strategic IT consulting,
            intelligent solutions, and ongoing support.
          </p>
          <p className="tw-mt-4 tw-text-lg tw-text-muted">
            We’re committed to creating customized, scalable, and secure systems
            that empower businesses to innovate faster, adapt smarter, and grow
            sustainably in an ever-evolving digital landscape.
          </p>
        </>
      ),
    },

    {
      id: 'vision',
      label: 'Our Vision',
      content: (
        <>
          <h3 className="tw-text-3xl tw-font-bold tw-text-text">
            A Future Where Technology Drives Meaningful Change
          </h3>
          <p className="tw-mt-4 tw-text-lg tw-text-muted tw-hidden sm:tw-block">
            We envision a world where technology is not a barrier but a
            bridge—connecting businesses to new opportunities, ideas, and
            markets with confidence.
          </p>
          <p className="tw-mt-4 tw-text-lg tw-text-muted">
            Our goal is to lead this transformation by providing
            forward-thinking IT strategies that are human-centered,
            innovation-driven, and rooted in trust. We strive to be the partner
            businesses turn to when they’re ready to lead—not follow.
          </p>
        </>
      ),
    },
    {
      id: 'story',
      label: 'Our Story',
      content: (
        <>
          <h3 className="tw-text-3xl tw-font-bold tw-text-text">
            Built on Passion. Driven by Innovation.
          </h3>
          <p className="tw-mt-4 tw-text-lg tw-text-muted tw-hidden sm:tw-block">
            Kiggla started with a clear purpose—to simplify IT for businesses
            and make innovation accessible. What began as a small team of tech
            enthusiasts has grown into a trusted consulting firm serving clients
            across industries.
          </p>
          <p className="tw-mt-4 tw-text-lg tw-text-muted">
            Over the years, we’ve helped businesses streamline operations,
            secure their systems, and embrace next-gen technology with
            confidence. Our journey reflects our core belief: that with the
            right technology and guidance, every business can thrive in the
            digital age.
          </p>
        </>
      ),
    },
  ];

  // Logic to change images automatically every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveColumnImage((prevState) => {
        const nextCol1 = (prevState.col1 + 1) % 3;
        const nextCol2 = ((prevState.col2 - 3 + 1) % 3) + 3;
        const nextCol3 = ((prevState.col3 - 6 + 1) % 2) + 6;
        return {
          col1: nextCol1,
          col2: nextCol2,
          col3: nextCol3,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Animation to move columns up and down
  useEffect(() => {
    const interval = setInterval(() => {
      setTransformY((prevY) => (prevY === 0 ? 20 : 0));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tw-relative tw-bg-background tw-text-text tw-py-16 lg:tw-py-24">
      <div className="tw-container tw-mx-auto tw-px-6">
        <motion.div
          className="tw-flex tw-flex-col lg:tw-flex-row tw-items-center tw-gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Staggered Image Grid with 3 smaller columns */}
          <motion.div
            className="tw-w-full lg:tw-w-1/2 tw-flex tw-gap-4 tw-flex-grow"
            variants={itemVariants}
          >
            {/* Column 1 (3 images) */}
            <motion.div
              className="tw-flex tw-flex-col tw-gap-4 tw-w-1/3 tw-transition-transform tw-duration-1000"
              animate={{ y: transformY }}
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="tw-relative tw-w-full tw-aspect-square tw-rounded-2xl tw-overflow-hidden tw-shadow-xl tw-cursor-pointer group"
                >
                  <motion.img
                    src={image[i]} // Use the image array
                    alt={`Image ${i + 1}`}
                    className={`tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover tw-transition-all tw-duration-1000 ${
                      activeColumnImage.col1 !== i ? 'tw-grayscale' : ''
                    }`}
                  />
                  {/* Hover overlay with text */}
                  <div className="tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300">
                    <p className="tw-text-white tw-text-center tw-text-sm tw-font-semibold tw-p-2">
                      Consultant {i + 1}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Column 2 (3 images) */}
            <motion.div
              className="tw-flex tw-flex-col tw-gap-4 tw-w-1/3 tw-transition-transform tw-duration-1000 tw-mt-4"
              animate={{ y: -transformY }}
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i + 3}
                  className="tw-relative tw-w-full tw-aspect-square tw-rounded-2xl tw-overflow-hidden tw-shadow-xl tw-cursor-pointer group"
                >
                  <motion.img
                    src={image[i + 3]} // Use the image array
                    alt={`Image ${i + 4}`}
                    className={`tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover tw-transition-all tw-duration-1000 ${
                      activeColumnImage.col2 !== i + 3 ? 'tw-grayscale' : ''
                    }`}
                  />
                  <div className="tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300">
                    <p className="tw-text-white tw-text-center tw-text-sm tw-font-semibold tw-p-2">
                      Project {i + 4}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Column 3 (2 images) */}
            <motion.div
              className="tw-flex tw-flex-col tw-gap-4 tw-w-1/3 tw-transition-transform tw-duration-1000 tw-mt-8 lg:tw-mt-12"
              animate={{ y: transformY }}
            >
              {[...Array(2)].map((_, i) => (
                <div
                  key={i + 6}
                  className="tw-relative tw-w-full tw-aspect-square tw-rounded-2xl tw-overflow-hidden tw-shadow-xl tw-cursor-pointer group"
                >
                  <motion.img
                    src={image[i + 6]} // Use the image array
                    alt={`Image ${i + 7}`}
                    className={`tw-absolute tw-inset-0 tw-w-full tw-h-full tw-object-cover tw-transition-all tw-duration-1000 ${
                      activeColumnImage.col3 !== i + 6 ? 'tw-grayscale' : ''
                    }`}
                  />
                  <div className="tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300">
                    <p className="tw-text-white tw-text-center tw-text-sm tw-font-semibold tw-p-2">
                      Innovation {i + 7}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Text Content with Tabs */}
          <div className="tw-w-full lg:tw-w-1/2 tw-flex tw-flex-col tw-justify-center tw-space-y-8">
            <motion.div variants={itemVariants}>
              <span className="tw-text-sm tw-font-bold tw-uppercase tw-tracking-[0.2em] tw-text-primary">
                Who We Are
              </span>
              <h2 className="tw-mt-4 tw-text-5xl tw-font-extrabold tw-leading-tight tw-text-text md:tw-text-6xl">
                Redefining What's Possible
              </h2>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              className="tw-flex tw-space-x-4 tw-mt-8 tw-border-b tw-border-border"
              variants={itemVariants}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tw-flex-1 tw-py-4 tw-px-2 tw-text-center tw-border-b-2 tw-font-semibold tw-lg tw-transition-colors tw-duration-300 ${
                    activeTab === tab.id
                      ? 'tw-border-primary tw-text-primary'
                      : 'tw-border-transparent tw-text-muted hover:tw-text-text'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>

            {/* Tab Content */}
            <motion.div
              className="tw-relative tw-min-h-[250px] tw-mt-8"
              variants={itemVariants}
            >
              <AnimatePresence mode="wait">
                {tabs.map(
                  (tab) =>
                    activeTab === tab.id && (
                      <motion.div
                        key={tab.id}
                        className="tw-absolute tw-inset-0"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {tab.content}
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;

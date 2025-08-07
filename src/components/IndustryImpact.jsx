import { motion } from 'framer-motion';

const industries = [
  {
    title: 'Travel & Hospitality',
    description:
      'Transforming guest experiences with smart booking systems, personalized services, and seamless digital journeys.',
    imageUrl: 'https://picsum.photos/seed/travel/100/100',
  },
  {
    title: 'Public Sector',
    description:
      'Modernizing government services with digital platforms, citizen engagement tools, and efficient administratives',
    imageUrl: 'https://picsum.photos/seed/government/100/100',
  },
  {
    title: 'Telecommunication',
    description:
      'Enhancing network operations, customer service platforms, and next-generation communication technologies.',
    imageUrl: 'https://picsum.photos/seed/telecom/100/100',
  },
  {
    title: 'Retail & CPG',
    description:
      'Revolutionizing shopping experiences with omnichannel solutions, inventory management, and customer insights.',
    imageUrl: 'https://picsum.photos/seed/retail/100/100',
  },
  {
    title: 'Oil, Gas, and Energy',
    description:
      'Optimizing operations with IoT solutions, predictive maintenance, and sustainable energy management systems.',
    imageUrl: 'https://picsum.photos/seed/energy/100/100',
  },
  {
    title: 'Startups',
    description:
      'Accelerating growth with MVP development, scalable architectures, and rapid prototyping solutions.',
    imageUrl: 'https://picsum.photos/seed/startup/100/100',
  },
  {
    title: 'E-commerce',
    description:
      'Building powerful online platforms with secure payments, inventory systems, and personalized shopping experiences.',
    imageUrl: 'https://picsum.photos/seed/ecommerce/100/100',
  },
  {
    title: 'Banking & Fintech',
    description:
      'Creating secure financial solutions with digital banking, payment processing, and compliance management.',
    imageUrl: 'https://picsum.photos/seed/fintech/100/100',
  },
  {
    title: 'Healthcare & Pharmaceuticals',
    description:
      'Improving patient care with telemedicine platforms, health records systems, and clinical research tools.',
    imageUrl: 'https://picsum.photos/seed/healthcare/100/100',
  },
  {
    title: 'Gaming',
    description:
      'Crafting immersive gaming experiences with real-time multiplayer, analytics, and monetization platforms.',
    imageUrl: 'https://picsum.photos/seed/gaming/100/100',
  },
];

const IndustryImpact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.6,
      },
    },
  };

  return (
    <div className="tw-bg-background tw-py-16 lg:tw-py-24 tw-relative">
      {/* Subtle background pattern */}
      <div className="tw-absolute tw-inset-0 tw-opacity-5">
        <div
          className="tw-w-full tw-h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-primary) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      <div className="tw-container tw-mx-auto tw-px-6 lg:tw-px-12 tw-relative">
        {/* Header Section */}
        <div className="tw-text-center tw-mb-16 lg:tw-mb-20">
          <motion.span
            className="tw-text-sm tw-font-bold tw-uppercase tw-mb-6 tw-tracking-widest tw-text-primary tw-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Our Insights
          </motion.span>
          <motion.h2
            className="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-text tw-mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            Discover our Impact Across Industries
          </motion.h2>
        </div>

        {/* Industries Two Column Layout */}
        <motion.div
          className="tw-max-w-6xl tw-mx-auto tw-mb-16 tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Left Column - First 5 industries */}
          <div>
            {industries.slice(0, 5).map((industry, index) => (
              <motion.div
                key={index}
                className="tw-group tw-flex tw-items-start tw-py-6 tw-border-b tw-border-border/30 tw-last:border-b-0 tw-transition-all tw-duration-300 hover:tw-border-primary/50"
                variants={itemVariants}
              >
                {/* Image and dot indicator */}
                <div className="tw-flex-shrink-0 tw-w-16 tw-h-16 tw-flex tw-items-center tw-justify-center tw-mr-6 tw-relative">
                  <div className="tw-w-14 tw-h-14 tw-rounded-full tw-overflow-hidden tw-border-2 tw-border-primary/20 tw-transition-all tw-duration-300 group-hover:tw-border-primary/60 group-hover:tw-scale-105">
                    <img
                      src={industry.imageUrl}
                      alt={industry.title}
                      className="tw-w-full tw-h-full tw-object-cover tw-transition-all tw-duration-300 group-hover:tw-scale-110"
                    />
                  </div>
                  <div className="tw-absolute tw-bottom-0 tw-right-0 tw-w-4 tw-h-4 tw-bg-primary tw-rounded-full tw-border-2 tw-border-background tw-transition-all tw-duration-300 group-hover:tw-scale-125"></div>
                </div>

                {/* Content */}
                <div className="tw-flex-1 tw-min-w-0">
                  <div className="tw-flex tw-flex-col tw-gap-4">
                    <div className="tw-flex-1">
                      <h3 className="tw-text-xl tw-font-bold tw-text-text tw-mb-2 tw-transition-colors tw-duration-300 group-hover:tw-text-primary">
                        {industry.title}
                      </h3>
                      <p className="tw-text-muted tw-leading-relaxed tw-pr-4">
                        {industry.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="tw-flex-shrink-0 tw-opacity-0 tw-translate-x-4 tw-transition-all tw-duration-300 group-hover:tw-opacity-100 group-hover:tw-translate-x-0">
                      <div className="tw-w-8 tw-h-0.5 tw-bg-primary tw-relative">
                        <div className="tw-absolute tw-right-0 tw-top-1/2 tw--translate-y-1/2 tw-w-0 tw-h-0 tw-border-l-4 tw-border-l-primary tw-border-t-2 tw-border-t-transparent tw-border-b-2 tw-border-b-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column - Last 5 industries */}
          <div>
            {industries.slice(5, 10).map((industry, index) => (
              <motion.div
                key={index + 5}
                className="tw-group tw-flex tw-items-start tw-py-6 tw-border-b tw-border-border/30 tw-last:border-b-0 tw-transition-all tw-duration-300 hover:tw-border-primary/50"
                variants={itemVariants}
              >
                {/* Image and dot indicator */}
                <div className="tw-flex-shrink-0 tw-w-16 tw-h-16 tw-flex tw-items-center tw-justify-center tw-mr-6 tw-relative">
                  <div className="tw-w-14 tw-h-14 tw-rounded-full tw-overflow-hidden tw-border-2 tw-border-primary/20 tw-transition-all tw-duration-300 group-hover:tw-border-primary/60 group-hover:tw-scale-105">
                    <img
                      src={industry.imageUrl}
                      alt={industry.title}
                      className="tw-w-full tw-h-full tw-object-cover tw-transition-all tw-duration-300 group-hover:tw-scale-110"
                    />
                  </div>
                  <div className="tw-absolute tw-bottom-0 tw-right-0 tw-w-4 tw-h-4 tw-bg-primary tw-rounded-full tw-border-2 tw-border-background tw-transition-all tw-duration-300 group-hover:tw-scale-125"></div>
                </div>

                {/* Content */}
                <div className="tw-flex-1 tw-min-w-0">
                  <div className="tw-flex tw-flex-col tw-gap-4">
                    <div className="tw-flex-1">
                      <h3 className="tw-text-xl tw-font-bold tw-text-text tw-mb-2 tw-transition-colors tw-duration-300 group-hover:tw-text-primary">
                        {industry.title}
                      </h3>
                      <p className="tw-text-muted tw-leading-relaxed tw-pr-4">
                        {industry.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="tw-flex-shrink-0 tw-opacity-0 tw-translate-x-4 tw-transition-all tw-duration-300 group-hover:tw-opacity-100 group-hover:tw-translate-x-0">
                      <div className="tw-w-8 tw-h-0.5 tw-bg-primary tw-relative">
                        <div className="tw-absolute tw-right-0 tw-top-1/2 tw--translate-y-1/2 tw-w-0 tw-h-0 tw-border-l-4 tw-border-l-primary tw-border-t-2 tw-border-t-transparent tw-border-b-2 tw-border-b-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="tw-text-center"
          variants={buttonVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <button className="tw-inline-flex tw-items-center tw-bg-primary tw-text-white tw-px-8 tw-py-4 tw-rounded-full tw-font-semibold tw-text-lg tw-transition-all tw-duration-300 hover:tw-bg-primary/90 hover:tw-scale-105 hover:tw-shadow-lg tw-relative tw-overflow-hidden">
            <span className="tw-relative tw-z-10">Let's Talk Business</span>
            <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-primary tw-to-primary/80 tw-transition-transform tw-duration-300 tw-scale-x-0 hover:tw-scale-x-100 tw-origin-left"></div>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default IndustryImpact;

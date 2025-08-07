import { motion } from 'framer-motion';

const services = [
  {
    title: 'Cloud Solutions',
    description:
      'From migration to management, we handle your cloud infrastructure to ensure scalability and security.',
    imageUrl: '/assets/img/kiggla/services/img-1.jpg',
  },
  {
    title: 'Software Development',
    description:
      'We build custom software, web applications, and mobile apps tailored to your unique business needs.',
    imageUrl: '/assets/img/kiggla/services/img-7.jpg',
  },
  {
    title: 'Mobile App Development',
    description:
      'Crafting intuitive and high-performance mobile experiences for iOS and Android platforms.',
    imageUrl: '/assets/img/kiggla/services/img-10.jpg',
  },
  {
    title: 'Data Analytics',
    description:
      'Turning raw data into actionable insights with powerful visualization and predictive analytics.',
    imageUrl: '/assets/img/kiggla/services/img-4.jpg',
  },
  {
    title: 'Cyber Security',
    description:
      'Protecting your digital assets with robust security strategies, threat detection, and risk management.',
    imageUrl: '/assets/img/kiggla/services/img-5.jpg',
  },
  {
    title: 'Managed IT Services',
    description:
      'Proactive IT support and maintenance to keep your systems running smoothly and efficiently.',
    imageUrl: '/assets/img/kiggla/services/img-6.jpg',
  },
  {
    title: 'DevOps & Automation',
    description:
      'Streamline your development pipeline with CI/CD, infrastructure as code, and automated testing.',
    imageUrl: '/assets/img/kiggla/services/img-2.jpg',
  },
  {
    title: 'Digital Transformation',
    description:
      'Guide your business through digital evolution with strategy, technology adoption, and process optimization.',
    imageUrl: '/assets/img/kiggla/services/img-9.jpg',
  },
  {
    title: 'AI & Machine Learning',
    description:
      'Harness the power of artificial intelligence to automate processes, predict outcomes, and drive innovation.',
    imageUrl: '/assets/img/kiggla/services/img-8.jpg',
  },
  {
    title: 'E-commerce Solutions',
    description:
      'Build powerful online stores and marketplaces that drive sales and enhance customer experience.',
    imageUrl: '/assets/img/kiggla/services/img-3.jpg',
  },
];

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="tw-bg-background tw-py-16 lg:tw-py-24">
      <div className="tw-container tw-mx-auto tw-px-6 lg:tw-px-12">
        {/* Header Section */}
        <div className="tw-text-center tw-mb-10 lg:tw-mb-12">
          <motion.span
            className="tw-text-sm tw-font-bold tw-uppercase tw-tracking-widest tw-text-primary tw-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Our Expertise
          </motion.span>
          <motion.h2
            className="tw-mt-3 tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Innovative Solutions for a Digital World
          </motion.h2>
        </div>

        {/* Services Grid - 5 columns, 2 rows */}
        <motion.div
          className="tw-grid tw-grid-cols-2 md:tw-grid-cols-5 tw-gap-4 lg:tw-gap-6 tw-max-w-7xl tw-mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="tw-relative tw-rounded-2xl tw-overflow-hidden tw-shadow-lg tw-transition-all tw-duration-300 tw-group tw-aspect-square tw-bg-card"
              variants={itemVariants}
            >
              <div className="tw-relative tw-w-full tw-h-full">
                {/* Background Image with Blur Effect on Hover */}
                <div
                  className="tw-absolute tw-inset-0 tw-bg-cover tw-bg-center tw-transition-all tw-duration-500 tw-ease-in-out group-hover:tw-scale-110 group-hover:tw-blur-xl"
                  style={{ backgroundImage: `url(${service.imageUrl})` }}
                ></div>

                {/* Dark Overlay for Readability */}
                <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-b tw-from-black/60 tw-via-black/70 tw-to-black/90 tw-transition-all tw-duration-300 group-hover:tw-from-black/40 group-hover:tw-via-black/50 group-hover:tw-to-black/70"></div>

                {/* Content Container with slide-in animation */}
                <div className="tw-absolute tw-inset-0 tw-p-3 tw-text-center tw-text-white tw-overflow-y-auto tw-flex tw-flex-col tw-justify-center tw-transform tw-translate-y-full tw-transition-transform tw-duration-500 tw-ease-out group-hover:tw-translate-y-0">
                  <h3 className="tw-text-lg tw-font-bold tw-mb-2 tw-text-white">
                    {service.title}
                  </h3>
                  <p className="tw-text-xs tw-font-light tw-leading-relaxed tw-text-gray-200">
                    {service.description}
                  </p>
                </div>

                {/* Title for non-hovered state */}
                <div className="tw-absolute tw-inset-0 tw-flex tw-flex-col tw-items-center tw-justify-center tw-transition-all tw-duration-300 tw-text-white tw-opacity-100 group-hover:tw-opacity-0">
                  <h3 className="tw-text-xl tw-font-bold tw-text-center tw-px-2">
                    {service.title}
                  </h3>
                  <div className="tw-w-12 tw-h-0.5 tw-bg-primary tw-mt-2 tw-rounded-full"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Services;

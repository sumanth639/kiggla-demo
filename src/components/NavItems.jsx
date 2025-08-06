import { motion } from 'framer-motion';

export default function NavItems({
  setMobileToggle,
  navContainerRef,
  linkRefs,
  handleMouseEnter,
  handleNavMouseLeave,
  sliderStyle,
  hoveredItem,
  isMobile = false,
}) {
  const navigationItems = [
    { name: 'Home', path: '#home' },
    { name: 'About Us', path: '#about-us' },
    { name: 'Services', path: '#services' },
    { name: 'Project', path: '#project' },
    { name: 'Blog', path: '#blog' },
  ];

  const linkVariants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <div
      ref={navContainerRef}
      className={`nav-container-with-slider tw-relative tw-inline-block ${
        isMobile
          ? 'tw-w-full tw-rounded-none tw-bg-transparent tw-p-0'
          : 'tw-rounded-[25px] tw-bg-background/30 tw-p-1 tw-backdrop-blur-md tw-border-2 tw-border-primary/20'
      }`}
      onMouseLeave={handleNavMouseLeave}
    >
      {!isMobile && (
        <motion.div
          className="nav-slider tw-absolute tw-left-1 tw-top-1 tw-bottom-1 tw-rounded-[20px] tw-bg-card"
          initial={{ opacity: 0 }}
          animate={{
            x: sliderStyle.x,
            width: sliderStyle.width,
            opacity: sliderStyle.opacity,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}

      <ul
        className={`tw-relative tw-z-[2] tw-flex tw-list-none tw-p-0 tw-m-0 tw-gap-0 ${
          isMobile ? 'tw-flex-col tw-items-center tw-gap-4' : 'tw-gap-0'
        }`}
      >
        {navigationItems.map((item, index) => (
          <motion.li
            key={item.name}
            variants={linkVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.3, delay: isMobile ? index * 0.1 : 0 }}
          >
            <a
              href={item.path}
              ref={(el) => {
                if (el) linkRefs.current.set(item.name, el);
              }}
              onClick={() => setMobileToggle(false)}
              onMouseEnter={() => handleMouseEnter(item.name)}
              className={`tw-relative tw-z-[2] tw-block tw-rounded-[20px] tw-px-4 tw-py-2.5 tw-text-sm tw-font-medium tw-transition-colors tw-duration-300 ${
                hoveredItem === item.name || window.location.hash === item.path
                  ? 'tw-text-text'
                  : 'tw-text-muted'
              }`}
            >
              {item.name}
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

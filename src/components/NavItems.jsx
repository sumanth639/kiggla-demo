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
  textColor = 'tw-text-text', // Accept textColor prop from Header
}) {
  const navigationItems = [
    { name: 'Home', path: '#home' },
    { name: 'About Us', path: '#about-us' },
    { name: 'Services', path: '#services' },
    { name: 'Impact', path: '#impact' },
    { name: 'Contact Us', path: '#contact' },
  ];

  const linkVariants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  // Dynamic text colors based on state and theme
  const getTextClasses = (item) => {
    const isActive =
      hoveredItem === item.name || window.location.hash === item.path;

    if (isMobile) {
      // Mobile menu - always use theme-appropriate colors
      return isActive ? 'tw-text-primary' : 'tw-text-text';
    }

    // Desktop navigation
    if (textColor === 'tw-text-white') {
      // When header is transparent, use white/gray variants
      return isActive
        ? 'tw-text-white tw-font-semibold'
        : 'tw-text-white/80 hover:tw-text-white';
    } else {
      // When header has background, use theme colors
      return isActive ? 'tw-text-primary' : 'tw-text-muted hover:tw-text-text';
    }
  };

  const getContainerClasses = () => {
    if (isMobile) {
      return 'tw-w-full tw-rounded-none tw-bg-transparent tw-p-0';
    }

    // For desktop, adjust background based on header state
    if (textColor === 'tw-text-white') {
      // Transparent header state - use glassmorphic effect
      return 'tw-rounded-[25px] tw-bg-black/10 tw-p-1 tw-backdrop-blur-xl tw-border tw-border-white/10';
    } else {
      // Solid header state - use theme background
      return 'tw-rounded-[25px] tw-bg-card/50 tw-p-1 tw-backdrop-blur-md tw-border-2 tw-border-border/30';
    }
  };

  return (
    <div
      ref={navContainerRef}
      className={`nav-container-with-slider tw-relative tw-inline-block ${getContainerClasses()}`}
      onMouseLeave={handleNavMouseLeave}
    >
      {!isMobile && (
        <motion.div
          className={`nav-slider tw-absolute tw-left-1 tw-top-1 tw-bottom-1 tw-rounded-[20px] tw-shadow-lg ${
            textColor === 'tw-text-white'
              ? 'tw-bg-white/15 tw-border tw-border-white/20 tw-backdrop-blur-sm'
              : 'tw-bg-card tw-border tw-border-primary/20'
          }`}
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
              onMouseEnter={() =>
                handleMouseEnter && handleMouseEnter(item.name)
              }
              className={`tw-relative tw-z-[2] tw-block tw-rounded-[20px] tw-px-4 tw-py-2.5 tw-text-sm tw-font-medium tw-transition-all tw-duration-300 ${getTextClasses(
                item
              )} ${isMobile ? 'tw-text-lg tw-py-3' : ''}`}
            >
              {item.name}
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

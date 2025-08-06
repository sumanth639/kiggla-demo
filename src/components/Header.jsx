import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NavItems from './NavItems';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header({ variant }) {
  const [mobileToggle, setMobileToggle] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [sliderStyle, setSliderStyle] = useState({
    x: 0,
    width: 0,
    opacity: 0,
  });

  const navContainerRef = useRef(null);
  const linkRefs = useRef(new Map());

  // Use state to track the active hash
  const [activeHash, setActiveHash] = useState(window.location.hash || '#home');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = currentScrollPos < prevScrollPos;
      if (currentScrollPos > 100) {
        setIsSticky(isScrollingUp);
      } else {
        setIsSticky(true);
      }
      setPrevScrollPos(currentScrollPos);
    };

    const handleHashChange = () => {
      setActiveHash(window.location.hash || '#home');
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    const currentLink = linkRefs.current.get(
      activeHash === '#home'
        ? 'Home'
        : activeHash === '#about-us'
        ? 'About Us'
        : activeHash === '#project'
        ? 'Project'
        : activeHash === '#services'
        ? 'Services'
        : activeHash === '#blog'
        ? 'Blog'
        : null
    );

    if (currentLink && navContainerRef.current) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const linkRect = currentLink.getBoundingClientRect();
      const x = linkRect.left - containerRect.left - 4;
      const width = linkRect.width;
      setSliderStyle({ x, width, opacity: 1 });
    }
  }, [activeHash, navContainerRef]);

  const updateSlider = (itemName) => {
    if (!itemName || !navContainerRef.current) {
      setSliderStyle({ x: 0, width: 0, opacity: 0 });
      return;
    }
    const linkElement = linkRefs.current.get(itemName);
    const container = navContainerRef.current;
    if (linkElement && container) {
      const containerRect = container.getBoundingClientRect();
      const linkRect = linkElement.getBoundingClientRect();
      const x = linkRect.left - containerRect.left - 4;
      const width = linkRect.width;
      setSliderStyle({ x, width, opacity: 1 });
    }
  };

  const handleMouseEnter = (itemName) => {
    setHoveredItem(itemName);
    updateSlider(itemName);
  };

  const handleNavMouseLeave = () => {
    setHoveredItem(null);
    const currentItem =
      activeHash === '#home'
        ? 'Home'
        : activeHash === '#about-us'
        ? 'About Us'
        : activeHash === '#services'
        ? 'Services'
        : activeHash === '#project'
        ? 'Project'
        : activeHash === '#blog'
        ? 'Blog'
        : null;

    if (currentItem) {
      updateSlider(currentItem);
    } else {
      setSliderStyle({ x: 0, width: 0, opacity: 0 });
    }
  };

  const isDarkMode = document.documentElement.classList.contains('dark');
  const logoSrc =
    isSticky && prevScrollPos > 100
      ? isDarkMode
        ? '/assets/img/kiggla/logo-whitefull.png'
        : '/assets/img/kiggla/logo-black.png'
      : '/assets/img/kiggla/logo-white.png';

  const headerVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
    hidden: {
      y: '-100%',
      opacity: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  const mobileMenuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 40 },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  const lineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 8 },
  };

  const lineCenterVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const lineBottomVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -8 },
  };

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="visible"
        animate={isSticky ? 'visible' : 'hidden'}
        className={`tw-fixed tw-left-0 tw-top-0 tw-z-[101] tw-w-full ${
          prevScrollPos > 100
            ? 'tw-bg-background tw-shadow-lg'
            : 'tw-bg-background/90'
        } ${variant || ''}`}
      >
        <div className="tw-container tw-mx-auto tw-px-4 lg:tw-px-8">
          <div className="tw-flex tw-h-[90px] tw-items-center tw-justify-between">
            <div className="tw-flex-shrink-0">
              <a href="#home" className="tw-block">
                <img src={logoSrc} alt="Logo" className="tw-max-w-[130px]" />
              </a>
            </div>
            <div className="tw-flex-grow tw-flex-1 tw-hidden lg:tw-flex tw-justify-center">
              <NavItems
                setMobileToggle={setMobileToggle}
                navContainerRef={navContainerRef}
                linkRefs={linkRefs}
                handleMouseEnter={handleMouseEnter}
                handleNavMouseLeave={handleNavMouseLeave}
                sliderStyle={sliderStyle}
                hoveredItem={hoveredItem}
              />
            </div>
            <div className="tw-flex-shrink-0">
              <div className="tw-flex tw-items-center tw-gap-4">
                <div className="tw-hidden md:tw-block">
                  <Link
                    className="tw-bg-primary tw-text-white tw-py-3 tw-px-6 tw-rounded-full tw-font-semibold tw-transition-colors hover:tw-bg-secondary"
                    to="/contact"
                  >
                    Get Started Now <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
                <ThemeSwitcher />
                <button
                  className={`lg:tw-hidden tw-relative tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-[27px] tw-w-[30px] tw-z-[101]`}
                  onClick={() => setMobileToggle(!mobileToggle)}
                >
                  <motion.span
                    variants={lineVariants}
                    animate={mobileToggle ? 'open' : 'closed'}
                    className="tw-block tw-h-0.5 tw-w-full tw-bg-text tw-absolute tw-top-1/2 tw-left-0"
                    style={{ transformOrigin: 'center' }}
                  ></motion.span>
                  <motion.span
                    variants={lineCenterVariants}
                    animate={mobileToggle ? 'open' : 'closed'}
                    className="tw-block tw-h-0.5 tw-w-full tw-bg-text tw-absolute tw-top-1/2 tw-left-0"
                    style={{ transformOrigin: 'center' }}
                  ></motion.span>
                  <motion.span
                    variants={lineBottomVariants}
                    animate={mobileToggle ? 'open' : 'closed'}
                    className="tw-block tw-h-0.5 tw-w-full tw-bg-text tw-absolute tw-top-1/2 tw-left-0"
                    style={{ transformOrigin: 'center' }}
                  ></motion.span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileToggle && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:tw-hidden tw-fixed tw-left-0 tw-top-[90px] tw-h-screen tw-w-full tw-bg-background/95 tw-p-6 tw-z-[100] tw-overflow-y-auto"
          >
            <NavItems
              setMobileToggle={setMobileToggle}
              navContainerRef={navContainerRef}
              linkRefs={linkRefs}
              isMobile={true}
            />
            <div className="tw-mt-6 tw-text-center">
              <Link
                className="tw-bg-primary tw-text-white tw-py-3 tw-px-6 tw-rounded-full tw-font-semibold tw-transition-colors hover:tw-bg-secondary tw-w-full"
                to="/contact"
              >
                Get Started Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

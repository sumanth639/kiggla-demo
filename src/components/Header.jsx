import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Fade as Hamburger } from 'hamburger-react';
import { UserAuth } from './context/AuthContext';
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
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user, signOut } = UserAuth();
  const location = useLocation();
  const navContainerRef = useRef(null);
  const linkRefs = useRef(new Map());
  const userMenuRef = useRef(null);
  const [activeHash, setActiveHash] = useState(window.location.hash || '#home');

  // Click outside handler for user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/signup') {
      setIsSticky(false);
      return;
    }

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
  }, [prevScrollPos, location.pathname]);

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
        : activeHash === '#impact'
        ? 'Impact'
        : activeHash === '#contact'
        ? 'Contact Us'
        : null;

    if (currentItem) {
      updateSlider(currentItem);
    } else {
      setSliderStyle({ x: 0, width: 0, opacity: 0 });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isDarkMode = document.documentElement.classList.contains('dark');
  const logoSrc =
    isSticky && prevScrollPos > 100
      ? isDarkMode
        ? '/assets/img/kiggla/logo-whitefull.webp'
        : '/assets/img/kiggla/logo-black.webp'
      : '/assets/img/kiggla/logo-white.webp';

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

  const hasBackground = prevScrollPos > 100;

  const getTextColor = () => {
    if (hasBackground) {
      return 'tw-text-text';
    } else {
      return 'tw-text-white';
    }
  };

  const getLoginButtonClasses = () => {
    if (hasBackground) {
      return isDarkMode
        ? 'tw-text-white tw-border-white/30 tw-bg-white/10 hover:tw-bg-white/20 hover:tw-border-white/50'
        : 'tw-text-text tw-border-gray-300 tw-bg-gray-100 hover:tw-bg-gray-200 hover:tw-border-gray-400';
    } else {
      return 'tw-text-white tw-border-white/30 tw-bg-white/10 hover:tw-bg-white/20 hover:tw-border-white/50';
    }
  };

  // Get user avatar URL or initials
  const getUserAvatar = () => {
    if (user?.user_metadata?.avatar_url) {
      return user.user_metadata.avatar_url;
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="visible"
        animate={isSticky ? 'visible' : 'hidden'}
        className={`tw-fixed tw-left-0 tw-top-0 tw-z-[101] tw-w-full tw-transition-colors tw-duration-300 ${
          hasBackground ? 'tw-bg-background tw-shadow-lg' : 'tw-bg-transparent'
        } ${variant || ''}`}
      >
        <div className="tw-container tw-mx-auto tw-px-4 lg:tw-px-8">
          <div className="tw-relative tw-flex tw-h-[90px] tw-items-center tw-justify-between">
            {/* Logo - Left Side */}
            <div className="tw-flex-shrink-0 tw-w-auto">
              <a href="#home" className="tw-block">
                <img src={logoSrc} alt="Logo" className="tw-max-w-[130px]" />
              </a>
            </div>

            {/* Navigation - Absolutely Centered */}
            <div className="tw-absolute tw-left-1/2 tw-transform tw--translate-x-1/2 tw-hidden lg:tw-block">
              <NavItems
                setMobileToggle={setMobileToggle}
                navContainerRef={navContainerRef}
                linkRefs={linkRefs}
                handleMouseEnter={handleMouseEnter}
                handleNavMouseLeave={handleNavMouseLeave}
                sliderStyle={sliderStyle}
                hoveredItem={hoveredItem}
                textColor={getTextColor()}
              />
            </div>

            {/* User Menu or Login/Signup Buttons and Theme Switcher - Right Side */}
            <div className="tw-flex-shrink-0">
              <div className="tw-flex tw-items-center tw-gap-4">
                {user ? (
                  // User is logged in - show user menu
                  <div className="tw-relative" ref={userMenuRef}>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2  tw-rounded-full hover:tw-bg-secondary tw-transition-colors "
                    >
                      {user.user_metadata?.avatar_url ? (
                        <img
                          src={user.user_metadata.avatar_url}
                          alt="User Avatar"
                          className="tw-w-8 tw-h-8 tw-rounded-full tw-object-cover"
                        />
                      ) : (
                        <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-primary tw-text-white tw-flex tw-items-center tw-justify-center tw-font-semibold tw-text-sm">
                          {getUserAvatar()}
                        </div>
                      )}
                      <span className={`tw-hidden md:tw-block tw-font-medium ${getTextColor()}`}>
                        {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                      </span>
                    </button>

                    {/* User Dropdown Menu */}
                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="tw-absolute tw-right-0 tw-top-full tw-mt-2 tw-w-48 tw-bg-white dark:tw-bg-gray-800 tw-rounded-lg tw-shadow-lg tw-border tw-border-gray-200 dark:tw-border-gray-700 tw-py-2 tw-z-50"
                        >
                          <div className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-200 dark:tw-border-gray-700">
                            <p className="tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">
                              {user.user_metadata?.full_name || 'User'}
                            </p>
                            <p className="tw-text-xs tw-text-gray-500 dark:tw-text-gray-400">
                              {user.email}
                            </p>
                          </div>
                          <button
                            onClick={handleLogout}
                            className="tw-w-full tw-text-left tw-px-4 tw-py-2 tw-text-sm tw-text-red-600 dark:tw-text-red-400 hover:tw-bg-gray-100 dark:hover:tw-bg-gray-700 tw-transition-colors"
                          >
                            Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  // User is not logged in - show login/signup buttons
                  <div className="tw-hidden md:tw-block">
                    <Link
                      className="tw-text-white tw-bg-primary tw-py-3 tw-px-6 tw-rounded-full tw-font-semibold tw-transition-colors tw-duration-300 hover:tw-bg-secondary"
                      to="/signup"
                    >
                      Sign Up
                    </Link>
                    <Link
                      className={`tw-ml-4 tw-py-3 tw-px-6 tw-rounded-full tw-font-semibold tw-transition-all tw-duration-300 tw-backdrop-blur-sm tw-border ${getLoginButtonClasses()}`}
                      to="/login"
                    >
                      Log In
                    </Link>
                  </div>
                )}
                <ThemeSwitcher />
                <div className="lg:tw-hidden tw-z-[101]">
                  <Hamburger
                    toggled={mobileToggle}
                    toggle={setMobileToggle}
                    color={
                      hasBackground
                        ? isDarkMode
                          ? '#ffffff'
                          : '#000000'
                        : '#ffffff'
                    }
                  />
                </div>
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
            className="lg:tw-hidden tw-fixed tw-left-0 tw-top-[90px] tw-h-screen tw-w-full tw-bg-background tw-border-t tw-border-border tw-p-6 tw-z-[100] tw-overflow-y-auto"
          >
            <NavItems
              setMobileToggle={setMobileToggle}
              navContainerRef={navContainerRef}
              linkRefs={linkRefs}
              isMobile={true}
              textColor="tw-text-text"
            />
            {user ? (
              // Mobile user menu
              <div className="tw-mt-6 tw-text-center tw-flex tw-flex-col tw-gap-4">
                <div className="tw-flex tw-items-center tw-justify-center tw-gap-3 tw-p-4 tw-bg-gray-50 dark:tw-bg-gray-800 tw-rounded-lg">
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="User Avatar"
                      className="tw-w-12 tw-h-12 tw-rounded-full tw-object-cover"
                    />
                  ) : (
                    <div className="tw-w-12 tw-h-12 tw-rounded-full tw-bg-primary tw-text-white tw-flex tw-items-center tw-justify-center tw-font-semibold tw-text-lg">
                      {getUserAvatar()}
                    </div>
                  )}
                  <div className="tw-text-left">
                    <p className="tw-font-medium tw-text-text">
                      {user.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="tw-text-sm tw-text-muted">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileToggle(false);
                  }}
                  className="tw-bg-red-500 tw-text-white tw-py-3 tw-px-6 tw-rounded-full tw-font-semibold tw-transition-colors hover:tw-bg-red-600 tw-w-full"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              // Mobile login/signup buttons
              <div className="tw-mt-6 tw-text-center tw-flex tw-flex-col tw-gap-4">
                <Link
                  className="tw-bg-primary tw-text-white tw-py-3 tw-px-6 tw-rounded-full tw-font-semibold tw-transition-colors hover:tw-bg-secondary tw-w-full"
                  to="/signup"
                  onClick={() => setMobileToggle(false)}
                >
                  Sign Up Now
                </Link>
                <Link
                  className="tw-text-primary tw-font-semibold hover:tw-underline tw-py-2"
                  to="/login"
                  onClick={() => setMobileToggle(false)}
                >
                  Log In
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

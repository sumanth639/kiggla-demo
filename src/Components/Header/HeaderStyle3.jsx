import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Nav from './Nav';

export default function HeaderStyle3({ variant }) {
  const [mobileToggle, setMobileToggle] = useState(false);
  const [isSticky, setIsSticky] = useState();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [sliderStyle, setSliderStyle] = useState({});

  const navContainerRef = useRef(null);
  const linkRefs = useRef(new Map());
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > prevScrollPos) {
        setIsSticky('cs-gescout_sticky');
      } else if (currentScrollPos !== 0) {
        setIsSticky('cs-gescout_show cs-gescout_sticky');
      } else {
        setIsSticky();
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const updateSlider = (itemName) => {
    if (!itemName || !navContainerRef.current) {
      setSliderStyle({ opacity: 0 });
      return;
    }

    const linkElement = linkRefs.current.get(itemName);
    const container = navContainerRef.current;

    if (linkElement && container) {
      const containerRect = container.getBoundingClientRect();
      const linkRect = linkElement.getBoundingClientRect();

      // Account for container padding
      const left = linkRect.left - containerRect.left - 4; // 4px is the container padding
      const width = linkRect.width;

      setSliderStyle({
        opacity: 1,
        transform: `translateX(${left}px)`,
        width: `${width}px`,
      });
    }
  };

  const handleMouseEnter = (itemName) => {
    setHoveredItem(itemName);
    updateSlider(itemName);
  };

  const handleNavMouseLeave = () => {
    setHoveredItem(null);
    setSliderStyle({ opacity: 0 });
  };

  // Determine the logo source based on the isSticky state
  const logoSrc = isSticky
    ? '/assets/img/kiggla/logo-black.png'
    : '/assets/img/kiggla/logo-white.png';

  return (
    <header
      className={`cs_site_header header_style_3 cs_style_1 ${
        variant ? variant : ''
      } cs_sticky_header cs_site_header_full_width ${
        mobileToggle ? 'cs_mobile_toggle_active' : ''
      } ${isSticky ? isSticky : ''}`}
    >
      <div className="cs_main_header ">
        <div className="container">
          <div className="cs_main_header_in">
            <div className="cs_main_header_left">
              <Link to="/" className="cs_site_branding site_logo_2">
                <img src={logoSrc} alt="Logo" />
              </Link>
            </div>
            <div className="cs_main_header_center">
              <div className="cs_nav cs_primary_font fw-medium">
                <span
                  className={
                    mobileToggle
                      ? 'cs-munu_toggle cs_teggle_active'
                      : 'cs-munu_toggle'
                  }
                  onClick={() => setMobileToggle(!mobileToggle)}
                >
                  <span></span>
                </span>
                <Nav
                  setMobileToggle={setMobileToggle}
                  navContainerRef={navContainerRef}
                  linkRefs={linkRefs}
                  handleMouseEnter={handleMouseEnter}
                  handleNavMouseLeave={handleNavMouseLeave}
                  sliderStyle={sliderStyle}
                  hoveredItem={hoveredItem}
                  currentPath={location.pathname}
                />
              </div>
            </div>
            <div className="cs_main_header_right header-right2">
              <div className="header2-buttons">
                <div className="button">
                  <Link className="theme-btn4 btn2--ripple" to="/contact">
                    Get Started Now <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

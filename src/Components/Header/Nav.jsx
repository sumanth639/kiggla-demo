import { Link } from 'react-router-dom';

export default function Nav({
  setMobileToggle,
  navContainerRef,
  linkRefs,
  handleMouseEnter,
  handleNavMouseLeave,
  sliderStyle,
  hoveredItem,
  currentPath,
}) {
  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Project', path: '/project' },
    { name: 'Services', path: '/service' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <div
      ref={navContainerRef}
      className="nav-container-with-slider"
      onMouseLeave={handleNavMouseLeave}
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: '4px',
        borderRadius: '25px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Sliding background */}
      <div
        className="nav-slider"
        style={{
          position: 'absolute',
          top: '4px',
          bottom: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0,
          ...sliderStyle,
        }}
      />

      <ul
        className="cs_nav_list fw-medium"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          gap: 0,
        }}
      >
        {navigationItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              ref={(el) => {
                if (el) linkRefs.current.set(item.name, el);
              }}
              onClick={() => setMobileToggle(false)}
              onMouseEnter={() => handleMouseEnter(item.name)}
              style={{
                position: 'relative',
                zIndex: 2,
                padding: '10px 18px',
                borderRadius: '20px',
                transition: 'all 0.3s ease',
                display: 'block',
                textDecoration: 'none',
                color:
                  hoveredItem === item.name || currentPath === item.path
                    ? '#ffffff'
                    : 'inherit',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

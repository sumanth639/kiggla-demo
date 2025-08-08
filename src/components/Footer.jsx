import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaEnvelope,
  FaPhoneAlt, // Changed from FaPhone to FaPhoneAlt
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaArrowUp,
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="tw-bg-gray-950 tw-text-gray-400 tw-py-12 md:tw-py-16 tw-relative">
      {/* Subtle Gradient Background */}
      <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-gray-900 tw-to-transparent tw-opacity-20"></div>

      <div className="tw-container tw-mx-auto tw-px-6 lg:tw-px-12 tw-relative tw-z-10">
        {/* Main Footer Content */}
        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-justify-between tw-gap-12 lg:tw-gap-24 tw-pb-10 md:tw-pb-12 tw-border-b tw-border-gray-800">
          {/* Left Side: Logo, Info, and Social Media */}
          <div className="tw-space-y-6 lg:tw-w-3/12">
            <div className="tw-flex tw-items-center">
              <img
                src="/assets/img/kiggla/logo-white.webp"
                alt="Kiggla Logo"
                className="tw-h-12 tw-w-auto"
              />
            </div>
            <p className="tw-text-base tw-leading-relaxed tw-max-w-sm">
              At Kiggla IT Solutions, we are dedicated to delivering innovative
              technology solutions tailored to meet the unique needs of
              businesses.
            </p>

            {/* <h4 className="tw-text-xl tw-font-semibold tw-text-white tw-mt-6 tw-mb-4">
              Follow Us
            </h4>
            <div className="tw-flex tw-space-x-6">
              <a
                href="#"
                aria-label="LinkedIn"
                className="transition-colors tw-text-gray-400 hover:tw-text-primary"
              >
                <FaLinkedin className="tw-h-6 tw-w-6" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="transition-colors tw-text-gray-400 hover:tw-text-primary"
              >
                <FaTwitter className="tw-h-6 tw-w-6" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="transition-colors tw-text-gray-400 hover:tw-text-primary"
              >
                <FaInstagram className="tw-h-6 tw-w-6" />
              </a>
            </div> */}
          </div>

          {/* Right Side: Links & Contact Info */}
          <div className="tw-grid tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8 lg:tw-gap-16 tw-w-full lg:tw-w-9/12">
            {/* Quick Links */}
            <div>
              <h4 className="tw-text-xl tw-font-semibold tw-text-white tw-mb-4">
                Quick Links
              </h4>
              <ul className="tw-space-y-2">
                <li>
                  <Link
                    to="#"
                    className="transition-colors tw-text-base hover:tw-text-primary"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="transition-colors tw-text-base hover:tw-text-primary"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="transition-colors tw-text-base hover:tw-text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="transition-colors tw-text-base hover:tw-text-primary"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="tw-text-xl tw-font-semibold tw-text-white tw-mb-4">
                Services
              </h4>
              <ul className="tw-space-y-2">
                <li>
                  <Link
                    to="#"
                    className="transition-colors tw-text-base hover:tw-text-primary"
                  >
                    Web Dev
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="transition-colors tw-text-base hover:tw-text-primary"
                  >
                    UI/UX Design
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="transition-colors tw-text-base hover:tw-text-primary"
                  >
                    Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="transition-colors tw-text-base hover:tw-text-primary"
                  >
                    IT Consulting
                  </Link>
                </li>
              </ul>
            </div>

            {/* Let's Talk & Contact Info */}
            <div className="tw-col-span-2 lg:tw-col-span-1">
              <h4 className="tw-text-xl tw-font-semibold tw-text-white tw-mb-4">
                Let's Talk
              </h4>
              <div className="tw-space-y-4">
                {/* Email Card */}
                <div className="duration-300 tw-flex tw-items-center tw-space-x-3 tw-bg-gray-800 tw-p-3 tw-rounded-lg tw-transition-colors hover:tw-bg-gray-700 tw-max-w-xs">
                  <FaEnvelope className="tw-text-primary tw-flex-shrink-0 tw-h-5 tw-w-5" />
                  <a
                    href="mailto:andrew@kiggla.com"
                    className="transition-colors tw-text-base tw-font-medium hover:tw-text-white tw-truncate"
                  >
                    andrew@kiggla.com
                  </a>
                </div>
                {/* Phone Card */}
                <div className="duration-300 tw-flex tw-items-center tw-space-x-3 tw-bg-gray-800 tw-p-3 tw-rounded-lg tw-transition-colors hover:tw-bg-gray-700 tw-max-w-xs">
                  <FaPhoneAlt className="tw-text-primary tw-flex-shrink-0 tw-h-5 tw-w-5" />
                  <a
                    href="tel:+1215797034"
                    className="transition-colors tw-text-base tw-font-medium hover:tw-text-white"
                  >
                    +1215797034
                  </a>
                </div>
                {/* Address Card */}
                <div className="duration-300 tw-flex tw-items-start tw-space-x-3 tw-bg-gray-800 tw-p-3 tw-rounded-lg tw-transition-colors hover:tw-bg-gray-700 tw-max-w-xs">
                  <FaMapMarkerAlt className="tw-text-primary tw-flex-shrink-0 tw-h-5 tw-w-5 tw-mt-1" />
                  <p className="tw-text-base tw-font-medium">
                    5400 NW 22nd Ave, Miami, FL 33142
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Developer Credit */}
        <div className="tw-pt-8 tw-text-center">
          <div className="tw-text-base tw-text-gray-500 tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-center tw-space-y-2 md:tw-space-y-0 md:tw-space-x-4">
            <p className="tw-mb-0">
              © {currentYear} Kiggla. All rights reserved.
            </p>
            <span className="tw-hidden md:tw-block">|</span>
            <p className="tw-mb-0">
              Designed and developed by{' '}
              <a
                href="https://www.leanitech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:tw-text-primary"
              >
                Leanitech
              </a>
            </p>
          </div>
        </div>

        {/* Back to Top Arrow */}
        <a
          href="#"
          className="transition-colors tw-fixed tw-bottom-6 tw-right-6 tw-inline-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-full tw-bg-gray-800 hover:tw-bg-primary"
        >
          <FaArrowUp className="tw-text-lg tw-text-white" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

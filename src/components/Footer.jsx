import React, { useState, useRef } from 'react';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaArrowUp,
} from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const thumbnailRefs = useRef({});

  const galleryImages = [
    {
      id: 1,
      thumb: '/assets/img/kiggla/gallery/img-1.webp',
      full: '/assets/img/kiggla/gallery/img-1.webp',
      alt: 'Gallery Image 1',
    },
    {
      id: 2,
      thumb: '/assets/img/kiggla/gallery/img-2.webp',
      full: '/assets/img/kiggla/gallery/img-2.webp',
      alt: 'Gallery Image 2',
    },
    {
      id: 3,
      thumb: '/assets/img/kiggla/gallery/img-3.webp',
      full: '/assets/img/kiggla/gallery/img-3.webp',
      alt: 'Gallery Image 3',
    },
    {
      id: 4,
      thumb: '/assets/img/kiggla/gallery/img-4.webp',
      full: '/assets/img/kiggla/gallery/img-4.webp',
      alt: 'Gallery Image 4',
    },
    {
      id: 5,
      thumb: '/assets/img/kiggla/gallery/img-5.webp',
      full: '/assets/img/kiggla/gallery/img-5.webp',
      alt: 'Gallery Image 5',
    },
    {
      id: 6,
      thumb: '/assets/img/kiggla/gallery/img-6.webp',
      full: '/assets/img/kiggla/gallery/img-6.webp',
      alt: 'Gallery Image 6',
    },
  ];

  const openModal = (image, event) => {
    const thumbnail = thumbnailRefs.current[image.id];
    if (thumbnail) {
      const rect = thumbnail.getBoundingClientRect();
      setClickPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
  };

  const getInitialPosition = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    return {
      x: clickPosition.x - centerX,
      y: clickPosition.y - centerY,
      scale: 0.1,
    };
  };

  return (
    <footer className="tw-bg-gray-950 tw-text-gray-400 tw-py-16 tw-relative">
      {/* Subtle Gradient Background */}
      <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-gray-900 tw-to-transparent tw-opacity-20"></div>

      <div className="tw-container tw-mx-auto tw-px-6 lg:tw-px-12 tw-relative tw-z-10">
        {/* Main Footer Content */}
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-12 tw-pb-12 tw-border-b tw-border-gray-800">
          {/* Left Side: Logo, Info, and Social Media */}
          <div className="lg:tw-col-span-4 tw-space-y-8">
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
            {/* <div>
              <h4 className="tw-text-xl tw-font-semibold tw-text-white tw-mb-6">
                Follow Us
              </h4>
              <div className="tw-flex tw-space-x-6">
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="tw-transition-all tw-duration-300 tw-text-gray-400 hover:tw-text-blue-400 hover:tw-scale-110"
                >
                  <FaLinkedin className="tw-h-6 tw-w-6" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="tw-transition-all tw-duration-300 tw-text-gray-400 hover:tw-text-blue-400 hover:tw-scale-110"
                >
                  <FaTwitter className="tw-h-6 tw-w-6" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="tw-transition-all tw-duration-300 tw-text-gray-400 hover:tw-text-pink-400 hover:tw-scale-110"
                >
                  <FaInstagram className="tw-h-6 tw-w-6" />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="tw-transition-all tw-duration-300 tw-text-gray-400 hover:tw-text-blue-600 hover:tw-scale-110"
                >
                  <FaFacebookF className="tw-h-6 tw-w-6" />
                </a>
              </div>
            </div> */}
          </div>

          {/* Contact Section */}
          <div className="lg:tw-col-span-4">
            <h4 className="tw-text-xl tw-font-semibold tw-text-white tw-mb-6">
              Let's Talk
            </h4>
            <div className="tw-space-y-4">
              {/* Email Card */}
              <div className="tw-flex tw-items-center tw-space-x-4 tw-bg-gray-800 tw-p-4 tw-rounded-xl tw-transition-all tw-duration-300 hover:tw-bg-gray-700 hover:tw-scale-105">
                <div className="tw-bg-primary tw-p-2 tw-rounded-lg tw-flex-shrink-0">
                  <FaEnvelope className="tw-text-white tw-h-4 tw-w-4" />
                </div>
                <a
                  href="mailto:andrew@kiggla.com"
                  className="tw-text-gray-300 hover:tw-text-white tw-transition-colors tw-duration-300 tw-font-medium"
                >
                  andrew@kiggla.com
                </a>
              </div>

              {/* Phone Card */}
              <div className="tw-flex tw-items-center tw-space-x-4 tw-bg-gray-800 tw-p-4 tw-rounded-xl tw-transition-all tw-duration-300 hover:tw-bg-gray-700 hover:tw-scale-105">
                <div className="tw-bg-secondary tw-p-2 tw-rounded-lg tw-flex-shrink-0">
                  <FaPhoneAlt className="tw-text-white tw-h-4 tw-w-4" />
                </div>
                <a
                  href="tel:+1 940 275 1336"
                  className="tw-text-gray-300 hover:tw-text-white tw-transition-colors tw-duration-300 tw-font-medium"
                >
                  +1 940 275 1336
                </a>
              </div>

              {/* Address Card */}
              <div className="tw-flex tw-items-start tw-space-x-4 tw-bg-gray-800 tw-p-4 tw-rounded-xl tw-transition-all tw-duration-300 hover:tw-bg-gray-700 hover:tw-scale-105">
                <div className="tw-bg-red-500 tw-p-2 tw-rounded-lg tw-flex-shrink-0 tw-mt-0">
                  <FaMapMarkerAlt className="tw-text-white tw-h-4 tw-w-4" />
                </div>
                <p className="tw-text-gray-300 tw-font-medium tw-leading-relaxed">
                  5400 NW 22nd Ave, Miami, FL 33142
                </p>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="lg:tw-col-span-4">
            <h4 className="tw-text-xl tw-font-semibold tw-text-white tw-mb-6">
              Our Gallery
            </h4>
            <div className="tw-grid tw-grid-cols-3 tw-gap-3">
              {galleryImages.map((image) => (
                <button
                  key={image.id}
                  ref={(el) => (thumbnailRefs.current[image.id] = el)}
                  onClick={(e) => openModal(image, e)}
                  className="tw-relative tw-overflow-hidden tw-group tw-block tw-rounded-xl tw-aspect-square tw-transition-all tw-duration-300 hover:tw-scale-105 hover:tw-shadow-xl focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-400"
                >
                  <img
                    src={image.thumb}
                    alt={image.alt}
                    className="tw-w-full tw-h-full tw-object-cover tw-transition-transform tw-duration-300 group-hover:tw-scale-110"
                  />
                  <div className="tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-0 group-hover:tw-bg-opacity-30 tw-transition-all tw-duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Developer Credit */}
        <div className="tw-pt-8 tw-text-center">
          <div className="tw-text-sm tw-text-gray-500 tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-center tw-space-y-2 md:tw-space-y-0 md:tw-space-x-4">
            <p className="tw-mb-0">
              © {currentYear} Kiggla. All rights reserved.
            </p>
            <span className="tw-hidden md:tw-block tw-text-gray-600">|</span>
            <p className="tw-mb-0">
              Designed and developed by{' '}
              <a
                href="https://www.leanitech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="tw-text-blue-400 hover:tw-text-blue-300 tw-transition-colors tw-duration-300 tw-font-medium"
              >
                Leanitech
              </a>
            </p>
          </div>
        </div>

        {/* Back to Top Arrow */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="tw-fixed tw-bottom-8 tw-right-8 tw-inline-flex tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded-full tw-bg-gray-800 hover:tw-bg-secondary tw-transition-all tw-duration-300 hover:tw-scale-110 tw-shadow-lg hover:tw-shadow-xl tw-z-40"
        >
          <FaArrowUp className="tw-text-lg tw-text-white" />
        </button>
      </div>

      {/* Modal for image enlargement with zoom animation */}
      <AnimatePresence mode="wait">
        {isModalOpen && selectedImage && (
          <motion.div
            className="tw-fixed tw-inset-0 tw-z-50 tw-bg-black tw-bg-opacity-80 tw-backdrop-blur-sm tw-flex tw-items-center tw-justify-center tw-p-4"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.div
              className="tw-relative tw-flex tw-items-center tw-justify-center"
              onClick={(e) => e.stopPropagation()}
              initial={getInitialPosition()}
              animate={{
                x: 0,
                y: 0,
                scale: 1,
              }}
              exit={getInitialPosition()}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth zoom
              }}
            >
              <button
                className="tw-absolute tw-top-4 tw-right-4 tw-text-white tw-text-3xl tw-font-bold tw-p-2 tw-rounded-full tw-bg-black tw-bg-opacity-50 hover:tw-bg-opacity-70 tw-transition-all tw-duration-200 tw-z-10"
                onClick={closeModal}
              >
                ×
              </button>
              <img
                src={selectedImage.full}
                alt={selectedImage.alt}
                className="tw-max-w-[90vw] tw-max-h-[90vh] tw-object-contain tw-rounded-lg tw-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;

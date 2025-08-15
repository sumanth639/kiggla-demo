import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const teamMembers = [
  { name: 'John Smith', role: 'Solutions Architect', imageSeed: 'person1' },
  { name: 'Michael Brown', role: 'UX/UI Specialist', imageSeed: 'person2' },
  {
    name: 'Liam Parker',
    role: 'Digital Strategy Consultant',
    imageSeed: 'person3',
  },
  {
    name: 'Emma Sullivan',
    role: 'Technology Delivery Manager',
    imageSeed: 'person4',
  },
  {
    name: 'Ethan Reynolds',
    role: 'Cybersecurity Consultant',
    imageSeed: 'person5',
  },
  {
    name: 'Ava Brooks',
    role: 'Cloud Infrastructure Engineer',
    imageSeed: 'person6',
  },
  {
    name: 'Mason Carter',
    role: 'AI & Machine Learning Expert',
    imageSeed: 'person7',
  },
  { name: 'Emma Evans', role: 'Client Engagement Lead', imageSeed: 'person8' },
];

const TeamSlider = () => {
  return (
    <section id="team">
      <div className="tw-relative tw-bg-background tw-text-text tw-pb-12 tw-pt-0 ">
        <div className="tw-container tw-mx-auto tw-px-6">
          {/* Section Header */}
          <div className="tw-text-center tw-mb-10 lg:tw-mb-12">
            <motion.span
              className="tw-text-sm tw-font-bold tw-uppercase tw-tracking-widest tw-text-primary tw-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              Our Team
            </motion.span>

            <motion.h2
              className="tw-mt-3 tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Meet Our Experts
            </motion.h2>
          </div>
          {/* Slider Container */}
          <div className="tw-relative tw-max-w-7xl tw-mx-auto">
            <div className=" tw-justify-end tw-mb-6 tw-pr-6 lg:tw-pr-0 tw-hidden md:tw-flex">
              <div className="tw-flex tw-gap-4 tw-items-center">
                {/* Previous Button */}
                <button
                  className="swiper-prev-btn tw-p-2 tw-relative tw-w-12 tw-h-12 tw-rounded-full tw-shadow-md tw-overflow-hidden tw-group"
                  aria-label="Previous slide"
                >
                  <div className="tw-absolute tw-inset-0 tw-rounded-full tw-border-2 tw-border-primary tw-border-dotted tw-animate-spin-slow tw-transition-all tw-duration-300 group-hover:tw-scale-110 group-hover:tw-animate-none"></div>

                  <FaChevronLeft className="tw-absolute tw-inset-0 tw-m-auto tw-text-lg tw-transition-all tw-duration-300 group-hover:tw-scale-125" />
                </button>
                {/* Next Button */}
                <button
                  className="swiper-next-btn tw-p-2 tw-relative tw-w-12 tw-h-12 tw-rounded-full tw-shadow-md tw-overflow-hidden tw-group"
                  aria-label="Next slide"
                >
                  <div className="tw-absolute tw-inset-0 tw-rounded-full tw-border-2 tw-border-primary tw-border-dotted tw-animate-spin-slow tw-transition-all tw-duration-300 group-hover:tw-scale-110 group-hover:tw-animate-none"></div>

                  <FaChevronRight className="tw-absolute tw-inset-0 tw-m-auto tw-text-lg tw-transition-all tw-duration-300 group-hover:tw-scale-125" />
                </button>
              </div>
            </div>

            <Swiper
              modules={[Navigation, A11y, Autoplay]}
              spaceBetween={30}
              slidesPerView={1.5}
              centeredSlides={false}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
                1280: { slidesPerView: 4, spaceBetween: 30 },
              }}
              navigation={{
                nextEl: '.swiper-next-btn',
                prevEl: '.swiper-prev-btn',
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="mySwiper"
            >
              {teamMembers.map((member, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    className="tw-bg-card tw-rounded-xl tw-shadow-lg tw-overflow-hidden tw-relative tw-group tw-cursor-pointer tw-h-full"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="tw-relative tw-w-full tw-aspect-square tw-overflow-hidden">
                      <img
                        src={`/assets/img/kiggla/teams/img-${index + 1}.jpg`}
                        alt={member.name}
                        className="tw-w-full tw-h-full tw-object-cover tw-grayscale tw-transition-all tw-duration-500 tw-ease-in-out group-hover:tw-grayscale-0 group-hover:tw-scale-105"
                      />

                      <div className="tw-absolute tw-inset-0 tw-bg-primary/20 tw-opacity-0 tw-transition-opacity tw-duration-500 group-hover:tw-opacity-100"></div>
                    </div>

                    <div className="tw-p-6 tw-text-center tw-relative tw-z-10 tw-bg-card tw-transition-transform tw-duration-500 tw-ease-in-out group-hover:tw-translate-y-[-10px]">
                      <h3 className="tw-text-xl tw-font-semibold tw-text-text">
                        {member.name}
                      </h3>

                      <p className="tw-mt-1 tw-text-sm tw-font-medium tw-text-muted">
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSlider;

import React from 'react';

const logos = Array.from({ length: 20 }, (_, i) => {
  const index = i + 1;
  return `/assets/img/kiggla/marquee/logo-${index}.png`;
});

const Marquee = () => {
  const row1Logos = logos.slice(0, 10);
  const row2Logos = logos.slice(10, 20);

  return (
    <div className="tw-bg-white tw-bg-background tw-py-12 tw-overflow-hidden tw-relative tw-w-full">
      <div className="tw-container tw-mx-auto tw-px-6 sm:tw-px-8 md:tw-px-16">
        <p className="tw-text-center tw-text-gray-800 tw-text-lg tw-font-semibold tw-tracking-widest tw-text-muted tw-uppercase tw-mb-8">
          Trusted by leading innovators
        </p>
      </div>

      <div className="tw-flex tw-flex-col tw-space-y-8">
        <div className="tw-h-24 tw-flex tw-items-center tw-relative tw-overflow-hidden">
          <div className="marquee-row-1 tw-flex tw-space-x-8 tw-whitespace-nowrap">
            {[...row1Logos, ...row1Logos].map((src, i) => (
              <img
                key={`row1-${i}`}
                src={src}
                alt={`Partner logo ${(i % row1Logos.length) + 1}`}
                className="tw-h-24 md:tw-h-36 tw-w-auto tw-object-contain tw-transition-all tw-duration-300 hover:tw-scale-110 tw-filter dark:tw-brightness-0 dark:tw-invert tw-opacity-70 hover:tw-opacity-100 tw-flex-shrink-0"
                style={{ minWidth: '150px' }}
              />
            ))}
          </div>
        </div>
        {/* Row 2 - Moving right to left */}
        <div className="tw-h-24 tw-flex tw-items-center tw-relative tw-overflow-hidden">
          <div className="marquee-row-2 tw-flex tw-space-x-8 tw-whitespace-nowrap">
            {/* Create enough duplicates for a seamless loop */}
            {[...row2Logos, ...row2Logos].map((src, i) => (
              <img
                key={`row2-${i}`}
                src={src}
                alt={`Partner logo ${(i % row2Logos.length) + 11}`}
                className="tw-h-24 md:tw-h-36 tw-w-auto tw-object-contain tw-transition-all tw-duration-300 hover:tw-scale-110 tw-filter dark:tw-brightness-0 dark:tw-invert tw-opacity-70 hover:tw-opacity-100 tw-flex-shrink-0"
                style={{ minWidth: '150px' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;

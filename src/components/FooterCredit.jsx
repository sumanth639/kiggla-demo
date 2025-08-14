import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const FooterCredit = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="tw-bg-gray-950 tw-text-gray-400 tw-py-8 tw-relative">
           
      <div className="tw-container tw-mx-auto tw-px-6 lg:tw-px-12 tw-text-center">
                {/* Bottom Section: Copyright & Developer Credit */}       
        <div className="tw-text-sm tw-text-gray-500 tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-center tw-space-y-2 md:tw-space-y-0 md:tw-space-x-4">
                   
          <p className="tw-mb-0">
                        © {currentYear} <span className='tw-text-primary'>Kiggla.</span> All rights reserved.          
          </p>
                   
          <span className="tw-hidden md:tw-block tw-text-gray-600">|</span>     
             
          <p className="tw-mb-0">
                        Designed and developed by{" "}       
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
                {/* Back to Top Arrow */}       
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="tw-fixed tw-bottom-8 tw-right-8 tw-inline-flex tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded-full tw-bg-gray-800 hover:tw-bg-secondary tw-transition-all tw-duration-300 hover:tw-scale-110 tw-shadow-lg hover:tw-shadow-xl tw-z-40"
        >
                    <FaArrowUp className="tw-text-lg tw-text-white" />       
        </button>
             
      </div>
         
    </div>
  );
};

export default FooterCredit;

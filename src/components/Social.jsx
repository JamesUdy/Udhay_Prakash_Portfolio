import React from 'react';

import socialMediaLinks from './SocialMedia';

import { Link } from 'react-router-dom';

const Social = () => {
  return (
    <section className="absolute lg:top-[19.2rem] top-44 sm:top-28 left-6 flex flex-col space-y-4 px-2 py-4 rounded-full ring-2 bg-[#0006] ring-[#ffffff3e] backdrop-filter backdrop-blur-sm">
        {socialMediaLinks.map((link) => {
            return (
                <Link to={link.url} key={link.id} target="_blank" rel="noopener noreferrer">
                    <img src={link.icon} alt={link.siteName} className="w-6 h-6" />
                </Link>
            )
        })}        
    </section>
  )
};

export default Social;
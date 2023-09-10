import React from 'react';

import socialMediaLinks from './SocialMediaLinks';

import { Link } from 'react-router-dom';

const Social = () => {
  return (
    <section className="absolute left-0 right-0 mx-auto top-[90%] sm:top-[94%] lg:top-[90%] flex flex-row justify-around py-2 lg:px-1 lg:py-3 w-56 lg:w-72 rounded-full ring-2 bg-[#1e1c1c66] hover:bg-[#302f2f66] ring-[#4c4c4c3e] hover:ring-[#2e2c2cd7] ease-in duration-200 backdrop-filter backdrop-blur-lg">
        {socialMediaLinks.map((link) => {
            return (
                <Link to={link.url} key={link.id} target="_blank" rel="noopener noreferrer">
                    <span className='rounded-full'>
                      {<link.icon />}
                    </span>
                </Link>
            )
        })}        
    </section>
  )
};

export default Social;
import React from 'react';

import socialMediaLinks from './SocialMedia';

import { Link } from 'react-router-dom';

const Social = () => {
  return (
    <section className="absolute left-0 right-0 mx-auto top-[90%] flex flex-row justify-around px-1 py-3 w-72 rounded-full ring-2 bg-[#1e1c1c66] hover:bg-[#302f2f66] ring-[#4c4c4c3e] hover:ring-[#0d858e3e] ease-in duration-200 backdrop-filter backdrop-blur-sm">
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
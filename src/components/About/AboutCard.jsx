import React from 'react';
import { Tilt } from "react-tilt";
import {motion} from 'framer-motion';
import {fadeIn} from '../../utils/motion';

const AboutCard = ({index, title, icon}) => {
  return (
    <Tilt className="w-[200px]">
        <motion.div variants={fadeIn("right", "spring", 0.5*index, 0.75)} className="w-full about-card-gradient p-[1px] rounded-[20px] shadow-card">
        <div options={{
            max: 45,
            scale: 1,
            speed: 450
        }} className="about-card-bg rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
            <h3 className="font-bold hero-text1 text-[20px] text-center">{title}</h3>
            <img src={icon} alt={title}  className="w-16 h-16 object-contain" />
        </div>
        </motion.div>
    </Tilt>
  )
};

export default AboutCard;

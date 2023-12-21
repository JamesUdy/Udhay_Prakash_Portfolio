import React from "react";
import {motion} from 'framer-motion';
import {styles} from '../../styles';
import "./About.css";
import {fadeIn, textVariant} from '../../utils/motion';
import { Wrapper } from "../../hoc";

const About = () => {
    return (
        <>
            <motion.div variants={textVariant()} className="lg:mt-14">
            <p className={`about-text styles.sectionSubText font-bold text-lg`}>ABOUT</p>
            <h2 className={styles.sectionHeadText}>Get To Know Me.</h2>
            </motion.div>
            <motion.p variants={fadeIn("","",0.1,1)} className="mt-4 text-secondary text-justify text-[17px] max-w-6xl leading-[30px]">
            Hey👋 I'm a budding software developer with knowledge of JavaScript and frameworks such as React, Node.js, and building web sites. Along with my tech expertise, I enjoy sketching people and occasionally like to doodle. I'm a quick learner that works directly to develop productive, adaptable, and intuitive solutions to real-world problems. Let's collaborate 👯‍♂️ to make your ideas a reality!
            </motion.p>
        </>
    )
}

export default Wrapper(About,"about");

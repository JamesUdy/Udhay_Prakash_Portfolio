import React from "react"
import { Tilt } from "react-tilt"
import {motion} from 'framer-motion'
import { services } from "../constants"
import {styles} from '../styles'
import './hero.css'
import {fadeIn, textVariant} from '../utils/motion'
import { Wrapper } from "../hoc"

const ServiceCard = ({index, title, icon}) => {
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
}

const About = () => {
    return (
        <>
            <motion.div variants={textVariant()} className="lg:mt-14">
            <p className={`hero-text styles.sectionSubText font-bold text-lg`}>ABOUT</p>
            <h2 className={styles.sectionHeadText}>Get To Know Me.</h2>
            </motion.div>
            <motion.p variants={fadeIn("","",0.1,1)} className="mt-4 text-secondary text-[17px] max-w-6xl leading-[30px]">
            Hey👋 I'm a budding software developer with knowledge of JavaScript and frameworks such as React, Node.js, and building web sites. Along with my tech expertise, I enjoy sketching people and occasionally like to doodle. I'm a quick learner that works directly to develop productive, adaptable, and intuitive solutions to real-world problems. Let's collaborate 👯‍♂️ to make your ideas a reality!
            </motion.p>
            <div className="mt-20 flex flex-wrap gap-10 pb-10 justify-center">
                {services.map((service,index) => (
                    <ServiceCard key={service.title} index={index} {...service} />
                ))}
            </div>
        </>
    )
}

export default Wrapper(About,"about")
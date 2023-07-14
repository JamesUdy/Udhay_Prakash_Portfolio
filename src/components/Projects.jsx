import React from "react"
import { github } from "../assets"
import { live } from "../assets"
import { Wrapper } from "../hoc"
import { Tilt } from "react-tilt"
import { projects } from "../constants"
import {motion} from 'framer-motion'
import {styles} from '../styles'
import './works.css'
import { fadeIn, textVariant } from "../utils/motion"


const ProjectCard = (project) => {
    const colorStatus = (status) => {
        return ( status === "completed" ? "bg-[#007f5fb7]" : "bg-[#ff005596]" )
    }
    return (
        <motion.div variants={fadeIn("up","spring",project.index*0.5,0.75)}>
            <Tilt options={{
                max: 45, scale: 1, speed: 450,
            }} className="work-card-bg p-3 xs:p-5 rounded-2xl w-full xs:w-[360px] md:h-[480px] lg:h-[540px]">
                    <div className="relative xs:w-full md:h-[160pxdist] lg:h-[230px]">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-2xl" />
                    <div className="absolute inset-0 flex justify-between flex-row  m-3 card-img_hover">
                        <div className="mt-1">
                            <span className={`p-2 text-white ${colorStatus(project.status)} rounded-lg text-[12px] font-semibold`}>{project.status}</span>
                        </div>
                        <div className="card-img_hover flex flex-row">
                            <div onClick={() => window.open(project.source, "_blank")} className="black-gradient w-8 h-8 rounded-full flex justify-center items-center cursor-pointer mx-1">
                                <img src={github} alt="github" className="w-1/2 h-1/2 object-contain" />
                            </div>
                            {project.demo && <div onClick={() => window.open(project.demo, "_blank")} className="black-gradient w-8 h-8 rounded-full flex justify-center items-center cursor-pointer mx-1">
                                <img src={live} alt="live" className="w-fit h-fit object-contain" />
                            </div>}
                        </div>
                    </div>
                    <div className="mt-5 hidden md:block">
                        <h3 className="text-[#c4bfbf] text-md font-semibold my-2">{project.title}</h3>
                        <p className="text-sm font-light text-secondary">{project.description}</p>
                    </div>
                    <div className="mt-4 hidden  md:flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <p key={tag.skills} className={`text-[12px] font-medium ${tag.color}`}>#{tag.skills}</p>
                        ))}
                    </div>
                    
                </div>
            </Tilt>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={`work-text styles.sectionSubText font-bold text-lg`}>MY WORK</p>
                <h2 className={styles.sectionHeadText}>Projects.</h2>
            </motion.div>
            <div className="w-full flex">
                <motion.p variants={fadeIn("","",0.1,1)} className="mt-3 text-secondary text-[17px] max-w-3l md:max-w-6xl leading-[30px]">The projects below are instances of my work in the real world that highlight my experience and skills. References to source code repositories and real-time demonstrations are included with each project's brief description. It demonstrates my capacity to handle various technologies, handle complicated difficulties, and efficiently organize projects.</motion.p>
            </div>
            <div className="mt-20 flex flex-wrap gap-7 pb-10  justify-start sm:justify-center">
                {projects.map((project,index) => (
                    <ProjectCard key={`project-${index}`} index={index} {...project} />
                ))}
            </div>
        </>
    )
}

export default Wrapper(Projects, "project")
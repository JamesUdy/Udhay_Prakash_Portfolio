import React from "react";
import ProjectCard from "./ProjectCard";
import { Wrapper } from "../../hoc";
import { projects } from "../../constants";
import {styles} from '../../styles';
import './works.css';

const Projects = () => {
    return (
        <>
            <>
                <p className={`work-text styles.sectionSubText font-bold text-lg`}>MY WORK</p>
                <h2 className={styles.sectionHeadText}>Projects.</h2>
            </>
            <div className="w-full flex">
                <p className="mt-3 text-secondary text-[17px] max-w-3l md:max-w-6xl leading-[30px]">The projects below are instances of my work in the real world that highlight my experience and skills. References to source code repositories and real-time demonstrations are included with each project's brief description. It demonstrates my capacity to handle various technologies, handle complicated difficulties, and efficiently organize projects.</p>
            </div>
            <div className="mt-20 flex flex-wrap gap-7 pb-10  justify-start sm:justify-center">
                {projects.map((project,index) => (
                    <ProjectCard key={`project-${index}`} {...project} />
                ))}
            </div>
        </>
    )
}

export default Wrapper(Projects, "project");

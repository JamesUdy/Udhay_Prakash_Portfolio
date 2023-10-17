import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Wrapper } from "../../hoc";
import { projects } from "../../constants";
import {styles} from '../../styles';
import './works.css';

const Projects = () => {
    const [visibleProjects, setVisibleProjects] = useState(2);

    const showMore = () => {
        setVisibleProjects(visibleProjects + 2);
    };

    const showLess = () => {
        setVisibleProjects(2);
    };

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
                {projects.slice(0, visibleProjects).map((project,index) => (
                    <ProjectCard key={`project-${index}`} {...project} />
                ))}
            </div>
            <div className="flex justify-center">
                {visibleProjects < projects.length ? (
                    <button onClick={showMore} className="border-4 bg-transparent border-[#200737d9] hover:bg-[#3c096ca0] hover:border-[#3c096ca0] hover:shadow-lg hover:shadow-violet-900 ease-in duration-200 text-gray-300 rounded-xl px-4 py-2">
                        Show More
                    </button>
                ) : (
                    <button onClick={showLess} className="border-4 bg-transparent border-[#200737d9] hover:bg-[#3c096ca0] hover:border-[#3c096ca0] hover:shadow-lg hover:shadow-violet-900 ease-in duration-200 text-gray-300 rounded-xl px-4 py-2">
                        Show Less
                    </button>
                )}
            </div>
        </>
    )
}

export default Wrapper(Projects, "project");

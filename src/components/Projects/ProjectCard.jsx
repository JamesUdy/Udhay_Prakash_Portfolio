import React from 'react';
import { github } from "../../assets";
import { live } from "../../assets";
import { Tilt } from "react-tilt";

const ProjectCard = (project) => {
    const colorStatus = (status) => {
        return ( status === "completed" ? "bg-[#007f5fb7]" : "bg-[#ff005596]" )
    }
    return (
        <Tilt options={{ max: 5, scale: 1, speed: 450, }} className="work-card-bg p-3 xs:p-5 rounded-2xl w-full xs:w-[420px] h-fit group">
            <div className="relative xs:w-full h-fit">
                <div className="overflow-hidden rounded-2xl">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover ease-in-out duration-300 rounded-2xl scale-100 group-hover:scale-125" />
                </div>
                <div className="absolute inset-0 flex justify-between flex-row  m-3 card-img_hover">
                    <div className="mt-1">
                        <span className={`p-2 text-white ${colorStatus(project.status)} rounded-lg text-[12px] font-semibold`}>{project.status}</span>
                    </div>
                    <div className="card-img_hover flex flex-row">
                        <div onClick={() => window.open(project.source, "_blank")} className="black-gradient w-8 h-8 rounded-full flex justify-center items-center cursor-pointer mx-1">
                            <img src={github} alt="github" className="w-1/2 h-1/2 object-cover" />
                        </div>
                        {project.demo && <div onClick={() => window.open(project.demo, "_blank")} className="black-gradient w-8 h-8 rounded-full flex justify-center items-center cursor-pointer mx-1">
                            <img src={live} alt="live" className="w-1/2 h-1/2 object-contain" />
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
    );
};

export default ProjectCard;

import React from "react"
import Marquee from "react-fast-marquee"
import { Wrapper } from "../hoc"
import { skillset } from "../constants"
import './skills.css'
import { styles } from "../styles";
import { Resume } from "../assets/resume"

const Skills = () => {

    const onButtonClick = () => {
        fetch(Resume).then(response => {
            response.blob().then(url => {
                const fileURL = window.URL.createObjectURL(url);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = Resume;
                alink.click();
            })
        })
    }

    return (
        <div className="flex flex-col items-center">
           <div className="mb-6"><span className="skill-text font-bold text-lg">SKILLS AND TOOLS</span> 🚀</div>
           <div className="w-56 md:w-1/2">
                <Marquee className="py-2" direction="right">
                    {skillset.map(function(skill) {
                        return (
                            <div key={skill.name} className="p-2 border-2 mx-2 rounded-lg border-[#7209b7] flex items-center gap-2"><img src={skill.image} alt={`${skill.name} Logo`} className="w-4 h-4" />{` ${skill.name} `}</div>
                        )
                    }
                    )}
                </Marquee>
                <Marquee className="py-2" delay={-2.5}>
                    {skillset.map(function(skill) {
                        return (
                            <div key={skill.name} className="p-2 border-2 mx-2 rounded-lg border-[#7209b7] flex items-center gap-2"><img src={skill.image} alt={`${skill.name} Logo`} />{` ${skill.name} `}</div>
                        )
                    }
                    )}
                </Marquee>
                <Marquee className="py-2" direction="right" delay={-5}>
                    {skillset.map(function(skill) {
                        return (
                            <div key={skill.name} className="p-2 border-2 mx-2 rounded-lg border-[#7209b7] flex items-center gap-2"><img src={skill.image} alt={`${skill.name} Logo`} />{` ${skill.name} `}</div>
                        )
                    }
                    )}
                </Marquee>
            </div> 
            <div className="my-10">
                <button onClick={onButtonClick} className="rounded-lg p-3 lg:p-4 download"><span className="font-light text-md md:text-lg cursor-pointer">Download Resume</span> 👇🏼</button> 
            </div>
        </div>
    )
}

export default Wrapper(Skills, "")
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import { color, motion } from "framer-motion"
import 'react-vertical-timeline-component/style.min.css';
import { styles } from "../../styles";
import { timeline } from "../../constants";
import { Wrapper } from "../../hoc";
import { textVariant } from "../../utils/motion";
import './timeline.css'

function timeIcon(id) {
        if(id === 1){
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
             </svg>
            )
        } else if (id == 2) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
            )
        } else {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            )
        }
}

const TimelineCard = ({ timeline }) => (
    <VerticalTimelineElement
      contentStyle={{
        background: 'linear-gradient(277deg, rgba(157,78,221,1) 0%, rgba(60,9,108,1) 35%, rgba(16,0,43,1) 100%)',
        color: '#fff',
        borderRadius: '0.96rem',
        boxShadow: 'none',
      }}
      contentArrowStyle={{ borderRight: '7px solid rgba(60,9,108,1)' }}
      date={timeline.date}
      iconStyle={{
        background: 'linear-gradient(277deg, rgba(157,78,221,1) 0%, rgba(60,9,108,1) 35%, rgba(16,0,43,1) 100%)',
        color: '#fff',
        boxShadow: '0 0 0 4px #2f2f2f, inset 0 2px 0 rgb(255 8 8 / 8%), 0 3px 0 4px rgba(0, 0, 0, 0.2)', 
      }}
      icon={timeIcon(timeline.id)}
    >
      <div>
        <h3 className="text-[#ea4f54] text-[16px] font-medium">{timeline.title}</h3>
        <p className="text-[#8f8c8c] text-[16px] font-semibold" style={{ margin: 0 }}>
          {timeline.location}
        </p>
      </div>
    </VerticalTimelineElement>
  );
  

const Timeline = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p> <span className={`time-text styles.sectionSubText font-bold text-lg`}>TIMELINE</span> 📌</p>
                <h2 className={styles.sectionHeadText}>What I've Done Upto This Point.</h2>
            </motion.div>
            <div className="mt-20 flex flex-col">
                <VerticalTimeline lineColor="linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(47,47,47,1) 100%)">
                    {timeline.map((timeline,index) => (
                            <TimelineCard key={index} timeline={timeline} />
                        )
                    )}
                </VerticalTimeline>
            </div>
        </>
    )
}

export default Wrapper(Timeline, "");

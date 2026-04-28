import { motion } from 'framer-motion';
import { styles } from '../../styles';
import { fadeIn, textVariant } from '../../utils/motion';
import { Wrapper } from '../../hoc';
import './About.css';

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="lg:mt-14">
        <p className="about-text font-bold text-lg">ABOUT</p>
        <h2 className={styles.sectionHeadText}>Get To Know Me.</h2>
      </motion.div>
      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-4 text-secondary text-justify text-[17px] max-w-6xl leading-[30px]"
      >
        Software Engineer with 2+ years of experience building scalable backend systems and
        real-time applications. Specialized in event-driven architecture, performance optimization,
        and high-throughput APIs. I&apos;ve reduced processing pipelines by 75% and scaled systems
        to 150K+ MAU with sub-150ms latency. Outside of engineering, I enjoy sketching and
        occasionally doodle. Let&apos;s build something great together!
      </motion.p>
      <motion.a
        href="https://read.cv/jamesudy"
        target="_blank"
        rel="noreferrer"
        variants={fadeIn('', '', 0.1, 1)}
        className="button type--B mt-16 text-secondary text-justify text-md w-full mx-auto flex items-center justify-center font-mono"
      >
        <div className="button__line" />
        <div className="button__line" />
        <span className="button__text w-full space-x-2">
          <span>View CV</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 10c0-3.771 0-5.657 1.172-6.828C5.343 2 7.229 2 11 2h2c3.771 0 5.657 0 6.828 1.172C21 4.343 21 6.229 21 10v4c0 3.771 0 5.657-1.172 6.828C18.657 22 16.771 22 13 22h-2c-3.771 0-5.657 0-6.828-1.172C3 19.657 3 17.771 3 14z" />
              <path strokeLinecap="round" d="M8 12h8M8 8h8m-8 8h5" />
            </g>
          </svg>
        </span>
        <div className="button__drow1" />
        <div className="button__drow2" />
      </motion.a>
    </>
  );
};

export default Wrapper(About, 'about');

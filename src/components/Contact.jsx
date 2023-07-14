import { useState, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from '@emailjs/browser'
import {styles} from '../styles'
import { Wrapper } from "../hoc"
import { slideIn } from "../utils/motion"
import './contact.css'

const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const {target} = e
        const {name, value} = target;
        setForm({...form, [name]:value})
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs.send(
            'service_02o4n3k', 
            'template_wzx16is',
            {
               from_name: form.name,
               to_name: 'Udhay',
               from_email: form.email,
               to_email: 'udayamvad@gmail.com',
               message: form.message ,
            },
            'maS8yYYKuZ56q3uQh'
            )
            .then(() => {
                setLoading(false);
                alert('I respect your message and will respond as soon as I can. 😉');
            setForm({
                name: "",
                email: "",
                message: "",
            });
            },
            (error) => {
                setLoading(false)
                console.log(error)
                alert('Something has gone wrong. 😱')
            })
    }

    return (
        <div className="xl:mt-10 overflow-hidden w-64 md:w-1/2">
            <motion.div variants={slideIn('right', "tween", 0.2, 1)} className="flex-[0.75] contact-bg p-8 rounded-2xl">
            
                <p className={styles.sectionSubText} ><span className="contact-text font-semibold text-lg">GET IN TOUCH</span> 📩</p>
                <h3 className={styles.sectionHeadText}>Contact.</h3>

                <form ref={formRef} onSubmit={handleSumbit} className="mt-6 flex flex-col gap-6">
                    <label className="flex flex-col">
                        <span className="text-white font-medium mb-2">Your Name</span>
                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter Your Name" 
                        className="bg-tertiary py-3 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium" />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-white font-medium mb-2">Your Email</span>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="What's your Email?" 
                        className="bg-tertiary py-3 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium" />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-white font-medium mb-2">Your Message</span>
                        <textarea rows="5" name="message" value={form.message} onChange={handleChange} placeholder="What would you like to say?" 
                        className="bg-tertiary py-3 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium" />
                    </label>
                    <button type="submit" className="bg-tertiary py-3 px-8 outline-none w-fit text-white shodow-md shadow-primary rounded-xl">{loading ? 'Sending...' : 'Send'}</button>
                </form>
            </motion.div>
        </div>
    )
}

export default Wrapper(Contact,"contact")
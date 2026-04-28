import { useState, useRef, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { styles } from '../../styles';
import { Wrapper } from '../../hoc';
import { slideIn } from '../../utils/motion';
import './contact.css';

type FormState = { name: string; email: string; message: string };
type StatusState = { type: 'success' | 'error'; message: string } | null;

const INITIAL_FORM: FormState = { name: '', email: '', message: '' };

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs
      .send(
        'service_02o4n3k',
        'template_wzx16is',
        {
          from_name: form.name,
          to_name: 'Udhay',
          from_email: form.email,
          to_email: 'udayamvad@gmail.com',
          message: form.message,
        },
        '5wQj0dSc8N7OG7Vk9'
      )
      .then(() => {
        setLoading(false);
        setStatus({ type: 'success', message: "Message sent! I'll get back to you soon." });
        setForm(INITIAL_FORM);
      })
      .catch(() => {
        setLoading(false);
        setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      });
  };

  return (
    <div className="xl:mt-10 overflow-hidden w-full flex flex-col items-center">
      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="flex-[0.75] contact-bg p-8 rounded-2xl w-full md:w-2/3 lg:w-1/2"
      >
        <p className={styles.sectionSubText}>
          <span className="contact-text font-semibold text-lg">GET IN TOUCH</span> 📩
        </p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Your Name</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="bg-tertiary py-3 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Your Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="bg-tertiary py-3 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Your Message</span>
            <textarea
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to say?"
              required
              className="bg-tertiary py-3 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          {status && (
            <p
              className={`text-sm font-medium px-3 py-2 rounded-lg ${
                status.type === 'success'
                  ? 'bg-green-900/40 text-green-300'
                  : 'bg-red-900/40 text-red-300'
              }`}
            >
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white shadow-md shadow-primary rounded-xl disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Wrapper(Contact, 'contact');

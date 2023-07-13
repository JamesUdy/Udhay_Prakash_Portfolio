import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import {About, Contact, Timeline, Hero, Navbar, Skills, Projects, StarsCanvas} from './components'

export default function App() {
  return (
    <BrowserRouter>
      <div className='relative z-90 bg-black'>
      <div className=''>
        <Navbar />
        <Hero />
      </div>
      <About />
      <Timeline />
      <Skills />
      <Projects />
      <div className='relative z-0'>
        <Contact />
        <StarsCanvas />
      </div>
      </div>
    </BrowserRouter>
  )
}
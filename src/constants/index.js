import {
    mobile,
    backend,
    creator,
    web,
    predictor,
    nft,
    netzon5,
    grabNgo,
    budgetBuddy,
    laBelle,
    chargingStrategy,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "project",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Front End Developer",
      icon: web,
    },
    {
      title: "React Developer",
      icon:  backend,
    },
    {
      title: "Artist",
      icon: mobile,
    },
    {
      title: "Web Designer",
      icon: creator,
    },
  ];
  
  const skillset = [
    {
      name: "HTML 5",
    },
    {
      name: "CSS 3",
    },
    {
      name: "JavaScript",
    },
    {
      name: "TypeScript",
    },
    {
      name: "React JS",
    },
    {
      name: "Bootstrap CSS",
    },
    {
      name: "Tailwind CSS",
    },
    {
      name: "Node JS",
    },
    {
      name: "MongoDB",
    },
    {
      name: "Next JS",
    },
    {
      name: "GitHub",
    },
    {
      name: "Markdown",
    },
    {
      name: "Figma",
    },
    {
      name: "Java",
    },
    {
      name: "Miro",
    },
    {
      name: "Subline Merge",
    },
    {
      name: "Speechly",
    },
    {
      name: "Python",
    },
    {
      name: "Postman",
    },
    {
      name: "Power Bi",
    },
    {
      name: "Tableau",
    },
    {
      name: "Firebase",
    },
    {
      name: "VSCode",
    },
    {
      name: "MATLAB",
    },
    {
      name: "Netlify",
    },
  ];
  
  const timeline = [
    {
      id: 1,
      title: "📖 Schooling",
      location: "Neyveli 📍",
      date: "Jun 2004 - Mar 2019"
    },
    { 
      id: 2,
      title: "👨🏻‍⚖️ B.Tech Electrical And Electronics Engineering",
      location: "Vellore Institute of Technology 📍",
      date: "Jul 2019 - Apr 2023"
    },
    {
      id: 3,
      title: "💻 Getting involved with web design and development projects (Freelancer) ",
      location: "Remote 📍",
      date: "Apr 2023 - present"
    }
  ];
  
  const projects = [
    {
      title: "Nifter-NFT Marketplace",
      description:
        "Designed the template and functioning of the marketplace (NFT) website that requires NFT REST-based API. It has access to meta image data, activity, pricing and ownership information at real-time.",
      tags: [
        {
          skills: "html",
          color: "pink-text-gradient",
        },
        {
          skills: "css",
          color: "green-text-gradient",
        },
        {
          skills: "javascript",
          color: "blue-text-gradient",
        },
        {
          skills: "api",
          color: "pink-text-gradient",
        },
      ],
      image: nft,
      source: "https://github.com/JamesUdy/NIFTER-NFT-MARKETPLACE-WEBSITE",
      status: "completed",
      demo: "https://nifter-nft-marketplace.netlify.app/"
    },
    {
      title: "Grab N Go",
      description:
        "Developed a responsive Grab and Go website with Firebase integration for real-time grocery item storage. Implemented CRUD operations (Create, Read, Update, Delete) to enable users to add and delete grocery items effortlessly. Ensured data security and privacy through Firebase Authentication, allowing only authorized users to access and manage the grocery list.",
      tags: [
        {
          skills: "javascript",
          color: "blue-text-gradient",
        },
        {
          skills: "css",
          color: "green-text-gradient",
        },
        {
          skills: "html",
          color: "pink-text-gradient",
        },
        {
          skills: "firebase",
          color: "blue-text-gradient",
        },
      ],
      image: grabNgo,
      source: "https://github.com/JamesUdy/Grab_N_Go",
      status: "completed",
      demo: "https://grab-n-go.netlify.app/"
    },
    {
      title: "Budget Buddy",
      description:
        "Developed Budget Buddy website with voice recognition technology for automated income and expense tracking. Implemented real-time financial analysis through dynamic visual graphs to facilitate data-driven decision-making. Streamlined budget management with an intuitive interface and automated data entry for improved user experience.",
      tags: [
        {
          skills: "react",
          color: "blue-text-gradient",
        },
        {
          skills: "javascript",
          color: "pink-text-gradient",
        },
        {
          skills: "tailwind-css",
          color: "green-text-gradient",
        },
        {
          skills: "voice assist",
          color: "blue-text-gradient",
        },
      ],
      image: budgetBuddy,
      source: "https://github.com/JamesUdy/Budget-Buddy",
      status: "completed",
      demo: "https://budget-buddy15.netlify.app/"
    },
    {
      title: "Netzon5-Online OTT Streaming Platform",
      description:
        "The website is entirely responsive and uses the TMDB API to search over 1000+ films while offering narrative details, IMDB ratings, genre, and the year of release. The difficulties found in the code are made easy using Tailwind and platform allows multitasking of several pages simultaneously.",
      tags: [
        {
          skills: "javascript",
          color: "blue-text-gradient",
        },
        {
          skills: "html",
          color: "green-text-gradient",
        },
        {
          skills: "tailwind",
          color: "pink-text-gradient",
        },
        {
          skills: "api",
          color: "blue-text-gradient",
        },
      ],
      image: netzon5,
      source: "https://github.com/JamesUdy/Netzon5",
      status: "developing"
    },
    {
      title: "Real-Estate Price Prediction Using Linear Regression - Machine Learning",
      description:
        "Machine learning model that merges 2 significant fields - Data Science, Web Development to estimate the prices of houses in Bangalore. Specializes in providing accurate prices",
      tags: [
        {
          skills: "html",
          color: "pink-text-gradient",
        },
        {
          skills: "css",
          color: "green-text-gradient",
        },
        {
          skills: "javascript",
          color: "blue-text-gradient",
        },
        {
          skills: "machine learning",
          color: "pink-text-gradient",
        },
        {
          skills: "database",
          color: "green-text-gradient",
        },
      ],
      image: predictor,
      source: "https://github.com/JamesUdy/RE_Price_Prediction",
      status: "completed",
    },
    {
      title: "La Belle Assiette",
      description:
        "The primary target was to make ordering food and reserving tables at restaurants more user-friendly by eliminating hardships found in other interfaces.",
      tags: [
        {
          skills: "html",
          color: "green-text-gradient",
        },
        {
          skills: "css",
          color: "blue-text-gradient",
        },
        {
          skills: "javascript",
          color: "pink-text-gradient",
        },
      ],
      image: laBelle,
      source: "https://github.com/JamesUdy/La-Belle-Assiette",
      status: "completed",
      demo: "https://la-belle-assiette.netlify.app/"
    },
    {
      title: "Charging Strategy Of Lithium Ion Battery",
      description:
        "With SEPIC converter as the base, worked on the implementation of the charge control algorithm. This aims at the effective charging of Lithium-Ion Battery. Improved performance while charging and reduced complexity of algorithm in regard to more than 5 diverse strategies.",
      tags: [
        {
          skills: "Electrical Components and Devices",
          color: "blue-text-gradient",
        },
        {
          skills: "MATLAB",
          color: "green-text-gradient",
        },
        {
          skills: "Simulink",
          color: "pink-text-gradient",
        },
        {
          skills: "Express-PCB",
          color: "green-text-gradient",
        },
      ],
      image: chargingStrategy,
      source: "https://github.com/JamesUdy/Charging-Strategy-Of-Lithium-Ion-Battery",
      status: "completed",
    },
  ];
  
  export { services, skillset, timeline, projects };
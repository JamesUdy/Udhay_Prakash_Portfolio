import {
    predictor,
    cityscapeForecast,
    niftique,
    netzon5,
    grabNgo,
    budgetBuddy,
    laBelle,
    legacyCodeHQ,
    todoSentinel,
    
    markdown,
    figma,
    githubIcon,
    html5,
    css,
    reactIcon,
    tailwind,
    chakraui,
    typescript,
    javascript,
    bootstrap,
    node,
    mongodb,
    next,
    java,
    python,
    firebase,
    tableau,
    powerbi,
    postman,
    vscode,
    vercel,
    netlify,
    api,
    electron,
    webstorm,
    redux,
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
  
  const skillSet = [
    {
      name: "HTML 5",
      icon: html5,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "React JS",
      icon: reactIcon,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "Bootstrap CSS",
      icon: bootstrap,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Chakra UI",
      icon: chakraui,
    },
    {
      name: "Next JS",
      icon: next,
    },
    {
      name: "GitHub",
      icon: githubIcon,
    },
    {
      name: "Figma",
      icon: figma,
    },
    {
      name: "VSCode",
      icon: vscode,
    },
    {
      name: "API",
      icon: api,
    },
    {
      name: "Firebase",
      icon: firebase,
    },
    {
      name: "Node JS",
      icon: node,
    },
    {
      name: "Electron Js",
      icon: electron,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Java",
      icon: java,
    },
    {
      name: "Python",
      icon: python,
    },
    {
      name: "Postman",
      icon: postman,
    },
    {
      name: "Power Bi",
      icon: powerbi,
    },
    {
      name: "Tableau",
      icon: tableau,
    },
    {
      name: "Vercel",
      icon: vercel,
    },
    {
      name: "Netlify",
      icon: netlify,
    },
    {
      name: "Webstorm",
      icon: webstorm,
    },
    {
      name: "Redux",
      icon: redux,
    },
    {
      name: "Markdown",
      icon: markdown,
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
      title: "Legacy Code HQ",
      description:
        "Led website development using Next.js, Tailwind CSS, and TypeScript, optimizing SEO for improved rankings. Collaborated cross-functionally to solve complex challenges and integrated Electron technology with a Kotlin and Java backend developer to enhance product functionality.",
      tags: [
        {
          skills: "next js",
          color: "pink-text-gradient",
        },
        {
          skills: "tailwind css",
          color: "green-text-gradient",
        },
        {
          skills: "typescript",
          color: "blue-text-gradient",
        },
        {
          skills: "markdown",
          color: "pink-text-gradient",
        },
      ],
      image: legacyCodeHQ,
      status: "developing",
      demo: "https://www.legacycode.com/"
    },
    {
      title: "ToDo Sentinel | Empower Your Workflow",
      description:
        "Transform task management with To-Do Sentinel—a powerhouse for stylish, efficient productivity. Crafted with TypeScript, Next.js, Tailwind CSS, and FireStore, it's not just a to-do list; it's a dynamic experience. Effortlessly customize tasks, set deadlines, and enjoy seamless CRUD operations.",
      tags: [
        {
          skills: "next js",
          color: "pink-text-gradient",
        },
        {
          skills: "typescript",
          color: "blue-text-gradient",
        },
        {
          skills: "firebase",
          color: "pink-text-gradient",
        },
        {
          skills: "tailwind css",
          color: "green-text-gradient",
        },
      ],
      image: todoSentinel,
      source: "https://github.com/JamesUdy/To-Do-Sentinel.git",
      status: "developing",
      demo: "https://to-do-sentinel.vercel.app/",
    },
    {
      title: "Cityscape Forecast | Urban Weather Unveiled",
      description:
        "Elevated Cityscape Forecast with global weather API integration, providing multi-day forecasts and air quality data for informed urban planning and weather insights. Empower yourself to conquer urban weather challenges, stay ahead of the elements, and make informed choices in your city.",
      tags: [
        {
          skills: "next js",
          color: "pink-text-gradient",
        },
        {
          skills: "tailwindcss",
          color: "green-text-gradient",
        },
        {
          skills: "typescript",
          color: "blue-text-gradient",
        },
        {
          skills: "weather api",
          color: "pink-text-gradient",
        },
      ],
      image: cityscapeForecast,
      source: "https://github.com/JamesUdy/Cityscape_Forecast",
      status: "completed",
      demo: "https://cityscape-forecast.vercel.app/",
    },
    {
      title: "NIFTIQUE - NFT MARKETPLACE & CRYPTO CONVERTER DEVELOPMENT",
      description:
        "We merge art and tech with a secure NFT marketplace, enabling NFT creation, editing, buying, and selling. Our real-time cryptocurrency converter offers precise crypto conversions via APIs. OpenSea's integration enriches user experience with real-time NFT data.",
      tags: [
        {
          skills: "react",
          color: "pink-text-gradient",
        },
        {
          skills: "tailwindcss",
          color: "green-text-gradient",
        },
        {
          skills: "javascript",
          color: "blue-text-gradient",
        },
        {
          skills: "opensea api",
          color: "pink-text-gradient",
        },
      ],
      image: niftique,
      source: "https://github.com/JamesUdy/Niftique",
      status: "developing",
      demo: "https://niftique.vercel.app/home",
    },
    {
      title: "Grab N Go",
      description:
        "Crafted a responsive Grab and Go website, seamlessly integrated with Firebase for real-time grocery item storage. Empowered users with CRUD capabilities for effortless item management. Firebase Authentication safeguards data privacy, ensuring only authorized users access and manage the grocery list.",
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
      demo: "https://grab-n-go.netlify.app/",
    },
    {
      title: "Budget Buddy",
      description:
        "Created Budget Buddy, integrating voice recognition for automated income and expense tracking. Enabled real-time financial analysis with dynamic visual graphs for data-driven decisions. Streamlined budget management via an intuitive interface and automated data entry, enhancing the user experience.",
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
      demo: "https://budget-buddy15.vercel.app/",
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
        "A unique machine learning model blending Data Science and Web Development effectively estimates house prices in Bangalore. It excels at precision by analyzing extensive datasets comprising over 10,000 rows, ensuring highly accurate pricing predictions.",
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
      title: "La Belle Assiette - Platform for Reserving Tables and Ordering Food",
      description:
        "Our website streamlines food ordering and restaurant table reservations, offering a user-friendly experience. It features multi-page navigation, allowing users to explore menus and place orders with ease, addressing common interface challenges.",
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
      demo: "https://la-belle-assiette.netlify.app/",
    },
  ];
  
  export { skillSet, timeline, projects };
  
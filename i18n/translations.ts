// Translations for English and Spanish

export type Language = 'en' | 'es';

export const translations = {
  en: {
    // Intro
    availableForWork: 'Available for work',
    introBio: 'Systems Engineer building <scalable>scalable</scalable>, <performance>high-performance</performance> digital experiences.',
    
    // Socials
    letsConnect: "Let's connect",
    
    // Tech Stack
    techStackTitle: 'Tech Stack',
    
    // About
    aboutTitle: 'About',
    aboutPhrase: 'Obsessed with <details>details</details> and <performance>performance</performance>.',
    
    // Experience
    experienceTitle: 'Experience',
    softwareDeveloper: 'Software Developer',
    fullStackDev: 'Full-stack Dev',
    
    // Education
    educationTitle: 'Education',
    systemsEngineering: 'Systems Engineering',
    technologicalUniversity: 'Technological University',
    
    // Contact
    contactTitle: "Let's connect.",
    connectOnLinkedIn: 'Connect on LinkedIn',
    open: 'Open',
    copy: 'Copy',
    copied: 'Copied',
    
    // Map
    basedIn: 'Based in',
    location: 'Cartagena, CO',
    
    // Footer
    copyright: '© 2025 Anderson Mendoza.',
    role: 'Systems Engineer',
    
    // Detail Views
    // About Modal
    profile: 'Profile',
    scalableArchitect: 'Scalable Architect.',
    proactive: 'Proactive',
    detailOriented: 'Detail Oriented',
    problemSolver: 'Problem Solver',
    bio: 'Bio',
    bioText: 'I am a passionate Software Developer from Cartagena, Colombia. My work focuses on building efficient, scalable web applications and exploring the frontiers of AI/ML technologies. I thrive in dynamic environments where I can apply my skills in modern web frameworks and backend systems.',
    philosophy: 'Philosophy',
    userCentricDesign: 'User-Centric Design',
    userCentricDesignDesc: 'Prioritizing intuitive interfaces and seamless interactions.',
    performanceFirst: 'Performance First',
    performanceFirstDesc: 'Optimizing code for maximum speed and efficiency.',
    
    // Experience Modal
    workExperience: 'Work Experience',
    workExperienceDesc: 'My professional journey in software development.',
    present: 'Present',
    visblDesc: 'Developing core platform features and maintaining robust software architecture to ensure scalability and performance. Contributing to the entire SDLC.',
    comfenalcoDesc: 'Built and maintained academic management systems using PHP and Modern JS. Focused on delivering user-friendly interfaces and optimizing database queries.',
    
    // Education Modal
    educationDesc: 'Academic background and certifications.',
    professionalDegree: 'Professional Degree',
    universityDiploma: 'University Diploma',
    technologistDegree: 'Technologist Degree',
    webAppDevelopment: 'Web App Development',
    softwareDevTechnologist: 'Software Dev Technologist',
    
    // Stack Modal
    technicalArsenal: 'Technical Arsenal',
    technicalArsenalDesc: 'A comprehensive toolkit for full-stack development, ranging from modern front-end frameworks to robust backend systems and AI integration.',
    frontend: 'Frontend',
    backend: 'Backend',
    aiMl: 'AI & Machine Learning',
    database: 'Database',
  },
  es: {
    // Intro
    availableForWork: 'Disponible para trabajar',
    introBio: 'Ingeniero de Sistemas creando experiencias digitales <scalable>escalables</scalable> y de <performance>alto rendimiento</performance>.',
    
    // Socials
    letsConnect: 'Conectemos',
    
    // Tech Stack
    techStackTitle: 'Tecnologías',
    
    // About
    aboutTitle: 'Sobre mí',
    aboutPhrase: 'Obsesionado con los <details>detalles</details> y el <performance>rendimiento</performance>.',
    
    // Experience
    experienceTitle: 'Experiencia',
    softwareDeveloper: 'Desarrollador de Software',
    fullStackDev: 'Desarrollador Full-stack',
    
    // Education
    educationTitle: 'Educación',
    systemsEngineering: 'Ingeniería de Sistemas',
    technologicalUniversity: 'Universidad Tecnológica',
    
    // Contact
    contactTitle: 'Conectemos.',
    connectOnLinkedIn: 'Conectar en LinkedIn',
    open: 'Abrir',
    copy: 'Copiar',
    copied: 'Copiado',
    
    // Map
    basedIn: 'Ubicado en',
    location: 'Cartagena, CO',
    
    // Footer
    copyright: '© 2025 Anderson Mendoza.',
    role: 'Ingeniero de Sistemas',
    
    // Detail Views
    // About Modal
    profile: 'Perfil',
    scalableArchitect: 'Arquitecto Escalable.',
    proactive: 'Proactivo',
    detailOriented: 'Orientado al Detalle',
    problemSolver: 'Solucionador de Problemas',
    bio: 'Biografía',
    bioText: 'Soy un apasionado Desarrollador de Software de Cartagena, Colombia. Mi trabajo se enfoca en construir aplicaciones web eficientes y escalables, explorando las fronteras de las tecnologías de IA/ML. Prospero en entornos dinámicos donde puedo aplicar mis habilidades en frameworks web modernos y sistemas backend.',
    philosophy: 'Filosofía',
    userCentricDesign: 'Diseño Centrado en el Usuario',
    userCentricDesignDesc: 'Priorizando interfaces intuitivas e interacciones fluidas.',
    performanceFirst: 'Rendimiento Primero',
    performanceFirstDesc: 'Optimizando código para máxima velocidad y eficiencia.',
    
    // Experience Modal
    workExperience: 'Experiencia Laboral',
    workExperienceDesc: 'Mi trayectoria profesional en desarrollo de software.',
    present: 'Actual',
    visblDesc: 'Desarrollando características principales de la plataforma y manteniendo una arquitectura de software robusta para garantizar escalabilidad y rendimiento. Contribuyendo al ciclo completo de desarrollo.',
    comfenalcoDesc: 'Construí y mantuve sistemas de gestión académica usando PHP y JS moderno. Enfocado en entregar interfaces amigables y optimizar consultas de base de datos.',
    
    // Education Modal
    educationDesc: 'Formación académica y certificaciones.',
    professionalDegree: 'Título Profesional',
    universityDiploma: 'Diplomado Universitario',
    technologistDegree: 'Título de Tecnólogo',
    webAppDevelopment: 'Desarrollo de Apps Web',
    softwareDevTechnologist: 'Tecnólogo en Desarrollo de Software',
    
    // Stack Modal
    technicalArsenal: 'Arsenal Técnico',
    technicalArsenalDesc: 'Un conjunto completo de herramientas para desarrollo full-stack, desde frameworks frontend modernos hasta sistemas backend robustos e integración de IA.',
    frontend: 'Frontend',
    backend: 'Backend',
    aiMl: 'IA y Machine Learning',
    database: 'Base de Datos',
  }
} as const;

export type TranslationKey = keyof typeof translations.en;


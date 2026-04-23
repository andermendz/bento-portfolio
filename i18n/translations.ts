// Translations for English and Spanish

export type Language = 'en' | 'es';

export const translations = {
  en: {
    // Intro
    availableForWork: 'Available for work',
    introBio: 'Software Engineer building <scalable>scalable</scalable>, <performance>high-performance</performance> digital experiences.',

    // Socials
    letsConnect: "Let's connect",
    letsTalk: "Let's talk",
    letsTalkDesc: 'Open to freelance projects and full-time roles.',
    currentlyAvailable: 'Currently available',
    contactMsg: 'Want to work together, or just say hi? Drop me a line.',
    emailMe: 'Email',
    emailDesc: 'The direct line for anything substantive.',
    emailAddress: 'andermendz@proton.me',
    linkedIn: 'LinkedIn',
    linkedInDesc: 'To connect and explore opportunities.',
    linkedInHandle: '/in/andermendz',

    // Tech Stack
    techStackTitle: 'Tech Stack',

    // Blog
    blogTitle: 'Blog',
    blogAppTitle: 'AI Blog',
    readArticles: 'The latest things I have written.',
    latestPost: 'Latest post',

    // About
    aboutTitle: 'About',
    aboutPhrase: 'Obsessed with <details>details</details> and <performance>performance</performance>.',

    // Experience
    experienceTitle: 'Experience',
    technicalLead: 'Technical Lead',
    softwareDeveloper: 'Software Engineer',
    fullStackDev: 'Full-stack Engineer',

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

    // Footer (use {year} placeholder; replaced at runtime with current year)
    copyright: '© {year} Anderson Mendoza.',
    role: 'Software Engineer',

    // A11y & chrome
    skipToMainContent: 'Skip to main content',
    back: 'Back',
    sectionLoading: 'Loading section…',
    copyFailed: 'Could not copy. Please try again.',

    // Detail Views
    // About Modal
    profile: 'Profile',
    scalableArchitect: 'Scalable systems.',
    proactive: 'Proactive',
    detailOriented: 'Detail-oriented',
    problemSolver: 'Problem-solver',
    bio: 'Bio',
    bioText: 'Software Engineer based in Cartagena, Colombia. I build scalable web applications and high-performance system architectures.',
    philosophy: 'Philosophy',
    userCentricDesign: 'User-centric design',
    userCentricDesignDesc: 'Clear, intuitive interfaces with the right rhythm.',
    performanceFirst: 'Performance-first',
    performanceFirstDesc: 'Fast, efficient code — no compromises.',

    // Experience Modal
    workExperience: 'Work Experience',
    workExperienceDesc: 'My path as a software engineer.',
    present: 'Present',
    visblDesc: 'Leading the technical direction and architecture of the platform, driving strategic decisions, and mentoring development teams while maintaining core features.',
    visblPrevDesc: 'Shipped core platform features and maintained a robust software architecture built for scalability and performance.',
    comfenalcoDesc: 'Built and maintained academic management systems in PHP and modern JS, with a focus on clean interfaces and well-tuned database queries.',
    openSourceProject: 'Open source',
    escribboName: 'Escribbo',
    escribboDesc: 'Escribbo turns what you say into text on your own machine using local AI models (Whisper and Parakeet). Fully offline, so your voice never leaves the device. One shortcut, you speak, and it types into whichever app you are using on Windows, macOS, or Linux. Free and open source (MIT), with downloads at escribbo.com and the full project on GitHub (signed releases and docs included).',
    escribboWebsite: 'Website',
    escribboRepo: 'GitHub',
    projectsTitle: 'Projects',
    projectsHeadline: 'Selected work.',
    projectsSectionDesc: 'Apps and sites you can actually try. Links to the site and repo below.',
    projectsCardHint: 'Escribbo — offline dictation with local Whisper & Parakeet',

    // Education Modal
    academicBackground: 'Academic background.',
    educationDesc: 'Academic background and certifications.',
    professionalDegree: 'Professional Degree',
    universityDiploma: 'University Diploma',
    technologistDegree: 'Technologist Degree',
    webAppDevelopment: 'Web Application Development',
    softwareDevTechnologist: 'Software Engineering Technologist',

    // Stack Modal
    technicalArsenal: 'Technical Toolkit',
    technicalArsenalDesc: 'A full-stack toolkit: modern frontend frameworks, solid backend systems, and AI integration.',
    frontend: 'Frontend',
    backend: 'Backend',
    aiMl: 'AI & Machine Learning',
    database: 'Database',

    // Chapter labels
    overviewSection: 'Overview',
    atAGlance: 'At a glance.',
    bentoSubline: 'A bento of work and life.',
    writingSection: 'Writing',
    writingHeadline: 'Words.',
    writingSubline: 'Notes on AI, engineering, and the craft.',

    // Hero
    scrollCue: 'Scroll',
    roleInterface: 'Interface craft',
    roleSystems: 'Systems thinking',
    roleAi: 'AI engineering',

    // Story
    since: 'Est. 2020',

    // Projects
    projectLabel: 'Project',
    dictationApp: 'Dictation app',
    platforms: 'Platforms',
    license: 'License',
    builtWith: 'Built with',

    // Globe
    remoteSubline: 'Remote-first. Shipping worldwide.',
    basedInBody: 'Based in {location}, I work async across timezones with teams everywhere — full-time and freelance.',
    coordinates: 'Coordinates',
    timezone: 'Timezone',

    // Outro
    writeMe: 'Write me',

    // Blog (homepage chapter)
    allPosts: 'All posts',
    readPost: 'Read post',
    minRead: 'min read',
    featured: 'Featured',

    // Blog app
    blogBackHome: 'Back to site',
    blogBackToArticles: 'Back to articles',
    blogHeroKicker: 'Writing',
    blogHeroHeadline: 'Thinking out loud.',
    blogHeroSubline: 'Essays, notes, and field reports on whatever I am currently thinking about — software, AI, tools, design, the craft, and everything adjacent.',
    onThisPage: 'On this page',
    upNext: 'Up next',
    updatedLabel: 'Updated',
    aiEngineering: 'AI Engineering',
    latest: 'Latest',
    moreReading: 'More reading',
    articleSingular: 'article',
    articlePlural: 'articles',
    home: 'Home',
    copyLink: 'Copy link',
    linkCopied: 'Link copied',

    // Blog post shell (not found + summary strip)
    blogNotFoundTitle: 'Post not found',
    blogNotFoundDescription: "The article you're looking for doesn't exist.",
    blogReturnToBlog: 'Return to blog',
    blogSummaryNote:
      'This post focuses on the mechanics that shape real LLM products: token budgets, retrieval quality, execution boundaries, and response control.',

    // A11y: regions / icon buttons (theme uses pair below)
    ariaBentoOverview: 'Bento overview',
    ariaGlobeChapter: 'Location and globe',
    ariaHeroIntro: 'Introduction',
    ariaGithub: 'GitHub',
    ariaLinkedin: 'LinkedIn',
    ariaGithubProfile: 'GitHub profile',
    ariaLinkedinProfile: 'LinkedIn profile',
    ariaProfilePhotoCard: 'Profile photo of the developer',
    ariaBackgroundImageCard: 'Background image',
    themeSwitchToLight: 'Switch to light theme',
    themeSwitchToDark: 'Switch to dark theme',

    // Error boundary (reads saved language; outside React provider)
    errorPageTitle: 'Something went wrong',
    errorPageDescription: 'Sorry — an unexpected error occurred.',
    errorPageReload: 'Reload page',

    // Intro loader word deck (first word stays proper name in markup)
    introLoaderDeck1: 'BUILDER',
    introLoaderDeck2: 'ENGINEER',
    introLoaderDeck3: 'READY',
    introLoaderFooter: 'Portfolio · {year}',
  },
  es: {
    // Intro
    availableForWork: 'Disponible para trabajar',
    introBio: 'Ingeniero de Software creando experiencias digitales <scalable>escalables</scalable> y de <performance>alto rendimiento</performance>.',

    // Socials
    letsConnect: 'Conectemos',
    letsTalk: 'Hablemos',
    letsTalkDesc: 'Abierto a proyectos freelance y roles de tiempo completo.',
    currentlyAvailable: 'Disponible ahora',
    contactMsg: '¿Quieres trabajar juntos o solo saludar? Escríbeme.',
    emailMe: 'Email',
    emailDesc: 'La vía directa para hablar de algo en serio.',
    emailAddress: 'andermendz@proton.me',
    linkedIn: 'LinkedIn',
    linkedInDesc: 'Para conectar y explorar oportunidades.',
    linkedInHandle: '/in/andermendz',

    // Tech Stack
    techStackTitle: 'Tecnologías',

    // Blog
    blogTitle: 'Blog',
    blogAppTitle: 'Blog de IA',
    readArticles: 'Lo último que he escrito.',
    latestPost: 'Último artículo',

    // About
    aboutTitle: 'Sobre mí',
    aboutPhrase: 'Obsesionado con los <details>detalles</details> y el <performance>rendimiento</performance>.',

    // Experience
    experienceTitle: 'Experiencia',
    technicalLead: 'Líder Técnico',
    softwareDeveloper: 'Ingeniero de Software',
    fullStackDev: 'Ingeniero Full-stack',

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

    // Footer (use {year} placeholder; replaced at runtime with current year)
    copyright: '© {year} Anderson Mendoza.',
    role: 'Ingeniero de Software',

    // A11y & chrome
    skipToMainContent: 'Ir al contenido principal',
    back: 'Volver',
    sectionLoading: 'Cargando sección…',
    copyFailed: 'No se pudo copiar. Inténtalo de nuevo.',

    // Detail Views
    // About Modal
    profile: 'Perfil',
    scalableArchitect: 'Sistemas escalables.',
    proactive: 'Proactivo',
    detailOriented: 'Atención al detalle',
    problemSolver: 'Resolución de problemas',
    bio: 'Biografía',
    bioText: 'Ingeniero de Software en Cartagena, Colombia. Construyo aplicaciones web escalables y arquitecturas de sistemas de alto rendimiento.',
    philosophy: 'Filosofía',
    userCentricDesign: 'Diseño centrado en el usuario',
    userCentricDesignDesc: 'Interfaces claras, intuitivas y con buen ritmo.',
    performanceFirst: 'Rendimiento ante todo',
    performanceFirstDesc: 'Código rápido y eficiente, sin concesiones.',

    // Experience Modal
    workExperience: 'Experiencia Laboral',
    workExperienceDesc: 'Mi camino como ingeniero de software.',
    present: 'Actual',
    visblDesc: 'Lidero la dirección técnica y la arquitectura de la plataforma, participo en las decisiones estratégicas y hago mentoría a los equipos de desarrollo mientras mantengo las funcionalidades clave.',
    visblPrevDesc: 'Desarrollé funcionalidades clave de la plataforma y mantuve una arquitectura sólida, pensada para escalar y rendir bien.',
    comfenalcoDesc: 'Construí y mantuve sistemas de gestión académica en PHP y JS moderno, con foco en interfaces cuidadas y consultas de base de datos bien optimizadas.',
    openSourceProject: 'Código abierto',
    escribboName: 'Escribbo',
    escribboDesc: 'Escribbo convierte en texto lo que dices, en tu propio equipo, usando modelos de IA locales (Whisper y Parakeet). Todo offline, para que tu voz nunca salga de la máquina. Activas un atajo, hablas, y el texto aparece en la app que tengas al frente en Windows, macOS o Linux. Gratuito y de código abierto (MIT): descargas en escribbo.com y el proyecto completo en GitHub (con releases firmados y documentación).',
    escribboWebsite: 'Sitio',
    escribboRepo: 'GitHub',
    projectsTitle: 'Proyectos',
    projectsHeadline: 'Trabajo destacado.',
    projectsSectionDesc: 'Apps y sitios que puedes probar de verdad. Debajo, enlaces al sitio y al repositorio.',
    projectsCardHint: 'Escribbo — dictado offline con Whisper y Parakeet en local',

    // Education Modal
    academicBackground: 'Trayectoria académica.',
    educationDesc: 'Formación académica y certificaciones.',
    professionalDegree: 'Título Profesional',
    universityDiploma: 'Diplomado Universitario',
    technologistDegree: 'Título de Tecnólogo',
    webAppDevelopment: 'Desarrollo de Aplicaciones Web',
    softwareDevTechnologist: 'Tecnólogo en Ingeniería de Software',

    // Stack Modal
    technicalArsenal: 'Stack técnico',
    technicalArsenalDesc: 'Herramientas para desarrollo full-stack: desde frameworks de frontend modernos hasta sistemas backend sólidos e integración con IA.',
    frontend: 'Frontend',
    backend: 'Backend',
    aiMl: 'IA y Machine Learning',
    database: 'Bases de datos',

    // Chapter labels
    overviewSection: 'Resumen',
    atAGlance: 'De un vistazo.',
    bentoSubline: 'Un bento de trabajo y vida.',
    writingSection: 'Escritos',
    writingHeadline: 'Palabras.',
    writingSubline: 'Notas sobre IA, ingeniería y el oficio.',

    // Hero
    scrollCue: 'Desplázate',
    roleInterface: 'Diseño de interfaces',
    roleSystems: 'Pensamiento sistémico',
    roleAi: 'Ingeniería de IA',

    // Story
    since: 'Desde 2020',

    // Projects
    projectLabel: 'Proyecto',
    dictationApp: 'App de dictado',
    platforms: 'Plataformas',
    license: 'Licencia',
    builtWith: 'Construido con',

    // Globe
    remoteSubline: 'Remoto primero. Alcance global.',
    basedInBody: 'Desde {location}, colaboro de forma asíncrona entre zonas horarias con equipos en todo el mundo — tiempo completo y freelance.',
    coordinates: 'Coordenadas',
    timezone: 'Zona horaria',

    // Outro
    writeMe: 'Escríbeme',

    // Blog (homepage chapter)
    allPosts: 'Todos los artículos',
    readPost: 'Leer artículo',
    minRead: 'min de lectura',
    featured: 'Destacado',

    // Blog app
    blogBackHome: 'Volver al sitio',
    blogBackToArticles: 'Volver a los artículos',
    blogHeroKicker: 'Escritos',
    blogHeroHeadline: 'Pensando en voz alta.',
    blogHeroSubline: 'Ensayos, notas y apuntes sobre lo que tengo en la cabeza: software, IA, herramientas, diseño, el oficio y todo lo que orbita alrededor.',
    onThisPage: 'En esta página',
    upNext: 'A continuación',
    updatedLabel: 'Actualizado',
    aiEngineering: 'Ingeniería de IA',
    latest: 'Más reciente',
    moreReading: 'Más para leer',
    articleSingular: 'artículo',
    articlePlural: 'artículos',
    home: 'Inicio',
    copyLink: 'Copiar enlace',
    linkCopied: 'Enlace copiado',

    blogNotFoundTitle: 'Artículo no encontrado',
    blogNotFoundDescription: 'El artículo que buscas no existe.',
    blogReturnToBlog: 'Volver al blog',
    blogSummaryNote:
      'Este artículo se centra en la mecánica que da forma a productos reales con LLMs: presupuesto de tokens, calidad del retrieval, límites de ejecución y control de respuestas.',

    ariaBentoOverview: 'Vista general del bento',
    ariaGlobeChapter: 'Ubicación y globo terráqueo',
    ariaHeroIntro: 'Introducción',
    ariaGithub: 'GitHub',
    ariaLinkedin: 'LinkedIn',
    ariaGithubProfile: 'Perfil de GitHub',
    ariaLinkedinProfile: 'Perfil de LinkedIn',
    ariaProfilePhotoCard: 'Foto de perfil del desarrollador',
    ariaBackgroundImageCard: 'Imagen de fondo',
    themeSwitchToLight: 'Cambiar a tema claro',
    themeSwitchToDark: 'Cambiar a tema oscuro',

    errorPageTitle: 'Algo salió mal',
    errorPageDescription: 'Lo sentimos: ocurrió un error inesperado.',
    errorPageReload: 'Recargar página',

    introLoaderDeck1: 'CONSTRUCTOR',
    introLoaderDeck2: 'INGENIERO',
    introLoaderDeck3: 'LISTO',
    introLoaderFooter: 'Portafolio · {year}',
  }
} as const;

export type TranslationKey = keyof typeof translations.en;

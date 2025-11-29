import React, { useState, useEffect, useRef } from 'react';
import { BentoCard } from './components/BentoCard';
import { DetailView } from './components/DetailView';
import { AnimatePresence, motion } from 'framer-motion';
import createGlobe from 'cobe';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Database, 
  Code2, 
  Briefcase,
  GraduationCap,
  MapPin,
  ArrowUpRight,
  Brain,
  Sun,
  Moon,
  Globe as GlobeIcon,
  Cpu,
  Sparkles,
  Layout,
  Server
} from 'lucide-react';

// Define Item Interface
interface BentoItem {
  id: string;
  colSpan: string;
  rowSpan?: string;
  type: 'normal' | 'placeholder';
  content?: React.ReactNode;
  title?: string;
  bgImage?: string;
  hasArrow?: boolean;
  onClickModal?: string;
  noPadding?: boolean;
}

// ----- CONTENT COMPONENTS -----

const IntroContent = () => (
  <div className="relative h-full flex flex-col justify-between">
    {/* Decorative Background Blobs - Made subtler */}
    <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-[80px] animate-blob mix-blend-overlay pointer-events-none"></div>
    <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] animate-blob mix-blend-overlay pointer-events-none" style={{ animationDelay: '2s' }}></div>
    
    {/* Top Section: Status Badge (Moved to Right for balance) */}
    <div className="relative z-10 pointer-events-auto flex justify-end">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm transition-transform hover:scale-105 cursor-default">
        <div className="relative flex h-4 w-4 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </div>
        <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted/80">Available for work</span>
      </div>
    </div>

    {/* Bottom Section: Name + Bio */}
    <div className="relative z-10 pointer-events-auto flex flex-col md:flex-row md:items-end justify-between gap-4 mt-auto">
      <div className="relative bottom-[-4px]"> {/* Slight offset to anchor baseline */}
        <h1 className="text-5xl sm:text-6xl font-black tracking-tighter leading-[0.85] text-text-main">
          Anderson
        </h1>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tighter leading-[0.85] text-text-muted/20">
          Mendoza.
        </h1>
      </div>

      <div className="md:max-w-[160px] md:text-right pb-1">
         <p className="text-xs text-text-muted font-medium leading-relaxed">
          Systems Engineer building <span className="text-text-main font-semibold">scalable</span>, <span className="text-text-main font-semibold">high-performance</span> digital experiences.
        </p>
      </div>
    </div>
  </div>
);

const SocialsContent = ({ isDragging }: { copyToClipboard?: any, copiedText?: any, isDragging?: boolean }) => (
  <div className="flex flex-col h-full gap-3 w-full">
     {/* Platforms */}
     <div className="flex-1 flex gap-3 min-h-0">
        <a 
          href="https://github.com/andermendz" 
          target="_blank" 
          rel="noreferrer"
          className={`
            relative flex-1 flex flex-col items-center justify-center rounded-[24px] bg-card-hover border border-border group/social overflow-hidden transition-all duration-300
            ${isDragging ? '' : 'hover:border-text-main/20 hover:bg-text-main pointer-events-auto'}
          `}
          onPointerDown={(e) => e.stopPropagation()}
        >
            <Github size={32} className="text-text-main transition-all duration-300 group-hover/social:text-page group-hover/social:scale-110" />
        </a>

        <a 
          href="https://linkedin.com/in/andermendz" 
          target="_blank" 
          rel="noreferrer"
          className={`
            relative flex-1 flex flex-col items-center justify-center rounded-[24px] bg-card-hover border border-border group/social overflow-hidden transition-all duration-300
            ${isDragging ? '' : 'hover:border-[#0077b5]/30 hover:bg-[#0077b5] pointer-events-auto'}
          `}
          onPointerDown={(e) => e.stopPropagation()}
        >
            <Linkedin size={32} className="text-text-main transition-all duration-300 group-hover/social:text-white group-hover/social:scale-110" />
        </a>
     </div>

     {/* Contact Action */}
     <button 
        onClick={(e) => { e.stopPropagation(); window.location.href="mailto:andersonmendz19@gmail.com"}} 
        className={`
          relative h-14 w-full bg-text-main rounded-[24px] flex items-center justify-between px-6 gap-2 text-page font-bold shadow-md transition-all overflow-hidden group
          ${isDragging ? '' : 'hover:shadow-xl active:scale-[0.98] pointer-events-auto cursor-pointer'}
        `}
     >
        <span className="relative z-10 text-sm tracking-wide">Get in touch</span>
        <div className="relative z-10 w-8 h-8 rounded-full bg-page/20 flex items-center justify-center group-hover:bg-page group-hover:text-text-main transition-colors">
            <ArrowUpRight size={16} />
        </div>
     </button>
  </div>
);

const TechIcon = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border/60 shrink-0 shadow-sm">
    <span className="text-text-muted">{icon}</span>
    <span className="text-xs font-semibold text-text-main whitespace-nowrap">{label}</span>
  </div>
);

const TechStackContent = () => {
  const row1 = [
    { icon: <Code2 size={14} />, label: "React" },
    { icon: <Cpu size={14} />, label: "Next.js" },
    { icon: <Terminal size={14} />, label: "TypeScript" },
    { icon: <Layout size={14} />, label: "Tailwind" },
    { icon: <Brain size={14} />, label: "Gemini API" },
    { icon: <Database size={14} />, label: "PostgreSQL" },
  ];

  const row2 = [
    { icon: <Server size={14} />, label: "Node.js" },
    { icon: <Code2 size={14} />, label: "Python" },
    { icon: <Database size={14} />, label: "MongoDB" },
    { icon: <Layout size={14} />, label: "Framer Motion" },
    { icon: <Terminal size={14} />, label: "Docker" },
    { icon: <Database size={14} />, label: "Redis" },
  ];

  return (
    <div className="flex flex-col flex-1 justify-center w-full relative overflow-hidden mask-linear-fade">
       <div className="absolute inset-0 bg-gradient-to-r from-card via-transparent to-card z-10 pointer-events-none opacity-20"></div>
       
       {/* Row 1 */}
       <div className="flex gap-3 overflow-hidden w-full mb-3 opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex shrink-0 animate-marquee items-center gap-3">
             {row1.map((item, i) => <TechIcon key={`r1-${i}`} {...item} />)}
          </div>
          <div className="flex shrink-0 animate-marquee items-center gap-3">
             {row1.map((item, i) => <TechIcon key={`r1-d-${i}`} {...item} />)}
          </div>
       </div>
  
       {/* Row 2 */}
       <div className="flex gap-3 overflow-hidden w-full opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex shrink-0 animate-marquee-reverse items-center gap-3">
             {row2.map((item, i) => <TechIcon key={`r2-${i}`} {...item} />)}
          </div>
          <div className="flex shrink-0 animate-marquee-reverse items-center gap-3">
             {row2.map((item, i) => <TechIcon key={`r2-d-${i}`} {...item} />)}
          </div>
       </div>
    </div>
  );
};

const AboutContent = () => (
  <div className="h-full flex flex-col justify-end relative z-10">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>
    <div className="space-y-2">
      <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-2 border border-primary/5">
         <Sparkles size={18} />
      </div>
      <p className="text-xl sm:text-2xl font-medium text-text-main leading-tight tracking-tight">
        Obsessed with <span className="text-text-muted decoration-1 underline decoration-border underline-offset-4">details</span> and <span className="text-text-muted decoration-1 underline decoration-border underline-offset-4">performance</span>.
      </p>
    </div>
  </div>
);

const ExperienceContent = () => (
  <div className="mt-auto space-y-4">
     <div className="flex items-center gap-4 group">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-card border border-border flex items-center justify-center text-text-main group-hover:border-primary/20 transition-colors shadow-sm shrink-0">
          <Briefcase size={20} strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-text-main font-bold text-base sm:text-lg leading-none mb-1">Visbl</p>
          <p className="text-text-muted text-[10px] sm:text-xs font-semibold uppercase tracking-wide">Software Developer</p>
        </div>
     </div>
     <div className="w-full h-px bg-border"></div>
     <div className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-card border border-border flex items-center justify-center text-text-main shrink-0">
          <Briefcase size={20} strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-text-main font-bold text-base sm:text-lg leading-none mb-1">Comfenalco</p>
          <p className="text-text-muted text-[10px] sm:text-xs font-semibold uppercase tracking-wide">Full-stack Dev</p>
        </div>
     </div>
  </div>
);

const EducationContent = () => (
  <div className="h-full flex flex-col justify-end">
    {/* Decorative Elements - moved to be less intrusive */}
    <div className="absolute top-0 right-0 p-24 bg-gradient-to-br from-primary/5 to-purple-500/5 blur-[60px] rounded-full pointer-events-none z-0"></div>
    
    <div className="mt-auto space-y-3 relative z-10">
        <div className="w-10 h-10 rounded-2xl bg-card border border-border flex items-center justify-center text-text-main shadow-sm">
             <GraduationCap size={20} strokeWidth={1.5} />
        </div>
        
        <div>
            <h3 className="text-lg font-bold text-text-main leading-tight mb-1">Systems<br/>Engineering</h3>
            <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <p className="text-text-muted text-xs font-medium">Technological University</p>
            </div>
        </div>
    </div>
  </div>
);

const ContactContent = ({ copyToClipboard, copiedText, isDragging }: { copyToClipboard: any, copiedText: any, isDragging?: boolean }) => (
  <div className="flex flex-col justify-between h-full relative z-10">
    <div className="max-w-[80%]">
      <div className="w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center text-text-main shadow-sm mb-4">
        <Mail size={24} strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl sm:text-3xl font-semibold text-text-main mb-2 tracking-tight">
        Let's talk.
      </h3>
    </div>
    <div className={`w-full ${isDragging ? '' : 'pointer-events-auto'}`}>
      <button 
        onClick={(e) => { e.stopPropagation(); copyToClipboard("andersonmendz19@gmail.com", "email"); }}
        className="flex items-center justify-between gap-4 px-5 py-4 rounded-[20px] bg-card hover:bg-card-hover border border-border transition-all text-sm group w-full shadow-sm hover:shadow-lg hover:border-primary/20 active:scale-[0.99]"
      >
        <span className="truncate font-medium text-text-muted group-hover:text-text-main transition-colors">andersonmendz19@gmail.com</span>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md transition-all shrink-0 ${copiedText === 'email' ? 'bg-emerald-500 text-white shadow-emerald-500/20 shadow-lg' : 'bg-border/50 text-text-muted group-hover:bg-primary group-hover:text-primary-fg'}`}>
          {copiedText === 'email' ? 'Copied' : 'Copy'}
        </span>
      </button>
    </div>
  </div>
);

// ----- GLOBE COMPONENT -----

const Globe = ({ theme, scale = 1.2 }: { theme: 'dark' | 'light', scale?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(4.7);
  const widthRef = useRef(0);

  useEffect(() => {
    let width = 0;
    
    if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
        widthRef.current = width;
    }

    const onResize = () => {
        if (canvasRef.current) {
            width = canvasRef.current.offsetWidth;
            widthRef.current = width;
        }
    };
    
    window.addEventListener('resize', onResize);
    setTimeout(onResize, 100);

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2 || 100, 
      height: width * 2 || 100,
      phi: phiRef.current, 
      theta: 0.25, 
      dark: 1, 
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.15, 0.15, 0.15],
      markerColor: [1, 1, 1],
      glowColor: [0.15, 0.15, 0.15],
      opacity: 1,
      markers: [], 
      onRender: (state) => {
        if (widthRef.current > 0) {
            state.width = widthRef.current * 2;
            state.height = widthRef.current * 2;
        }
        
        // Rotation
        state.phi = phiRef.current + 0.004;
        phiRef.current = state.phi;

        // Origin (Cartagena, Colombia)
        const cx = 10.3932; 
        const cy = -75.4832; 

        // 1. Calculate Time & Progress
        const now = Date.now();
        const duration = 3000;
        const progress = (now % duration) / duration; // 0 to 1 cycle
        
        // 2. Pre-calculate Trigonometry for Origin (Optimization)
        // We do this once per frame, not per dot
        const lat1Rad = cx * Math.PI / 180;
        const lon1Rad = cy * Math.PI / 180;
        const sinLat1 = Math.sin(lat1Rad);
        const cosLat1 = Math.cos(lat1Rad);

        // 3. Define Ripple Config
        // Add more objects here to add more rings
        const rippleConfigs = [
            { maxScale: 24 },    // Outer main ripple
            { maxScale: 10 }    // Inner echo ripple
        ];

        // 4. Initialize Markers with Center Dot
        const markers: any[] = [{ location: [cx, cy], size: 0.06 }];

        // 5. Generate Ripples
        rippleConfigs.forEach(config => {
            const currentRadius = progress * config.maxScale;
            const opacity = 1 - progress; // Fade out as it expands

            // Optimization: Only render if visible
            if (currentRadius > 0.2 && opacity > 0.01) {
                const dRad = currentRadius * Math.PI / 180; // Distance in radians
                const sinD = Math.sin(dRad);
                const cosD = Math.cos(dRad);
                
                const dotCount = 50; // High count for smooth circle

                for (let i = 0; i < dotCount; i++) {
                    const bearing = (i / dotCount) * 2 * Math.PI;
                    const sinBearing = Math.sin(bearing);
                    const cosBearing = Math.cos(bearing);

                    // Destination Point Formula (Spherical Law of Cosines)
                    // This ensures the ring is a perfect circle on the sphere surface
                    const lat2Rad = Math.asin(sinLat1 * cosD + cosLat1 * sinD * cosBearing);
                    const lon2Rad = lon1Rad + Math.atan2(sinBearing * sinD * cosLat1, cosD - sinLat1 * Math.sin(lat2Rad));
                    
                    let lat2 = lat2Rad * 180 / Math.PI;
                    let lon2 = lon2Rad * 180 / Math.PI;
                    
                    // Normalize Longitude (-180 to 180)
                    if (lon2 < -180) lon2 += 360;
                    if (lon2 > 180) lon2 -= 360;

                    markers.push({
                        location: [lat2, lon2],
                        size: 0.03 * opacity
                    });
                }
            }
        });

        state.markers = markers;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []); 

  return (
    <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{ 
            width: '100%', 
            height: '100%', 
            maxWidth: '100%', 
            aspectRatio: '1',
            transform: `scale(${scale})`
        }}
        className={`w-full h-full transition-[filter] duration-700 ease-in-out ${theme === 'light' ? 'invert brightness-105' : ''}`}
      />
    </div>
  );
};

const MapContent = ({ time, theme }: { time: Date, theme: 'dark' | 'light' }) => (
  <div className="relative w-full h-full overflow-hidden">
     {/* Globe Layer - Full size because of noPadding */}
     <div className="absolute inset-0 z-0">
        <Globe theme={theme} scale={1.1} />
     </div>
     
     {/* Gradient Overlay for legibility */}
     <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent pointer-events-none z-10"></div>

     {/* Content Layer - Manually padded */}
     <div className="relative h-full flex flex-col justify-end z-20 p-6 sm:p-7">
        <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-xl border border-border flex items-center justify-center text-text-main shadow-lg">
              <MapPin size={18} />
            </div>
            <div className="px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-xl border border-border shadow-lg flex items-center gap-2">
                <span className="relative flex h-4 w-4 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-medium text-text-main">
                {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota' })}
                </span>
            </div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1 ml-1">Based in</p>
          <h3 className="text-xl font-bold text-text-main ml-1">Cartagena, CO</h3>
        </div>
     </div>
  </div>
);

// ----- MAIN COMPONENT -----

function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Drag & Drop State
  const [items, setItems] = useState<BentoItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<BentoItem | null>(null);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const [dragSize, setDragSize] = useState({ width: 0, height: 0 });

  // Refs for auto-scroll and input tracking
  const pointerY = useRef(0);
  const scrollAnim = useRef<number | null>(null);

  useEffect(() => {
    // Check system preference on load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
       // Optional: set initial theme based on system
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      // Ensure overflow is reset when modal closes
      document.body.style.overflow = '';
    }
  }, [activeModal]);

  // Initialize Items Data - ONLY ONCE
  useEffect(() => {
    setItems([
      { id: 'intro', type: 'normal', colSpan: 'col-span-1 sm:col-span-2', content: <IntroContent /> },
      { id: 'photo', type: 'normal', colSpan: 'col-span-1', bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: 'socials', type: 'normal', colSpan: 'col-span-1', content: <SocialsContent copyToClipboard={() => {}} copiedText={null} /> },
      { id: 'stack', type: 'normal', colSpan: 'col-span-1 sm:col-span-2', title: "Tech Stack", content: <TechStackContent />, hasArrow: true, onClickModal: 'stack' },
      { id: 'about', type: 'normal', colSpan: 'col-span-1', title: "About", content: <AboutContent />, hasArrow: true, onClickModal: 'about' },
      { id: 'experience', type: 'normal', colSpan: 'col-span-1', title: "Experience", content: <ExperienceContent />, hasArrow: true, onClickModal: 'experience' },
      { id: 'education', type: 'normal', colSpan: 'col-span-1', title: "Education", content: <EducationContent />, hasArrow: true, onClickModal: 'education' },
      { id: 'contact', type: 'normal', colSpan: 'col-span-1 sm:col-span-2', content: <ContactContent copyToClipboard={() => {}} copiedText={null} /> },
      { id: 'map', type: 'normal', colSpan: 'col-span-1', content: <MapContent time={new Date()} theme="dark" />, noPadding: true },
    ]);
  }, []); 

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // --- DRAG LOGIC ---

  const handleStartDrag = (itemToDrag: BentoItem, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    setDragSize({ width: rect.width, height: rect.height });
    const placeholder: BentoItem = { ...itemToDrag, type: 'placeholder' };
    setItems(prev => prev.map(i => i.id === itemToDrag.id ? placeholder : i));
    setDraggedItem(itemToDrag);
  };

  const handleEndDrag = () => {
    setItems(prev => prev.map(i => i.type === 'placeholder' && draggedItem ? draggedItem : i));
    setDraggedItem(null);
  };

  const handleHoverItem = (hoveredId: string) => {
    setItems(currentItems => {
        const placeholderIndex = currentItems.findIndex(i => i.type === 'placeholder');
        const hoveredIndex = currentItems.findIndex(i => i.id === hoveredId);

        if (placeholderIndex !== -1 && hoveredIndex !== -1 && placeholderIndex !== hoveredIndex) {
            const newItems = [...currentItems];
            const temp = newItems[placeholderIndex];
            newItems[placeholderIndex] = newItems[hoveredIndex];
            newItems[hoveredIndex] = temp;
            return newItems;
        }
        return currentItems;
    });
  };

  // Update pointer position and tracking ref
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setPointerPos({ x: e.clientX, y: e.clientY });
      pointerY.current = e.clientY;

      if (draggedItem) {
        e.preventDefault(); 
        const target = document.elementFromPoint(e.clientX, e.clientY);
        const card = target?.closest('[data-bento-id]');
        
        if (card) {
            const id = card.getAttribute('data-bento-id');
            if (id && id !== draggedItem.id) {
                handleHoverItem(id);
            }
        }
      }
    };
    
    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [draggedItem]); 

  // Auto-scroll loop
  useEffect(() => {
    if (!draggedItem) {
        if (scrollAnim.current) {
            cancelAnimationFrame(scrollAnim.current);
            scrollAnim.current = null;
        }
        return;
    }

    const scroll = () => {
        const threshold = 150;
        const maxSpeed = 20;
        const currentY = pointerY.current;
        const winH = window.innerHeight;
        
        if (currentY < threshold) {
            // Scroll Up
            const speed = maxSpeed * ((threshold - currentY) / threshold);
            window.scrollBy(0, -speed);
        } else if (currentY > winH - threshold) {
            // Scroll Down
            const speed = maxSpeed * ((currentY - (winH - threshold)) / threshold);
            window.scrollBy(0, speed);
        }

        scrollAnim.current = requestAnimationFrame(scroll);
    };

    scrollAnim.current = requestAnimationFrame(scroll);

    return () => {
        if (scrollAnim.current) cancelAnimationFrame(scrollAnim.current);
    };
  }, [draggedItem]);

  // Setup drag styles - REMOVED overflow:hidden to allow auto-scrolling
  useEffect(() => {
    if (draggedItem) {
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none'; 
      document.body.style.touchAction = 'none';
      // Note: We do NOT set overflow hidden here so window can scroll
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.style.touchAction = '';
    }
    return () => {
       document.body.style.cursor = '';
       document.body.style.userSelect = '';
       document.body.style.touchAction = '';
    };
  }, [draggedItem]);

  useEffect(() => {
    if (draggedItem) {
        const handleWindowPointerUp = () => {
            handleEndDrag();
        };
        window.addEventListener('pointerup', handleWindowPointerUp);
        return () => window.removeEventListener('pointerup', handleWindowPointerUp);
    }
  }, [draggedItem]);


  return (
    <div 
      className="min-h-screen bg-page text-text-main p-4 md:p-6 font-sans selection:bg-primary selection:text-primary-fg transition-colors duration-500 overflow-x-hidden flex flex-col items-center"
    >
      
      {/* Theme Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-[60] p-4 rounded-full bg-card/80 backdrop-blur-xl border border-border shadow-2xl text-text-main hover:bg-card-hover transition-colors ring-1 ring-white/10"
        onClick={toggleTheme}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div key="sun" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
               <Sun size={24} />
            </motion.div>
          ) : (
             <motion.div key="moon" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }}>
               <Moon size={24} />
             </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Detail Overlay View */}
      <AnimatePresence
        onExitComplete={() => {
            document.body.style.overflow = 'unset';
        }}
      >
        {activeModal && (
          <DetailView 
            onClose={() => setActiveModal(null)} 
            type={activeModal} 
            layoutId={activeModal} 
          />
        )}
      </AnimatePresence>

      {/* Floating Drag Overlay */}
      {draggedItem && (
        <div 
            className="fixed z-[100] pointer-events-none"
            style={{ 
                left: pointerPos.x, 
                top: pointerPos.y, 
                width: dragSize.width, 
                height: dragSize.height,
                transform: 'translate(-50%, -50%)'
            }}
        >
            <BentoCard 
                isDragging={true}
                title={draggedItem.title}
                backgroundImage={draggedItem.bgImage}
                hasArrow={draggedItem.hasArrow}
                noPadding={draggedItem.noPadding}
                className="h-full w-full shadow-2xl shadow-black/50"
            >
                {/* Render Content for Overlay */}
                {draggedItem.id === 'intro' && <IntroContent />}
                {draggedItem.id === 'socials' && <SocialsContent copyToClipboard={copyToClipboard} copiedText={copiedText} isDragging={true} />}
                {draggedItem.id === 'stack' && <TechStackContent />}
                {draggedItem.id === 'about' && <AboutContent />}
                {draggedItem.id === 'experience' && <ExperienceContent />}
                {draggedItem.id === 'education' && <EducationContent />}
                {draggedItem.id === 'contact' && <ContactContent copyToClipboard={copyToClipboard} copiedText={copiedText} isDragging={true} />}
                {draggedItem.id === 'map' && <MapContent time={time} theme={theme} />}
            </BentoCard>
        </div>
      )}

      <div className="w-full max-w-[1200px] mx-auto pb-6">
        
        {/* Main Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[225px] grid-flow-row-dense"
        > 
            {items.map((item) => {
                let currentContent = item.content;
                if (item.id === 'socials') currentContent = <SocialsContent copyToClipboard={copyToClipboard} copiedText={copiedText} />;
                if (item.id === 'contact') currentContent = <ContactContent copyToClipboard={copyToClipboard} copiedText={copiedText} />;
                // Pass theme specifically to MapContent here
                if (item.id === 'map') currentContent = <MapContent time={time} theme={theme} />;
                
                const isExpanded = activeModal === item.id;

                return (
                    <BentoCard 
                        key={item.id}
                        layoutId={item.id}
                        dataId={item.id}
                        className={`${item.colSpan} ${item.rowSpan || ''} ${item.type === 'normal' ? 'h-full' : ''}`}
                        title={item.title}
                        backgroundImage={item.bgImage}
                        hasArrow={item.hasArrow}
                        isGhost={item.type === 'placeholder'}
                        isDragActive={!!draggedItem} 
                        isVisible={!isExpanded} 
                        onClick={item.onClickModal ? () => setActiveModal(item.onClickModal!) : undefined}
                        onLongPress={(e, el) => handleStartDrag(item, el)}
                        onHover={() => handleHoverItem(item.id)}
                        noPadding={item.noPadding}
                    >
                        {item.type === 'normal' && currentContent}
                    </BentoCard>
                );
            })}
        </motion.div>
        
        {/* Footer */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-text-muted text-xs font-medium uppercase tracking-wider gap-4 opacity-50">
           <p>© 2025 Anderson Mendoza.</p>
           <div className="flex items-center gap-2">
             <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
             <p>Systems Engineer</p>
           </div>
        </div>
      </div>
    </div>
  );
}

export default App;
import React from 'react';
import { Terminal, Database, Code2, Brain, Cpu, Layout, Server } from 'lucide-react';

const TechIcon: React.FC<{ icon: React.ReactNode; label: string; hoverColor: string }> = ({ icon, label, hoverColor }) => (
  <div 
    className="group/tech flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-card-hover border border-border/50 shrink-0 shadow-sm cursor-default transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-[var(--hover-color)]"
    style={{ ['--hover-color' as string]: hoverColor.startsWith('var(') ? hoverColor : hoverColor }}
  >
    <span className="text-text-muted transition-colors duration-300 group-hover/tech:text-[var(--hover-color)]">
      {icon}
    </span>
    <span className="text-xs sm:text-sm font-bold text-text-main whitespace-nowrap transition-colors duration-300 group-hover/tech:text-[var(--hover-color)]">
      {label}
    </span>
  </div>
);

export const TechStackContent: React.FC = () => {
  const row1 = [
    { icon: <Code2 size={18} />, label: "React", hoverColor: "#61DAFB" },
    { icon: <Cpu size={18} />, label: "Next.js", hoverColor: "var(--next-hover)" },
    { icon: <Terminal size={18} />, label: "TypeScript", hoverColor: "#3178C6" },
    { icon: <Layout size={18} />, label: "Tailwind", hoverColor: "#06B6D4" },
    { icon: <Brain size={18} />, label: "Gemini API", hoverColor: "#8E75FF" },
    { icon: <Database size={18} />, label: "PostgreSQL", hoverColor: "#4169E1" },
  ];

  const row2 = [
    { icon: <Server size={18} />, label: "Node.js", hoverColor: "#339933" },
    { icon: <Code2 size={18} />, label: "Python", hoverColor: "#3776AB" },
    { icon: <Database size={18} />, label: "MongoDB", hoverColor: "#47A248" },
    { icon: <Layout size={18} />, label: "Framer Motion", hoverColor: "#FF0080" },
    { icon: <Terminal size={18} />, label: "Docker", hoverColor: "#2496ED" },
    { icon: <Database size={18} />, label: "Redis", hoverColor: "#DC382D" },
  ];

  const row3 = [
    { icon: <Code2 size={18} />, label: "Vue.js", hoverColor: "#41B883" },
    { icon: <Cpu size={18} />, label: "Svelte", hoverColor: "#FF3E00" },
    { icon: <Terminal size={18} />, label: "GraphQL", hoverColor: "#E10098" },
    { icon: <Layout size={18} />, label: "CSS Modules", hoverColor: "#264DE4" },
    { icon: <Brain size={18} />, label: "OpenAI", hoverColor: "var(--ai-hover)" },
    { icon: <Server size={18} />, label: "AWS", hoverColor: "#FF9900" },
  ];

  const row4 = [
    { icon: <Terminal size={18} />, label: "Linux", hoverColor: "#FCC624" },
    { icon: <Layout size={18} />, label: "Figma", hoverColor: "#A259FF" },
    { icon: <Code2 size={18} />, label: "Jest", hoverColor: "#C21325" },
    { icon: <Server size={18} />, label: "Supabase", hoverColor: "#3ECF8E" },
    { icon: <Cpu size={18} />, label: "Vercel", hoverColor: "#FFFFFF" },
    { icon: <Database size={18} />, label: "Prisma", hoverColor: "#16A394" },
  ];

  return (
    <div className="flex flex-col flex-1 items-center justify-center w-full h-full relative overflow-hidden mask-linear-fade py-2 sm:py-0">
      <div className="flex flex-col gap-4 sm:gap-5 3xl:gap-8 w-[110%] -rotate-[4deg] scale-[1.05] 3xl:scale-[1.15]">
        {/* Row 1 */}
        <div className="flex gap-4 sm:gap-5 overflow-x-hidden overflow-y-visible w-full py-1">
          <div className="flex shrink-0 animate-marquee items-center gap-4 sm:gap-5" style={{ animationDuration: '30s' }}>
            {row1.map((item, i) => <TechIcon key={`r1-${i}`} {...item} />)}
          </div>
          <div className="flex shrink-0 animate-marquee items-center gap-4 sm:gap-5" style={{ animationDuration: '30s' }}>
            {row1.map((item, i) => <TechIcon key={`r1-d-${i}`} {...item} />)}
          </div>
        </div>
    
        {/* Row 2 */}
        <div className="flex gap-4 sm:gap-5 overflow-x-hidden overflow-y-visible w-full py-1">
          <div className="flex shrink-0 animate-marquee-reverse items-center gap-4 sm:gap-5" style={{ animationDuration: '35s' }}>
            {row2.map((item, i) => <TechIcon key={`r2-${i}`} {...item} />)}
          </div>
          <div className="flex shrink-0 animate-marquee-reverse items-center gap-4 sm:gap-5" style={{ animationDuration: '35s' }}>
            {row2.map((item, i) => <TechIcon key={`r2-d-${i}`} {...item} />)}
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex gap-4 sm:gap-5 overflow-x-hidden overflow-y-visible w-full py-1">
          <div className="flex shrink-0 animate-marquee items-center gap-4 sm:gap-5" style={{ animationDuration: '40s' }}>
            {row3.map((item, i) => <TechIcon key={`r3-${i}`} {...item} />)}
          </div>
          <div className="flex shrink-0 animate-marquee items-center gap-4 sm:gap-5" style={{ animationDuration: '40s' }}>
            {row3.map((item, i) => <TechIcon key={`r3-d-${i}`} {...item} />)}
          </div>
        </div>

        {/* Row 4 */}
        <div className="flex gap-4 sm:gap-5 overflow-x-hidden overflow-y-visible w-full py-1">
          <div className="flex shrink-0 animate-marquee-reverse items-center gap-4 sm:gap-5" style={{ animationDuration: '28s' }}>
            {row4.map((item, i) => <TechIcon key={`r4-${i}`} {...item} />)}
          </div>
          <div className="flex shrink-0 animate-marquee-reverse items-center gap-4 sm:gap-5" style={{ animationDuration: '28s' }}>
            {row4.map((item, i) => <TechIcon key={`r4-d-${i}`} {...item} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Terminal, Database, Code2, Brain, Cpu, Layout, Server } from 'lucide-react';

const TechIcon: React.FC<{ icon: React.ReactNode; label: string; hoverColor: string }> = ({ icon, label, hoverColor }) => (
  <div 
    className="group/tech flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-card-hover border border-border/50 shrink-0 shadow-sm cursor-default transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-[var(--hover-color)]"
    style={{ ['--hover-color' as string]: hoverColor.startsWith('var(') ? hoverColor : hoverColor }}
  >
    <span className="text-text-muted transition-colors duration-300 group-hover/tech:text-[var(--hover-color)] [&>svg]:w-[14px] [&>svg]:h-[14px] sm:[&>svg]:w-[18px] sm:[&>svg]:h-[18px]">
      {icon}
    </span>
    <span className="text-[10px] sm:text-xs font-bold text-text-main whitespace-nowrap transition-colors duration-300 group-hover/tech:text-[var(--hover-color)]">
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
    { icon: <Server size={18} />, label: "Node.js", hoverColor: "#339933" },
    { icon: <Brain size={18} />, label: "OpenAI", hoverColor: "var(--ai-hover)" },
  ];

  const row2 = [
    { icon: <Database size={18} />, label: "PostgreSQL", hoverColor: "#4169E1" },
    { icon: <Terminal size={18} />, label: "Rust", hoverColor: "#CE422B" },
    { icon: <Cpu size={18} />, label: "Tauri", hoverColor: "#24C8D8" },
    { icon: <Layout size={18} />, label: "Framer Motion", hoverColor: "#FF0080" },
    { icon: <Code2 size={18} />, label: "Python", hoverColor: "#3776AB" },
    { icon: <Server size={18} />, label: "Docker", hoverColor: "#2496ED" },
  ];

  return (
    <div className="flex flex-col flex-1 items-center justify-center w-full h-full relative overflow-hidden mask-linear-fade py-1 sm:py-2">
      <div className="flex flex-col gap-2 sm:gap-3 w-[108%] -rotate-[3deg] scale-[1.02] sm:scale-105">
        <div className="flex gap-2 sm:gap-4 overflow-x-hidden overflow-y-visible w-full py-0.5">
          <div className="flex shrink-0 animate-marquee items-center gap-2 sm:gap-4" style={{ animationDuration: '32s' }}>
            {row1.map((item, i) => <TechIcon key={`r1-${i}`} {...item} />)}
          </div>
          <div className="flex shrink-0 animate-marquee items-center gap-2 sm:gap-4" style={{ animationDuration: '32s' }}>
            {row1.map((item, i) => <TechIcon key={`r1-d-${i}`} {...item} />)}
          </div>
        </div>

        <div className="flex gap-2 sm:gap-4 overflow-x-hidden overflow-y-visible w-full py-0.5">
          <div className="flex shrink-0 animate-marquee-reverse items-center gap-2 sm:gap-4" style={{ animationDuration: '38s' }}>
            {row2.map((item, i) => <TechIcon key={`r2-${i}`} {...item} />)}
          </div>
          <div className="flex shrink-0 animate-marquee-reverse items-center gap-2 sm:gap-4" style={{ animationDuration: '38s' }}>
            {row2.map((item, i) => <TechIcon key={`r2-d-${i}`} {...item} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

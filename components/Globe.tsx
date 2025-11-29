import React, { useState, useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { MapPin } from 'lucide-react';
import type { GlobeProps, MapContentProps } from '../types';

// ----- GLOBE COMPONENT -----

export const Globe: React.FC<GlobeProps> = ({ theme, scale = 1.2 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const phiRef = useRef(4.7);
  const sizeRef = useRef(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure theme is properly applied before showing
    const showTimer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    let size = 0;
    
    // Use container height as the base size to keep consistent zoom
    if (containerRef.current) {
      size = containerRef.current.offsetHeight;
      sizeRef.current = size;
    }

    const onResize = () => {
      if (containerRef.current) {
        size = containerRef.current.offsetHeight;
        sizeRef.current = size;
      }
    };
    
    window.addEventListener('resize', onResize);
    setTimeout(onResize, 100);

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: size * 2 || 100, 
      height: size * 2 || 100,
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
        if (sizeRef.current > 0) {
          state.width = sizeRef.current * 2;
          state.height = sizeRef.current * 2;
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
        const lat1Rad = cx * Math.PI / 180;
        const lon1Rad = cy * Math.PI / 180;
        const sinLat1 = Math.sin(lat1Rad);
        const cosLat1 = Math.cos(lat1Rad);

        // 3. Define Ripple Config
        const rippleConfigs = [
          { maxScale: 24 },    // Outer main ripple
          { maxScale: 10 }     // Inner echo ripple
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
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden">
      {/* Square wrapper sized by container height to keep consistent zoom */}
      <div 
        className="relative flex items-center justify-center"
        style={{ 
          height: '100%',
          aspectRatio: '1',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ 
            width: '100%', 
            height: '100%', 
            transform: `scale(${scale})`,
            opacity: isReady ? 1 : 0,
            transition: 'opacity 0.5s ease-out, filter 0.7s ease-in-out'
          }}
          className={`${theme === 'light' ? 'invert brightness-105' : ''}`}
        />
      </div>
    </div>
  );
};

// ----- MAP CONTENT COMPONENT -----

export const MapContent: React.FC<MapContentProps> = ({ time, theme }) => (
  <div className="relative w-full h-full overflow-hidden">
    {/* Globe Layer */}
    <div className="absolute inset-0 z-0">
      <Globe theme={theme} scale={1.35} />
    </div>
    
    {/* Subtle gradient at bottom for legibility */}
    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card/90 to-transparent pointer-events-none z-10"></div>

    {/* Compact bottom bar */}
    <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-card/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-text-main shrink-0">
            <MapPin size={14} />
          </div>
          <div className="min-w-0">
            <p className="text-[8px] font-bold text-text-muted/80 uppercase tracking-wider leading-none mb-0.5">Based in</p>
            <h3 className="text-sm font-bold text-text-main leading-none">Cartagena, CO</h3>
          </div>
        </div>
        
        <div className="px-2 py-1 rounded-full bg-card/80 backdrop-blur-md border border-border/50 flex items-center gap-1.5 shrink-0">
          <span className="relative flex h-2 w-2 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-mono font-medium text-text-main">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota' })}
          </span>
        </div>
      </div>
    </div>
  </div>
);


import { useState, useRef, useEffect, useLayoutEffect, RefObject } from 'react';
import type { BentoItem } from '../types';

interface UseDragAndDropOptions {
  items: BentoItem[];
  setItems: React.Dispatch<React.SetStateAction<BentoItem[]>>;
}

interface UseDragAndDropReturn {
  draggedItem: BentoItem | null;
  dragSize: { width: number; height: number };
  dragOverlayRef: RefObject<HTMLDivElement>;
  handleStartDrag: (itemToDrag: BentoItem, element: HTMLElement, pointerEvent: React.PointerEvent) => void;
  handleEndDrag: () => void;
  handleHoverItem: (hoveredId: string) => void;
}

export const useDragAndDrop = ({ setItems }: UseDragAndDropOptions): UseDragAndDropReturn => {
  const [draggedItem, setDraggedItem] = useState<BentoItem | null>(null);
  const [dragSize, setDragSize] = useState({ width: 0, height: 0 });

  // Refs for smooth drag movement (no re-renders) and auto-scroll
  const pointerY = useRef(0);
  const scrollAnim = useRef<number | null>(null);
  const dragOverlayRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const initialDragPos = useRef({ x: 0, y: 0 });
  const lastHoveredId = useRef<string | null>(null);

  const handleStartDrag = (itemToDrag: BentoItem, element: HTMLElement, pointerEvent: React.PointerEvent) => {
    const rect = element.getBoundingClientRect();
    setDragSize({ width: rect.width, height: rect.height });
    
    // Calculate offset from pointer to the card's top-left corner
    dragOffset.current = {
      x: pointerEvent.clientX - rect.left,
      y: pointerEvent.clientY - rect.top
    };
    
    // Store initial position for the overlay
    initialDragPos.current = {
      x: pointerEvent.clientX - dragOffset.current.x,
      y: pointerEvent.clientY - dragOffset.current.y
    };
    
    const placeholder: BentoItem = { ...itemToDrag, type: 'placeholder' };
    setItems(prev => prev.map(i => i.id === itemToDrag.id ? placeholder : i));
    setDraggedItem(itemToDrag);
  };

  const handleEndDrag = () => {
    setItems(prev => prev.map(i => i.type === 'placeholder' && draggedItem ? draggedItem : i));
    setDraggedItem(null);
    lastHoveredId.current = null;
  };

  const handleHoverItem = (hoveredId: string) => {
    // Skip if hovering the same item as last time (prevents excessive swaps)
    if (hoveredId === lastHoveredId.current) return;
    
    setItems(currentItems => {
      const placeholderIndex = currentItems.findIndex(i => i.type === 'placeholder');
      const hoveredIndex = currentItems.findIndex(i => i.id === hoveredId);

      if (placeholderIndex !== -1 && hoveredIndex !== -1 && placeholderIndex !== hoveredIndex) {
        // Update lastHoveredId when swap happens
        lastHoveredId.current = hoveredId;
        
        const newItems = [...currentItems];
        const temp = newItems[placeholderIndex];
        newItems[placeholderIndex] = newItems[hoveredIndex];
        newItems[hoveredIndex] = temp;
        return newItems;
      }
      return currentItems;
    });
  };

  // Set initial position of drag overlay synchronously before paint
  useLayoutEffect(() => {
    if (draggedItem && dragOverlayRef.current) {
      dragOverlayRef.current.style.left = `${initialDragPos.current.x}px`;
      dragOverlayRef.current.style.top = `${initialDragPos.current.y}px`;
    }
  }, [draggedItem]);

  // Update pointer position using refs for smooth 60fps movement
  useEffect(() => {
    const updateDragPosition = (clientX: number, clientY: number) => {
      pointerY.current = clientY;
      
      // Direct DOM manipulation for smooth movement
      if (dragOverlayRef.current) {
        dragOverlayRef.current.style.left = `${clientX - dragOffset.current.x}px`;
        dragOverlayRef.current.style.top = `${clientY - dragOffset.current.y}px`;
      }
      
      const target = document.elementFromPoint(clientX, clientY);
      const card = target?.closest('[data-bento-id]');
      
      if (card) {
        const id = card.getAttribute('data-bento-id');
        // Trigger swap check - handleHoverItem will dedupe if same card
        if (id && id !== draggedItem?.id) {
          handleHoverItem(id);
        }
      } else {
        // Reset when leaving all cards so re-entering triggers properly
        lastHoveredId.current = null;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointerY.current = e.clientY;

      if (draggedItem) {
        e.preventDefault();
        updateDragPosition(e.clientX, e.clientY);
      }
    };
    
    // Touch-specific handler for better mobile performance
    const handleTouchMove = (e: TouchEvent) => {
      if (draggedItem && e.touches.length > 0) {
        e.preventDefault();
        const touch = e.touches[0];
        updateDragPosition(touch.clientX, touch.clientY);
      }
    };
    
    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
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

  // Setup drag styles
  useEffect(() => {
    if (draggedItem) {
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none'; 
      document.body.style.touchAction = 'none';
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

  // Global pointer up handler
  useEffect(() => {
    if (draggedItem) {
      const handleWindowPointerUp = () => {
        handleEndDrag();
      };
      
      const handleTouchEnd = () => {
        handleEndDrag();
      };
      
      window.addEventListener('pointerup', handleWindowPointerUp);
      window.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('touchcancel', handleTouchEnd);
      
      return () => {
        window.removeEventListener('pointerup', handleWindowPointerUp);
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('touchcancel', handleTouchEnd);
      };
    }
  }, [draggedItem]);

  return {
    draggedItem,
    dragSize,
    dragOverlayRef: dragOverlayRef as RefObject<HTMLDivElement>,
    handleStartDrag,
    handleEndDrag,
    handleHoverItem,
  };
};


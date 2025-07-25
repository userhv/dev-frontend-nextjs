"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export const Tooltip = ({ content, children, position = "top", className }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detectar dispositivos touch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  const showTooltip = () => {
    // Em dispositivos touch, não mostrar tooltip no hover
    if (isTouchDevice) return;
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      let x = 0;
      let y = 0;

      switch (position) {
        case "top":
          x = rect.left + rect.width / 2;
          y = rect.top - 8;
          break;
        case "bottom":
          x = rect.left + rect.width / 2;
          y = rect.bottom + 8;
          break;
        case "left":
          x = rect.left - 8;
          y = rect.top + rect.height / 2;
          break;
        case "right":
          x = rect.right + 8;
          y = rect.top + rect.height / 2;
          break;
      }

      setTooltipPosition({ x, y });
    }
    
    setIsVisible(true);
  };

  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(false), 100);
  };

  const hideTooltipImmediately = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const getTransformClasses = () => {
    switch (position) {
      case "top":
        return "transform -translate-x-1/2 -translate-y-full";
      case "bottom":
        return "transform -translate-x-1/2";
      case "left":
        return "transform -translate-x-full -translate-y-1/2";
      case "right":
        return "transform -translate-y-1/2";
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case "top":
        return "absolute top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-800 dark:border-t-gray-600";
      case "bottom":
        return "absolute bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-800 dark:border-b-gray-600";
      case "left":
        return "absolute left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-800 dark:border-l-gray-600";
      case "right":
        return "absolute right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-800 dark:border-r-gray-600";
    }
  };

  return (
    <>
      <div 
        ref={triggerRef}
        className="relative inline-flex items-center justify-center" 
        onMouseEnter={showTooltip} 
        onMouseLeave={hideTooltip}
        onClick={hideTooltipImmediately}
        onTouchStart={hideTooltipImmediately}
      >
        {children}
      </div>
      
      {isVisible && createPortal(
        <div 
          className={cn(
            "fixed z-50 px-2 py-1 text-sm text-white bg-gray-800 dark:bg-gray-600 rounded shadow-lg whitespace-nowrap pointer-events-none",
            getTransformClasses(),
            className
          )}
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
          }}
        >
          {content}
          <div className={cn("w-0 h-0 border-4", getArrowClasses())} />
        </div>,
        document.body
      )}
    </>
  );
};

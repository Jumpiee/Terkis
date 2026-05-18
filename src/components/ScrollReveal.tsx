"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/utilities/cn";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: string;
  delay?: number;
  once?: boolean;
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  animation = "animate-fade-up",
  delay = 0,
  once = true,
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0",
        isVisible && animation,
        isVisible && "opacity-100",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  );
};

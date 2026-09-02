"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const FRAME_COUNT = 240;

export default function ScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Store the images in memory
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  // Track the current frame number outside of React state/refs for GSAP
  const currentFrame = useRef({ value: 0 });

  useEffect(() => {
    imagesRef.current = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      imagesRef.current.push(new Image());
    }
    
    const loadImages = async () => {
      let loadedCount = 0;
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = imagesRef.current[i - 1];
        const num = i.toString().padStart(3, "0");
        img.src = `/images/sequence3/ezgif-frame-${num}.webp`;
        
        img.onload = () => {
          loadedCount++;
          // If the image that just loaded is the one we are currently looking at, render it!
          if (i - 1 === Math.round(currentFrame.current.value)) {
            render();
          }
          if (loadedCount === FRAME_COUNT) {
            ScrollTrigger.refresh();
          }
        };
      }
    };
    loadImages();
  }, []);

  const render = () => {
    if (!canvasRef.current || imagesRef.current.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameIndex = Math.round(currentFrame.current.value);
    // Safety clamp
    const safeIndex = Math.max(0, Math.min(FRAME_COUNT - 1, frameIndex));
    const img = imagesRef.current[safeIndex];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (img && img.complete) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else {
      // Fallback: if image isn't loaded yet, draw a loading indicator
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#d71920";
      ctx.font = "50px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`Loading Frame ${safeIndex + 1}...`, canvas.width / 2, canvas.height / 2);
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    let autoScrollTween: gsap.core.Tween | null = null;
    let scrollTimeout: NodeJS.Timeout | null = null;
    let isActiveSection = false;
    let isProgrammaticScroll = false;

    const startAutoScroll = () => {
      if (!isActiveSection || !containerRef.current) return;

      const endY = containerRef.current.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
      const distanceLeft = endY - window.scrollY;
      
      if (distanceLeft <= 5) return;

      const duration = Math.max(0.5, distanceLeft / 400);

      isProgrammaticScroll = true;
      autoScrollTween = gsap.to(window, {
        scrollTo: { y: endY, autoKill: true },
        duration: duration,
        ease: "none",
        onAutoKill: () => {
          // The moment the user fights the scroll, autoKill triggers and we hand control back to the user
          isProgrammaticScroll = false;
        },
        onComplete: () => {
          isProgrammaticScroll = false;
        }
      });
    };

    const handleScroll = () => {
      if (!isActiveSection) return;

      // If GSAP is scrolling the page, ignore this event
      if (isProgrammaticScroll) return;

      // If we reach here, the USER is scrolling (via wheel, scrollbar, arrow keys, etc.)
      // Push the resume timer 1 second into the future.
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        startAutoScroll();
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const ctx = gsap.context(() => {
      const frameObj = { val: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom", 
          scrub: 0.5, 
          onToggle: (self) => {
            isActiveSection = self.isActive;
            if (!self.isActive) {
              if (autoScrollTween) autoScrollTween.kill();
              if (scrollTimeout) clearTimeout(scrollTimeout);
              isProgrammaticScroll = false;
            }
          },
          onEnter: () => {
            gsap.delayedCall(0.5, () => {
              startAutoScroll();
            });
          },
          onEnterBack: () => {
             gsap.delayedCall(0.5, () => {
                if (!isActiveSection || !containerRef.current) return;
                const startY = containerRef.current.getBoundingClientRect().top + window.scrollY;
                const distanceLeft = window.scrollY - startY;
                if (distanceLeft <= 5) return;
                
                const duration = Math.max(0.5, distanceLeft / 400);
                isProgrammaticScroll = true;
                autoScrollTween = gsap.to(window, {
                  scrollTo: { y: startY, autoKill: true },
                  duration: duration,
                  ease: "none",
                  onAutoKill: () => { isProgrammaticScroll = false; },
                  onComplete: () => { isProgrammaticScroll = false; }
                });
             });
          }
        },
      });

      tl.to(frameObj, {
        val: FRAME_COUNT - 1,
        ease: "none",
        onUpdate: () => {
          currentFrame.current.value = frameObj.val;
          render();
        }
      });
    }, containerRef);

    return () => {
      if (autoScrollTween) autoScrollTween.kill();
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    }
  }, []);

  // Using a 400vh container (approx 4000px) so the user scrolls down this section 
  // while the canvas is natively stuck via position: sticky
  return (
    <div ref={containerRef} className="w-full relative h-[400vh] bg-[#050505]">
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="w-full max-w-6xl h-auto object-contain rounded-xl shadow-2xl bg-black"
        />
      </div>
    </div>
  );
}

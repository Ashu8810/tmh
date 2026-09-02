"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  opacity: number;
  life: number;
  maxLife: number;
  type: "smoke" | "spark" | "fuel";
  color?: string;
}

export default function CarCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = !window.matchMedia("(pointer: fine)").matches;
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Instant cursor coordinates (zero input lag)
    let mouseX = -100;
    let mouseY = -100;
    let prevMouseX = -100;
    let prevMouseY = -100;
    let carAngle = 0;
    let targetAngle = 0;
    let lastMoveTime = Date.now();
    let isVisible = false;
    let isHovering = false;
    let wasIdle = false;

    // Fueling stats
    let fuelLevel = 0;
    let pumpPulse = 0;
    let frameCount = 0;

    const MAX_PARTICLES = 30;
    const particles: Particle[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMoveTime = Date.now();
      isVisible = true;

      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      const dist = Math.hypot(dx, dy);

      if (dist > 3) {
        targetAngle = Math.atan2(dy, dx);
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
    };

    const onMouseEnter = () => {
      isVisible = true;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      isHovering = !!target.closest("a, button, input, select, textarea, [role='button']");
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseover", onMouseOver, { passive: true });

    const lerpAngle = (start: number, end: number, factor: number) => {
      let diff = end - start;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      return start + diff * factor;
    };

    const spawnSmoke = (x: number, y: number, angle: number) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      const driftAngle = angle + Math.PI + (Math.random() - 0.5) * 0.5;
      particles.push({
        x: x + (Math.random() - 0.5) * 3,
        y: y + (Math.random() - 0.5) * 3,
        vx: Math.cos(driftAngle) * 1.5,
        vy: Math.sin(driftAngle) * 1.5,
        size: 3,
        maxSize: 11,
        opacity: 0.45,
        life: 0,
        maxLife: 20,
        type: "smoke",
      });
    };

    const spawnSparks = (x: number, y: number, count: number, color = "#ff4500") => {
      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) particles.shift();
        const a = Math.random() * Math.PI * 2;
        const spd = Math.random() * 3.5 + 1.5;
        particles.push({
          x,
          y,
          vx: Math.cos(a) * spd,
          vy: Math.sin(a) * spd,
          size: 1.8,
          maxSize: 0.5,
          opacity: 1,
          life: 0,
          maxLife: 12,
          type: "spark",
          color,
        });
      }
    };

    // Golden / Amber Fuel Droplets & Vapor
    const spawnFuelDroplet = (x: number, y: number) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      const a = (Math.random() - 0.5) * 1.2 - Math.PI / 2;
      const spd = Math.random() * 1.6 + 0.8;
      particles.push({
        x: x + (Math.random() - 0.5) * 2,
        y: y + (Math.random() - 0.5) * 2,
        vx: Math.cos(a) * spd,
        vy: Math.sin(a) * spd,
        size: Math.random() * 1.6 + 1.2,
        maxSize: 0.4,
        opacity: 0.9,
        life: 0,
        maxLife: 14,
        type: "fuel",
        color: Math.random() > 0.3 ? "#f59e0b" : "#fbbf24",
      });
    };

    // 60FPS High-Performance Render Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isVisible || mouseX < 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      frameCount++;
      const now = Date.now();
      const isIdle = now - lastMoveTime > 850; // Idle after 0.85s

      // Direct, instantaneous car tracking (ZERO lag!)
      const carX = mouseX;
      const carY = mouseY;

      const distMoved = Math.hypot(carX - prevMouseX, carY - prevMouseY);
      const isMoving = distMoved > 1.5;

      if (isMoving) {
        carAngle = lerpAngle(carAngle, targetAngle, 0.45);
      }

      // Launch burst when moving again after refueling
      if (wasIdle && !isIdle && isMoving) {
        const rearX = carX - Math.cos(carAngle) * 16;
        const rearY = carY - Math.sin(carAngle) * 16;
        spawnSparks(rearX, rearY, 6, "#f59e0b");
        spawnSmoke(rearX, rearY, carAngle);
        spawnSmoke(rearX, rearY, carAngle);
        fuelLevel = 0;
      }
      wasIdle = isIdle;

      // Exhaust smoke generation when moving
      if (isMoving && !isIdle && frameCount % 2 === 0) {
        const rearX = carX - Math.cos(carAngle) * 15;
        const rearY = carY - Math.sin(carAngle) * 15;
        spawnSmoke(rearX, rearY, carAngle);
        if (isHovering && Math.random() < 0.3) {
          spawnSparks(rearX, rearY, 2, "#D71920");
        }
      }

      // Refueling behavior when idle
      if (isIdle) {
        pumpPulse += 0.08;
        fuelLevel = Math.min(100, fuelLevel + 1.8);

        // Spawn fuel splashes at the fuel cap
        if (frameCount % 3 === 0) {
          // Fuel cap position (rear right flank of car)
          const capCos = Math.cos(carAngle);
          const capSin = Math.sin(carAngle);
          const capX = carX + (-8 * capCos - 7 * capSin);
          const capY = carY + (-8 * capSin + 7 * capCos);
          spawnFuelDroplet(capX, capY);
        }
      }

      // --- 1. RENDER PARTICLES ---
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const progress = p.life / p.maxLife;
        const curAlpha = p.opacity * (1 - progress);

        if (p.type === "smoke") {
          p.vx *= 0.92;
          p.vy *= 0.92;
          const r = p.size + (p.maxSize - p.size) * progress;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 200, 200, ${curAlpha * 0.4})`;
          ctx.fill();
        } else if (p.type === "fuel") {
          p.vy += 0.12; // gravity on liquid droplets
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color || "#f59e0b";
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color || "#ff5500";
          ctx.fill();
        }

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      // --- 2. RENDER REFUELING NOZZLE & HOSE (WHEN IDLE) ---
      if (isIdle) {
        ctx.save();
        ctx.translate(carX, carY);
        ctx.rotate(carAngle);

        const isFull = fuelLevel >= 100;
        const accentColor = isFull ? "#22c55e" : "#f59e0b";

        // Fuel Port on Car (Rear Right Flank)
        const capX = -8;
        const capY = 6.5;

        // Fuel Hose (Curving from side of screen into the car)
        const pumpOriginX = 18;
        const pumpOriginY = 28;
        const controlX = 4;
        const controlY = 26;

        // Flexible Black Fuel Hose
        ctx.beginPath();
        ctx.moveTo(pumpOriginX, pumpOriginY);
        ctx.quadraticCurveTo(controlX, controlY, capX + 3, capY + 5);
        ctx.strokeStyle = "#27272a";
        ctx.lineWidth = 3.5;
        ctx.lineCap = "round";
        ctx.stroke();

        // Hose highlight ridge
        ctx.beginPath();
        ctx.moveTo(pumpOriginX, pumpOriginY);
        ctx.quadraticCurveTo(controlX, controlY, capX + 3, capY + 5);
        ctx.strokeStyle = "#52525b";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Fuel Dispenser Nozzle Gun
        ctx.save();
        ctx.translate(capX, capY);
        ctx.rotate(0.35);

        // Nozzle metal spout inserting into tank
        ctx.fillStyle = "#a1a1aa";
        ctx.fillRect(-1.5, -2, 3, 5);

        // Nozzle handle body
        ctx.fillStyle = isFull ? "#22c55e" : "#D71920";
        ctx.fillRect(0, 2, 4, 6);

        // Grip trigger
        ctx.strokeStyle = "#d4d4d8";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 3);
        ctx.lineTo(-2, 5);
        ctx.lineTo(0, 7);
        ctx.stroke();

        ctx.restore();

        // Subtle liquid flow wave on the hose
        const flowPos = (pumpPulse * 15) % 100;
        if (!isFull) {
          ctx.beginPath();
          ctx.arc(capX, capY + 2, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#fbbf24";
          ctx.fill();
        }

        ctx.restore();

        // --- Pit-Stop Fuel Gauge HUD (Upright Screen Coordinates) ---
        ctx.save();
        ctx.translate(carX, carY);

        const isTankFull = fuelLevel >= 100;
        const statusColor = isTankFull ? "#22c55e" : "#f59e0b";

        // Gauge Ring
        const ringRadius = 24;
        ctx.beginPath();
        ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Fuel Fill Progress Arc
        ctx.beginPath();
        ctx.arc(0, 0, ringRadius, -Math.PI / 2, -Math.PI / 2 + (fuelLevel / 100) * Math.PI * 2);
        ctx.strokeStyle = statusColor;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Fuel Tank HUD Tag
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        const tagY = -34;
        const tagText = isTankFull ? "REFUELED ⛽" : `REFUELING ${Math.round(fuelLevel)}%`;
        const tw = ctx.measureText(tagText).width + 10;

        ctx.fillStyle = "rgba(10, 10, 10, 0.92)";
        ctx.strokeStyle = statusColor;
        ctx.lineWidth = 1;
        ctx.fillRect(-tw / 2, tagY - 6, tw, 13);
        ctx.strokeRect(-tw / 2, tagY - 6, tw, 13);

        ctx.fillStyle = statusColor;
        ctx.fillText(tagText, 0, tagY + 4);

        // Small Fuel Tank level bar (E -> F)
        const barW = 28;
        const barH = 2.5;
        const barY = tagY + 11;
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fillRect(-barW / 2, barY, barW, barH);
        ctx.fillStyle = statusColor;
        ctx.fillRect(-barW / 2, barY, (barW * fuelLevel) / 100, barH);

        ctx.restore();
      }

      // --- 3. RENDER RACE CAR ---
      ctx.save();
      ctx.translate(carX, carY);
      ctx.rotate(carAngle);

      const scale = isHovering ? 1.15 : 1.0;
      ctx.scale(scale, scale);

      // Headlight Beams (only forward when moving)
      if (isMoving && !isIdle) {
        ctx.beginPath();
        ctx.moveTo(14, -4);
        ctx.lineTo(44, -14);
        ctx.lineTo(44, 14);
        ctx.lineTo(14, 4);
        ctx.closePath();
        ctx.fillStyle = "rgba(255, 255, 200, 0.18)";
        ctx.fill();
      }

      // Drop shadow
      ctx.beginPath();
      ctx.ellipse(-1, 2, 14, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();

      // Tires (4 wheels)
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(7, -9, 5, 2.8);
      ctx.fillRect(7, 6.2, 5, 2.8);
      ctx.fillRect(-11, -9, 6, 3);
      ctx.fillRect(-11, 6, 6, 3);

      // Chassis Body
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.lineTo(12, 4.5);
      ctx.lineTo(5, 5.5);
      ctx.lineTo(0, 4.5);
      ctx.lineTo(-9, 6.5);
      ctx.lineTo(-14, 5.5);
      ctx.lineTo(-14, -5.5);
      ctx.lineTo(-9, -6.5);
      ctx.lineTo(0, -4.5);
      ctx.lineTo(5, -5.5);
      ctx.lineTo(12, -4.5);
      ctx.closePath();
      ctx.fillStyle = "#161616";
      ctx.fill();
      ctx.strokeStyle = isHovering ? "#D71920" : "#333333";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Fuel Cap Detail (Rear right flank)
      ctx.beginPath();
      ctx.arc(-8, 6.2, 1.3, 0, Math.PI * 2);
      ctx.fillStyle = isIdle ? "#fbbf24" : "#52525b";
      ctx.fill();

      // TMH Red Center Stripe
      ctx.beginPath();
      ctx.rect(-13, -1.2, 26, 2.4);
      ctx.fillStyle = "#D71920";
      ctx.fill();

      // Cockpit Window
      ctx.beginPath();
      ctx.moveTo(5, 0);
      ctx.lineTo(3, 2.5);
      ctx.lineTo(-4, 2.5);
      ctx.lineTo(-4, -2.5);
      ctx.lineTo(3, -2.5);
      ctx.closePath();
      ctx.fillStyle = isIdle ? "#f59e0b" : "#2a3b4c";
      ctx.fill();

      // Rear Spoiler Wing
      ctx.fillStyle = "#D71920";
      ctx.fillRect(-14, -6.5, 2, 13);

      // Headlights (White/Red LEDs)
      ctx.fillStyle = isHovering ? "#ff0033" : "#ffffff";
      ctx.fillRect(12, -4, 2, 1.2);
      ctx.fillRect(12, 2.8, 2, 1.2);

      // Taillights
      ctx.fillStyle = isIdle ? (fuelLevel >= 100 ? "#22c55e" : "#f59e0b") : "#ff2222";
      ctx.fillRect(-14, -4, 1.5, 1.2);
      ctx.fillRect(-14, 2.8, 1.5, 1.2);

      ctx.restore();

      prevMouseX = mouseX;
      prevMouseY = mouseY;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999] select-none"
      aria-hidden="true"
    />
  );
}

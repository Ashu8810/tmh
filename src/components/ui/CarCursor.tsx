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
    let steerAngle = 0;

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
        let diff = targetAngle - carAngle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        const targetSteer = Math.max(-0.45, Math.min(0.45, diff * 1.6));
        steerAngle += (targetSteer - steerAngle) * 0.35;
      } else {
        steerAngle += (0 - steerAngle) * 0.25;
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
        fuelLevel = (fuelLevel + 1.8) % 100;

        // Spawn fuel splashes at the fuel cap
        if (frameCount % 3 === 0) {
          // Fuel cap position (Formula Student roll hoop flank)
          const capCos = Math.cos(carAngle);
          const capSin = Math.sin(carAngle);
          const capX = carX + (-4.5 * capCos - 4.2 * capSin);
          const capY = carY + (-4.5 * capSin + 4.2 * capCos);
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

        // Fuel Port on Car (Beside roll hoop on flank)
        const capX = -4.5;
        const capY = 4.2;

        // Fuel Hose (Curving from side into the car)
        const pumpOriginX = 20;
        const pumpOriginY = 24;
        const controlX = 6;
        const controlY = 20;

        // Flexible Black Fuel Hose
        ctx.beginPath();
        ctx.moveTo(pumpOriginX, pumpOriginY);
        ctx.quadraticCurveTo(controlX, controlY, capX + 2, capY + 4);
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
        const tagText = `REFUELING...`;
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

      // --- 3. RENDER FORMULA STUDENT RACE CAR (HYPER-REALISTIC OPEN-WHEEL) ---
      ctx.save();
      const idleVibe = isIdle ? Math.sin(frameCount * 0.7) * 0.35 : 0;
      ctx.translate(carX, carY + idleVibe);
      ctx.rotate(carAngle);

      const scale = isHovering ? 1.15 : 1.0;
      ctx.scale(scale, scale);

      // Aerodynamic Underfloor Venturi Glow when moving fast
      if (isMoving && !isIdle) {
        ctx.beginPath();
        ctx.ellipse(0, 0, 24, 12, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(215, 25, 32, 0.1)";
        ctx.fill();
      }

      // Layered Ambient Occlusion & Ground Shadow
      ctx.beginPath();
      ctx.ellipse(-1, 2.5, 22, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(-1, 1.5, 18, 9, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
      ctx.fill();

      // --- EXPOSED TITANIUM PUSHROD SUSPENSION (A-ARMS) ---
      ctx.strokeStyle = "#a1a1aa";
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      // Front Left wishbones + pushrod
      ctx.moveTo(13, -3); ctx.lineTo(10, -10.5);
      ctx.moveTo(7, -3.5); ctx.lineTo(9, -10.5);
      ctx.moveTo(11, -3); ctx.lineTo(10, -10.5);
      // Front Right wishbones + pushrod
      ctx.moveTo(13, 3); ctx.lineTo(10, 10.5);
      ctx.moveTo(7, 3.5); ctx.lineTo(9, 10.5);
      ctx.moveTo(11, 3); ctx.lineTo(10, 10.5);
      // Rear Left wishbones
      ctx.moveTo(-7, -4); ctx.lineTo(-12, -12);
      ctx.moveTo(-13, -3.5); ctx.lineTo(-14, -12);
      // Rear Right wishbones
      ctx.moveTo(-7, 4); ctx.lineTo(-12, 12);
      ctx.moveTo(-13, 3.5); ctx.lineTo(-14, 12);
      ctx.stroke();

      // Metallic Ball Joints
      ctx.fillStyle = "#e4e4e7";
      [
        [10, -10.5], [10, 10.5], [-13, -12], [-13, 12]
      ].forEach(([bx, by]) => {
        ctx.beginPath();
        ctx.arc(bx, by, 1, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- FUNCTION TO DRAW 3D SLICK RACING WHEEL ---
      const drawWheel = (wx: number, wy: number, angle: number, isRear: boolean) => {
        ctx.save();
        ctx.translate(wx, wy);
        ctx.rotate(angle);

        const w = isRear ? 14 : 11.5;
        const h = isRear ? 6.2 : 5;

        // Shadow under tire
        ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
        ctx.fillRect(-w / 2 + 1, -h / 2 + 1.5, w, h);

        // 3D Rubber Slick Tire with curved crown gradient
        const tireGrad = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
        tireGrad.addColorStop(0, "#18181b");
        tireGrad.addColorStop(0.2, "#2e2e33");
        tireGrad.addColorStop(0.5, "#141416");
        tireGrad.addColorStop(0.8, "#2e2e33");
        tireGrad.addColorStop(1, "#18181b");
        ctx.fillStyle = tireGrad;

        ctx.beginPath();
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(-w / 2, -h / 2, w, h, 1.8);
        } else {
          ctx.rect(-w / 2, -h / 2, w, h);
        }
        ctx.fill();
        ctx.strokeStyle = "#3f3f46";
        ctx.lineWidth = 0.6;
        ctx.stroke();

        // Carbon-ceramic ventilated brake disc
        ctx.fillStyle = "#71717a";
        ctx.fillRect(-w / 4, -h / 3.5, w / 2, h / 1.75);

        // Monobloc Red Brake Caliper
        ctx.fillStyle = "#e11d48";
        ctx.fillRect(-w / 4 - 0.5, -h / 3.5, 2, h / 2.5);

        // Center-lock magnesium wheel hub
        ctx.fillStyle = "#a1a1aa";
        ctx.beginPath();
        ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Anodized center lock wheel nut
        ctx.fillStyle = isHovering ? "#ef4444" : "#f59e0b";
        ctx.beginPath();
        ctx.arc(0, 0, 0.9, 0, Math.PI * 2);
        ctx.fill();

        // FSAE Racing Slick Sidewall Markings (Yellow & White Hoosier brand marks)
        ctx.fillStyle = "#facc15";
        ctx.fillRect(-w / 3.5, -h / 2 + 0.5, w / 2, 0.6);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(-w / 3.5, h / 2 - 1.1, w / 2, 0.6);

        ctx.restore();
      };

      // Draw 4 Open Wheels (Front wheels steer dynamically!)
      drawWheel(10, -12.5, steerAngle, false);
      drawWheel(10, 12.5, steerAngle, false);
      drawWheel(-13, -13.5, 0, true);
      drawWheel(-13, 13.5, 0, true);

      // --- FRONT AERO WING & ENDPLATES (FSAE MULTI-ELEMENT WING) ---
      // Main wing plane
      const fWingGrad = ctx.createLinearGradient(0, -14, 0, 14);
      fWingGrad.addColorStop(0, "#18181b");
      fWingGrad.addColorStop(0.5, "#27272a");
      fWingGrad.addColorStop(1, "#18181b");
      ctx.fillStyle = fWingGrad;
      ctx.fillRect(17.5, -14, 3.8, 28);
      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 0.8;
      ctx.strokeRect(17.5, -14, 3.8, 28);

      // Multi-element Upper Flap (TMH Crimson)
      ctx.fillStyle = "#D71920";
      ctx.fillRect(19, -13, 2, 10.5);
      ctx.fillRect(19, 2.5, 2, 10.5);

      // Third Cascade Aero Strip (Pure White)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(20.5, -12, 1.2, 9);
      ctx.fillRect(20.5, 3, 1.2, 9);

      // Aerodynamic Front Endplates with outer footplates
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(16, -14.8, 6.2, 1.4);
      ctx.fillRect(16, 13.4, 6.2, 1.4);
      ctx.fillStyle = "#18181b";
      ctx.fillRect(17.5, -15.8, 4.2, 1);
      ctx.fillRect(17.5, 14.8, 4.2, 1);

      // --- FORMULA MONOCOQUE CHASSIS & NOSECONE ---
      const bodyGrad = ctx.createLinearGradient(0, -9, 0, 9);
      bodyGrad.addColorStop(0, "#161618");
      bodyGrad.addColorStop(0.18, "#27272a");
      bodyGrad.addColorStop(0.38, "#3f3f46"); // curved specular highlight
      bodyGrad.addColorStop(0.5, "#222225");
      bodyGrad.addColorStop(0.62, "#3f3f46"); // right curved highlight
      bodyGrad.addColorStop(0.82, "#27272a");
      bodyGrad.addColorStop(1, "#161618");

      ctx.beginPath();
      ctx.moveTo(19, 0);         // Nose tip
      ctx.lineTo(15, -2.4);      // Nosecone left
      ctx.lineTo(5, -3.5);       // Cockpit entry left
      ctx.lineTo(2, -8.5);       // Left sidepod intake
      ctx.lineTo(-10, -8.5);     // Sidepod body left
      ctx.lineTo(-14, -5);       // Engine cover taper left
      ctx.lineTo(-18, -2.8);     // Rear crash structure
      ctx.lineTo(-18, 2.8);      // Rear crash structure
      ctx.lineTo(-14, 5);        // Engine cover taper right
      ctx.lineTo(-10, 8.5);      // Sidepod body right
      ctx.lineTo(2, 8.5);        // Right sidepod intake
      ctx.lineTo(5, 3.5);        // Cockpit entry right
      ctx.lineTo(15, 2.4);       // Nosecone right
      ctx.closePath();
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.strokeStyle = isHovering ? "#D71920" : "#3f3f46";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Sidepod Carbon Fiber Radiator Air Inlets (Dark recessed core)
      ctx.fillStyle = "#09090b";
      ctx.fillRect(-2, -7.5, 6, 2.8);
      ctx.fillRect(-2, 4.7, 6, 2.8);
      // Radiator Core Cooling Mesh
      ctx.fillStyle = "#52525b";
      ctx.fillRect(-1.5, -7.2, 1.2, 2.2);
      ctx.fillRect(1, -7.2, 1.2, 2.2);
      ctx.fillRect(-1.5, 5, 1.2, 2.2);
      ctx.fillRect(1, 5, 1.2, 2.2);

      // Carbon Fiber Bargeboard / Turning Vanes
      ctx.fillStyle = "#27272a";
      ctx.fillRect(3, -9.5, 5, 0.9);
      ctx.fillRect(3, 8.6, 5, 0.9);

      // High-Gloss TMH Racing Crimson Nose Livery Stripe
      const stripeGrad = ctx.createLinearGradient(0, -2, 0, 2);
      stripeGrad.addColorStop(0, "#991b1b");
      stripeGrad.addColorStop(0.5, "#ef4444");
      stripeGrad.addColorStop(1, "#991b1b");
      ctx.fillStyle = stripeGrad;
      ctx.beginPath();
      ctx.moveTo(18, 0);
      ctx.lineTo(14, -1.5);
      ctx.lineTo(5, -1.6);
      ctx.lineTo(5, 1.6);
      ctx.lineTo(14, 1.5);
      ctx.closePath();
      ctx.fill();

      // White Pinstripe Border on Livery
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // Sidepod Livery Accents
      ctx.fillStyle = "#D71920";
      ctx.fillRect(-8, -8, 6.5, 1.4);
      ctx.fillRect(-8, 6.6, 6.5, 1.4);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-8, -6.6, 6.5, 0.5);
      ctx.fillRect(-8, 6.1, 6.5, 0.5);

      // --- OPEN COCKPIT, DRIVER & HELMET ---
      // Cockpit Opening (Deep carbon cockpit surround)
      ctx.beginPath();
      ctx.ellipse(1, 0, 4.8, 2.8, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#09090b";
      ctx.fill();
      ctx.strokeStyle = "#52525b";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Butterfly Steering Wheel
      ctx.fillStyle = "#27272a";
      ctx.fillRect(4.2, -2.2, 0.9, 4.4);
      // Shift Light LEDs (Green, Amber, Red RPM Lights)
      ctx.fillStyle = "#22c55e";
      ctx.fillRect(5.3, -1.6, 0.8, 0.7);
      ctx.fillStyle = "#eab308";
      ctx.fillRect(5.3, -0.4, 0.8, 0.7);
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(5.3, 0.8, 0.8, 0.7);

      // Driver Helmet with 3D spherical shading
      const helmGrad = ctx.createRadialGradient(0.6, -0.5, 0.4, 0.6, 0, 2.6);
      helmGrad.addColorStop(0, "#fda4af");
      helmGrad.addColorStop(0.3, "#f43f5e");
      helmGrad.addColorStop(0.8, "#be123c");
      helmGrad.addColorStop(1, "#881337");
      ctx.beginPath();
      ctx.arc(0.6, 0, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = helmGrad;
      ctx.fill();

      // Iridescent Rainbow Mirror Visor (reflecting ambient track lights)
      const visorGrad = ctx.createLinearGradient(1.4, -1.5, 2.4, 1.5);
      visorGrad.addColorStop(0, "#38bdf8"); // cyan
      visorGrad.addColorStop(0.45, "#a855f7"); // purple
      visorGrad.addColorStop(1, "#f59e0b"); // gold
      ctx.beginPath();
      ctx.arc(1.6, 0, 1.5, -Math.PI / 2.3, Math.PI / 2.3);
      ctx.fillStyle = visorGrad;
      ctx.fill();

      // Modern FSAE Titanium Halo Structure
      ctx.strokeStyle = "#d4d4d8";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(8, 0); // Front mount
      ctx.lineTo(2.4, 0);
      ctx.arc(0, 0, 3.8, -Math.PI / 2.1, Math.PI / 2.1, false);
      ctx.stroke();
      // Halo metallic specular highlight
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Tubular Roll Hoop
      ctx.beginPath();
      ctx.arc(-2.5, 0, 2.2, 0, Math.PI * 2);
      ctx.strokeStyle = "#a1a1aa";
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // Engine Airbox Intake Scoop (above driver head)
      ctx.fillStyle = "#27272a";
      ctx.fillRect(-5, -1.4, 3.5, 2.8);
      ctx.fillStyle = "#09090b";
      ctx.fillRect(-3.5, -0.9, 1.4, 1.8);

      // Roll Hoop Fuel Cap Detail
      ctx.beginPath();
      ctx.arc(-4.5, 4.2, 1.3, 0, Math.PI * 2);
      ctx.fillStyle = isIdle ? "#fbbf24" : "#a1a1aa";
      ctx.fill();

      // --- REAR AERO WING (HIGH-DOWNFORCE FSAE WING) ---
      // Carbon Endplates
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-21.5, -14.8, 6.5, 1.4);
      ctx.fillRect(-21.5, 13.4, 6.5, 1.4);

      // Mainplane (Deep Camber Carbon)
      ctx.fillStyle = "#18181b";
      ctx.fillRect(-21, -13.8, 4, 27.6);
      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 0.8;
      ctx.strokeRect(-21, -13.8, 4, 27.6);

      // Flap Element (TMH Crimson)
      ctx.fillStyle = "#D71920";
      ctx.fillRect(-19.5, -12.8, 1.8, 25.6);

      // Center DRS Actuator Pod
      ctx.fillStyle = "#3f3f46";
      ctx.fillRect(-20.5, -1.4, 3, 2.8);

      // Heat-Tempered Titanium Exhaust Pipe (Blue/Purple/Gold heat tint)
      const exhaustGrad = ctx.createLinearGradient(-18, 0, -22, 0);
      exhaustGrad.addColorStop(0, "#71717a");
      exhaustGrad.addColorStop(0.4, "#3b82f6"); // blue
      exhaustGrad.addColorStop(0.75, "#8b5cf6"); // violet
      exhaustGrad.addColorStop(1, "#f59e0b"); // gold rim
      ctx.fillStyle = exhaustGrad;
      ctx.fillRect(-22.5, -1.2, 4, 2.4);
      ctx.fillStyle = "#09090b";
      ctx.fillRect(-22.7, -0.8, 1.2, 1.6);

      // FIA Rain Light (Rear Safety LED Pulsing with bloom)
      const rainLightPulse = Math.sin(frameCount * 0.25) > 0;
      if (rainLightPulse || isIdle) {
        ctx.fillStyle = "rgba(239, 68, 68, 0.4)";
        ctx.beginPath();
        ctx.arc(-20.5, 0, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = isIdle ? "#f59e0b" : (rainLightPulse ? "#ff0033" : "#7f1d1d");
      ctx.fillRect(-20.8, -1, 1.8, 2);

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

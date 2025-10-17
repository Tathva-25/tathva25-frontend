import React, { useEffect, useRef } from "react";

// --- CONFIGURATION CONSTANTS ---
const INITIAL_RING_RADIUS = 150;
const NUM_PARTICLES_PER_RIPPLE = 10;
const RIPPLE_SPEED = 2;
const MAX_DISTANCE = 1000;
const RIPPLE_INTERVAL_MS = 700;

// Sparkle appearance settings
const SPARKLE_SIZE_MIN = 2;
const SPARKLE_SIZE_MAX = 7;
const SPARKLE_ROTATION_SPEED = 0.05;
const GLOW_SIZE_MULTIPLIER = 2; // How much larger the glow is compared to sparkle

// Non-uniform distribution settings
const ANGLE_VARIANCE = 0.3; // How much angles can vary from uniform (0 = uniform, 1 = completely random)
const SPEED_VARIANCE = 0.4; // How much speed can vary per particle (0 = uniform, 1 = very random)
const CLUSTER_EFFECT = 0.2; // Creates clustering in certain directions (0 = no clustering, 1 = strong clustering)

const Ripple = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const lastRippleTimeRef = useRef(0);
  const cachedGradientsRef = useRef(new Map());

  /**
   * Create a new ripple of particles with non-uniform distribution
   */
  const createRipple = () => {
    const newParticles = [];
    const timestamp = Date.now();
    const clusterAngle = Math.random() * Math.PI * 2; // Random preferred direction for clustering

    for (let i = 0; i < NUM_PARTICLES_PER_RIPPLE; i++) {
      // Base angle with non-uniform distribution
      const baseAngle = (i / NUM_PARTICLES_PER_RIPPLE) * 2 * Math.PI;
      const angleRandomness = (Math.random() - 0.5) * Math.PI * ANGLE_VARIANCE;
      const clusterInfluence =
        Math.sin(baseAngle - clusterAngle) * CLUSTER_EFFECT;
      const angle = baseAngle + angleRandomness + clusterInfluence;

      // Variable speed per particle
      const speedMultiplier = 1 + (Math.random() - 0.5) * SPEED_VARIANCE;

      // Variable sparkle size
      const size =
        SPARKLE_SIZE_MIN +
        Math.random() * (SPARKLE_SIZE_MAX - SPARKLE_SIZE_MIN);

      newParticles.push({
        id: timestamp + i,
        angle: angle,
        distance: INITIAL_RING_RADIUS,
        speed: RIPPLE_SPEED * speedMultiplier,
        size: size,
        rotation: Math.random() * Math.PI * 2, // Initial rotation
        rotationSpeed: (Math.random() - 0.5) * SPARKLE_ROTATION_SPEED,
      });
    }
    return newParticles;
  };

  /**
   * Get or create cached gradient
   */
  const getGradient = (ctx, size, type) => {
    const key = `${type}-${size.toFixed(1)}`;
    if (!cachedGradientsRef.current.has(key)) {
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      if (type === "glow") {
        gradient.addColorStop(0, "rgba(211, 175, 55, 1)");
        gradient.addColorStop(0.3, "rgba(211, 175, 55, 1)");
        gradient.addColorStop(0.7, "rgba(211, 175, 32, 0.24)");
        gradient.addColorStop(1, "rgba(218, 165, 32, 0)");
      } else {
        gradient.addColorStop(0, "rgba(153, 127, 80, 1)");
        gradient.addColorStop(0.5, "rgba(196, 171, 109, 0.8)");
        gradient.addColorStop(1, "rgba(248, 236, 211, 0.4)");
      }
      cachedGradientsRef.current.set(key, gradient);
    }
    return cachedGradientsRef.current.get(key);
  };

  /**
   * Draw a sparkle/star shape with glow
   */
  const drawSparkle = (ctx, x, y, size, rotation, opacity) => {
    
    if (opacity <= 0) return;

    ctx.save();
    ctx.translate(x, y);

    // Draw glow first (behind sparkle)
    ctx.globalAlpha = opacity * 0.6;
    const glowSize = size * GLOW_SIZE_MULTIPLIER;
    ctx.beginPath();
    ctx.arc(0, 0, glowSize, 0, 2 * Math.PI);
    ctx.fillStyle = getGradient(ctx, glowSize, "glow");
    ctx.fill();

    // Draw sparkle
    ctx.globalAlpha = opacity;
    ctx.rotate(rotation);

    // Draw 4-pointed star (optimized path)
    ctx.beginPath();
    const innerSize = size * 0.3;
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const angle2 = angle + Math.PI / 4;
      const tipX = Math.cos(angle) * size;
      const tipY = Math.sin(angle) * size;
      const innerX = Math.cos(angle2) * innerSize;
      const innerY = Math.sin(angle2) * innerSize;

      if (i === 0) ctx.moveTo(tipX, tipY);
      else ctx.lineTo(tipX, tipY);
      ctx.lineTo(innerX, innerY);
    }
    ctx.closePath();
    ctx.fillStyle = getGradient(ctx, size, "sparkle");
    ctx.fill();

    // Add bright center dot
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.2, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 200, ${opacity})`;
    ctx.fill();

    ctx.restore();
  };

  /**
   * Animation loop using canvas for better performance
   */
  const animate = (timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Check if it's time to create a new ripple
    if (timestamp - lastRippleTimeRef.current >= RIPPLE_INTERVAL_MS) {
      particlesRef.current = [...particlesRef.current, ...createRipple()];
      lastRippleTimeRef.current = timestamp;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current = particlesRef.current
      .map((p) => ({
        ...p,
        distance: p.distance + p.speed,
        rotation: p.rotation + p.rotationSpeed,
      }))
      .filter((p) => p.distance < MAX_DISTANCE);

    // Draw sparkles
    particlesRef.current.forEach((p) => {
      const x = centerX + p.distance * Math.cos(p.angle);
      const y = centerY + p.distance * Math.sin(p.angle);
      const opacity =
        1 -
        (p.distance - INITIAL_RING_RADIUS) /
          (MAX_DISTANCE - INITIAL_RING_RADIUS);

      if (opacity > 0) {
        drawSparkle(ctx, x, y, p.size, p.rotation, opacity);
      }
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to be large enough for particles to expand in all directions
    const updateCanvasSize = () => {
      // Calculate diagonal distance from center to corner to ensure full coverage
      const maxDimension = Math.max(window.innerWidth, window.innerHeight);
      const canvasSize = maxDimension * 3; // 3x to ensure particles reach all corners
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      // Clear gradient cache on resize
      cachedGradientsRef.current.clear();
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Initialize with first ripple and set initial timestamp
    particlesRef.current = createRipple();
    lastRippleTimeRef.current = performance.now();

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute w-full h-full pointer-events-none overflow-visible">
      <canvas
        ref={canvasRef}
        className="absolute"
        style={{
          opacity: 1,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "300vmax",
          height: "300vmax",
        }}
      />
    </div>
  );
};

export default Ripple;

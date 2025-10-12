import React, { useEffect, useRef } from 'react';

// --- CONFIGURATION CONSTANTS ---
const INITIAL_RING_RADIUS = 150;
const NUM_PARTICLES_PER_RIPPLE = 40;
const RIPPLE_SPEED = 1.5;
const MAX_DISTANCE = 1000;
const RIPPLE_INTERVAL_MS = 700;

const Ripple = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationFrameRef = useRef(null);
    const rippleIntervalRef = useRef(null);

    /**
     * Create a new ripple of particles
     */
    const createRipple = () => {
        const newParticles = [];
        const timestamp = Date.now();
        for (let i = 0; i < NUM_PARTICLES_PER_RIPPLE; i++) {
            const angle = (i / NUM_PARTICLES_PER_RIPPLE) * 2 * Math.PI;
            newParticles.push({
                id: timestamp + i,
                angle: angle,
                distance: INITIAL_RING_RADIUS,
            });
        }
        return newParticles;
    };

    /**
     * Animation loop using canvas for better performance
     */
    const animate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particlesRef.current = particlesRef.current
            .map(p => ({
                ...p,
                distance: p.distance + RIPPLE_SPEED,
            }))
            .filter(p => p.distance < MAX_DISTANCE);

        // Draw particles
        particlesRef.current.forEach(p => {
            const x = centerX + p.distance * Math.cos(p.angle);
            const y = centerY + p.distance * Math.sin(p.angle);
            const opacity = 1 - (p.distance - INITIAL_RING_RADIUS) / (MAX_DISTANCE - INITIAL_RING_RADIUS);

            if (opacity > 0) {
                ctx.beginPath();
                ctx.arc(x, y, 2.5, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(0, 0, 0, ${opacity * 0.5})`;
                ctx.fill();
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
        };
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        // Initialize with first ripple
        particlesRef.current = createRipple();

        // Start animation
        animationFrameRef.current = requestAnimationFrame(animate);

        // Set up ripple spawning interval
        rippleIntervalRef.current = setInterval(() => {
            particlesRef.current = [...particlesRef.current, ...createRipple()];
        }, RIPPLE_INTERVAL_MS);

        // Cleanup
        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (rippleIntervalRef.current) {
                clearInterval(rippleIntervalRef.current);
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
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '300vmax',
                    height: '300vmax'
                }}
            />
        </div>
    );
};

export default Ripple;
import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- CONFIGURATION CONSTANTS ---
// This is the variable you would change to adjust the radius of the initial ring.
// It determines the starting distance (in pixels) of the particles from the center.
const INITIAL_RING_RADIUS = 60; // Start particles 60px from the center.

// Other configuration settings:
const NUM_PARTICLES_PER_RIPPLE = 60;
const RIPPLE_SPEED = 1.8; // How fast particles move outwards (pixels per frame)
const MAX_DISTANCE = 350; // Distance at which particles fade out and are removed
const RIPPLE_INTERVAL_MS = 1500; // Time delay between spawning new ripples

/**
 * Generates a new set of particles positioned in a perfect circle (a ring).
 * @returns {Array<{id: number, angle: number, distance: number}>} Array of new particles.
 */
const createRipple = () => {
    const newParticles = [];
    for (let i = 0; i < NUM_PARTICLES_PER_RIPPLE; i++) {
        // Calculate the angle to distribute particles evenly around the circle
        const angle = (i / NUM_PARTICLES_PER_RIPPLE) * 2 * Math.PI;
        newParticles.push({
            id: Date.now() + i, // Unique ID
            angle: angle,
            distance: INITIAL_RING_RADIUS, // Start at the defined radius
        });
    }
    return newParticles;
};

const Ripple = () => {
    // State to hold all active particles
    const [particles, setParticles] = useState(createRipple());
    const animationFrameRef = useRef(null);

    /**
     * The core animation loop. Updates particle positions and manages lifecycle.
     */
    const animate = useCallback(() => {
        setParticles(prevParticles => {
            // 1. Update distance and fade
            let nextParticles = prevParticles.map(p => ({
                ...p,
                distance: p.distance + RIPPLE_SPEED,
            }));

            // 2. Filter out particles that have traveled too far
            nextParticles = nextParticles.filter(p => p.distance < MAX_DISTANCE);

            return nextParticles;
        });

        // Request the next frame
        animationFrameRef.current = requestAnimationFrame(animate);
    }, []);

    // Effect to initialize the animation and set up the ripple spawn timer
    useEffect(() => {
        // Start the continuous animation loop
        animationFrameRef.current = requestAnimationFrame(animate);

        // Set up the interval to spawn new ripples
        const rippleInterval = setInterval(() => {
            setParticles(prevParticles => [...prevParticles, ...createRipple()]);
        }, RIPPLE_INTERVAL_MS);

        // Cleanup function: stop animation and clear the interval when the component unmounts
        return () => {
            cancelAnimationFrame(animationFrameRef.current);
            clearInterval(rippleInterval);
        };
    }, [animate]);


    return (
        // This container is now transparent and uses pointer-events-none
        // so that it doesn't block user interaction with the content underneath it.
        // It should be placed inside a container that defines the area of the effect (e.g., w-screen h-screen or relative w-full h-full).
        <div className="relative w-full h-full pointer-events-none">
            {/* This div centers the particles absolutely within the parent container. */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Render each particle */}
                {particles.map(p => {
                    // Calculate polar to Cartesian coordinates
                    const x = p.distance * Math.cos(p.angle);
                    const y = p.distance * Math.sin(p.angle);

                    // Calculate opacity for fading out
                    const opacity = 1 - (p.distance - INITIAL_RING_RADIUS) / (MAX_DISTANCE - INITIAL_RING_RADIUS);

                    return (
                        <div
                            key={p.id}
                            className="absolute rounded-full shadow-lg"
                            style={{
                                width: '3px',
                                height: '3px',
                                backgroundColor: 'rgba(56, 189, 248, 1)', // Tailwind sky-400 equivalent
                                opacity: opacity > 0 ? opacity : 0,
                                // Center the particle, then translate it by (x, y)
                                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Ripple;

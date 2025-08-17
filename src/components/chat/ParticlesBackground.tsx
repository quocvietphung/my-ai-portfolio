"use client";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);

    const options = useMemo<ISourceOptions>(
        () => ({
            background: {
                color: { value: "#fafcff" },
            },
            fpsLimit: 60,
            particles: {
                number: { value: 60, density: { enable: true, area: 1200 } },
                color: {
                    value: [
                        "#a78bfa", // pastel purple
                        "#38bdf8", // pastel blue
                        "#f472b6", // pastel pink
                        "#facc15", // light yellow
                        "#34d399", // pastel jade green
                        "#fbbf24"  // light orange-yellow
                    ]
                },
                shape: { type: "circle" },
                size: {
                    value: 5,
                    random: { enable: true, minimumValue: 2 }
                },
                opacity: { value: 0.37 },
                move: {
                    enable: true,
                    speed: 1.3,
                    direction: "none",
                    outModes: { default: "out" }
                },
                links: {
                    enable: true,
                    color: "#e0e7ff",
                    distance: 110,
                    opacity: 0.13,
                    width: 1
                }
            },
            detectRetina: true,
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "bubble" },
                    onClick: { enable: true, mode: "push" }
                },
                modes: {
                    bubble: {
                        distance: 140,
                        size: 9,
                        duration: 2.2,
                        opacity: 0.25,
                        color: { value: "#fbbf24" }
                    },
                    push: { quantity: 4 }
                }
            }
        }),
        [],
    );

    if (!init) return null;

    return (
        <div style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background: "#fafcff"
        }}>
            <Particles
                id="tsparticles-background"
                options={options}
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    pointerEvents: "none"
                }}
            />
        </div>
    );
};

export default ParticlesBackground;

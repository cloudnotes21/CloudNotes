import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 

const HeroBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    // You can do something with the container if needed
    // console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent", // Background is handled by CSS
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "bubble", // This makes dots bigger on hover
          },
          resize: true,
        },
        modes: {
          bubble: {
            distance: 150, // The area around the cursor to affect
            duration: 2,
            opacity: 0.8,
            size: 8, // The size dots will expand to
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff", // Dot color
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: false, // We don't want lines connecting dots
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: false, // Dots will be static until hovered
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80, // Number of dots
        },
        opacity: {
          value: 0.3, // Initial dot opacity
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 }, // Initial dot size
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0
        }}
      />
    );
  }

  return <></>;
};

export default HeroBackground;
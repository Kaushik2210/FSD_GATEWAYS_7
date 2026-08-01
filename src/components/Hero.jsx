import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import HeroBackground from "./HeroBackground";
import HeroModel from "./HeroModel";
import NeonButton from "./NeonButton";

gsap.registerPlugin(SplitText);

export default function Hero() {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollHintRef = useRef(null);
  const badgeRef = useRef(null);
  const modelWrapRef = useRef(null);
  const dragHintRef = useRef(null);

  useEffect(() => {
    const split = new SplitText(titleRef.current, { type: "chars" });

    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(badgeRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
    tl.fromTo(
      split.chars,
      { y: 90, opacity: 0, rotateX: -70 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.9,
        stagger: 0.045,
        ease: "back.out(1.6)",
        transformPerspective: 600,
      },
      "-=0.2"
    );
    tl.fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
    tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
    tl.fromTo(modelWrapRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, "-=0.6");
    tl.fromTo(dragHintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.2");
    tl.fromTo(scrollHintRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.3");

    gsap.to(scrollHintRef.current, { y: 10, repeat: -1, yoyo: true, duration: 1.2, ease: "sine.inOut" });
    gsap.to(dragHintRef.current, { opacity: 0.35, repeat: -1, yoyo: true, duration: 1.6, ease: "sine.inOut", delay: 1 });

    // subtle ambient float on the title, forever
    gsap.to(split.chars, {
      y: "+=4",
      duration: 2.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.08, from: "random" },
      delay: 2,
    });

    return () => {
      tl.kill();
      split.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col items-center overflow-hidden px-6 pt-32 pb-16 md:justify-center md:pt-24"
    >
      <HeroBackground />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-4">
        <div className="text-center md:text-left">
          <p
            ref={badgeRef}
            className="mb-4 font-display text-xs tracking-[0.4em] text-cyan text-glow-cyan uppercase"
          >
            Season 2026 · Portal Now Open
          </p>

          <h1
            ref={titleRef}
            className="font-display text-[15vw] leading-[0.9] font-bold tracking-tight text-white uppercase sm:text-[11vw] md:text-[4.6rem] lg:text-[5.4rem]"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #c9c4ff 55%, #38f2ff 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 40px rgba(168,85,255,0.35))",
            }}
          >
            GATEWAYS
          </h1>

          <p ref={subRef} className="mt-4 max-w-md font-body text-base tracking-wide text-white/70 sm:text-lg md:mx-0 mx-auto">
            The Future of College Events. Step through the portal into a world of
            biomes, blocks, and beacons.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <NeonButton href="#events" variant="primary">
              Enter the Portal
            </NeonButton>
            <NeonButton href="#events" variant="ghost">
              Explore Events
            </NeonButton>
          </div>
        </div>

        <div ref={modelWrapRef} className="relative flex flex-col items-center opacity-0">
          <HeroModel />
          <span
            ref={dragHintRef}
            className="mt-1 font-display text-[10px] tracking-[0.3em] text-white/50 uppercase opacity-0"
          >
            Drag to Rotate · Click the Portal
          </span>
        </div>
      </div>

      <div ref={scrollHintRef} className="absolute bottom-8 flex flex-col items-center gap-2 opacity-0">
        <span className="font-display text-[10px] tracking-[0.3em] text-white/40 uppercase">Scroll</span>
        <div className="h-8 w-[1px] bg-gradient-to-b from-cyan to-transparent" />
      </div>
    </section>
  );
}

import { useState } from "react";
import IntroPortal from "./components/IntroPortal";
import CursorOrb from "./components/CursorOrb";
import AmbientBackground from "./components/AmbientBackground";
import ScrollDragon from "./components/ScrollDragon";
import Navbar from "./components/Navbar";
import WeatherHud from "./components/WeatherHud";
import Hero from "./components/Hero";
import EventsGrid from "./components/EventsGrid";
import Footer from "./components/Footer";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <IntroPortal onComplete={() => setIntroDone(true)} />}
      <AmbientBackground />
      <CursorOrb />
      <div className="noise-overlay" />
      <div className="scanline-overlay" />
      <div className="grid-overlay" />
      {introDone && <ScrollDragon />}
      <Navbar />
      <WeatherHud />
      <main
        className="relative z-10"
        style={{ opacity: introDone ? 1 : 0, transition: "opacity 0.8s ease" }}
      >
        <Hero />
        <EventsGrid />
        <Footer />
      </main>
    </>
  );
}

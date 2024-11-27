import type React from "react";
import { useEffect, useRef, useState } from "react";
import Homepage from "./components/Homepage";
import "./App.css";
import DeskPokedex from "./components/DeskPokedex";

import Pokedex from "./components/Pokedex";
import ModalProvider from "./context/modal";
import MusicProvider from "./context/music";
import ScrollProvider from "./context/scroll";

const App: React.FC = () => {
  const [showHomepage, setShowHomepage] = useState(true);
  const [showFadeOut, setShowFadeOut] = useState(false);
  const [showFadeIn, setShowFadeIn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePokeballClick = () => {
    setShowFadeOut(true);
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
    setTimeout(() => {
      setShowHomepage(false);
      setShowFadeOut(false);
      setShowFadeIn(true);
    }, 2000);
  };

  useEffect(() => {
    if (showFadeIn) {
      const timer = setTimeout(() => {
        setShowFadeIn(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showFadeIn]);

  return (
    <>
      <div>
        <audio ref={audioRef} src="./opening.mp3">
          <track
            kind="captions"
            src="/captions.vtt"
            srcLang="en"
            label="English captions"
          />
        </audio>
        {showHomepage ? (
          <>
            <Homepage onPokeballClick={handlePokeballClick} />
            {showFadeOut && <div className="fade-out" />}
          </>
        ) : (
          <>
            {showFadeIn && <div className="fade-in" />}
            <div className={showFadeIn ? "fade-in-content" : ""}>
              <MusicProvider>
                <ScrollProvider>
                  <ModalProvider>
                    <DeskPokedex />
                    <Pokedex />
                  </ModalProvider>
                </ScrollProvider>
              </MusicProvider>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface Music {
  music: boolean;
  setMusic: React.Dispatch<React.SetStateAction<boolean>>;
  musicRef: React.RefObject<HTMLAudioElement>;
  musicOn: () => void;
  musicOff: () => void;
  musicToggle: () => void;
}

const musicContext = createContext<Music>({
  music: true,
  setMusic: () => {},
  musicRef: { current: null },
  musicOn: () => {},
  musicOff: () => {},
  musicToggle: () => {},
});

function MusicProvider({ children }: { children: ReactNode }) {
  const [music, setMusic] = useState<boolean>(true);
  const musicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = 0.14;
      if (!music) {
        musicRef.current.pause();
      } else {
        musicRef.current.play();
      }
      const handleEnded = () => {
        setMusic(false);
      };

      musicRef.current.addEventListener("ended", handleEnded);

      return () => {
        musicRef.current?.removeEventListener("ended", handleEnded);
      };
    }
  }, [music]);

  const musicOn = () => {
    if (!music && musicRef.current) {
      musicRef.current.play();
      setMusic(true);
    }
  };

  const musicOff = () => {
    if (music && musicRef.current) {
      musicRef.current.pause();
      setMusic(false);
    }
  };

  const musicToggle = () => {
    if (!music && musicRef.current) {
      musicRef.current.play();
      setMusic(true);
    } else if (music && musicRef.current) {
      musicRef.current?.pause();
      setMusic(false);
    }
  };

  return (
    <musicContext.Provider
      value={{
        music,
        setMusic,
        musicRef,
        musicOn,
        musicOff,
        musicToggle,
      }}
    >
      {children}
      <audio ref={musicRef} src="/Gen2_intro.mp3" autoPlay>
        <track
          kind="captions"
          srcLang="en"
          src="/captions.vtt"
          label="English captions"
          default
        />
      </audio>
    </musicContext.Provider>
  );
}

export const useMusic = () => {
  return useContext(musicContext);
};

export default MusicProvider;

import { type SetStateAction, useEffect, useRef, useState } from "react";
import { useMusic } from "../context/music";
import styles from "../styles/DeskSound.module.css";

interface DeskSoundProps {
  pokemonImage: string | null;
  error: string | null;
  pokedex_id: number;
}

interface PokemonSound {
  latest: SetStateAction<string | null>;
  cries: {
    latest: string;
    legacy: string;
  };
}

const DeskSound: React.FC<DeskSoundProps> = ({
  pokemonImage,
  error,
  pokedex_id,
}) => {
  const musicContext = useMusic();
  const musicOff = musicContext?.musicOff;
  const musicOn = musicContext?.musicOn;
  const music = musicContext?.music;
  const [pokemonSound, setPokemonSound] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const getPokemonSound = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokedex_id}/`,
        );
        const data = await response.json();
        const pokemonSoundData: PokemonSound = data.cries;
        setPokemonSound(pokemonSoundData.latest);
      } catch (error) {
        console.error("Error fetching Pokémon sound:", error);
      }
    };

    getPokemonSound();
  }, [pokedex_id]);

  const handlePlaySound = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.14;
      audioRef.current.play();
    }
  };

  return (
    <section className={styles.deskSound}>
      {pokemonSound && (
        <audio ref={audioRef} src={pokemonSound}>
          <track kind="captions" srcLang="en" label="English captions" />
        </audio>
      )}
      <div className={styles.blackBars}>
        <hr />
        <hr />
      </div>
      <div className={styles.soundButtonsContainer}>
        <div className={styles.soundButtons}>
          {music ? (
            <span
              className={styles.buttonShadowOn}
              onClick={musicOn}
              onKeyDown={musicOn}
            >
              <span className="material-symbols-outlined">volume_up</span>
            </span>
          ) : (
            <span
              className={`${styles.buttonShadowOn} ${styles.musicOff}`}
              onClick={musicOn}
              onKeyDown={musicOn}
            >
              <span className="material-symbols-outlined">volume_up</span>
            </span>
          )}
          {!music ? (
            <span
              className={styles.buttonShadowOff}
              onClick={musicOff}
              onKeyDown={musicOff}
            >
              <span className="material-symbols-outlined">volume_off</span>
            </span>
          ) : (
            <span
              className={`${styles.buttonShadowOff} ${styles.musicOff}`}
              onClick={musicOff}
              onKeyDown={musicOff}
            >
              <span className="material-symbols-outlined">volume_off</span>
            </span>
          )}
          <span className={styles.buttonShadowBark}>
            <span onClick={handlePlaySound} onKeyDown={handlePlaySound}>
              {error ? (
                <p className={styles.errorP}>X</p>
              ) : (
                <img src={pokemonImage || "#"} alt="Pokemon" />
              )}
            </span>
          </span>
        </div>
        <div className={styles.diodeYellow}>
          <span className={styles.diodeYellowReflect1}>
            <span className={styles.diodeYellowReflect2}>
              <hr />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default DeskSound;

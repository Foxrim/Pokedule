import type React from "react";
import { useState } from "react";
import acierImage from "../assets/images/acier.webp";
import combatImage from "../assets/images/combat.webp";
import eauImage from "../assets/images/eau.webp";
import elektrikImage from "../assets/images/elektrik.webp";
import feeImage from "../assets/images/fee.webp";
import feuImage from "../assets/images/feu.webp";
import glaceImage from "../assets/images/glace.webp";
import insecteImage from "../assets/images/insecte.webp";
import normalImage from "../assets/images/normal.webp";
import planteImage from "../assets/images/plante.webp";
import poisonImage from "../assets/images/poison.webp";
import psyImage from "../assets/images/psy.webp";
import rocheImage from "../assets/images/roche.webp";
import solImage from "../assets/images/sol.webp";
import spectreImage from "../assets/images/spectre.webp";
import tenebreImage from "../assets/images/tenebre.webp";
import volImage from "../assets/images/vol.webp";
import { useMusic } from "../context/music";
import data from "../services/data.json";
import styles from "../styles/PokedexScreen.module.css";

interface PokedexScreenProps {
  pokemon: {
    name: {
      fr: string;
    };
    sprites: {
      regular: string;
      shiny: string;
    };
  } | null;
  error: string | null;
  types: { name: string }[];
}

const typeImages: { [key: string]: string } = {
  plante: planteImage,
  acier: acierImage,
  combat: combatImage,
  eau: eauImage,
  électrik: elektrikImage,
  fée: feeImage,
  feu: feuImage,
  glace: glaceImage,
  insecte: insecteImage,
  normal: normalImage,
  poison: poisonImage,
  psy: psyImage,
  roche: rocheImage,
  sol: solImage,
  spectre: spectreImage,
  ténèbres: tenebreImage,
  vol: volImage,
};
const PokedexScreen: React.FC<PokedexScreenProps> = ({
  pokemon,
  error,
  types,
}) => {
  const { musicToggle } = useMusic();
  const [isShiny, setIsShiny] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const musicContext = useMusic();
  const music = musicContext?.music;

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
    musicToggle();
  };

  const toggleShiny = () => {
    setIsShiny(!isShiny);
  };

  if (error) {
    return (
      <section className={styles.desktop}>
        <div className={styles.pokedexScreen}>
          <hr className={styles.diodeRed1} />
          <div className={styles.pokemonName} />
          <input
            type="checkbox"
            name="TOGGLE-SWITCH-ON-OFF"
            id="toggle-switch"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          {music ? (
            <span
              className={`${"material-symbols-outlined"} ${styles.volumeOn}`}
            >
              volume_up
            </span>
          ) : (
            <span
              className={`${"material-symbols-outlined"} ${styles.volumeOff}`}
            >
              volume_off
            </span>
          )}
          <figure className={styles.screen}>
            <p className={styles.errorMessage}>
              Désolé je ne trouve pas ce Pokémon !
            </p>
          </figure>
          <figure className={styles.type1} />
          <figure className={styles.type2} />
          <button type="button">
            <hr />o
          </button>
          <div className={styles.barContainer}>
            <hr className={styles.bar1} />
            <hr className={styles.bar2} />
            <hr className={styles.bar3} />
            <hr className={styles.bar4} />
          </div>
        </div>
        <hr className={styles.border} />
        <hr className={styles.hide} />
      </section>
    );
  }

  const isNormalFlying =
    types[0]?.name.toLowerCase() === "normal" &&
    types[1]?.name.toLowerCase() === "vol";

  const backgroundImageKey = isNormalFlying
    ? "vol"
    : types[0]
      ? types[0].name.toLowerCase()
      : "plante";
  const backgroundImage = typeImages[backgroundImageKey] || planteImage;

  const getTypeData = (typeName: string) => {
    return data.type.find(
      (t: { name: string }) => t.name.toLowerCase() === typeName.toLowerCase(),
    );
  };

  return (
    <>
      <section className={styles.desktop}>
        <div className={styles.pokedexScreenBorder}>
          <div className={styles.pokedexScreen}>
            <hr className={styles.diodeRed1} />
            <input
              type="checkbox"
              name="TOGGLE-SWITCH-ON-OFF"
              id="toggle-switch"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            {music ? (
              <span
                className={`${"material-symbols-outlined"} ${styles.volumeOn}`}
              >
                volume_up
              </span>
            ) : (
              <span
                className={`${"material-symbols-outlined"} ${styles.volumeOff}`}
              >
                volume_off
              </span>
            )}
            <div className={styles.pokemonName}>
              <h2>{pokemon?.name.fr}</h2>
            </div>
            <figure className={styles.screen}>
              <div className={styles.imageContainer}>
                <img
                  src={backgroundImage}
                  alt="Background"
                  className={styles.backgroundImage}
                />
              </div>
              {pokemon && (
                <img
                  src={
                    isShiny ? pokemon.sprites.shiny : pokemon.sprites.regular
                  }
                  alt={pokemon.name.fr}
                  className={styles.pokemonImage}
                />
              )}
            </figure>
            <div className={styles.displayType}>
              {types[0] && (
                <span>
                  {(() => {
                    const typeData = getTypeData(types[0].name);
                    if (!typeData) return null;
                    const { name } = typeData;
                    return types[0].name.toLowerCase() ===
                      name.toLowerCase() ? (
                      <img src={typeData.vanilla} alt={name} />
                    ) : null;
                  })()}
                </span>
              )}
              {types[1] ? (
                <span>
                  {(() => {
                    const typeData = getTypeData(types[1].name);
                    if (!typeData) return null;
                    const { name } = typeData;
                    return types[1].name.toLowerCase() ===
                      name.toLowerCase() ? (
                      <img src={typeData.vanilla} alt={name} />
                    ) : null;
                  })()}
                </span>
              ) : (
                <span>
                  <span className={styles.typeNone}>
                    <hr />
                  </span>
                </span>
              )}
            </div>
            {!isShiny ? (
              <button
                className={styles.boutonshiny}
                type="button"
                onClick={toggleShiny}
              >
                {" "}
                <hr />
              </button>
            ) : (
              <button
                className={`${styles.boutonshiny} ${styles.shinyActive}`}
                type="button"
                onClick={toggleShiny}
              >
                <hr />
              </button>
            )}

            <div className={styles.barContainer}>
              <hr className={styles.bar1} />
              <hr className={styles.bar2} />
              <hr className={styles.bar3} />
              <hr className={styles.bar4} />
            </div>
            {isShiny && (
              <div className={styles.starsAnimation}>
                <svg viewBox="114.551 81.194 134.814 113.214">
                  <title>Etoiles animation</title>
                  <g className={styles.sparkles}>
                    <path
                      style={
                        {
                          "--duration": "1.9s",
                          "--delay": "0s",
                          fill: "rgb(255, 217, 4)",
                        } as React.CSSProperties
                      }
                      d="M 143.21 131.761 C 143.21 131.761 144.398 125.559 145.453 131.761 C 145.453 131.761 151.391 132.816 145.453 133.872 C 145.453 133.872 144.398 140.206 143.21 133.872 C 139.647 133.212 139.911 132.553 143.21 131.761 Z"
                    />
                    <path
                      style={
                        {
                          "--duration": "3s",
                          "--delay": "0s",
                          fill: "rgb(255, 217, 4)",
                        } as React.CSSProperties
                      }
                      d="M 164.499 98.461 C 164.499 98.461 165.237 94.608 165.893 98.461 C 165.893 98.461 169.582 99.116 165.893 99.772 C 165.893 99.772 165.237 103.707 164.499 99.772 C 162.286 99.362 162.45 98.952 164.499 98.461 Z"
                    />
                    <path
                      style={
                        {
                          "--duration": "1.6s",
                          "--delay": "0s",
                          fill: "rgb(255, 217, 4)",
                        } as React.CSSProperties
                      }
                      d="M 245.112 190.116 C 245.112 190.116 246.146 184.713 247.066 190.116 C 247.066 190.116 252.239 191.035 247.066 191.955 C 247.066 191.955 246.146 197.473 245.112 191.955 C 242.008 191.38 242.238 190.806 245.112 190.116 Z"
                    />
                    <path
                      style={
                        {
                          "--duration": "3.4s",
                          "--delay": "0s",
                          fill: "rgb(255, 217, 4)",
                        } as React.CSSProperties
                      }
                      d="M 150.284 174.329 C 150.284 174.329 151.022 170.476 151.678 174.329 C 151.678 174.329 155.367 174.984 151.678 175.64 C 151.678 175.64 151.022 179.575 150.284 175.64 C 148.071 175.23 148.235 174.82 150.284 174.329 Z"
                    />
                    <path
                      style={
                        {
                          "--duration": "2.5s",
                          "--delay": "0s",
                          fill: "rgb(255, 217, 4)",
                        } as React.CSSProperties
                      }
                      d="M 224.246 96.605 C 224.246 96.605 224.984 92.752 225.64 96.605 C 225.64 96.605 229.329 97.26 225.64 97.916 C 225.64 97.916 224.984 101.851 224.246 97.916 C 222.033 97.506 222.197 97.096 224.246 96.605 Z"
                    />
                    <path
                      style={
                        {
                          "--duration": "3.9s",
                          "--delay": "0s",
                          fill: "rgb(255, 217, 4)",
                        } as React.CSSProperties
                      }
                      d="M 202.166 155.219 C 202.166 155.219 203.354 149.017 204.409 155.219 C 204.409 155.219 210.347 156.274 204.409 157.33 C 204.409 157.33 203.354 163.664 202.166 157.33 C 198.603 156.67 198.867 156.011 202.166 155.219 Z"
                    />
                  </g>
                </svg>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PokedexScreen;

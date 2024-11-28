import type React from "react";
import { type SetStateAction, useEffect, useRef, useState } from "react";
import styles from "../styles/PokedexDetails.module.css";

interface Description {
  category: string;
  name: {
    fr: string;
  };
  types: { name: string }[];
  talents: { name: string }[];
  evolution: {
    pre: { name: string }[] | null;
    next: { name: string }[] | null;
  };
  height: string;
  weight: string;
  sprites: {
    regular: string;
  };
  pokedex_id: number;
}

interface PokedexDetailsProps {
  description: Description | null;
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

const PokedexDetails: React.FC<PokedexDetailsProps> = ({
  description,
  error,
  pokedex_id,
}) => {
  if (!description) {
    return (
      <section className={styles.pokedexDetails}>
        <div className={`${styles.billboard} ${styles.error}`}>
          <p>( \__/ )</p>
          <p>( 0°_°0)</p>
          <p>( " )_(")</p>
        </div>
        <div>
          <h3 className={styles.idNumber}>N°404 </h3>
        </div>
        <button type="button">
          <figure />
        </button>
      </section>
    );
  }

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

  const emptyDescription = {
    ...description,
    types: [],
    talents: [],
    evolution: { pre: [], next: [] },
  };

  const displayDescription = error ? emptyDescription : description;

  return (
    <>
      <section className={styles.pokedexDetails}>
        {pokemonSound && (
          <audio ref={audioRef} src={pokemonSound}>
            <track kind="captions" srcLang="en" label="English captions" />
          </audio>
        )}
        <div className={styles.billboard}>
          <h3>{displayDescription.name?.fr}</h3>
          <p>Pokémon de type :</p>
          {displayDescription.types.length > 0 ? (
            displayDescription.types.map((type) => (
              <p key={type.name}> - {type.name}</p>
            ))
          ) : (
            <p> Aucun type</p>
          )}
          <p>
            Il fait partie de la catégorie des {displayDescription.category}
          </p>
          <p>Il peut possèder des capacités tel que :</p>
          {displayDescription.talents.length > 0 ? (
            displayDescription.talents.map((talent) => (
              <p key={talent.name}> - {talent.name}</p>
            ))
          ) : (
            <p> Aucun talent</p>
          )}
          {displayDescription.evolution.pre &&
          displayDescription.evolution.pre.length > 0 ? (
            <p>
              Sa pré-évolution est {displayDescription.evolution.pre[0].name}
            </p>
          ) : (
            <p>Pas de pré-évolution</p>
          )}
          {displayDescription.evolution.next &&
          displayDescription.evolution.next.length > 0 ? (
            <p>Il évolue en {displayDescription.evolution.next[0].name}</p>
          ) : (
            <p>Pas d'évolution</p>
          )}
          <p>Sa taille moyenne est de :</p>
          <p> {displayDescription.height}</p>
          <p>Son poids moyen est lui de :</p>
          <p> {displayDescription.weight}</p>
        </div>
        <div>
          <h3 className={styles.idNumber}>
            N°{displayDescription.pokedex_id}{" "}
          </h3>
        </div>
        <button
          type="button"
          onClick={handlePlaySound}
          onKeyDown={handlePlaySound}
        >
          <figure>
            {error ? (
              <p>désolé</p>
            ) : (
              <img
                src={displayDescription.sprites.regular}
                alt={displayDescription.name.fr}
              />
            )}
          </figure>
        </button>
      </section>
    </>
  );
};

export default PokedexDetails;

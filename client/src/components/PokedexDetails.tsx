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
          {error ? (
            <div className={styles.deskBillboardError}>
              <p>( \__/ )</p>
              <p>( 0°_°0)</p>
              <p>( " )_(")</p>
            </div>
          ) : !description ? (
            <p>Chargement...</p>
          ) : (
            <>
              <h3>{description.name?.fr}</h3>
              <p>Pokémon de type :</p>
              <p> - {description.types[0]?.name}</p>
              {description.types[1]?.name && (
                <p> - {description.types[1].name}</p>
              )}
              <p>Il fait partie de la catégorie des {description.category}</p>
              <p>Il peut possèder des capacités tel que :</p>
              <p> - {description.talents[0]?.name}</p>
              {description.talents[1]?.name && (
                <p> - {description.talents[1].name}</p>
              )}
              {description.talents[2]?.name && (
                <p> - {description.talents[2].name}</p>
              )}
              {description.evolution?.pre?.[0]?.name && (
                <p>Sa pré-évolution est {description.evolution.pre[0].name}</p>
              )}
              {description.evolution?.next?.[0]?.name && (
                <p>Il évolue en {description.evolution.next[0].name}</p>
              )}
              <p>Sa taille moyenne est de :</p>
              <p> - {description.height}</p>
              <p>Son poids moyen est lui de :</p>
              <p> - {description.weight}</p>
            </>
          )}
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

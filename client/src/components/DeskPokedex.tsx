import { useEffect, useState } from "react";
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
import styles from "../styles/DeskPokedex.module.css";
import DeskFooter from "./DeskFooter";
import DeskHeader from "./DeskHeader";
import DeskLeftPanel from "./DeskLeftPanel";
import DeskRightPanel from "./DeskRightPanel";
import PokedexModal from "./PokedexModal";

interface Type {
  name: string;
}

interface Talent {
  name: string;
}

interface Evolution {
  pre: { name: string }[] | null;
  next: { name: string }[] | null;
}

interface Sprites {
  regular: string;
  shiny: string;
}

interface Pokemon {
  category: string;
  name: {
    fr: string;
  };
  types: Type[];
  talents: Talent[];
  evolution: Evolution;
  height: string;
  weight: string;
  sprites: Sprites;
  pokedex_id: number;
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

export default function DeskPokedex() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pokemonIndex, setPokemonIndex] = useState(0);
  const [isShiny, setIsShiny] = useState(false);

  const toggleShiny = () => {
    setIsShiny(!isShiny);
  };

  const handleSearch = (searchTerm: string) => {
    fetch(`https://tyradex.app/api/v1/gen/2?name=${searchTerm.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        const index = data.findIndex(
          (pokemon: Pokemon) =>
            pokemon.name.fr.toLowerCase() === searchTerm.toLowerCase(),
        );
        if (index !== -1) {
          setPokemonIndex(index);
          setPokemon(data[index]);
          setError(null);
        } else {
          setError("désolé mais ce pokemon n'existe pas");
          setPokemon(null);
        }
      })
      .catch(() => {
        setError("désolé mais ce pokemon n'existe pas");
        setPokemon(null);
      });
  };

  useEffect(() => {
    const getPokemon = () => {
      fetch("https://tyradex.app/api/v1/gen/2")
        .then((response) => response.json())
        .then((data) => {
          if (data[pokemonIndex]) {
            const pokemonData: Pokemon = {
              name: { fr: data[pokemonIndex].name.fr },
              sprites: {
                regular: data[pokemonIndex].sprites.regular,
                shiny: data[pokemonIndex].sprites.shiny,
              },
              pokedex_id: data[pokemonIndex].pokedex_id,
              category: data[pokemonIndex].category,
              types: data[pokemonIndex].types.map((type: Type) => ({
                name: type.name,
              })),
              talents: data[pokemonIndex].talents.map((talent: Talent) => ({
                name: talent.name,
              })),
              evolution: {
                pre: data[pokemonIndex].evolution?.pre || null,
                next: data[pokemonIndex].evolution?.next || null,
              },
              height: data[pokemonIndex].height,
              weight: data[pokemonIndex].weight,
            };
            setPokemon(pokemonData);
            setError(null);
          } else {
            setError("Pokémon not found");
            setPokemon(null);
          }
        })
        .catch(() => {
          setError("Pokémon not found");
          setPokemon(null);
        });
    };

    getPokemon();
  }, [pokemonIndex]);

  const incrementPokemonIndex = () => {
    setPokemonIndex((prevIndex) => (prevIndex < 99 ? prevIndex + 1 : 0));
  };

  const decrementPokemonIndex = () => {
    setPokemonIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 99));
  };

  const isNormalFlying =
    pokemon?.types[0]?.name.toLowerCase() === "normal" &&
    pokemon?.types[1]?.name.toLowerCase() === "vol";

  const backgroundImageKey = isNormalFlying
    ? "vol"
    : pokemon?.types[0]
      ? pokemon.types[0].name.toLowerCase()
      : "plante";
  const backgroundImage = typeImages[backgroundImageKey] || planteImage;

  return (
    <>
      <DeskHeader />
      <section className={styles.deskPokedex}>
        <div className={styles.backgroundImageContainer}>
          <img
            src={backgroundImage}
            alt="Background"
            className={styles.backgroundImage}
          />
        </div>
        <PokedexModal />
        <div className={styles.pokedexContainer}>
          <DeskLeftPanel
            isShiny={isShiny}
            toggleShiny={toggleShiny}
            pokemon={pokemon}
            error={error}
            onIncrement={incrementPokemonIndex}
            onDecrement={decrementPokemonIndex}
          />
          <DeskRightPanel
            description={pokemon}
            error={error}
            onSearch={handleSearch}
          />
        </div>
      </section>
      <DeskFooter />
    </>
  );
}

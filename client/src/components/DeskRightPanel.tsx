import type React from "react";
import { useScroll } from "../context/scroll.tsx";
import styles from "../styles/DeskRightPanel.module.css";
import DeskPokedexSearchBar from "./DeskPokedexSearchBar";
import DeskSound from "./DeskSound";
import DeskType from "./DeskType.tsx";

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

interface DeskRightPanelProps {
  description: Description | null;
  error: string | null;
  onSearch: (searchTerm: string) => void;
}

const DeskRightPanel: React.FC<DeskRightPanelProps> = ({
  description,
  error,
  onSearch,
}) => {
  const scrollContext = useScroll();
  const scrollRef = scrollContext ? scrollContext.scrollRef : null;

  return (
    <section className={styles.deskRightPanel}>
      <div className={styles.deskRightPanelBorder}>
        <div className={styles.pokedexIntern}>
          <div className={styles.rightPanel}>
            <div className={styles.billboard} ref={scrollRef}>
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
                  <p>
                    Il fait partie de la catégorie des {description.category}
                  </p>
                  <p>Il peut possèder des capacités tel que :</p>
                  <p> - {description.talents[0]?.name}</p>
                  {description.talents[1]?.name && (
                    <p> - {description.talents[1].name}</p>
                  )}
                  {description.talents[2]?.name && (
                    <p> - {description.talents[2].name}</p>
                  )}
                  {description.evolution?.pre?.[0]?.name && (
                    <p>
                      Sa pré-évolution est {description.evolution.pre[0].name}
                    </p>
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
            <DeskType types={description?.types || []} />
            <DeskSound
              pokedex_id={description?.pokedex_id ?? 1}
              pokemonImage={description?.sprites.regular || ""}
              error={error}
            />
            <DeskPokedexSearchBar onSearch={onSearch} />
          </div>
          <hr className={styles.reflectIntern1} />
          <hr className={styles.reflectIntern2} />
        </div>
      </div>
    </section>
  );
};

export default DeskRightPanel;

import { useModal } from "../context/modal";
import styles from "../styles/PokedexModal.module.css";

export default function PokedexModal() {
  const { modal, setModal } = useModal();

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {modal && (
        <section className={styles.desktop}>
          <div className={styles.pokedexScreenBorder}>
            <div className={styles.pokedexScreen}>
              <hr className={styles.diodeRed1} />
              <hr className={styles.diodeRed2} />
              <div className={styles.screen}>
                <h2> - Mentions légales - </h2>
                <h3> - Site réalisé par - </h3>
                <p>
                  - Maxence CHOISELLE & Foxrim/Flavien ROUSSEAU & Sabrina MEJRI
                  -
                </p>
                <h3> - API's - </h3>
                <p> - Tyradex : Créé par Yarkis & Ashzuu - </p>
                <p> - Poké : Paul Hallett - </p>
                <h3> - Police d'écriture - </h3>
                <p> - Monocraft : Créé par IdreesInc - </p>
                <h3> - Images - </h3>
                <p> - Titre : textstudio.com - </p>
                <p> - Sprites : Pokémon Rouge Feu / Vert Feuille - </p>
                <p> - Sprites/Gifs : Foxrim/Flavien Rousseau - </p>
                <p> - Pokémons : API Tyradex - </p>
                <p> - Background des pokémons : Freepics - </p>
                <p> - Types : API Tyradex / Foxrim/Flavien Rousseau - </p>
                <h3> - Musique - </h3>
                <p> - Thème principal : Pokémon 2ème génération 1999 - </p>
                <h3> - Sound Effect - </h3>
                <p>
                  {" "}
                  - Ouverture du Pokédex : Ouverture Pokéball Sound Animé -{" "}
                </p>
              </div>
              <div
                className={styles.diodeDesk}
                onClick={toggleModal}
                onKeyDown={toggleModal}
              >
                <hr className={styles.diodeDeskLight} />
              </div>
              <div className={styles.barContainer}>
                <hr className={styles.bar1} />
                <hr className={styles.bar2} />
                <hr className={styles.bar3} />
                <hr className={styles.bar4} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

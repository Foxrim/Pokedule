import type React from "react";
import imgPokeball from "../assets/images/Pokeball.png";
import imgDesktopClose from "../assets/images/desktopclose.png";
import imgMobileClose from "../assets/images/mobileclose.png";
import styles from "../styles/Homepage.module.css";

interface HomepageProps {
  onPokeballClick: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onPokeballClick }) => {
  const handleKeyUp = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      onPokeballClick();
    }
  };

  return (
    <div className={styles.homepage}>
      <img
        className={styles.pokeball}
        src={imgPokeball}
        alt="PokeBall"
        onClick={onPokeballClick}
        onKeyUp={handleKeyUp}
      />

      <img
        className={styles.desktopclose}
        src={imgDesktopClose}
        alt="Pokedex fermé"
      />
      <img
        className={styles.mobileclose}
        src={imgMobileClose}
        alt="Pokedex fermé"
      />
    </div>
  );
};
export default Homepage;

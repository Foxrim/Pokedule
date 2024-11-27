import { useCallback, useEffect, useState } from "react";
import bush from "../../public/bush.webp";
import dresseurDown from "../../public/dresseur_down.gif";
import dresseurUp from "../../public/dresseur_up.gif";
import fence_corner from "../../public/fence_corner.webp";
import fence_horizontal from "../../public/fence_horizontal.webp";
import fence_vertical from "../../public/fence_vertical.webp";
import lac_vertical from "../../public/lac_vertical.webp";
import noarfang from "../../public/noarfang.webp";
import road from "../../public/road.webp";
import shadow from "../../public/shadow.webp";
import pokemon_water from "../../public/shadow_water.webp";
import tree from "../../public/tree.webp";
import water from "../../public/water.webp";
import water_shadow from "../../public/water_shadow.webp";
import styles from "../styles/DeskFooter.module.css";

export default function DeskFooter() {
  const [bush1, setBush1] = useState<boolean>(false);
  const [bush2, setBush2] = useState<boolean>(false);
  const [bush3, setBush3] = useState<boolean>(false);
  const [shadow_1, setShadow_1] = useState<boolean>(false);
  const [shadow_2, setShadow_2] = useState<boolean>(false);
  const [shadow_3, setShadow_3] = useState<boolean>(false);
  const [vol, setVol] = useState<boolean>(false);
  const [volTimeoutActive, setVolTimeoutActive] = useState<boolean>(false);
  const [waterInteval, setWaterInterval] = useState<boolean>(false);
  const [isEscape, setIsEscape] = useState<boolean>(false);
  const [getText1, setGetText1] = useState<boolean>(false);
  const [getText2, setGetText2] = useState<boolean>(false);
  const [getText3, setGetText3] = useState<boolean>(false);
  const [getText4, setGetText4] = useState<boolean>(false);
  const [getDresseurUp, setGetDresseurUp] = useState<boolean>(false);
  const [getDresseurDown, setGetDresseurDown] = useState<boolean>(false);

  const trees = [];
  const bushes = [];
  const fences_verticales = [];
  const fences_horizontales = [];
  const lac_verticales = [];

  const handleEscape = () => {
    setIsEscape((prevEscape) => !prevEscape);
    setTimeout(() => {
      setGetText1((prevGetText) => !prevGetText);
      setWaterInterval(false);
    }, 1000);
    setTimeout(() => {
      setGetText1(false);
    }, 2500);
  };

  const handleShadow_1 = () => {
    setShadow_1((prevShadow) => !prevShadow);
    if (shadow_1) {
      setBush1(false);
    }
    setTimeout(() => {
      setGetText2((prevGetText2) => !prevGetText2);
    }, 700);
    setTimeout(() => {
      setGetText2(false);
    }, 2500);
  };

  const handleShadow_2 = () => {
    setShadow_2((prevShadow) => !prevShadow);
    if (shadow_2) {
      setBush2(false);
    }
    setTimeout(() => {
      setGetText3((prevGetText3) => !prevGetText3);
    }, 700);
    setTimeout(() => {
      setGetText3(false);
    }, 2500);
  };

  const handleShadow_3 = () => {
    setShadow_3((prevShadow) => !prevShadow);
    if (shadow_3) {
      setBush3(false);
    }
    setTimeout(() => {
      setGetText4((prevGetText4) => !prevGetText4);
    }, 700);
    setTimeout(() => {
      setGetText4(false);
    }, 2500);
  };

  const getRandomDelay = useCallback(
    (max: number) => Math.floor(Math.random() * max),
    [],
  );

  useEffect(() => {
    const bushInterval = setInterval(() => {
      const result = getRandomDelay(15);
      if (result === 5) {
        setBush1(true);
        setTimeout(() => {
          setBush1(false);
        }, 3000);
      }
      if (result === 10) {
        setBush2(true);
        setTimeout(() => {
          setBush2(false);
        }, 3000);
      }
      if (result === 1) {
        setBush3(true);
        setTimeout(() => {
          setBush3(false);
        }, 3000);
      }
    }, 5000);

    const dresseurInterval = setInterval(() => {
      const result = getRandomDelay(5);
      if (result === 1) {
        setGetDresseurUp(true);
        setTimeout(() => {
          setGetDresseurUp(false);
        }, 5000);
      }
      if (result === 4) {
        setGetDresseurDown(true);
        setTimeout(() => {
          setGetDresseurDown(false);
        }, 5000);
      }
    }, 6000);

    const volInterval = setInterval(() => {
      const result = getRandomDelay(15);
      if (result === 2 && !volTimeoutActive) {
        setVol(true);
        setVolTimeoutActive(true);
        setTimeout(() => {
          setVol(false);
          setVolTimeoutActive(false);
        }, 18000);
      }
    }, 20000);

    const waterInterval = setInterval(() => {
      const result = getRandomDelay(4);
      if (result === 2) {
        setWaterInterval(true);
        setIsEscape(false);
        setTimeout(() => {
          setIsEscape(true);
        }, 9000);
        setTimeout(() => {
          setWaterInterval(false);
        }, 10000);
      }
    }, 20000);

    return () => {
      clearInterval(dresseurInterval);
      clearInterval(bushInterval);
      clearInterval(volInterval);
      clearInterval(waterInterval);
    };
  }, [getRandomDelay, volTimeoutActive]);

  for (let i = 1; i <= 16; i++) {
    trees.push(
      <img
        key={`tree_${i}`}
        className={styles[`tree_${i}`]}
        src={tree}
        alt="arbre"
      />,
    );
  }

  for (let i = 1; i <= 22; i++) {
    bushes.push(
      <img
        key={`bush_${i}`}
        className={styles[`bush_${i}`]}
        src={bush}
        alt="buisson"
      />,
    );
  }

  for (let i = 1; i <= 4; i++) {
    fences_verticales.push(
      <img
        key={`fence_vertical_${i}`}
        className={styles[`fence_vertical_${i}`]}
        src={fence_vertical}
        alt="barrière vertical"
      />,
    );
  }

  for (let i = 1; i <= 4; i++) {
    fences_horizontales.push(
      <img
        key={`fence_horizontal_${i}`}
        className={styles[`fence_horizontal_${i}`]}
        src={fence_horizontal}
        alt="barrière horizontal"
      />,
    );
  }

  for (let i = 1; i <= 4; i++) {
    lac_verticales.push(
      <img
        key={`lac_vertical_${i}`}
        className={styles[`lac_vertical_${i}`]}
        src={lac_vertical}
        alt="bord de lac"
      />,
    );
  }

  return (
    <footer className={styles.footer}>
      {trees}
      {bushes}
      {bush1 && !shadow_1 ? (
        <img
          key="bush_5"
          className={`${styles.bush_5} ${styles.animationBush}`}
          src={bush}
          alt="buisson"
          onClick={handleShadow_1}
          onKeyDown={handleShadow_1}
        />
      ) : (
        <img key="bush_5" className={styles.bush_5} src={bush} alt="buisson" />
      )}

      {bush2 && !shadow_2 ? (
        <img
          key="bush_16"
          className={`${styles.bush_16} ${styles.animationBush}`}
          src={bush}
          alt="buisson"
          onClick={handleShadow_2}
          onKeyDown={handleShadow_2}
        />
      ) : (
        <img
          key="bush_16"
          className={styles.bush_16}
          src={bush}
          alt="buisson"
        />
      )}

      {bush3 && !shadow_3 ? (
        <img
          key="bush_20"
          className={`${styles.bush_20} ${styles.animationBush}`}
          src={bush}
          alt="buisson"
          onClick={handleShadow_3}
          onKeyDown={handleShadow_3}
        />
      ) : (
        <img
          key="bush_20"
          className={styles.bush_20}
          src={bush}
          alt="buisson"
        />
      )}
      {shadow_1 && (
        <img
          key="shadow_1"
          className={styles.shadow_1}
          src={shadow}
          alt="ombre de pokémon en fuite"
        />
      )}
      {shadow_2 && (
        <img
          key="shadow_2"
          className={styles.shadow_2}
          src={shadow}
          alt="ombre de pokémon en fuite"
        />
      )}
      {shadow_3 && (
        <img
          key="shadow_3"
          className={styles.shadow_3}
          src={shadow}
          alt="ombre de pokémon en fuite"
        />
      )}
      {fences_verticales}
      {fences_horizontales}
      {lac_verticales}
      <img
        key="road_1"
        className={styles.road_1}
        src={road}
        alt="chemin de terre"
      />
      <img
        key="road_2"
        className={styles.road_2}
        src={road}
        alt="chemin de terre"
      />
      <img
        key="fence_1"
        className={styles.fence_corner}
        src={fence_corner}
        alt="coin de barrière"
      />
      <img key="water" className={styles.water} src={water} alt="lac" />
      <img
        key="waterShadow_1"
        className={styles.water_shadow}
        src={water_shadow}
        alt="ombre de lac"
      />
      <img
        key="waterShadow_2"
        className={styles.water_shadow_2}
        src={water_shadow}
        alt="ombre de lac"
      />
      {vol && (
        <img
          key="noarfang"
          className={styles.noarfang}
          src={noarfang}
          alt="noarfang qui vol dans le ciel"
        />
      )}
      {waterInteval && !isEscape && (
        <img
          key="pokemonEnderWater"
          onClick={handleEscape}
          onKeyDown={handleEscape}
          className={`${styles.pokemon_water} ${styles.animationWater}`}
          src={pokemon_water}
          alt="pokémon sous l'eau ?"
        />
      )}
      {waterInteval && isEscape && (
        <img
          key="escape"
          className={`${styles.escape}`}
          src={pokemon_water}
          alt="pokémon sous l'eau ?"
        />
      )}
      {getText1 && (
        <p className={styles.textPosition_1}>Le pokémon s'est enfui !</p>
      )}
      {getText2 && (
        <p className={styles.textPosition_2}>Le pokémon s'est enfui !</p>
      )}
      {getText3 && (
        <p className={styles.textPosition_3}>Le pokémon s'est enfui !</p>
      )}
      {getText4 && (
        <p className={styles.textPosition_4}>Le pokémon s'est enfui !</p>
      )}
      {getDresseurUp && (
        <img
          className={styles.dresseurUp}
          src={dresseurUp}
          alt="Un dresseur pokémon se balade"
        />
      )}
      {getDresseurDown && (
        <img
          className={styles.dresseurDown}
          src={dresseurDown}
          alt="Un dresseur pokémon se balade"
        />
      )}
    </footer>
  );
}

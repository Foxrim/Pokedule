import styles from "../styles/PokedexSwitchButton.module.css";

interface SwitchButtonsProps {
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function PokedexSwitchButtons({
  onIncrement,
  onDecrement,
}: SwitchButtonsProps) {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    action: () => void,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      action();
    }
  };

  return (
    <>
      <button type="button" className={styles.leftButton}>
        <span
          onClick={onDecrement}
          className="material-symbols-outlined"
          onKeyDown={(event) => handleKeyDown(event, onDecrement)}
        >
          arrow_right
        </span>
      </button>
      <button type="button" className={styles.rightButton}>
        <span
          onClick={onIncrement}
          className="material-symbols-outlined"
          onKeyDown={(event) => handleKeyDown(event, onIncrement)}
        >
          arrow_right
        </span>
      </button>
    </>
  );
}

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
      <button
        type="button"
        className={styles.leftButton}
        onClick={onDecrement}
        onKeyDown={(event) => handleKeyDown(event, onDecrement)}
      >
        <span className="material-symbols-outlined">arrow_right</span>
      </button>
      <button
        type="button"
        className={styles.rightButton}
        onClick={onIncrement}
        onKeyDown={(event) => handleKeyDown(event, onIncrement)}
      >
        <span className="material-symbols-outlined">arrow_right</span>
      </button>
    </>
  );
}

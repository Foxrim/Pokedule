import styles from "../styles/DeskHinge.module.css";

export default function DeskHinge() {
  return (
    <div className={styles.deskHinge}>
      <div className={styles.deskHingeRed1}>
        <div className={styles.deskHingeClear1}>
          <hr className={styles.deskHingeWhite} />
        </div>
      </div>
      <div className={styles.deskHingeRed2}>
        <div className={styles.deskHingeClear2}>
          <hr className={styles.deskHingeWhite} />
        </div>
      </div>
      <div className={styles.deskHingeRed3}>
        <div className={styles.deskHingeClear3}>
          <hr className={styles.deskHingeWhite} />
        </div>
      </div>
    </div>
  );
}

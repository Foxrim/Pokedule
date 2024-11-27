import data from "../services/data.json";
import styles from "../styles/DeskType.module.css";

interface DeskTypeProps {
  types: { name: string }[];
}

export default function DeskType({ types }: DeskTypeProps) {
  return (
    <section className={styles.deskType}>
      {data.type.map(
        (typeProps: {
          id: number;
          name: string;
          vanilla: string;
          black_white: string;
        }) => {
          const typeData = {
            id: typeProps.id,
            name: typeProps.name,
            vanilla: typeProps.vanilla,
            black_white: typeProps.black_white,
          };
          const isTypeMatched = types.some(
            (type) => type.name.toLowerCase() === typeProps.name.toLowerCase(),
          );

          return (
            <div key={typeProps.id} className={styles.displayType}>
              <span>
                {isTypeMatched ? (
                  <img
                    className={styles.vanilla}
                    src={typeData.vanilla}
                    alt={`${typeData.name} vanilla`}
                  />
                ) : (
                  <img
                    src={typeData.black_white}
                    alt={`${typeData.name} black and white`}
                  />
                )}
              </span>
            </div>
          );
        },
      )}
    </section>
  );
}

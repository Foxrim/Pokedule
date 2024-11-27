import { useState } from "react";
import styles from "../styles/DeskPokedexSearchBar.module.css";

interface DeskPokedexSearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function DeskPokedexSearchBar({
  onSearch,
}: DeskPokedexSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSearch(searchTerm);
  };

  return (
    <nav className={styles.pokedexSearchBarDesk}>
      <fieldset>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Trouvez votre Pokémon . . ."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button type="submit">Rechercher</button>
        </form>
      </fieldset>
    </nav>
  );
}

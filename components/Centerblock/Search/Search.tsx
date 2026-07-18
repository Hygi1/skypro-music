import styles from "./Search.module.css";

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function Search({ searchQuery, setSearchQuery }: SearchProps) {
  return (
    <div className={styles.search}>
      <svg className={styles.searchSvg}>
        <use href="/img/icon/sprite.svg#icon-search" />
      </svg>
      <input
        className={styles.searchInput}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

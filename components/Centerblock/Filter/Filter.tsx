"use client";

import { useState } from "react";
import styles from "./Filter.module.css";
import cn from "classnames";
import {
  getUniqueAuthors,
  getUniqueGenres,
  getUniqueYears,
} from "@/lib/helpers";

type FilterType = "author" | "year" | "genre" | null;

export default function Filter() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);

  const handleFilterClick = (filter: FilterType) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  const authors = getUniqueAuthors();
  const years = getUniqueYears();
  const genres = getUniqueGenres();

  return (
    <div className={styles.filter}>
      <div className={styles.filterTitle}>Искать по:</div>

      <div className={styles.filterItem}>
        <button
          className={cn(styles.filterButton, {
            [styles.active]: activeFilter === "author",
          })}
          onClick={() => handleFilterClick("author")}
        >
          исполнителю
        </button>
        {activeFilter === "author" && (
          <div className={styles.dropdown}>
            <ul className={styles.dropdownList}>
              {authors.map((author) => (
                <li key={author} className={styles.dropdownItem}>
                  {author}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.filterItem}>
        <button
          className={cn(styles.filterButton, {
            [styles.active]: activeFilter === "year",
          })}
          onClick={() => handleFilterClick("year")}
        >
          году выпуска
        </button>
        {activeFilter === "year" && (
          <div className={styles.dropdown}>
            <ul className={styles.dropdownList}>
              {years.map((year) => (
                <li key={year} className={styles.dropdownItem}>
                  {year}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.filterItem}>
        <button
          className={cn(styles.filterButton, {
            [styles.active]: activeFilter === "genre",
          })}
          onClick={() => handleFilterClick("genre")}
        >
          жанру
        </button>
        {activeFilter === "genre" && (
          <div className={styles.dropdown}>
            <ul className={styles.dropdownList}>
              {genres.map((genre) => (
                <li key={genre} className={styles.dropdownItem}>
                  {genre}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

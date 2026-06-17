"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import styles from "./Filter.module.css";
import cn from "classnames";

type FilterType = "author" | "year" | "genre" | null;

export default function Filter() {
  const tracks = useSelector((state: RootState) => state.player.playlist);
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);

  const handleFilterClick = (filter: FilterType) => {
    if (activeFilter === filter) setActiveFilter(null);
    else setActiveFilter(filter);
  };

  if (!tracks.length) return null;

  const authors = [...new Set(tracks.map((t) => t.author))];
  const years = [...new Set(tracks.map((t) => t.release_date?.split("-")[0]))];
  const genres = [...new Set(tracks.flatMap((t) => t.genre))];

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

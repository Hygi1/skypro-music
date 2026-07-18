"use client";

import { useState } from "react";
import styles from "./Filter.module.css";
import cn from "classnames";

type FilterType = "author" | "genre" | "sort" | null;

interface FilterProps {
  authors: string[];
  genres: string[];
  selectedAuthor: string;
  setSelectedAuthor: (value: string) => void;
  selectedGenre: string;
  setSelectedGenre: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function Filter({
  authors,
  genres,
  selectedAuthor,
  setSelectedAuthor,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
}: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);

  const handleFilterClick = (filter: FilterType) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  const handleSelect = (value: string, type: "author" | "genre" | "sort") => {
    if (type === "author") {
      setSelectedAuthor(selectedAuthor === value ? "" : value);
    } else if (type === "genre") {
      setSelectedGenre(selectedGenre === value ? "" : value);
    } else if (type === "sort") {
      setSortBy(sortBy === value ? "default" : value);
    }
    setActiveFilter(null);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterTitle}>Искать по:</div>

      <div className={styles.filterItem}>
        <button
          className={cn(styles.filterButton, {
            [styles.active]: selectedAuthor,
          })}
          onClick={() => handleFilterClick("author")}
        >
          исполнителю
        </button>
        {activeFilter === "author" && (
          <div className={styles.dropdown}>
            <ul className={styles.dropdownList}>
              <li
                className={styles.dropdownItem}
                onClick={() => handleSelect("", "author")}
              >
                Все исполнители
              </li>
              {authors.map((author) => (
                <li
                  key={author}
                  className={cn(styles.dropdownItem, {
                    [styles.selected]: selectedAuthor === author,
                  })}
                  onClick={() => handleSelect(author, "author")}
                >
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
            [styles.active]: selectedGenre,
          })}
          onClick={() => handleFilterClick("genre")}
        >
          жанру
        </button>
        {activeFilter === "genre" && (
          <div className={styles.dropdown}>
            <ul className={styles.dropdownList}>
              <li
                className={styles.dropdownItem}
                onClick={() => handleSelect("", "genre")}
              >
                Все жанры
              </li>
              {genres.map((genre) => (
                <li
                  key={genre}
                  className={cn(styles.dropdownItem, {
                    [styles.selected]: selectedGenre === genre,
                  })}
                  onClick={() => handleSelect(genre, "genre")}
                >
                  {genre}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.filterItem}>
        <button
          className={cn(styles.filterButton, {
            [styles.active]: sortBy !== "default",
          })}
          onClick={() => handleFilterClick("sort")}
        >
          сортировка
        </button>
        {activeFilter === "sort" && (
          <div className={styles.dropdown}>
            <ul className={styles.dropdownList}>
              <li
                className={cn(styles.dropdownItem, {
                  [styles.selected]: sortBy === "default",
                })}
                onClick={() => handleSelect("default", "sort")}
              >
                По умолчанию
              </li>
              <li
                className={cn(styles.dropdownItem, {
                  [styles.selected]: sortBy === "newest",
                })}
                onClick={() => handleSelect("newest", "sort")}
              >
                Сначала новые
              </li>
              <li
                className={cn(styles.dropdownItem, {
                  [styles.selected]: sortBy === "oldest",
                })}
                onClick={() => handleSelect("oldest", "sort")}
              >
                Сначала старые
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

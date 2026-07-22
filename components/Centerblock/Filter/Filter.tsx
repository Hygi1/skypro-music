"use client";

import { useState } from "react";
import styles from "./Filter.module.css";
import cn from "classnames";

type FilterType = "author" | "genre" | "sort" | null;

interface FilterProps {
  authors: string[];
  genres: string[];
  selectedAuthors: string[];
  setSelectedAuthors: (value: string[]) => void;
  selectedGenre: string;
  setSelectedGenre: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function Filter({
  authors,
  genres,
  selectedAuthors,
  setSelectedAuthors,
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

  const handleAuthorToggle = (author: string) => {
    const newSelected = selectedAuthors.includes(author)
      ? selectedAuthors.filter((a) => a !== author)
      : [...selectedAuthors, author];
    setSelectedAuthors(newSelected);
    setActiveFilter(null);
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(selectedGenre === genre ? "" : genre);
    setActiveFilter(null);
  };

  const handleSortSelect = (value: string) => {
    setSortBy(sortBy === value ? "default" : value);
    setActiveFilter(null);
  };

  const selectedCount = selectedAuthors.length;

  return (
    <div className={styles.filter}>
      <div className={styles.filterTitle}>Искать по:</div>

      <div className={styles.filterItem}>
        <button
          className={cn(styles.filterButton, {
            [styles.active]: selectedCount > 0,
          })}
          onClick={() => handleFilterClick("author")}
        >
          <span className={styles.buttonText}>исполнителю</span>
          {selectedCount > 0 && (
            <span className={styles.badge}>{selectedCount}</span>
          )}
        </button>
        {activeFilter === "author" && (
          <div className={styles.dropdown}>
            <ul className={styles.dropdownList}>
              {authors.map((author) => (
                <li
                  key={author}
                  className={cn(styles.dropdownItem, {
                    [styles.selected]: selectedAuthors.includes(author),
                  })}
                  onClick={() => handleAuthorToggle(author)}
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
                onClick={() => handleGenreSelect("")}
              >
                Все жанры
              </li>
              {genres.map((genre) => (
                <li
                  key={genre}
                  className={cn(styles.dropdownItem, {
                    [styles.selected]: selectedGenre === genre,
                  })}
                  onClick={() => handleGenreSelect(genre)}
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
                onClick={() => handleSortSelect("default")}
              >
                По умолчанию
              </li>
              <li
                className={cn(styles.dropdownItem, {
                  [styles.selected]: sortBy === "newest",
                })}
                onClick={() => handleSortSelect("newest")}
              >
                Сначала новые
              </li>
              <li
                className={cn(styles.dropdownItem, {
                  [styles.selected]: sortBy === "oldest",
                })}
                onClick={() => handleSortSelect("oldest")}
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

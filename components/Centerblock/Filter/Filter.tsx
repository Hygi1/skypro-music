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
  selectedGenres: string[];
  setSelectedGenres: (value: string[]) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function Filter({
  authors,
  genres,
  selectedAuthors,
  setSelectedAuthors,
  selectedGenres,
  setSelectedGenres,
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

  const handleGenreToggle = (genre: string) => {
    const newSelected = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(newSelected);
    setActiveFilter(null);
  };

  const handleSortSelect = (value: string) => {
    setSortBy(sortBy === value ? "default" : value);
    setActiveFilter(null);
  };

  const authorsCount = selectedAuthors.length;
  const genresCount = selectedGenres.length;

  return (
    <div className={styles.filter}>
      <div className={styles.filterTitle}>Искать по:</div>

      <div className={styles.filterItem}>
        <button
          className={cn(styles.filterButton, {
            [styles.active]: authorsCount > 0,
          })}
          onClick={() => handleFilterClick("author")}
        >
          <span className={styles.buttonText}>исполнителю</span>
          {authorsCount > 0 && (
            <span className={styles.badge}>{authorsCount}</span>
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
            [styles.active]: genresCount > 0,
          })}
          onClick={() => handleFilterClick("genre")}
        >
          <span className={styles.buttonText}>жанру</span>
          {genresCount > 0 && (
            <span className={styles.badge}>{genresCount}</span>
          )}
        </button>
        {activeFilter === "genre" && (
          <div className={styles.dropdown}>
            <ul className={styles.dropdownList}>
              {genres.map((genre) => (
                <li
                  key={genre}
                  className={cn(styles.dropdownItem, {
                    [styles.selected]: selectedGenres.includes(genre),
                  })}
                  onClick={() => handleGenreToggle(genre)}
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

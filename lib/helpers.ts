import { data } from "./data";

export const getUniqueAuthors = (): string[] => {
  const authors = data.map((track) => track.author);
  return Array.from(new Set(authors));
};

export const getUniqueGenres = (): string[] => {
  const genres = data.flatMap((track) => track.genre);
  return Array.from(new Set(genres));
};

export const getUniqueYears = (): string[] => {
  const years = data.map((track) => track.release_date.split("-")[0]);
  return Array.from(new Set(years)).sort();
};

import { Track } from "@/lib/types/api";

export const filterTracks = (
  tracks: Track[],
  searchQuery: string,
  selectedAuthors: string[],
  selectedGenre: string,
  sortBy: string
): Track[] => {
  let result = [...tracks];

  if (searchQuery.trim()) {
    const query = searchQuery.trim().toLowerCase();
    result = result.filter((track) =>
      track.name.toLowerCase().startsWith(query)
    );
  }

  if (selectedAuthors.length > 0) {
    result = result.filter((track) => selectedAuthors.includes(track.author));
  }

  if (selectedGenre) {
    result = result.filter((track) => track.genre.includes(selectedGenre));
  }

  if (sortBy === "newest") {
    result.sort(
      (a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
  } else if (sortBy === "oldest") {
    result.sort(
      (a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    );
  }

  return result;
};

export const getUniqueAuthors = (tracks: Track[]): string[] => {
  const authors = tracks.map((t) => t.author);
  return Array.from(new Set(authors));
};

export const getUniqueGenres = (tracks: Track[]): string[] => {
  const genres = tracks.flatMap((t) => t.genre);
  return Array.from(new Set(genres));
};

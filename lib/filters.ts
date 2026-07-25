import { Track } from "@/lib/types/api";

export const filterTracks = (
  tracks: Track[],
  searchQuery: string,
  selectedAuthors: string[],
  selectedGenres: string[],
  sortBy: string
): Track[] => {
  if (!Array.isArray(tracks)) return [];

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

  if (selectedGenres.length > 0) {
    result = result.filter((track) =>
      track.genre.some((g) => selectedGenres.includes(g))
    );
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
  if (!Array.isArray(tracks)) return [];
  const authors = tracks.map((t) => t.author);
  return Array.from(new Set(authors));
};

export const getUniqueGenres = (tracks: Track[]): string[] => {
  if (!Array.isArray(tracks)) return [];
  const genres = tracks.flatMap((t) => t.genre);
  return Array.from(new Set(genres));
};

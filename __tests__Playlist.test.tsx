import { filterTracks, getUniqueAuthors, getUniqueGenres } from "@/lib/filters";
import { Track } from "@/lib/types/api";

const mockTracks: Track[] = [
  {
    _id: 1,
    name: "Chase",
    author: "Alexander Nakarada",
    release_date: "2005-06-11",
    genre: ["Classical"],
    duration_in_seconds: 205,
    album: "Chase",
    logo: null,
    track_file: "",
    staredUser: [],
  },
  {
    _id: 2,
    name: "Open Sea",
    author: "Frank Schroter",
    release_date: "2019-06-12",
    genre: ["Classical", "Ambient"],
    duration_in_seconds: 165,
    album: "Open Sea",
    logo: null,
    track_file: "",
    staredUser: [],
  },
  {
    _id: 3,
    name: "Sneaky Snitch",
    author: "Kevin Macleod",
    release_date: "2022-04-16",
    genre: ["Classical"],
    duration_in_seconds: 305,
    album: "Sneaky Snitch",
    logo: null,
    track_file: "",
    staredUser: [],
  },
  {
    _id: 4,
    name: "Another Track",
    author: "Frank Schroter",
    release_date: "2020-01-01",
    genre: ["Jazz"],
    duration_in_seconds: 180,
    album: "Another",
    logo: null,
    track_file: "",
    staredUser: [],
  },
];

describe("filterTracks", () => {
  it("should filter by search query (starts with)", () => {
    const result = filterTracks(mockTracks, "Ch", [], "", "default");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Chase");
  });

  it("should filter by single author", () => {
    const result = filterTracks(
      mockTracks,
      "",
      ["Frank Schroter"],
      "",
      "default"
    );
    expect(result).toHaveLength(2);
    expect(result.every((t) => t.author === "Frank Schroter")).toBe(true);
  });

  it("should filter by multiple authors", () => {
    const result = filterTracks(
      mockTracks,
      "",
      ["Frank Schroter", "Kevin Macleod"],
      "",
      "default"
    );
    expect(result).toHaveLength(3);
    expect(result.map((t) => t.author)).toEqual(
      expect.arrayContaining(["Frank Schroter", "Kevin Macleod"])
    );
  });

  it("should filter by genre", () => {
    const result = filterTracks(mockTracks, "", [], "Ambient", "default");
    expect(result).toHaveLength(1);
    expect(result[0].genre).toContain("Ambient");
  });

  it("should sort by newest", () => {
    const result = filterTracks(mockTracks, "", [], "", "newest");
    expect(result[0].release_date).toBe("2022-04-16");
  });

  it("should sort by oldest", () => {
    const result = filterTracks(mockTracks, "", [], "", "oldest");
    expect(result[0].release_date).toBe("2005-06-11");
  });

  it("should combine filters", () => {
    const result = filterTracks(mockTracks, "S", [], "Classical", "default");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Sneaky Snitch");
  });

  it("should combine search, multiple authors, genre, and sort", () => {
    const result = filterTracks(
      mockTracks,
      "O",
      ["Frank Schroter", "Kevin Macleod"],
      "Classical",
      "newest"
    );
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Open Sea");
  });

  it("should return empty array if no matches", () => {
    const result = filterTracks(mockTracks, "xyz", [], "", "default");
    expect(result).toHaveLength(0);
  });
});

describe("getUniqueAuthors", () => {
  it("should return unique authors", () => {
    const authors = getUniqueAuthors(mockTracks);
    expect(authors).toHaveLength(3);
    expect(authors).toContain("Alexander Nakarada");
    expect(authors).toContain("Frank Schroter");
    expect(authors).toContain("Kevin Macleod");
  });
});

describe("getUniqueGenres", () => {
  it("should return unique genres", () => {
    const genres = getUniqueGenres(mockTracks);
    expect(genres).toHaveLength(3);
    expect(genres).toContain("Classical");
    expect(genres).toContain("Ambient");
    expect(genres).toContain("Jazz");
  });
});

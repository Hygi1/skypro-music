import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "@/components/Centerblock/Filter/Filter";

const mockAuthors = ["Author1", "Author2", "Author3"];
const mockGenres = ["Genre1", "Genre2", "Genre3"];

const defaultProps = {
  authors: mockAuthors,
  genres: mockGenres,
  selectedAuthors: [],
  setSelectedAuthors: jest.fn(),
  selectedGenres: [],
  setSelectedGenres: jest.fn(),
  sortBy: "default",
  setSortBy: jest.fn(),
};

test("Filter toggles author dropdown on button click", () => {
  render(<Filter {...defaultProps} />);
  const button = screen.getByText("исполнителю");
  fireEvent.click(button);
  expect(screen.getByText("Author1")).toBeInTheDocument();
  expect(screen.getByText("Author2")).toBeInTheDocument();
  expect(screen.getByText("Author3")).toBeInTheDocument();
});

test("Filter toggles genre dropdown on button click", () => {
  render(<Filter {...defaultProps} />);
  const button = screen.getByText("жанру");
  fireEvent.click(button);
  expect(screen.getByText("Genre1")).toBeInTheDocument();
  expect(screen.getByText("Genre2")).toBeInTheDocument();
  expect(screen.getByText("Genre3")).toBeInTheDocument();
});

test("Filter toggles sort dropdown on button click", () => {
  render(<Filter {...defaultProps} />);
  const button = screen.getByText("сортировка");
  fireEvent.click(button);
  expect(screen.getByText("По умолчанию")).toBeInTheDocument();
  expect(screen.getByText("Сначала новые")).toBeInTheDocument();
  expect(screen.getByText("Сначала старые")).toBeInTheDocument();
});

test("Filter displays badge with count when authors selected", () => {
  const { rerender } = render(
    <Filter {...defaultProps} selectedAuthors={["Author1"]} />
  );
  expect(screen.getByText("1")).toBeInTheDocument();

  rerender(
    <Filter {...defaultProps} selectedAuthors={["Author1", "Author2"]} />
  );
  expect(screen.getByText("2")).toBeInTheDocument();
});

test("Filter displays badge with count when genres selected", () => {
  const { rerender } = render(
    <Filter {...defaultProps} selectedGenres={["Genre1"]} />
  );
  expect(screen.getByText("1")).toBeInTheDocument();

  rerender(<Filter {...defaultProps} selectedGenres={["Genre1", "Genre2"]} />);
  expect(screen.getByText("2")).toBeInTheDocument();
});

test("Filter does not show badges when no filters selected", () => {
  render(<Filter {...defaultProps} selectedAuthors={[]} selectedGenres={[]} />);
  expect(screen.queryByText("1")).not.toBeInTheDocument();
  expect(screen.queryByText("2")).not.toBeInTheDocument();
});

test("Filter calls setSelectedAuthors when clicking author in dropdown", () => {
  const setSelectedAuthors = jest.fn();
  render(
    <Filter
      {...defaultProps}
      setSelectedAuthors={setSelectedAuthors}
      selectedAuthors={[]}
    />
  );
  fireEvent.click(screen.getByText("исполнителю"));
  fireEvent.click(screen.getByText("Author1"));
  expect(setSelectedAuthors).toHaveBeenCalledWith(["Author1"]);
});

test("Filter calls setSelectedGenres when clicking genre in dropdown", () => {
  const setSelectedGenres = jest.fn();
  render(
    <Filter
      {...defaultProps}
      setSelectedGenres={setSelectedGenres}
      selectedGenres={[]}
    />
  );
  fireEvent.click(screen.getByText("жанру"));
  fireEvent.click(screen.getByText("Genre1"));
  expect(setSelectedGenres).toHaveBeenCalledWith(["Genre1"]);
});

test("Filter calls setSortBy when selecting sort option", () => {
  const setSortBy = jest.fn();
  render(<Filter {...defaultProps} setSortBy={setSortBy} sortBy="default" />);
  fireEvent.click(screen.getByText("сортировка"));
  fireEvent.click(screen.getByText("Сначала новые"));
  expect(setSortBy).toHaveBeenCalledWith("newest");
});

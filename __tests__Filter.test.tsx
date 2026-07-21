import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "@/components/Centerblock/Filter/Filter";

const mockAuthors = ["Author1", "Author2"];
const mockGenres = ["Genre1", "Genre2"];

test("Filter toggles dropdown on button click", () => {
  render(
    <Filter
      authors={mockAuthors}
      genres={mockGenres}
      selectedAuthor=""
      setSelectedAuthor={jest.fn()}
      selectedGenre=""
      setSelectedGenre={jest.fn()}
      sortBy="default"
      setSortBy={jest.fn()}
    />
  );
  const button = screen.getByText("исполнителю");
  fireEvent.click(button);
  expect(screen.getByText("Все исполнители")).toBeInTheDocument();
});
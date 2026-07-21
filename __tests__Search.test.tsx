import { render, screen, fireEvent } from "@testing-library/react";
import Search from "@/components/Centerblock/Search/Search";

test("Search calls setSearchQuery on input change", () => {
  const mockSetSearch = jest.fn();
  render(<Search searchQuery="" setSearchQuery={mockSetSearch} />);
  const input = screen.getByPlaceholderText("Поиск");
  fireEvent.change(input, { target: { value: "Chase" } });
  expect(mockSetSearch).toHaveBeenCalledWith("Chase");
});

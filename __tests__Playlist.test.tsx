import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Playlist from "@/components/Centerblock/Playlist";
import { Track } from "@/lib/types/api";
import playerReducer from "@/lib/store/playerSlice";
import authReducer from "@/lib/store/authSlice";

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
];

const createTestStore = () =>
  configureStore({
    reducer: {
      player: playerReducer,
      auth: authReducer,
    },
  });

test("Playlist renders tracks", () => {
  const store = createTestStore();
  render(
    <Provider store={store}>
      <Playlist tracks={mockTracks} />
    </Provider>
  );
  const trackTitle = screen.getByText("Chase", { selector: ".track__titleLink" });
  expect(trackTitle).toBeInTheDocument();
});
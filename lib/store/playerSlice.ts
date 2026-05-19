import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "@/lib/types";

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.5,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentTrack(state, action: PayloadAction<Track | null>) {
      state.currentTrack = action.payload;
      if (action.payload === null) {
        state.isPlaying = false;
        state.currentTime = 0;
        state.duration = 0;
      }
    },
    togglePlay(state) {
      state.isPlaying = !state.isPlaying;
    },
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
  },
});

export const {
  setCurrentTrack,
  togglePlay,
  setPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
} = playerSlice.actions;
export default playerSlice.reducer;

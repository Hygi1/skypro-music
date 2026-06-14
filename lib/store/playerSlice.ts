import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "@/lib/types";

interface PlayerState {
  playlist: Track[];
  currentTrackIndex: number | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  shuffle: boolean;
  repeat: boolean;
}

const initialState: PlayerState = {
  playlist: [],
  currentTrackIndex: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.5,
  shuffle: false,
  repeat: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlaylist(state, action: PayloadAction<Track[]>) {
      state.playlist = action.payload;
    },
    setCurrentTrack(
      state,
      action: PayloadAction<{ track: Track; index: number }>
    ) {
      state.currentTrackIndex = action.payload.index;
      state.currentTime = 0;
      state.duration = 0;
    },
    playNext(state) {
      if (state.playlist.length === 0) return;
      if (state.currentTrackIndex === null) {
        state.currentTrackIndex = 0;
      } else {
        if (state.repeat && state.currentTrackIndex !== null) {
          return;
        }
        if (state.shuffle) {
          let newIndex = state.currentTrackIndex;
          while (
            newIndex === state.currentTrackIndex &&
            state.playlist.length > 1
          ) {
            newIndex = Math.floor(Math.random() * state.playlist.length);
          }
          state.currentTrackIndex = newIndex;
        } else {
          if (state.currentTrackIndex + 1 < state.playlist.length) {
            state.currentTrackIndex++;
          } else {
            if (state.repeat) {
              state.currentTrackIndex = 0;
            } else {
              state.isPlaying = false;
              return;
            }
          }
        }
      }
      state.currentTime = 0;
      state.duration = 0;
    },
    playPrev(state) {
      if (state.playlist.length === 0) return;
      if (state.currentTrackIndex === null) {
        state.currentTrackIndex = 0;
      } else {
        if (state.shuffle) {
          let newIndex = state.currentTrackIndex;
          while (
            newIndex === state.currentTrackIndex &&
            state.playlist.length > 1
          ) {
            newIndex = Math.floor(Math.random() * state.playlist.length);
          }
          state.currentTrackIndex = newIndex;
        } else {
          if (state.currentTrackIndex - 1 >= 0) {
            state.currentTrackIndex--;
          } else {
            return;
          }
        }
      }
      state.currentTime = 0;
      state.duration = 0;
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
    toggleShuffle(state) {
      state.shuffle = !state.shuffle;
    },
    toggleRepeat(state) {
      state.repeat = !state.repeat;
    },
  },
});

export const {
  setPlaylist,
  setCurrentTrack,
  playNext,
  playPrev,
  togglePlay,
  setPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  toggleShuffle,
  toggleRepeat,
} = playerSlice.actions;

export default playerSlice.reducer;

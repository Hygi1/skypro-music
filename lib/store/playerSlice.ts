import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "@/lib/types";

interface PlayerState {
<<<<<<< HEAD
  playlist: Track[];
  currentTrackIndex: number | null;
=======
  currentTrack: Track | null;
>>>>>>> 4a7260e7f65b68f19691a130bc542dbd4f86e5e9
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
<<<<<<< HEAD
  shuffle: boolean;
  repeat: boolean;
}

const initialState: PlayerState = {
  playlist: [],
  currentTrackIndex: null,
=======
}

const initialState: PlayerState = {
  currentTrack: null,
>>>>>>> 4a7260e7f65b68f19691a130bc542dbd4f86e5e9
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.5,
<<<<<<< HEAD
  shuffle: false,
  repeat: false,
=======
>>>>>>> 4a7260e7f65b68f19691a130bc542dbd4f86e5e9
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
<<<<<<< HEAD
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
          // при зацикленном треке не переключаем на следующий
          return;
        }
        if (state.shuffle) {
          // случайный индекс, отличный от текущего
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
=======
    setCurrentTrack(state, action: PayloadAction<Track | null>) {
      state.currentTrack = action.payload;
      if (action.payload === null) {
        state.isPlaying = false;
        state.currentTime = 0;
        state.duration = 0;
      }
>>>>>>> 4a7260e7f65b68f19691a130bc542dbd4f86e5e9
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
<<<<<<< HEAD
    toggleShuffle(state) {
      state.shuffle = !state.shuffle;
    },
    toggleRepeat(state) {
      state.repeat = !state.repeat;
    },
=======
>>>>>>> 4a7260e7f65b68f19691a130bc542dbd4f86e5e9
  },
});

export const {
<<<<<<< HEAD
  setPlaylist,
  setCurrentTrack,
  playNext,
  playPrev,
=======
  setCurrentTrack,
>>>>>>> 4a7260e7f65b68f19691a130bc542dbd4f86e5e9
  togglePlay,
  setPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
<<<<<<< HEAD
  toggleShuffle,
  toggleRepeat,
} = playerSlice.actions;

=======
} = playerSlice.actions;
>>>>>>> 4a7260e7f65b68f19691a130bc542dbd4f86e5e9
export default playerSlice.reducer;

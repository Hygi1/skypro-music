export interface User {
  _id: number;
  email: string;
  username: string;
}

export interface Track {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  logo: string | null;
  track_file: string;
  staredUser: number[];
}

export interface Playlist {
  _id: number;
  name: string;
  description?: string;
  tracks: Track[];
}

export interface AuthResponse {
  refresh: string;
  access: string;
}

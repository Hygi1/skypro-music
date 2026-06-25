"use client";

import { useEffect, useState } from "react";
import { Track } from "@/lib/types/api";
import Playlist from "@/components/Centerblock/Playlist";
import styles from "./page.module.css";

const MOCK_SELECTIONS: Record<number, Track[]> = {
  1: [
    {
      _id: 101,
      name: "Mock Track 1",
      author: "Mock Artist",
      release_date: "2024-01-01",
      genre: ["Mock"],
      duration_in_seconds: 180,
      album: "Mock Album",
      logo: null,
      track_file:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      stared_user: [],
    },
    {
      _id: 102,
      name: "Mock Track 2",
      author: "Mock Artist 2",
      release_date: "2024-02-01",
      genre: ["Mock"],
      duration_in_seconds: 200,
      album: "Mock Album 2",
      logo: null,
      track_file:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      stared_user: [],
    },
  ],
  2: [
    {
      _id: 201,
      name: "Mock Track 3",
      author: "Mock Artist 3",
      release_date: "2024-03-01",
      genre: ["Mock"],
      duration_in_seconds: 150,
      album: "Mock Album 3",
      logo: null,
      track_file:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      stared_user: [],
    },
  ],
  3: [
    {
      _id: 301,
      name: "Mock Track 4",
      author: "Mock Artist 4",
      release_date: "2024-04-01",
      genre: ["Mock"],
      duration_in_seconds: 220,
      album: "Mock Album 4",
      logo: null,
      track_file:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      stared_user: [],
    },
  ],
};

export default function SelectionPage({ params }: { params: { id: string } }) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockTracks = MOCK_SELECTIONS[Number(params.id)];
    setTracks(mockTracks || []);
    setLoading(false);
  }, [params.id]);

  if (loading) return <div>Загрузка подборки...</div>;
  if (!tracks.length) return <div>Подборка не найдена</div>;

  return (
    <div className={styles.selection}>
      <h1 className={styles.title}>Подборка #{params.id}</h1>
      <Playlist tracks={tracks} />
    </div>
  );
}

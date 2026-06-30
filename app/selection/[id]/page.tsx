"use client";

import { useEffect, useState } from "react";
import { getSelectionById } from "@/lib/api/catalog";
import { Track } from "@/lib/types/api";
import Playlist from "@/components/Centerblock/Playlist";
import styles from "./page.module.css";

const MOCK_SELECTIONS: Record<number, Track[]> = {
  1: [
    {
      _id: 101,
      name: "Подборка 1 – Трек 1",
      author: "Artist 1",
      release_date: "2024-01-01",
      genre: ["Pop"],
      duration_in_seconds: 180,
      album: "Album 1",
      logo: null,
      track_file:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      stared_user: [],
    },
    {
      _id: 102,
      name: "Подборка 1 – Трек 2",
      author: "Artist 2",
      release_date: "2024-02-01",
      genre: ["Rock"],
      duration_in_seconds: 200,
      album: "Album 2",
      logo: null,
      track_file:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      stared_user: [],
    },
  ],
  2: [
    {
      _id: 201,
      name: "Подборка 2 – Трек 1",
      author: "Artist 3",
      release_date: "2024-03-01",
      genre: ["Jazz"],
      duration_in_seconds: 150,
      album: "Album 3",
      logo: null,
      track_file:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      stared_user: [],
    },
  ],
  3: [
    {
      _id: 301,
      name: "Подборка 3 – Трек 1",
      author: "Artist 4",
      release_date: "2024-04-01",
      genre: ["Electronic"],
      duration_in_seconds: 220,
      album: "Album 4",
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
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSelection = async () => {
      try {
        const data = await getSelectionById(Number(params.id));
        if (data?.tracks?.length) {
          setTracks(data.tracks);
        } else {
          const mock = MOCK_SELECTIONS[Number(params.id)];
          if (mock) {
            setTracks(mock);
            setError("API не вернул треки, показаны тестовые");
          } else {
            setError("Подборка не найдена");
          }
        }
      } catch (err: any) {
        console.error("Ошибка подборки:", err);
        const mock = MOCK_SELECTIONS[Number(params.id)];
        if (mock) {
          setTracks(mock);
          setError(err.message || "Ошибка API, показаны тестовые");
        } else {
          setError(err.message || "Не удалось загрузить подборку");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSelection();
  }, [params.id]);

  if (loading) return <div>Загрузка подборки...</div>;
  if (error && !tracks.length)
    return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.selection}>
      <h1 className={styles.title}>Подборка #{params.id}</h1>
      {error && <div className={styles.warning}>{error}</div>}
      <Playlist tracks={tracks} />
    </div>
  );
}

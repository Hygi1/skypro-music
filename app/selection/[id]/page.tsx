"use client";

import { useEffect, useState } from "react";
import { getSelectionById, getAllTracks } from "@/lib/api/catalog";
import { Track } from "@/lib/types/api";
import Playlist from "@/components/Centerblock/Playlist";
import styles from "./page.module.css";

export default function SelectionPage({ params }: { params: { id: string } }) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSelection = async () => {
      try {
        const selection = await getSelectionById(Number(params.id));
        if (!selection || !selection.items || !selection.items.length) {
          setError("Подборка не найдена или пуста");
          setLoading(false);
          return;
        }
        setTitle(selection.name || "Подборка");
        const allTracks = await getAllTracks();
        const filtered = allTracks.filter((track: Track) =>
          selection.items.includes(track._id)
        );
        setTracks(filtered);
      } catch (err: any) {
        setError(err.message || "Не удалось загрузить подборку");
      } finally {
        setLoading(false);
      }
    };
    fetchSelection();
  }, [params.id]);

  if (loading) return <div>Загрузка подборки...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.selection}>
      <h1 className={styles.title}>{title}</h1>
      <Playlist tracks={tracks} />
    </div>
  );
}

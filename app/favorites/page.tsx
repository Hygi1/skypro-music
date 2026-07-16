"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { getFavoriteTracks, removeFromFavorite } from "@/lib/api/catalog";
import { Track } from "@/lib/types/api";
import Playlist from "@/components/Centerblock/Playlist";
import styles from "./page.module.css";

export default function FavoritesPage() {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFavorites = useCallback(async () => {
    try {
      const data = await getFavoriteTracks();
      setTracks(data || []);
    } catch (err: any) {
      setError(err.message || "Не удалось загрузить избранное");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }
    fetchFavorites();
  }, [isAuthenticated, router, fetchFavorites]);

  const handleRemove = useCallback(async (trackId: number) => {
    try {
      await removeFromFavorite(trackId);
      setTracks((prev) => prev.filter((t) => t._id !== trackId));
    } catch (err: any) {
      alert(err.message || "Ошибка при удалении из избранного");
    }
  }, []);

  if (loading) return <div>Загрузка избранного...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

  return (
    <div className={styles.favorites}>
      <h1 className={styles.title}>Избранные треки</h1>
      {tracks.length === 0 ? (
        <p className={styles.empty}>У вас пока нет избранных треков</p>
      ) : (
        <Playlist tracks={tracks} />
      )}
    </div>
  );
}

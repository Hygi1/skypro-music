"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { getFavoriteTracks } from "@/lib/api/catalog";
import { Track } from "@/lib/types/api";
import Centerblock from "@/components/Centerblock/Centerblock";

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

  if (loading) return <div>Загрузка избранного...</div>;
  if (error)
    return <div style={{ color: "red", padding: "20px" }}>Ошибка: {error}</div>;

  return <Centerblock tracks={tracks} title="Избранные треки" />;
}

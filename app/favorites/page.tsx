"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Track } from "@/lib/types/api";
import Centerblock from "@/components/Centerblock/Centerblock";

export default function FavoritesPage() {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const reduxPlaylist = useSelector(
    (state: RootState) => state.player.playlist
  );
  const [favorites, setFavorites] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }
    if (reduxPlaylist && reduxPlaylist.length > 0 && userId) {
      const favs = reduxPlaylist.filter((track) =>
        track.staredUser?.includes(userId)
      );
      setFavorites(favs);
      setLoading(false);
    } else {
      const fetchFavorites = async () => {
        try {
          const response = await fetch(
            "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/favorite/all/",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
          const data = await response.json();
          setFavorites(data || []);
        } catch (err: any) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchFavorites();
    }
  }, [isAuthenticated, router, userId, reduxPlaylist]);

  useEffect(() => {
    if (reduxPlaylist && reduxPlaylist.length > 0 && userId) {
      const favs = reduxPlaylist.filter((track) =>
        track.staredUser?.includes(userId)
      );
      setFavorites(favs);
    }
  }, [reduxPlaylist, userId]);

  if (loading) return <div>Загрузка избранного...</div>;

  return <Centerblock tracks={favorites} title="Мои треки" />;
}

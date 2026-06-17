"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { setPlaylist } from "@/lib/store/playerSlice";
import { getAllTracks } from "@/lib/api/catalog";
import Search from "./Search/Search";
import Filter from "./Filter/Filter";
import Playlist from "./Playlist";
import styles from "./Centerblock.module.css";

export default function Centerblock() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      setError("Для просмотра треков войдите в аккаунт");
      return;
    }
    const fetchTracks = async () => {
      setLoading(true);
      setError(null);
      try {
        const tracks = await getAllTracks();
        dispatch(setPlaylist(tracks));
      } catch (err: any) {
        setError(err.message || "Не удалось загрузить треки");
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, [dispatch, isAuthenticated]);

  if (loading) return <div>Загрузка треков...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.h2}>Треки</h2>
      <Filter />
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          <div className={`${styles.playlistTitleCol} ${styles.col01}`}>
            Трек
          </div>
          <div className={`${styles.playlistTitleCol} ${styles.col02}`}>
            Исполнитель
          </div>
          <div className={`${styles.playlistTitleCol} ${styles.col03}`}>
            Альбом
          </div>
          <div className={`${styles.playlistTitleCol} ${styles.col04}`}>
            <svg className={styles.playlistTitleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch" />
            </svg>
          </div>
        </div>
        <Playlist />
      </div>
    </div>
  );
}

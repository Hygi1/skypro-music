"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { setPlaylist } from "@/lib/store/playerSlice";
import { getAllTracks } from "@/lib/api/catalog";
import { data as MOCK_TRACKS } from "@/lib/data";
import Search from "./Search/Search";
import Filter from "./Filter/Filter";
import Playlist from "./Playlist";
import styles from "./Centerblock.module.css";

export default function Centerblock() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tracksFromStore = useSelector(
    (state: RootState) => state.player.playlist
  );

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Запрос треков с API...");
        const tracks = await getAllTracks();
        console.log("Получено треков:", tracks?.length || 0);
        if (tracks && tracks.length > 0) {
          dispatch(setPlaylist(tracks));
        } else {
          console.warn("API вернул пустой массив, используем моковые данные");
          dispatch(setPlaylist(MOCK_TRACKS));
        }
      } catch (err: any) {
        console.error("Ошибка загрузки треков:", err);
        setError("Не удалось загрузить треки, используются локальные данные");
        // При ошибке – используем моковые данные, чтобы не было пусто
        dispatch(setPlaylist(MOCK_TRACKS));
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, [dispatch]);

  if (loading) return <div>Загрузка треков...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  if (!tracksFromStore || tracksFromStore.length === 0) {
    return <div>Нет доступных треков</div>;
  }

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
              <use href="/img/icon/sprite.svg#icon-watch" />
            </svg>
          </div>
        </div>
        <Playlist />
      </div>
    </div>
  );
}

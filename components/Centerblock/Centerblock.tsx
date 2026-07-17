"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPlaylist } from "@/lib/store/playerSlice";
import { getAllTracks } from "@/lib/api/catalog";
import { data as MOCK_TRACKS } from "@/lib/data";
import Search from "./Search/Search";
import Filter from "./Filter/Filter";
import Playlist from "./Playlist";
import styles from "./Centerblock.module.css";
import { Track } from "@/lib/types/api";

interface CenterblockProps {
  tracks?: Track[];
  title?: string;
}

export default function Centerblock({
  tracks: propTracks,
  title,
}: CenterblockProps) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (propTracks && Array.isArray(propTracks)) {
      dispatch(setPlaylist(propTracks));
      setLoading(false);
      return;
    }

    const fetchTracks = async () => {
      setLoading(true);
      setError(null);
      try {
        const tracks = await getAllTracks();
        if (tracks && tracks.length > 0) {
          dispatch(setPlaylist(tracks));
        } else {
          dispatch(setPlaylist(MOCK_TRACKS));
          setError("Сервер вернул пустой список, показаны локальные треки");
        }
      } catch (err: any) {
        dispatch(setPlaylist(MOCK_TRACKS));
        setError(
          err.message || "Не удалось загрузить треки, показаны локальные"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, [dispatch, propTracks]);

  if (loading) return <div>Загрузка треков...</div>;

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.h2}>{title || "Треки"}</h2>
      {error && <div className={styles.error}>{error}</div>}
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

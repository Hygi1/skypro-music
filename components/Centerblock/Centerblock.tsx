"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPlaylist } from "@/lib/store/playerSlice";
import { data as MOCK_TRACKS } from "@/lib/data";
import Search from "./Search/Search";
import Filter from "./Filter/Filter";
import Playlist from "./Playlist";
import styles from "./Centerblock.module.css";

export default function Centerblock() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlaylist(MOCK_TRACKS));
  }, [dispatch]);

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

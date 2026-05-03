"use client";

import { data } from "@/lib/data";
import Link from "next/link";
import styles from "./Playlist.module.css";

type Track = {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  logo: string | null;
  track_file: string;
  stared_user: string[];
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export default function Playlist() {
  return (
    <div className={styles.playlist}>
      {data.map((track: Track) => (
        <div key={track._id} className={styles.playlist__item}>
          <div className={styles.playlist__track}>
            <div className={styles.track__title}>
              <div className={styles.track__titleImage}>
                <svg className={styles.track__titleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                </svg>
              </div>
              <div className={styles.track__titleText}>
                <Link href="#" className={styles.track__titleLink}>
                  {track.name}
                </Link>
              </div>
            </div>
            <div className={styles.track__author}>
              <Link href="#" className={styles.track__authorLink}>
                {track.author}
              </Link>
            </div>
            <div className={styles.track__album}>
              <Link href="#" className={styles.track__albumLink}>
                {track.album}
              </Link>
            </div>
            <div className={styles.track__time}>
              <svg className={styles.track__timeSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
              </svg>
              <span className={styles.track__timeText}>
                {formatTime(track.duration_in_seconds)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

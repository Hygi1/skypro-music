"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { setCurrentTrack, setPlaying } from "@/lib/store/playerSlice";
import { data } from "@/lib/data";
import Link from "next/link";
import styles from "./Playlist.module.css";
import cn from "classnames";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export default function Playlist() {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useSelector(
    (state: RootState) => state.player
  );

  const handleTrackClick = (track: (typeof data)[0]) => {
    if (currentTrack?._id === track._id) {
      dispatch(setPlaying(!isPlaying));
    } else {
      dispatch(setCurrentTrack(track));
      dispatch(setPlaying(true));
    }
  };

  return (
    <div className={styles.playlist}>
      {data.map((track) => {
        const isCurrent = currentTrack?._id === track._id;
        return (
          <div
            key={track._id}
            className={cn(styles.playlist__item, {
              [styles.playing]: isCurrent && isPlaying,
            })}
            onClick={() => handleTrackClick(track)}
          >
            <div className={styles.playlist__track}>
              <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                  {isCurrent && isPlaying ? (
                    <div className={styles.pulsingDot}></div>
                  ) : (
                    <svg className={styles.track__titleSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-note" />
                    </svg>
                  )}
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
                  <use xlinkHref="/img/icon/sprite.svg#icon-like" />
                </svg>
                <span className={styles.track__timeText}>
                  {formatTime(track.duration_in_seconds)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

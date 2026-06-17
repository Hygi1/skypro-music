"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import {
  setPlaylist,
  setCurrentTrack,
  setPlaying,
} from "@/lib/store/playerSlice";
import { Track } from "@/lib/types/api";
import Link from "next/link";
import styles from "./Playlist.module.css";
import cn from "classnames";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

interface PlaylistProps {
  tracks?: Track[];
}

export default function Playlist({ tracks: propTracks }: PlaylistProps) {
  const dispatch = useDispatch();
  const reduxPlaylist = useSelector(
    (state: RootState) => state.player.playlist
  );
  const { currentTrackIndex, isPlaying } = useSelector(
    (state: RootState) => state.player
  );
  const playlist = propTracks ?? reduxPlaylist;
  const currentTrack =
    currentTrackIndex !== null ? playlist[currentTrackIndex] : null;

  const handleTrackClick = (index: number) => {
    if (!playlist.length) return;
    if (propTracks) dispatch(setPlaylist(propTracks));
    dispatch(setCurrentTrack({ track: playlist[index], index }));
    dispatch(setPlaying(true));
  };

  if (!playlist.length) return <div>Нет треков</div>;

  return (
    <div className={styles.playlist}>
      {playlist.map((track, idx) => {
        const isCurrent =
          currentTrackIndex === idx && currentTrack?._id === track._id;
        return (
          <div
            key={track._id}
            className={cn(styles.playlist__item, {
              [styles.playing]: isCurrent && isPlaying,
            })}
            onClick={() => handleTrackClick(idx)}
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

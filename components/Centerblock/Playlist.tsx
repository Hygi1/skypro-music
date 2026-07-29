"use client";

import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import {
  setPlaylist,
  setCurrentTrack,
  setPlaying,
} from "@/lib/store/playerSlice";
import { addToFavorite, removeFromFavorite } from "@/lib/api/catalog";
import { Track } from "@/lib/types/api";
import Link from "next/link";
import styles from "./Playlist.module.css";
import cn from "classnames";
import { showWarning, showError } from "@/lib/toast";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

interface PlaylistProps {
  tracks: Track[];
}

export default function Playlist({ tracks: propTracks }: PlaylistProps) {
  const dispatch = useDispatch();
  const reduxPlaylist = useSelector(
    (state: RootState) => state.player.playlist
  );
  const { currentTrackIndex, isPlaying } = useSelector(
    (state: RootState) => state.player
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userId = useSelector((state: RootState) => state.auth.user?._id);

  const playlist = propTracks ?? reduxPlaylist;
  const currentTrack =
    currentTrackIndex !== null ? playlist[currentTrackIndex] : null;

  if (!Array.isArray(playlist)) {
    return <div>Нет треков</div>;
  }

  const isTrackLiked = useCallback(
    (track: Track) => {
      if (!userId) return false;
      return track.staredUser?.includes(userId) ?? false;
    },
    [userId]
  );

  const handleLike = useCallback(
    async (track: Track, e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isAuthenticated) {
        showWarning("Войдите, чтобы ставить лайки");
        return;
      }
      try {
        const liked = isTrackLiked(track);
        if (liked) {
          await removeFromFavorite(track._id);
          const updatedTrack = {
            ...track,
            staredUser: track.staredUser?.filter((id) => id !== userId) ?? [],
          };
          const updatedPlaylist = playlist.map((t) =>
            t._id === track._id ? updatedTrack : t
          );
          dispatch(setPlaylist(updatedPlaylist));
        } else {
          await addToFavorite(track._id);
          const updatedTrack = {
            ...track,
            staredUser: [...(track.staredUser ?? []), userId!],
          };
          const updatedPlaylist = playlist.map((t) =>
            t._id === track._id ? updatedTrack : t
          );
          dispatch(setPlaylist(updatedPlaylist));
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Ошибка при изменении лайка";
        showError(message);
      }
    },
    [isAuthenticated, userId, playlist, dispatch, isTrackLiked]
  );

  const handleTrackClick = useCallback(
    (index: number) => {
      if (!playlist.length) return;
      dispatch(setCurrentTrack({ track: playlist[index], index }));
      dispatch(setPlaying(true));
    },
    [playlist, dispatch]
  );

  const renderedTracks = useMemo(() => {
    return playlist.map((track, idx) => {
      const isCurrent =
        currentTrackIndex === idx && currentTrack?._id === track._id;
      const liked = isTrackLiked(track);
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
                    <use href="/img/icon/sprite.svg#icon-note" />
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
              <button
                onClick={(e) => handleLike(track, e)}
                className={styles.likeButton}
                aria-label={liked ? "Убрать лайк" : "Поставить лайк"}
              >
                <svg
                  className={cn(styles.track__timeSvg, {
                    [styles.liked]: liked,
                  })}
                  viewBox="0 0 14 12"
                >
                  <use href="/img/icon/sprite.svg#icon-like" />
                </svg>
              </button>
              <span className={styles.track__timeText}>
                {formatTime(track.duration_in_seconds)}
              </span>
            </div>
          </div>
        </div>
      );
    });
  }, [
    playlist,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    isTrackLiked,
    handleTrackClick,
    handleLike,
  ]);

  if (!playlist.length) return <div>Нет треков</div>;

  return <div className={styles.playlist}>{renderedTracks}</div>;
}

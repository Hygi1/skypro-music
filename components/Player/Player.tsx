"use client";

import { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import {
  setCurrentTime,
  setDuration,
  setPlaying,
  setVolume,
  playNext,
  playPrev,
  togglePlay,
  toggleShuffle,
  toggleRepeat,
  setPlaylist,
} from "@/lib/store/playerSlice";
import { addToFavorite, removeFromFavorite } from "@/lib/api/catalog";
import styles from "./Player.module.css";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";

export default function Player() {
  const dispatch = useDispatch();
  const {
    playlist,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    shuffle,
    repeat,
  } = useSelector((state: RootState) => state.player);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userId = useSelector((state: RootState) => state.auth.user?._id);

  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack =
    currentTrackIndex !== null ? playlist[currentTrackIndex] : null;

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.error("Play error:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current)
      dispatch(setCurrentTime(audioRef.current.currentTime));
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) dispatch(setDuration(audioRef.current.duration));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      dispatch(setCurrentTime(time));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    dispatch(setVolume(vol));
    if (audioRef.current) audioRef.current.volume = vol;
  };

  const handleEnded = () => {
    if (repeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current
          .play()
          .catch((e) => console.error("Repeat play error:", e));
        dispatch(setCurrentTime(0));
      }
    } else {
      dispatch(playNext());
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const isTrackLiked = useCallback(() => {
    if (!userId || !currentTrack) return false;
    return currentTrack.staredUser?.includes(userId) ?? false;
  }, [userId, currentTrack]);

  const handleLike = useCallback(async () => {
    if (!isAuthenticated || !currentTrack) {
      alert("Войдите, чтобы ставить лайки");
      return;
    }
    try {
      const liked = isTrackLiked();
      if (liked) {
        await removeFromFavorite(currentTrack._id);
        const updatedTrack = {
          ...currentTrack,
          staredUser:
            currentTrack.staredUser?.filter((id) => id !== userId) ?? [],
        };
        const updatedPlaylist = playlist.map((t) =>
          t._id === currentTrack._id ? updatedTrack : t
        );
        dispatch(setPlaylist(updatedPlaylist));
      } else {
        await addToFavorite(currentTrack._id);
        const updatedTrack = {
          ...currentTrack,
          staredUser: [...(currentTrack.staredUser ?? []), userId!],
        };
        const updatedPlaylist = playlist.map((t) =>
          t._id === currentTrack._id ? updatedTrack : t
        );
        dispatch(setPlaylist(updatedPlaylist));
      }
    } catch (err: any) {
      alert(err.message || "Ошибка при изменении лайка");
    }
  }, [isAuthenticated, currentTrack, userId, playlist, dispatch, isTrackLiked]);

  const coverSrc =
    typeof currentTrack?.logo === "string" &&
    currentTrack.logo.startsWith("http")
      ? currentTrack.logo
      : null;

  if (!currentTrack) {
    return (
      <div className={styles.bar}>
        <div className={styles.barContent}>
          <div className={styles.barPlayerProgress}></div>
          <div className={styles.barPlayerBlock}>
            <div className={styles.barPlayer}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        src={currentTrack.track_file}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={(e) => console.error("Audio error:", e)}
      />
      <div className={styles.barContent}>
        <div className={styles.barPlayerProgress}>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className={styles.progressLine}
            aria-label="Прогресс трека"
          />
          <div className={styles.timeInfo}>
            <span>{formatTime(currentTime)}</span> /{" "}
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <button
                className={styles.playerBtnPrev}
                onClick={() => dispatch(playPrev())}
                aria-label="Предыдущий трек"
              >
                <svg className={styles.playerBtnPrevSvg} viewBox="0 0 15 14">
                  <use href="/img/icon/sprite.svg#icon-prev" />
                </svg>
              </button>
              <button
                className={styles.playerBtnPlay}
                onClick={() => dispatch(togglePlay())}
                aria-label="Воспроизведение/Пауза"
              >
                {isPlaying ? (
                  <svg className={styles.playerBtnPlaySvg} viewBox="0 0 16 20">
                    <use href="/img/icon/sprite.svg#icon-pause" />
                  </svg>
                ) : (
                  <svg className={styles.playerBtnPlaySvg} viewBox="0 0 22 20">
                    <use href="/img/icon/sprite.svg#icon-play" />
                  </svg>
                )}
              </button>
              <button
                className={styles.playerBtnNext}
                onClick={() => dispatch(playNext())}
                aria-label="Следующий трек"
              >
                <svg className={styles.playerBtnNextSvg} viewBox="0 0 15 14">
                  <use href="/img/icon/sprite.svg#icon-next" />
                </svg>
              </button>
              <button
                className={cn(styles.playerBtnRepeat, {
                  [styles.activeButton]: repeat,
                })}
                onClick={() => dispatch(toggleRepeat())}
                aria-label="Повтор"
              >
                <svg className={styles.playerBtnRepeatSvg} viewBox="0 0 18 12">
                  <use href="/img/icon/sprite.svg#icon-repeat" />
                </svg>
              </button>
              <button
                className={cn(styles.playerBtnShuffle, {
                  [styles.activeButton]: shuffle,
                })}
                onClick={() => dispatch(toggleShuffle())}
                aria-label="Перемешивание"
              >
                <svg className={styles.playerBtnShuffleSvg} viewBox="0 0 19 12">
                  <use href="/img/icon/sprite.svg#icon-shuffle" />
                </svg>
              </button>
            </div>

            <div className={styles.playerTrackPlay}>
              <div className={styles.trackPlayContain}>
                <div className={styles.trackPlayImage}>
                  {coverSrc ? (
                    <Image src={coverSrc} alt="track" width={51} height={51} />
                  ) : (
                    <svg className={styles.trackPlaySvg} viewBox="0 0 18 17">
                      <use href="/img/icon/sprite.svg#icon-note" />
                    </svg>
                  )}
                </div>
                <div className={styles.trackPlayAuthor}>
                  <Link href="#" className={styles.trackPlayAuthorLink}>
                    {currentTrack.name}
                  </Link>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <Link href="#" className={styles.trackPlayAlbumLink}>
                    {currentTrack.author}
                  </Link>
                </div>
              </div>
              <div className={styles.trackPlayLikeDis}>
                <button
                  onClick={handleLike}
                  className={styles.likeButton}
                  aria-label={isTrackLiked() ? "Убрать лайк" : "Поставить лайк"}
                >
                  <svg
                    className={cn(styles.trackPlayLikeSvg, {
                      [styles.liked]: isTrackLiked(),
                    })}
                    viewBox="0 0 14 12"
                  >
                    <use href="/img/icon/sprite.svg#icon-like" />
                  </svg>
                </button>
                <div className={styles.trackPlayDislike}>
                  <svg
                    className={styles.trackPlayDislikeSvg}
                    viewBox="0 0 14 12"
                  >
                    <use href="/img/icon/sprite.svg#icon-dislike" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.barVolumeBlock}>
            <div className={styles.volumeContent}>
              <div className={styles.volumeImage}>
                <svg className={styles.volumeSvg} viewBox="0 0 13 18">
                  <use href="/img/icon/sprite.svg#icon-volume" />
                </svg>
              </div>
              <div className={styles.volumeProgress}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className={styles.volumeProgressLine}
                  aria-label="Громкость"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

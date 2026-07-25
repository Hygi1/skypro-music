"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { setPlaylist } from "@/lib/store/playerSlice";
import { getAllTracks } from "@/lib/api/catalog";
import { data as MOCK_TRACKS } from "@/lib/data";
import Search from "./Search/Search";
import Filter from "./Filter/Filter";
import Playlist from "./Playlist";
import styles from "./Centerblock.module.css";
import { Track } from "@/lib/types/api";
import { filterTracks, getUniqueAuthors, getUniqueGenres } from "@/lib/filters";
import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";
import { showError } from "@/lib/toast";

interface CenterblockProps {
  tracks?: Track[];
  title?: string;
}

export default function Centerblock({
  tracks: propTracks,
  title,
}: CenterblockProps) {
  const dispatch = useDispatch();
  const reduxPlaylist = useSelector(
    (state: RootState) => state.player.playlist
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("default");

  const loadTracks = async (tracksFromProp?: Track[]) => {
    setLoading(true);
    setError(null);
    setIsNotFound(false);

    try {
      let tracks: Track[];

      if (tracksFromProp && Array.isArray(tracksFromProp)) {
        tracks = tracksFromProp;
      } else {
        tracks = await getAllTracks();
      }

      if (!tracks || tracks.length === 0) {
        if (!tracksFromProp) {
          dispatch(setPlaylist(MOCK_TRACKS));
          setError("Сервер вернул пустой список, показаны локальные треки");
          showError("Сервер вернул пустой список");
        } else {
          setIsNotFound(true);
        }
        return;
      }

      dispatch(setPlaylist(tracks));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Неизвестная ошибка";
      setError(`Не удалось загрузить треки: ${message}`);
      showError(message);

      dispatch(setPlaylist(MOCK_TRACKS));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (propTracks) {
      loadTracks(propTracks);
      return;
    }
    loadTracks();
  }, [dispatch, propTracks]);

  const allTracks = propTracks ?? reduxPlaylist ?? [];
  const authors = useMemo(() => getUniqueAuthors(allTracks), [allTracks]);
  const genres = useMemo(() => getUniqueGenres(allTracks), [allTracks]);

  const filteredTracks = useMemo(() => {
    return filterTracks(
      allTracks,
      searchQuery,
      selectedAuthors,
      selectedGenres,
      sortBy
    );
  }, [allTracks, searchQuery, selectedAuthors, selectedGenres, sortBy]);

  if (loading) return <div>Загрузка треков...</div>;

  if (isNotFound) {
    return <ErrorDisplay type="not-found" />;
  }

  if (error && !propTracks) {
    return (
      <ErrorDisplay type="error" message={error} onRetry={() => loadTracks()} />
    );
  }

  return (
    <div className={styles.centerblock}>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <h2 className={styles.h2}>{title || "Треки"}</h2>

      {error && <div className={styles.error}>{error}</div>}
      <Filter
        authors={authors}
        genres={genres}
        selectedAuthors={selectedAuthors}
        setSelectedAuthors={setSelectedAuthors}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
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
        {filteredTracks.length === 0 ? (
          <div className={styles.noTracks}>Нет подходящих треков</div>
        ) : (
          <Playlist tracks={filteredTracks} />
        )}
      </div>
    </div>
  );
}

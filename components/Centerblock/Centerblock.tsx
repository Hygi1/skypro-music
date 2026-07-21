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

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("default");

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

  const allTracks = propTracks ?? reduxPlaylist;
  const authors = useMemo(() => getUniqueAuthors(allTracks), [allTracks]);
  const genres = useMemo(() => getUniqueGenres(allTracks), [allTracks]);

  const filteredTracks = useMemo(() => {
    return filterTracks(
      allTracks,
      searchQuery,
      selectedAuthor,
      selectedGenre,
      sortBy
    );
  }, [allTracks, searchQuery, selectedAuthor, selectedGenre, sortBy]);

  if (loading) return <div>Загрузка треков...</div>;

  return (
    <div className={styles.centerblock}>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <h2 className={styles.h2}>{title || "Треки"}</h2>
      {error && <div className={styles.error}>{error}</div>}
      <Filter
        authors={authors}
        genres={genres}
        selectedAuthor={selectedAuthor}
        setSelectedAuthor={setSelectedAuthor}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
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

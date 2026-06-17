"use client";

import { useEffect, useState } from "react";
import { getSelectionById } from "@/lib/api/catalog";
import { Track } from "@/lib/types/api";
import Playlist from "@/components/Centerblock/Playlist";

export default function SelectionPage({ params }: { params: { id: string } }) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSelection = async () => {
      try {
        const data = await getSelectionById(Number(params.id));
        setTracks(data.tracks);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSelection();
  }, [params.id]);

  if (loading) return <div>Загрузка подборки...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return <Playlist tracks={tracks} />;
}

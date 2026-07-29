"use client";

import { useEffect, useState } from "react";
import { getSelectionById, getAllTracks } from "@/lib/api/catalog";
import { Track } from "@/lib/types/api";
import Centerblock from "@/components/Centerblock/Centerblock";

const MOCK_SELECTIONS: Record<number, { name: string; items: number[] }> = {
  1: { name: "Плейлист дня", items: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
  2: { name: "100 танцевальных хитов", items: [1, 2, 3, 4, 5, 6, 7] },
  3: { name: "Инди-заряд", items: [18, 19, 20, 21, 22, 23, 24] },
};

export default function SelectionPage({ params }: { params: { id: string } }) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const title = MOCK_SELECTIONS[Number(params.id)]?.name || "Подборка";

  useEffect(() => {
    const fetchSelection = async () => {
      try {
        const selection = await getSelectionById(Number(params.id));
        if (selection && selection.items && selection.items.length > 0) {
          const allTracks = await getAllTracks();
          const filtered = allTracks.filter((track: Track) =>
            selection.items.includes(track._id)
          );
          setTracks(filtered);
        } else {
          const mock = MOCK_SELECTIONS[Number(params.id)];
          if (mock) {
            const allTracks = await getAllTracks();
            const filtered = allTracks.filter((track: Track) =>
              mock.items.includes(track._id)
            );
            setTracks(filtered);
          } else {
            setError("Подборка не найдена");
          }
        }
      } catch (err: any) {
        const mock = MOCK_SELECTIONS[Number(params.id)];
        if (mock) {
          const allTracks = await getAllTracks();
          const filtered = allTracks.filter((track: Track) =>
            mock.items.includes(track._id)
          );
          setTracks(filtered);
        } else {
          setError(err.message || "Не удалось загрузить подборку");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSelection();
  }, [params.id]);

  if (loading) return <div>Загрузка подборки...</div>;
  if (error)
    return <div style={{ color: "red", padding: "20px" }}>Ошибка: {error}</div>;

  return <Centerblock tracks={tracks} title={title} />;
}

import api from "./client";

export const getAllTracks = async () => {
  const response = await api.get("/catalog/track/all/");
  if (response && response.data && Array.isArray(response.data)) {
    return response.data;
  }
  if (Array.isArray(response)) {
    return response;
  }
  console.warn("Неизвестный формат ответа треков:", response);
  return [];
};

export const getTrackById = (id: number) => api.get(`/catalog/track/${id}/`);

export const getFavoriteTracks = () => api.get("/catalog/track/favorite/all/");

export const addToFavorite = (id: number) =>
  api.post(`/catalog/track/${id}/favorite/`, {});

export const removeFromFavorite = (id: number) =>
  api.delete(`/catalog/track/${id}/favorite/`);

export const getAllSelections = () => api.get("/catalog/selection/all");

export const getSelectionById = async (id: number) => {
  const response = await api.get(`/catalog/selection/${id}/`);
  if (response && response.data) {
    return response.data;
  }
  return null;
};

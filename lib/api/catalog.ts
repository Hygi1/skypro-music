import api from "./client";

export const getAllTracks = () => api.get("/catalog/track/all/");
export const getTrackById = (id: number) => api.get(`/catalog/track/${id}/`);
export const getFavoriteTracks = () => api.get("/catalog/track/favorite/all/");
export const addToFavorite = (id: number) =>
  api.post(`/catalog/track/${id}/favorite/`, {});
export const removeFromFavorite = (id: number) =>
  api.delete(`/catalog/track/${id}/favorite/`);
export const getAllSelections = () => api.get("/catalog/selection/all");
export const getSelectionById = (id: number) =>
  api.get(`/catalog/selection/${id}/`);

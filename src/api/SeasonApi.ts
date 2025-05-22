// src/api/SeasonApi.ts
import { apiClient } from './axios';

export interface SeasonResponse {
  id: number;
  name: string;
}

export const fetchAllSeasons = async () => {
  const res = await apiClient.get<SeasonResponse[]>('/seasons');
  return res.data;
};

export const createSeason = async (name: string) => {
  const res = await apiClient.post<SeasonResponse>('/seasons', { name });
  return res.data;
};

export const updateSeason = async (id: number, name: string) => {
  const res = await apiClient.put<SeasonResponse>('/seasons', { id, name });
  return res.data;
};

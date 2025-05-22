// src/api/SinPropertyApi.ts
import { apiClient } from './axios';

export interface SinPropertyResponse {
  id: number;
  name: string;
}

export const fetchAllSinProperties = async () => {
  const res = await apiClient.get<SinPropertyResponse[]>('/sin-property');
  return res.data;
};

export const createSinProperty = async (name: string) => {
  const res = await apiClient.post<SinPropertyResponse>('/sin-property', { name });
  return res.data;
};

export const updateSinProperty = async (id: number, name: string) => {
  const res = await apiClient.put<SinPropertyResponse>('/sin-property', { id, name });
  return res.data;
};

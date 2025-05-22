// src/api/TraitApi.ts
import { apiClient } from './axios';

export interface TraitResponse {
  id: number;
  name: string;
}

export const fetchAllTraits = async () => {
  const res = await apiClient.get<TraitResponse[]>('/traits');
  return res.data;
};

export const createTrait = async (traitName: string) => {
    const res = await apiClient.post<TraitResponse>('/traits', { traitName });
    return res.data;
  };

export const updateTrait = async (id: number, traitName: string) => {
  const res = await apiClient.put<TraitResponse>('/traits', {
    id,
    traitName,
  });
  return res.data;
};

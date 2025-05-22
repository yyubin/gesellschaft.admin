// src/api/KeywordApi.ts
import { apiClient } from './axios';

export interface KeywordResponse {
  id: number;
  name: string;
}

export const fetchAllKeywords = async () => {
  const res = await apiClient.get<KeywordResponse[]>('/keywords');
  return res.data;
};

export const createKeyword = async (keywordName: string) => {
    const res = await apiClient.post<KeywordResponse>('/keywords', { keywordName });
    return res.data;
  };

export const updateKeyword = async (id: number, keywordName: string) => {
  const res = await apiClient.put<KeywordResponse>('/keywords', {
    id,
    keywordName,
  });
  return res.data;
};

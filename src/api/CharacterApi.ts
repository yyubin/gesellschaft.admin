import { apiClient } from './axios';

export interface GameCharacter {
  id: number;
  name: string;
  nameKo: string;
}

export const getAllCharacters = async (): Promise<GameCharacter[]> => {
  const res = await apiClient.get<GameCharacter[]>('/characters');
  return res.data;
};

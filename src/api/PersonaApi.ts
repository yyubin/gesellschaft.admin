// src/api/PersonaApi.ts
import { apiClient } from './axios';

export interface PersonaSummary {
    id: number;
    name: string;
    characterName: {
      id: number;
      name: string;
      nameKo: string;
    };
    rarity: number;
    health: number;
    mental: number;
    season: string;
    releaseDate: string;
}

export interface PersonaResponse {
    content: PersonaSummary[];
    totalPages: number;
    totalElements: number;
}

export const getPersonas = async (page: number, size: number): Promise<PersonaResponse> => {
    const res = await apiClient.get('/personas', { params: { page, size } });
    return res.data;
};

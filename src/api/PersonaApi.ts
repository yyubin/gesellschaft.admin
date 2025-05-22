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

export interface PersonaDetail {
    id: number;
    name: string;
    rarity: number;
    health: number;
    minSpeed: number;
    maxSpeed: number;
    guardLevel: number;
    season: string;
    releaseDate: string;
    mental: number;
  
    character: {
      id: number;
      name: string;
      nameKo: string;
    };
  
    resistance: {
      attack: string;
      penetration: string;
      batting: string;
    };
  
    traits: {
      id: number;
      name: string;
    }[];

    disturbed: {
      disturbed1: number | null;
      disturbed2: number | null;
      disturbed3: number | null;
    };
  
    activeSkills: {
      id: number;
      syncLevel: number;
      skillIndex: string;
      skillName: string;
      attackType: string;
      sinProperty: {
        id: number;
        name: string;
      };
      quantity: number;
      damageSpec: {
        basePower: number;
        coinPower: number;
        coinCount: number;
        weight: number;
      };
      attackLevel: number;

      
    }[];
}

export interface PersonaUpdatePayload {
  id: number
  characterId: number;
  name: string;
  rarity: number;
  health: number;
  mental: number;
  minSpeed: number;
  maxSpeed: number;
  guardLevel: number;
  seasonId: number;
  releaseDate: string;

  resistance: {
    attack: string;
    penetration: string;
    batting: string;
  };

  disturbed: {
    disturbed1: number | null;
    disturbed2: number | null;
    disturbed3: number | null;
  };

  traitIds: number[];
}

export interface PersonaCreateRequest {
  characterId: number;
  name: string;
  rarity: number;
  health: number;
  mental: number;
  minSpeed: number;
  maxSpeed: number;
  guardLevel: number;
  seasonId: number;
  releaseDate: string; // ISO 문자열

  resistance: {
    attack: string;
    penetration: string;
    batting: string;
  };

  disturbed: {
    disturbed1: number | null;
    disturbed2: number | null;
    disturbed3: number | null;
  };

  traitIds: number[];
}

export const updatePersona = async (id: number, payload: PersonaUpdatePayload) => {
  await apiClient.put(`/personas/${id}`, payload);
};

export const createPersona = async (request: PersonaCreateRequest) => {
  await apiClient.post('/personas', request);
};


export interface PersonaResponse {
    content: PersonaSummary[];
    totalPages: number;
    totalElements: number;
}

export const getPersonas = async (page: number, size: number): Promise<PersonaResponse> => {
    const res = await apiClient.get('/personas', { params: { page, size } });
    return res.data;
};

export const getPersonaDetail = async (id: number): Promise<PersonaDetail> => {
    const res = await apiClient.get(`/personas/${id}`);
    return res.data;
};
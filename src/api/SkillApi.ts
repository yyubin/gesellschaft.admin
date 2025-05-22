// src/api/SkillApi.ts
import { apiClient } from './axios';

export interface ActiveSkillDto {
  id: number;
  syncLevel: number;
  skillIndex: string;
  skillName: string;
  attackType: string;
  sinPropertyName: string;
  quantity: number;
  attackLevel: number;
  damageSpec: {
    basePower: number;
    coinPower: number;
    coinCount: number;
    weight: number;
  };
}

export interface ActiveSkillCreateRequest {
  personaId: number;
  syncLevel: number;
  skillIndex: string;
  skillName: string;
  attackType: string;
  sinPropertyId: number;
  quantity: number;
  attackLevel: number;
  damageSpec: {
    basePower: number;
    coinPower: number;
    coinCount: number;
    weight: number;
  };
}

export interface ActiveSkillUpdateRequest extends ActiveSkillCreateRequest {
  id: number;
}

export const fetchSkillsByPersona = async (personaId: number): Promise<ActiveSkillDto[]> => {
  const res = await apiClient.get(`/skills/${personaId}`);
  return res.data;
};

export const createSkill = async (request: ActiveSkillCreateRequest): Promise<ActiveSkillDto> => {
  const res = await apiClient.post(`/skills/${request.personaId}`, request);
  return res.data;
};

export const updateSkill = async (request: ActiveSkillUpdateRequest): Promise<ActiveSkillDto> => {
  const res = await apiClient.put(`/skills/${request.id}`, request);
  return res.data;
};
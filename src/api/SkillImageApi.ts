// src/api/SkillImageApi.ts
import { apiClient } from './axios';

export interface SkillImageResponse {
  id: number;
  persona: { id: number; name: string };
  skillName: string;
  skillIndex: string;
  skillImage: string | null;
}

export interface SkillImageUpdateRequest {
  id: number;
  url: string;
}

export const fetchSkillImagesByPersona = async (personaId: number) => {
  const res = await apiClient.get<SkillImageResponse[]>(`/skills/images/${personaId}`);
  return res.data;
};

export const updateSkillImageUrl = async (payload: SkillImageUpdateRequest) => {
  return apiClient.put(`/skills/images`, payload);
};

export const getPresignedUrl = async (params: {
  fileName: string;
  skillType: number;
  personaId: number;
  characterName: string;
  contentType: string;
}) => {
  const res = await apiClient.post<string>(`/skills/images/presign`, null, { params });
  return res.data;
};

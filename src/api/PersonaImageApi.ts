import { apiClient } from "./axios";

export interface PersonaImageResponse {
    id: number;
    persona: {
      id: number;
      name: string;
    };
    imageA: string;
    imageAd: string;
    imageSd: string;
}

export const getPersonaImage = async (id: number): Promise<PersonaImageResponse> => {
    const res = await apiClient.get(`/personas/images/${id}`);
    return res.data;
  };

  export const updatePersonaImage = async (
    personaId: number,
    imageType: 'A' | 'AC' | 'SD',
    imageUrl: string
  ) => {
    await apiClient.post(`/personas/images`, {
      personaId,
      imageType,
      imageUrl,
    });
};


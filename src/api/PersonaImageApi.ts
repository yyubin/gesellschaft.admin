import { apiClient } from "./axios";

export interface CharacterDto {
    id: number;
    name: string;
    nameKo: string;
  }
  
  export interface PersonaDto {
    id: number;
    name: string;
  }
  
  export interface PersonaImageResponse {
    id: number;
    persona: PersonaDto;
    character: CharacterDto;
    imageA: string | null;
    imageAd: string | null;
    imageSd: string | null;
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

export const getPresignedUrl = async (
    file: File,
    personaId: number,
    imageType: 'A' | 'AC' | 'SD',
    characterName: string
  ): Promise<string> => {
    const res = await apiClient.post('/personas/images/presign', null, {
      params: {
        fileName: file.name,
        type: imageType,
        personaId,
        characterName,
        contentType: file.type,
      },
    });
    return res.data;
  };
  
// src/pages/SkillImageManagePage.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  fetchSkillImagesByPersona,
  type SkillImageResponse,
  updateSkillImageUrl,
  getPresignedUrl
} from '../api/SkillImageApi';

const SkillImageManagePage = () => {
  const { id } = useParams<{ id: string }>();
  const [images, setImages] = useState<SkillImageResponse[]>([]);
  const [inputUrls, setInputUrls] = useState<Record<number, string>>({});

  useEffect(() => {
    if (id) {
      fetchSkillImagesByPersona(Number(id)).then((res) => {
        setImages(res);
        const initialUrls: Record<number, string> = {};
        res.forEach((img) => {
          initialUrls[img.id] = img.skillImage || '';
        });
        setInputUrls(initialUrls);
      });
    }
  }, [id]);

  const handleUrlChange = (skillId: number, value: string) => {
    setInputUrls((prev) => ({ ...prev, [skillId]: value }));
  };

  const handleUrlSave = async (skillId: number) => {
    const url = inputUrls[skillId];
    await updateSkillImageUrl({ id: skillId, url });

    const updated = images.map((img) =>
      img.id === skillId ? { ...img, imageUrl: url } : img
    );
    setImages(updated);
  };

  const handlePresignedUpload = async (file: File, skill: SkillImageResponse) => {
    const presignedUrl = await getPresignedUrl({
      fileName: file.name,
      skillType: skill.id,
      personaId: Number(id),
      characterName: skill.persona.name,
      contentType: file.type,
    });

    await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    const uploadedUrl = presignedUrl.split('?')[0];
    await updateSkillImageUrl({ id: skill.id, url: uploadedUrl });

    const updated = images.map((img) =>
      img.id === skill.id ? { ...img, imageUrl: uploadedUrl } : img
    );
    setImages(updated);
    setInputUrls((prev) => ({ ...prev, [skill.id]: uploadedUrl }));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, skill: SkillImageResponse) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePresignedUpload(file, skill);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">스킬 이미지 관리 - {images[0]?.persona.name}</h1>
      {images.map((skill) => (
        <div key={skill.id} className="p-4 border rounded space-y-2">
          <p><strong>{skill.skillIndex}</strong> - {skill.skillName}</p>
          {skill.skillImage && (
            <img
              src={skill.skillImage}
              alt={skill.skillName}
              className="w-32 h-32 object-contain"
            />
          )}
          <div className="space-y-1">
            <label className="block text-sm font-medium">이미지 URL 직접 입력</label>
            <input
              type="text"
              className="w-full border px-2 py-1 rounded"
              value={inputUrls[skill.id] || ''}
              onChange={(e) => handleUrlChange(skill.id, e.target.value)}
              placeholder="https://example.com/image.webp"
            />
            <button
              className="mt-1 px-3 py-1 bg-green-600 text-white rounded"
              onClick={() => handleUrlSave(skill.id)}
            >
              저장
            </button>
          </div>
          <div className="space-y-1 mt-2">
            <label className="block text-sm font-medium">이미지 파일 업로드</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileInput(e, skill)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillImageManagePage;

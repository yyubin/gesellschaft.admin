import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getPersonaImage,
  updatePersonaImage,
  type PersonaImageResponse,
} from '../api/PersonaImageApi';

const PersonaImageManagePage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PersonaImageResponse | null>(null);
  const [urls, setUrls] = useState({ A: '', AC: '', SD: '' });

  useEffect(() => {
    if (id) {
      getPersonaImage(Number(id)).then((res) => {
        setData(res);
        setUrls({
          A: res.imageA || '',
          AC: res.imageAd || '',
          SD: res.imageSd || '',
        });
      });
    }
  }, [id]);

  const handleChange = (type: 'A' | 'AC' | 'SD', value: string) => {
    setUrls((prev) => ({ ...prev, [type]: value }));
  };

  const handleSave = (type: 'A' | 'AC' | 'SD') => {
    if (!id) return;
    updatePersonaImage(Number(id), type, urls[type])
      .then(() => alert(`${type} 이미지 저장 완료`))
      .catch(() => alert(`저장 실패`));
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">🖼 이미지 관리 - {data?.persona.name}</h2>

      {(['A', 'AC', 'SD'] as const).map((type) => (
        <div key={type} className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-2">이미지 {type}</p>

            {urls[type] ? (
            <img src={urls[type]} alt={`image-${type}`} className="w-64 h-auto mb-2 border rounded" />
            ) : (
            <p className="text-sm text-gray-500 mb-2">아직 등록된 이미지가 없습니다.</p>
            )}

            <input
            className="w-full border rounded p-2 mb-2"
            value={urls[type]}
            onChange={(e) => handleChange(type, e.target.value)}
            placeholder={`이미지 ${type}의 URL을 입력하세요`}
            />
            <button
            className="px-4 py-1 bg-blue-500 text-white rounded"
            onClick={() => handleSave(type)}
            >
            저장
            </button>
        </div>
        ))}
    </div>
  );
};

export default PersonaImageManagePage;

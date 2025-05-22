import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getPersonaImage,
  updatePersonaImage,
  getPresignedUrl,
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

  const handleFileUpload = async (
    file: File,
    type: 'A' | 'AC' | 'SD'
  ) => {
    if (!id || !data) return;
  
  const presignedUrl = await getPresignedUrl(
      file,
      Number(id),
      type,
      data.character.name
    );
  
    await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });
  
    const uploadedUrl = presignedUrl.split('?')[0];
    await updatePersonaImage(Number(id), type, uploadedUrl);
    setUrls((prev) => ({ ...prev, [type]: uploadedUrl }));
    alert(`${type} 업로드 완료`);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">🖼 이미지 관리 - {data?.character.nameKo}, {data?.persona.name}</h2>

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
            
            {/* 파일 선택용 버튼 */}
            <button
                className="px-4 py-1 bg-green-600 text-white rounded"
                onClick={() => {
                const input = document.getElementById(`file-${type}`) as HTMLInputElement;
                if (input) input.click();
                }}
            >
                이미지 새로 등록
            </button>
            <input
                type="file"
                id={`file-${type}`}
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                    handleFileUpload(file, type);
                    e.target.value = '';
                    }
                }}
            />
        </div>
        ))}
    </div>
  );
};

export default PersonaImageManagePage;

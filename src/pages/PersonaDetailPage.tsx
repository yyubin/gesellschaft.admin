// src/pages/PersonaDetailPage.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPersonaDetail, type PersonaDetail } from '../api/PersonaApi';
import { useNavigate } from 'react-router-dom';

const PersonaDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PersonaDetail | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getPersonaDetail(Number(id)).then(setData);
    }
  }, [id]);

  if (!data) return <p className="p-6">로딩 중...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{data.character.nameKo} - {data.name} 상세 정보</h1>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => navigate(`/personas/${data.id}/images`)}
        >
        이미지 관리
      </button>
      <div className="bg-white shadow p-4 rounded space-y-2">
        <p><strong>캐릭터:</strong> {data.character.name}</p>
        <p><strong>성:</strong> {data.rarity}★</p>
        <p><strong>체력:</strong> {data.health}</p>
        <p><strong>정신력:</strong> {data.mental}</p>
        <p><strong>속도:</strong> {data.minSpeed} ~ {data.maxSpeed}</p>
        <p><strong>가드 레벨:</strong> {data.guardLevel}</p>
        <p><strong>시즌:</strong> {data.season}</p>
        <p><strong>출시일:</strong> {data.releaseDate?.slice(0, 10)}</p>
      </div>
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">흐트러짐</h2>
        <ul className="list-disc ml-5 text-sm">
          <li>흐트러짐1: {data.disturbed?.disturbed1 ?? '-'}</li>
          <li>흐트러짐2: {data.disturbed?.disturbed2 ?? '-'}</li>
          <li>흐트러짐3: {data.disturbed?.disturbed3 ?? '-'}</li>
        </ul>
      </div>

      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">저항</h2>
        <ul className="list-disc ml-5 text-sm">
          <li>공격: {data.resistance.attack}</li>
          <li>관통: {data.resistance.penetration}</li>
          <li>타격: {data.resistance.batting}</li>
        </ul>
      </div>

      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">스킬</h2>
        <button
            className="text-sm px-3 py-1 bg-indigo-600 text-white rounded"
            onClick={() => navigate(`/personas/${data.id}/skills/images`)}
          >
            스킬 이미지 관리
        </button>
        <ul className="space-y-2">
          {data.activeSkills.map((s) => (
            <li key={s.id} className="border-b pb-2">
              <p><strong>{s.skillIndex}</strong> - {s.skillName} ({s.attackType})</p>
              <p>속성: {s.sinProperty.name}, 공격력: {s.attackLevel}, 수량: {s.quantity}</p>
              <p>코인: {s.damageSpec.coinCount}개, 파워: {s.damageSpec.coinPower}, 무게: {s.damageSpec.weight}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">특성</h2>
        <ul className="flex flex-wrap gap-2">
          {data.traits.map((t) => (
            <span key={t.id} className="px-2 py-1 bg-gray-200 rounded text-sm">{t.name}</span>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PersonaDetailPage;

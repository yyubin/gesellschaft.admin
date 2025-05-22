// src/pages/PersonaCreatePage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchAllTraits } from '../api/TraitApi';
import { getAllCharacters } from '../api/CharacterApi';
import { fetchAllSeasons } from '../api/SeasonApi';
import { createPersona, type PersonaCreateRequest } from '../api/PersonaApi';

import ResistanceSelect from '../components/ResistanceSelect';

const PersonaCreatePage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<PersonaCreateRequest>({
    characterId: 0,
    name: '',
    rarity: 1,
    health: 0,
    mental: 0,
    minSpeed: 0,
    maxSpeed: 0,
    guardLevel: 0,
    seasonId: 0,
    releaseDate: new Date().toISOString(),
    resistance: { attack: '보통', penetration: '보통', batting: '보통' },
    disturbed: { disturbed1: null, disturbed2: null, disturbed3: null },
    traitIds: [],
  });

  const [characters, setCharacters] = useState<any[]>([]);
  const [seasons, setSeasons] = useState<any[]>([]);
  const [traits, setTraits] = useState<any[]>([]);

  useEffect(() => {
    getAllCharacters().then(setCharacters);
    fetchAllSeasons().then(setSeasons);
    fetchAllTraits().then(setTraits);
  }, []);

  const handleChange = (field: keyof PersonaCreateRequest, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await createPersona(data);
    navigate('/personas');
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">인격 추가</h1>
      <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded">
        <input
          className="input"
          placeholder="이름"
          value={data.name}
          onChange={e => handleChange('name', e.target.value)}
        />
        <select
          className="input"
          value={data.characterId}
          onChange={e => handleChange('characterId', Number(e.target.value))}
        >
          <option value={0}>캐릭터 선택</option>
          {characters.map(c => (
            <option key={c.id} value={c.id}>{c.nameKo}</option>
          ))}
        </select>
        <select
          className="input"
          value={data.seasonId}
          onChange={e => handleChange('seasonId', Number(e.target.value))}
        >
          <option value={0}>시즌 선택</option>
          {seasons.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded">
        <label>희귀도<input className="input" type="number" value={data.rarity} onChange={e => handleChange('rarity', Number(e.target.value))} /></label>
        <label>체력<input className="input" type="number" value={data.health} onChange={e => handleChange('health', Number(e.target.value))} /></label>
        <label>정신력<input className="input" type="number" value={data.mental} onChange={e => handleChange('mental', Number(e.target.value))} /></label>
        <label>최소 속도<input className="input" type="number" value={data.minSpeed} onChange={e => handleChange('minSpeed', Number(e.target.value))} /></label>
        <label>최대 속도<input className="input" type="number" value={data.maxSpeed} onChange={e => handleChange('maxSpeed', Number(e.target.value))} /></label>
        <label>가드 레벨<input className="input" type="number" value={data.guardLevel} onChange={e => handleChange('guardLevel', Number(e.target.value))} /></label>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded">
      <ResistanceSelect
        label="참격 저항"
        value={data.resistance.attack}
        onChange={val => setData({ ...data, resistance: { ...data.resistance, attack: val } })}
      />
      <ResistanceSelect
        label="관통 저항"
        value={data.resistance.penetration}
        onChange={val => setData({ ...data, resistance: { ...data.resistance, penetration: val } })}
      />
      <ResistanceSelect
        label="타격 저항"
        value={data.resistance.batting}
        onChange={val => setData({ ...data, resistance: { ...data.resistance, batting: val } })}
      />
      </div>

      <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded">
        <label>흐트러짐1<input className="input" type="number" value={data.disturbed.disturbed1 ?? ''} onChange={e => setData(prev => ({ ...prev, disturbed: { ...prev.disturbed, disturbed1: Number(e.target.value) || null } }))} /></label>
        <label>흐트러짐2<input className="input" type="number" value={data.disturbed.disturbed2 ?? ''} onChange={e => setData(prev => ({ ...prev, disturbed: { ...prev.disturbed, disturbed2: Number(e.target.value) || null } }))} /></label>
        <label>흐트러짐3<input className="input" type="number" value={data.disturbed.disturbed3 ?? ''} onChange={e => setData(prev => ({ ...prev, disturbed: { ...prev.disturbed, disturbed3: Number(e.target.value) || null } }))} /></label>
      </div>

      <div className="bg-gray-50 p-4 rounded">
        <label>특성 선택
          <select
            multiple
            className="input h-40"
            value={data.traitIds.map(String)}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions).map(opt => Number(opt.value));
              handleChange('traitIds', selected);
            }}
          >
            {traits.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded"
      >
        인격 등록
      </button>
    </div>
  );
};

export default PersonaCreatePage;
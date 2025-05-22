import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPersonaDetail, updatePersona, type PersonaDetail } from '../api/PersonaApi';
import { fetchAllTraits } from '../api/TraitApi';
import { getAllCharacters } from '../api/CharacterApi';
import { fetchAllSeasons } from '../api/SeasonApi';
import ResistanceSelect from '../components/ResistanceSelect';

const PersonaEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<PersonaDetail | null>(null);
  const [traits, setTraits] = useState<{ id: number; name: string }[]>([]);
  const [characters, setCharacters] = useState<{ id: number; name: string }[]>([]);
  const [seasons, setSeasons] = useState<{ id: number; name: string }[]>([]);
  const [showTraits, setShowTraits] = useState(false);

  useEffect(() => {
    if (id) {
      getPersonaDetail(Number(id)).then(setData);
      fetchAllTraits().then(setTraits);
      getAllCharacters().then(setCharacters);
      fetchAllSeasons().then(setSeasons);
    }
  }, [id]);

  const handleChange = (field: keyof PersonaDetail, value: any) => {
    if (!data) return;
    setData({ ...data, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    await updatePersona(Number(id), {
      id: data.id,
      characterId: data.character.id,
      name: data.name,
      rarity: data.rarity,
      health: data.health,
      mental: data.mental,
      minSpeed: data.minSpeed,
      maxSpeed: data.maxSpeed,
      guardLevel: data.guardLevel,
      seasonId: seasons.find(s => s.name === data.season)?.id ?? 1,
      releaseDate: data.releaseDate,
      resistance: data.resistance,
      disturbed: data.disturbed,
      traitIds: data.traits.map(t => t.id),
    });

    navigate(`/personas/${id}`);
  };

  if (!data) return <div className="p-6">로딩 중...</div>;

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 max-w-4xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold">인격 수정</h1>

      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
        <div>
          <label className="block mb-1 font-semibold">이름</label>
          <input className="input w-full" value={data.name} onChange={e => handleChange('name', e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-semibold">캐릭터</label>
          <select className="input w-full" value={data.character.id} onChange={e => handleChange('character', characters.find(c => c.id === Number(e.target.value))!)}>
            {characters.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded">
        <div>
            <label className="block mb-1 font-semibold">희귀도</label>
            <input
            className="input w-full"
            type="number"
            value={data.rarity}
            onChange={e => handleChange('rarity', Number(e.target.value))}
            placeholder="희귀도"
            />
        </div>
        <div>
            <label className="block mb-1 font-semibold">체력</label>
            <input
            className="input w-full"
            type="number"
            value={data.health}
            onChange={e => handleChange('health', Number(e.target.value))}
            placeholder="체력"
            />
        </div>
        <div>
            <label className="block mb-1 font-semibold">정신력</label>
            <input
            className="input w-full"
            type="number"
            value={data.mental}
            onChange={e => handleChange('mental', Number(e.target.value))}
            placeholder="정신력"
            />
        </div>
        <div>
            <label className="block mb-1 font-semibold">최소 속도</label>
            <input
            className="input w-full"
            type="number"
            value={data.minSpeed}
            onChange={e => handleChange('minSpeed', Number(e.target.value))}
            placeholder="최소 속도"
            />
        </div>
        <div>
            <label className="block mb-1 font-semibold">최대 속도</label>
            <input
            className="input w-full"
            type="number"
            value={data.maxSpeed}
            onChange={e => handleChange('maxSpeed', Number(e.target.value))}
            placeholder="최대 속도"
            />
        </div>
        <div>
            <label className="block mb-1 font-semibold">가드 레벨</label>
            <input
            className="input w-full"
            type="number"
            value={data.guardLevel}
            onChange={e => handleChange('guardLevel', Number(e.target.value))}
            placeholder="가드 레벨"
            />
        </div>
        </div>


      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
        <div>
          <label className="block mb-1 font-semibold">시즌</label>
          <select className="input w-full" value={data.season} onChange={e => handleChange('season', e.target.value)}>
            {seasons.map(s => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">출시일</label>
          <input className="input w-full" type="date" value={data.releaseDate?.slice(0, 10)} onChange={e => handleChange('releaseDate', e.target.value)} />
        </div>
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
        <div>
            <label className="block mb-1 font-semibold">흐트러짐 1</label>
            <input
            className="input w-full"
            type="number"
            value={data.disturbed.disturbed1 ?? ''}
            onChange={e =>
                setData({
                ...data,
                disturbed: {
                    ...data.disturbed,
                    disturbed1: Number(e.target.value) || null,
                },
                })
            }
            placeholder="흐트러짐1"
            />
        </div>
        <div>
            <label className="block mb-1 font-semibold">흐트러짐 2</label>
            <input
            className="input w-full"
            type="number"
            value={data.disturbed.disturbed2 ?? ''}
            onChange={e =>
                setData({
                ...data,
                disturbed: {
                    ...data.disturbed,
                    disturbed2: Number(e.target.value) || null,
                },
                })
            }
            placeholder="흐트러짐2"
            />
        </div>
        <div>
            <label className="block mb-1 font-semibold">흐트러짐 3</label>
            <input
            className="input w-full"
            type="number"
            value={data.disturbed.disturbed3 ?? ''}
            onChange={e =>
                setData({
                ...data,
                disturbed: {
                    ...data.disturbed,
                    disturbed3: Number(e.target.value) || null,
                },
                })
            }
            placeholder="흐트러짐3"
            />
        </div>
        </div>


      <div className="bg-gray-50 p-4 rounded">
        <label className="block mb-2 font-semibold">특성</label>
        <button type="button" onClick={() => setShowTraits(!showTraits)} className="text-blue-600 mb-2 underline">
          {showTraits ? '특성 숨기기' : '특성 보기'}
        </button>
        {showTraits && (
          <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
            {traits.map(t => (
              <label key={t.id} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={data.traits.some(dt => dt.id === t.id)}
                  onChange={e => {
                    const next = e.target.checked
                      ? [...data.traits, t]
                      : data.traits.filter(dt => dt.id !== t.id);
                    setData({ ...data, traits: next });
                  }}
                />
                <span>{t.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">저장</button>
    </form>
  );
};

export default PersonaEditPage;

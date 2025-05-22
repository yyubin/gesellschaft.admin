import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchSkillsByPersona,
  createSkill,
  updateSkill,
  type ActiveSkillDto,
  type ActiveSkillCreateRequest,
  type ActiveSkillUpdateRequest,
} from '../api/SkillApi';
import SinPropertySelect from '../components/SinPropertySelect';

const PersonaSkillEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const personaId = Number(id);

  const [skills, setSkills] = useState<ActiveSkillDto[]>([]);
  const [editingSkillId, setEditingSkillId] = useState<number | null>(null);
  const [newSkill, setNewSkill] = useState<ActiveSkillCreateRequest | null>(null);
  const [editBuffer, setEditBuffer] = useState<Record<number, ActiveSkillUpdateRequest>>({});

  useEffect(() => {
    if (personaId) {
      fetchSkillsByPersona(personaId).then(data => {
        setSkills(data);
        const buffer: Record<number, ActiveSkillUpdateRequest> = {};
        data.forEach(skill => {
          buffer[skill.id] = {
            id: skill.id,
            personaId,
            skillName: skill.skillName,
            skillIndex: skill.skillIndex,
            syncLevel: skill.syncLevel,
            attackLevel: skill.attackLevel,
            attackType: skill.attackType,
            sinPropertyId: 1, // 기본값, 필요시 서버에서 ID 내려받도록 수정
            quantity: skill.quantity,
            damageSpec: { ...skill.damageSpec },
          };
        });
        setEditBuffer(buffer);
      });
    }
  }, [personaId]);

  const handleCreate = async () => {
    if (!newSkill) return;
    const created = await createSkill(newSkill);
    setSkills([...skills, created]);
    setNewSkill(null);
  };

  const handleUpdate = async (id: number) => {
    const updated = await updateSkill(editBuffer[id]);
    setSkills(skills.map(s => (s.id === id ? updated : s)));
    setEditingSkillId(null);
  };

  const renderSkillForm = (
    skill: ActiveSkillUpdateRequest,
    onChange: (key: string, value: any) => void
  ) => (
    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
      <label className="flex flex-col">
        <span className="font-medium mb-1">스킬 인덱스</span>
        <input value={skill.skillIndex ?? ''} onChange={e => onChange('skillIndex', e.target.value)} />
      </label>
      <label className="flex flex-col">
        <span className="font-medium mb-1">스킬 이름</span>
        <input value={skill.skillName ?? ''} onChange={e => onChange('skillName', e.target.value)} />
      </label>
      <label className="flex flex-col">
        <span className="font-medium mb-1">공격 타입</span>
        <select value={skill.attackType ?? ''} onChange={e => onChange('attackType', e.target.value)}>
          <option value="">선택</option>
          <option value="SLASH">참격</option>
          <option value="PIERCE">관통</option>
          <option value="BLUNT">타격</option>
        </select>
      </label>
      <label className="flex flex-col">
        <span className="font-medium mb-1">속성</span>
        <SinPropertySelect
          value={skill.sinPropertyId ?? 1}
          onChange={(id) => onChange('sinPropertyId', id)}
        />
      </label>
      <label className="flex flex-col">
        <span className="font-medium mb-1">싱크 레벨</span>
        <input type="number" value={skill.syncLevel ?? 0} onChange={e => onChange('syncLevel', Number(e.target.value))} />
      </label>
      <label className="flex flex-col">
        <span className="font-medium mb-1">공격 레벨</span>
        <input type="number" value={skill.attackLevel ?? 0} onChange={e => onChange('attackLevel', Number(e.target.value))} />
      </label>
      <label className="flex flex-col">
        <span className="font-medium mb-1">수량</span>
        <input type="number" value={skill.quantity ?? 0} onChange={e => onChange('quantity', Number(e.target.value))} />
      </label>
      <label className="flex flex-col">
        <span className="font-medium mb-1">코인 수</span>
        <input type="number" value={skill.damageSpec?.coinCount ?? 0} onChange={e => onChange('damageSpec', { ...skill.damageSpec, coinCount: Number(e.target.value) })} />
      </label>
      <label className="flex flex-col">
        <span className="font-medium mb-1">코인 파워</span>
        <input type="number" value={skill.damageSpec?.coinPower ?? 0} onChange={e => onChange('damageSpec', { ...skill.damageSpec, coinPower: Number(e.target.value) })} />
      </label>
      <label className="flex flex-col">
        <span className="font-medium mb-1">기본 공격력</span>
        <input type="number" value={skill.damageSpec?.basePower ?? 0} onChange={e => onChange('damageSpec', { ...skill.damageSpec, basePower: Number(e.target.value) })} />
      </label>
      <label className="flex flex-col">
        <span className="font-medium mb-1">무게</span>
        <input type="number" value={skill.damageSpec?.weight ?? 0} onChange={e => onChange('damageSpec', { ...skill.damageSpec, weight: Number(e.target.value) })} />
      </label>
    </div>
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">스킬 관리</h1>

      {newSkill ? (
        <div className="bg-gray-100 p-4 rounded space-y-2">
          {renderSkillForm(newSkill as ActiveSkillUpdateRequest, (key, value) => setNewSkill({ ...newSkill, [key]: value } as ActiveSkillCreateRequest))}
          <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-1 rounded">확인</button>
          <button onClick={() => setNewSkill(null)} className="bg-gray-300 px-4 py-1 rounded ml-2">취소</button>
        </div>
      ) : (
        <button onClick={() => setNewSkill({ personaId, skillName: '', skillIndex: '', syncLevel: 1, attackType: 'SLASH', sinPropertyId: 1, quantity: 1, attackLevel: 1, damageSpec: { basePower: 0, coinPower: 0, coinCount: 0, weight: 0 } })} className="bg-blue-600 text-white px-4 py-2 rounded">
          + 스킬 추가
        </button>
      )}

      <ul className="space-y-4">
        {skills.map(skill => (
          <li key={skill.id} className="p-4 bg-white rounded shadow">
            {editingSkillId === skill.id ? (
              <div className="space-y-2">
                {renderSkillForm(
                  editBuffer[skill.id],
                  (key, value) => setEditBuffer({
                    ...editBuffer,
                    [skill.id]: { ...editBuffer[skill.id], [key]: value },
                  })
                )}
                <button onClick={() => handleUpdate(skill.id)} className="bg-green-600 text-white px-4 py-1 rounded">완료</button>
                <button onClick={() => setEditingSkillId(null)} className="bg-gray-300 px-4 py-1 rounded ml-2">취소</button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p><strong>{skill.skillIndex}</strong> - {skill.skillName} ({skill.attackType})</p>
                  <p>속성: {skill.sinPropertyName}, 공격력: {skill.attackLevel}</p>
                  <p>싱크레벨: {skill.syncLevel}, 수량: {skill.quantity}</p>
                  <p>코인: {skill.damageSpec.coinCount}개, 파워: {skill.damageSpec.coinPower}, 기본파워: {skill.damageSpec.basePower}, 무게: {skill.damageSpec.weight}</p>
                </div>
                <button onClick={() => setEditingSkillId(skill.id)} className="bg-yellow-500 text-white px-3 py-1 rounded">수정</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonaSkillEditPage;

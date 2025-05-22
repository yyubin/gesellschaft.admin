// src/pages/base/TraitManage.tsx
import { useEffect, useState } from 'react';
import {
  fetchAllTraits,
  createTrait,
  updateTrait,
  type TraitResponse,
} from '../../api/TraitApi';

const TraitManage = () => {
  const [traits, setTraits] = useState<TraitResponse[]>([]);
  const [newTrait, setNewTrait] = useState('');
  const [editingTraitId, setEditingTraitId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    fetchAllTraits().then(setTraits);
  }, []);

  const handleAdd = async () => {
    if (!newTrait.trim()) return;
    const created = await createTrait(newTrait);
    setTraits((prev) => [...prev, created]);
    setNewTrait('');
  };

  const handleEdit = (id: number, name: string) => {
    setEditingTraitId(id);
    setEditingText(name);
  };

  const handleUpdate = async () => {
    if (editingTraitId === null || !editingText.trim()) return;
    const updated = await updateTrait(editingTraitId, editingText);
    setTraits((prev) =>
      prev.map((tr) => (tr.id === updated.id ? updated : tr))
    );
    setEditingTraitId(null);
    setEditingText('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className="border px-2 py-1 rounded w-64"
          value={newTrait}
          onChange={(e) => setNewTrait(e.target.value)}
          placeholder="새 특성 입력"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          추가
        </button>
      </div>

      <ul className="space-y-2">
        {traits.map((tr) => (
          <li key={tr.id} className="flex items-center gap-2">
            {editingTraitId === tr.id ? (
              <>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="border px-2 py-1 rounded w-64"
                />
                <button
                  onClick={handleUpdate}
                  className="px-2 py-1 text-sm bg-green-600 text-white rounded"
                >
                  저장
                </button>
              </>
            ) : (
              <>
                <span className="w-64">{tr.name}</span>
                <button
                  onClick={() => handleEdit(tr.id, tr.name)}
                  className="px-2 py-1 text-sm bg-gray-300 rounded"
                >
                  수정
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TraitManage;

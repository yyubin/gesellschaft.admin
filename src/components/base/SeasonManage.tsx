// src/pages/base/SeasonManage.tsx
import { useEffect, useState } from 'react';
import {
  fetchAllSeasons,
  createSeason,
  updateSeason,
  type SeasonResponse,
} from '../../api/SeasonApi';

const SeasonManage = () => {
  const [seasons, setSeasons] = useState<SeasonResponse[]>([]);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    fetchAllSeasons().then(setSeasons);
  }, []);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    const created = await createSeason(newName);
    setSeasons((prev) => [...prev, created]);
    setNewName('');
  };

  const handleEdit = (id: number, name: string) => {
    setEditingId(id);
    setEditingText(name);
  };

  const handleUpdate = async () => {
    if (editingId === null || !editingText.trim()) return;
    const updated = await updateSeason(editingId, editingText);
    setSeasons((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className="border px-2 py-1 rounded w-64"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="새 시즌 이름 입력"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          추가
        </button>
      </div>

      <ul className="space-y-2">
        {seasons.map((item) => (
          <li key={item.id} className="flex items-center gap-2">
            {editingId === item.id ? (
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
                <span className="w-64">{item.name}</span>
                <button
                  onClick={() => handleEdit(item.id, item.name)}
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

export default SeasonManage;

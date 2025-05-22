// src/pages/base/KeywordManage.tsx
import { useEffect, useState } from 'react';
import {
  fetchAllKeywords,
  createKeyword,
  updateKeyword,
  type KeywordResponse,
} from '../../api/KeywordApi';

const KeywordManage = () => {
  const [keywords, setKeywords] = useState<KeywordResponse[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [editingKeywordId, setEditingKeywordId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    fetchAllKeywords().then(setKeywords);
  }, []);

  const handleAdd = async () => {
    if (!newKeyword.trim()) return;
    const created = await createKeyword(newKeyword);
    setKeywords((prev) => [...prev, created]);
    setNewKeyword('');
  };

  const handleEdit = (id: number, name: string) => {
    setEditingKeywordId(id);
    setEditingText(name);
  };

  const handleUpdate = async () => {
    if (editingKeywordId === null || !editingText.trim()) return;
    const updated = await updateKeyword(editingKeywordId, editingText);
    setKeywords((prev) =>
      prev.map((kw) => (kw.id === updated.id ? updated : kw))
    );
    setEditingKeywordId(null);
    setEditingText('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className="border px-2 py-1 rounded w-64"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          placeholder="새 키워드 입력"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          추가
        </button>
      </div>

      <ul className="space-y-2">
        {keywords.map((kw) => (
          <li key={kw.id} className="flex items-center gap-2">
            {editingKeywordId === kw.id ? (
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
                <span className="w-64">{kw.name}</span>
                <button
                  onClick={() => handleEdit(kw.id, kw.name)}
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

export default KeywordManage;

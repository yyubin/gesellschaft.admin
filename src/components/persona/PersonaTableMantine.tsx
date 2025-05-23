import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { getAllCharacters, type GameCharacter } from '../../api/CharacterApi';
import { getPersonas, type PersonaSummary } from '../../api/PersonaApi';
import { useNavigate } from 'react-router-dom';

const columns: ColumnDef<PersonaSummary>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: '이름' },
  {
    accessorFn: row => row.characterName.nameKo,
    id: 'characterName',
    header: '캐릭터',
  },
  { accessorKey: 'rarity', header: '성' },
  { accessorKey: 'health', header: '체력' },
  { accessorKey: 'mental', header: '정신력' },
  { accessorKey: 'season', header: '시즌' },
  { accessorKey: 'releaseDate', header: '출시일' },
];

const PersonaTable = () => {
  const [data, setData] = useState<PersonaSummary[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [characters, setCharacters] = useState<GameCharacter[]>([]);

  const [searchName, setSearchName] = useState('');
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('');
  const [sortBy, setSortBy] = useState('latest'); // or 'name'

  const navigate = useNavigate();
  const size = 10;

  useEffect(() => {
    getAllCharacters().then(setCharacters);
  }, []);

  const fetchData = () => {
    getPersonas(page, size, sortBy, searchName, selectedCharacterId || undefined).then((res) => {
      setData(res.content);
      setTotalPages(res.totalPages);
    });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSearch = () => {
    setPage(0); // 검색하면 페이지를 초기화하고
    fetchData();
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">인격 목록</h2>

      {/* 검색 필터 */}
      <div className="flex gap-4 items-end mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">이름 검색</label>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border px-2 py-1 rounded w-48"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">캐릭터</label>
          <select
            value={selectedCharacterId}
            onChange={(e) => setSelectedCharacterId(e.target.value)}
            className="border px-2 py-1 rounded w-48"
          >
            <option value="">전체</option>
            {characters.map((char) => (
              <option key={char.id} value={char.id}>
                {char.nameKo}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">정렬</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-2 py-1 rounded w-32"
          >
            <option value="latest">최신순</option>
            <option value="name">이름순</option>
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          검색
        </button>
      </div>

      {/* 테이블 */}
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100 text-sm text-gray-600 uppercase">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 text-left">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/personas/${row.original.id}`)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          이전
        </button>
        <span className="text-sm text-gray-600">
          {page + 1} / {totalPages}
        </span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default PersonaTable;

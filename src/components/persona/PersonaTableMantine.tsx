import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table';
  import { useEffect, useState } from 'react';
  import { getPersonas, type PersonaSummary } from '../../api/PersonaApi';
  
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
    const [page, setPage] = useState(0); // 0-based page index
    const [totalPages, setTotalPages] = useState(1);
  
    const size = 10;
  
    useEffect(() => {
      getPersonas(page, size).then((res) => {
        setData(res.content);
        setTotalPages(res.totalPages);
      });
    }, [page]);
  
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
  
    return (
      <div className="p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">인격 목록</h2>
  
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
              <tr key={row.id} className="border-t hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* 페이지네이션 버튼 */}
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
  
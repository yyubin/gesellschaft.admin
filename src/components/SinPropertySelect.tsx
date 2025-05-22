import React from 'react';

export interface SinPropertyOption {
  id: number;
  name: string;
}

const sinPropertyOptions: SinPropertyOption[] = [
  { id: 1, name: '분노' },
  { id: 2, name: '탐식' },
  { id: 3, name: '질투' },
  { id: 4, name: '우울' },
  { id: 5, name: '나태' },
  { id: 6, name: '오만' },
  { id: 7, name: '색욕' },
];

interface SinPropertySelectProps {
  value: number;
  onChange: (value: number) => void;
}

const SinPropertySelect: React.FC<SinPropertySelectProps> = ({ value, onChange }) => {
  return (
    <label className="flex flex-col">
      <span className="font-medium mb-1">속성 (Sin)</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        <option value={0}>선택</option>
        {sinPropertyOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SinPropertySelect;

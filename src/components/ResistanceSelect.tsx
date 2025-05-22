// src/components/ResistanceSelect.tsx
import React from 'react';

export const RESISTANCE_OPTIONS = [
  { label: '내성', value: 'STRONG' },
  { label: '보통', value: 'NORMAL' },
  { label: '취약', value: 'WEAK' },
];

interface ResistanceSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ResistanceSelect: React.FC<ResistanceSelectProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="font-semibold mb-1">{label}</label>
      <select
        className="input"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {RESISTANCE_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ResistanceSelect;

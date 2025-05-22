import PersonaTable from '../components/persona/PersonaTableMantine';
import { useNavigate } from 'react-router-dom';

const PersonasPage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">인격 관리</h1>
      <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate('/personas/create')}
        >
          인격 추가
      </button>
      <PersonaTable />
      
    </div>
  );
};

export default PersonasPage;

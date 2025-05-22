import PersonaTable from '../components/persona/PersonaTableMantine';

const PersonasPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">인격 관리</h1>
      <PersonaTable />
    </div>
  );
};

export default PersonasPage;

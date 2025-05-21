import { useSidebar } from '../context/SidebarContext';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaGhost, FaDungeon, FaLayerGroup } from 'react-icons/fa';

const Sidebar = () => {
  const { isOpen } = useSidebar();
  const { pathname } = useLocation();

  const navItems = [
    { label: '인격', to: '/personas', icon: <FaUser /> },
    { label: '에고', to: '/egos', icon: <FaGhost /> },
    { label: '거울 던전', to: '/mirror-dungeon', icon: <FaDungeon /> },
    { label: '덱메이커', to: '/deque', icon: <FaLayerGroup /> },
  ];

  return (
    <aside
      className={`bg-blue-700 text-white h-screen transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="p-4 text-lg font-bold">{isOpen && 'Gesellschaft'}</div>
      <nav className="mt-6 flex flex-col gap-2">
        {navItems.map(({ label, to, icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center px-4 py-2 hover:bg-blue-600 transition ${
              pathname === to ? 'bg-blue-600 font-semibold' : ''
            }`}
          >
            <span className="mr-3 text-xl">{icon}</span>
            {isOpen && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

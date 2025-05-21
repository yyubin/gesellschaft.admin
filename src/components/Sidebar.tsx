// src/components/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { label: '인격', to: '/personas' },
    { label: '에고', to: '/egos' },
    { label: '거울 던전', to: '/mirror-dungeon' },
    { label: '덱메이커', to: '/deque' },
  ];
  const { pathname } = useLocation();

  return (
    <aside className="w-48 bg-gray-200 h-screen p-4">
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`p-2 rounded text-left ${
              pathname === item.to ? 'bg-white shadow' : ''
            } hover:bg-white`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

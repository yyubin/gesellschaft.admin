// src/App.tsx
import { Outlet, Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { label: '대시보드', to: '/' },
    { label: '인격', to: '/personas' },
    { label: '에고', to: '/egos' },
    { label: '덱 메이커', to: '/deque' },
    { label: '거울 던전', to: '/mirror-dungeon' },
  ];
  const { pathname } = useLocation();

  return (
    <aside className="w-48 bg-gray-900 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin</h2>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`p-2 rounded hover:bg-gray-700 ${
              pathname === item.to ? 'bg-gray-700' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default App;

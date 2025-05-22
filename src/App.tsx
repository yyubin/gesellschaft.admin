// src/App.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import './index.css';
import { useSidebar } from './context/SidebarContext';

const App = () => {
  const { isOpen } = useSidebar();
  return (
    <div className="flex">
      <Sidebar />
      <div className={`${isOpen ? 'ml-64' : 'ml-16'} flex-1 flex flex-col min-h-screen transition-all duration-300`}>
        <Topbar />
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;

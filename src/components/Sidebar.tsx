import { useSidebar } from '../context/SidebarContext';
import { Link, useLocation } from 'react-router-dom';
import {
  FaUser, FaGhost, FaDungeon, FaLayerGroup, FaDatabase, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import { useState } from 'react';

const Sidebar = () => {
  const { isOpen } = useSidebar();
  const { pathname } = useLocation();
  const [showSubmenu, setShowSubmenu] = useState(false);

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <aside
      className={`fixed top-0 left-0 bg-blue-700 text-white h-screen transition-all duration-300 z-50 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="p-4 text-lg font-bold">{isOpen && 'Gesellschaft'}</div>
      <nav className="mt-6 flex flex-col gap-2">
        <SidebarLink to="/personas" label="인격" icon={<FaUser />} isOpen={isOpen} active={pathname === '/personas'} />
        <SidebarLink to="/egos" label="에고" icon={<FaGhost />} isOpen={isOpen} active={pathname === '/egos'} />
        <SidebarLink to="/mirror-dungeon" label="거울 던전" icon={<FaDungeon />} isOpen={isOpen} active={pathname === '/mirror-dungeon'} />
        <SidebarLink to="/deque" label="덱메이커" icon={<FaLayerGroup />} isOpen={isOpen} active={pathname === '/deque'} />

        {/* 기초데이터 (토글 메뉴) */}
        <div>
          <button
            onClick={() => setShowSubmenu(!showSubmenu)}
            className={`flex items-center w-full px-4 py-2 hover:bg-blue-600 transition justify-start ${
              isActive('/base-data') ? 'bg-blue-600 font-semibold' : ''
            }`}
          >
            <span className="mr-3 text-xl"><FaDatabase /></span>
            {isOpen && <span className="mr-3">기초데이터</span>}
            {isOpen && (showSubmenu ? <FaChevronUp /> : <FaChevronDown />)}
          </button>

          {/* 하위 메뉴 */}
          {showSubmenu && isOpen && (
            <div className="ml-8 mt-1 flex flex-col gap-1">
              <Link
                to="/base-data/keyword"
                className={`px-2 py-1 text-sm rounded hover:bg-blue-600 transition ${
                  pathname === '/base-data/keyword' ? 'bg-blue-600 font-semibold' : ''
                }`}
              >
                키워드
              </Link>
              <Link
                to="/base-data/trait"
                className={`px-2 py-1 text-sm rounded hover:bg-blue-600 transition ${
                  pathname === '/base-data/trait' ? 'bg-blue-600 font-semibold' : ''
                }`}
              >
                특성
              </Link>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

const SidebarLink = ({ to, label, icon, isOpen, active }: any) => (
  <Link
    to={to}
    className={`flex items-center px-4 py-2 hover:bg-blue-600 transition ${
      active ? 'bg-blue-600 font-semibold' : ''
    }`}
  >
    <span className="mr-3 text-xl">{icon}</span>
    {isOpen && <span>{label}</span>}
  </Link>
);

export default Sidebar;

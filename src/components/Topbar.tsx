// src/components/Topbar.tsx
import { useEffect, useState } from 'react';
import { apiClient } from '../api/axios';

import { useSidebar } from '../context/SidebarContext';
import { FaBars } from 'react-icons/fa';

interface UserInfo {
  id: number;
  username: string;
  role: 'ADMIN' | 'USER';
}

const Topbar = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    apiClient
      .get('/admin/me', { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="bg-white shadow px-4 py-2 flex items-center justify-between">
      <button onClick={toggleSidebar}>
        <FaBars className="text-2xl text-gray-800" />
      </button>
      <div className="font-bold">관리자 페이지</div>
    </div>
  );
};

export default Topbar;

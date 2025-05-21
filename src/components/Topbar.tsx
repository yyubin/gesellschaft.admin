// src/components/Topbar.tsx
import { useEffect, useState } from 'react';
import { apiClient } from '../api/axios';

interface UserInfo {
  id: number;
  username: string;
  role: 'ADMIN' | 'USER';
}

const Topbar = () => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    apiClient
      .get('/admin/me', { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="bg-blue-600 p-4 text-white text-lg font-semibold flex justify-between items-center">
      <span>Gesellschaft Admin Panel</span>
      {user && <span>{user.username} 관리자님 안녕하세요</span>}
    </div>
  );
};

export default Topbar;

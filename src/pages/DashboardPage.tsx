// src/pages/DashboardPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/axios';

interface UserInfo {
  id: number;
  username: string;
  role: 'ADMIN' | 'USER';
}

const DashboardPage = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(null);
  }, []);

  const logout = async () => {
    await apiClient.post('/logout');
    navigate('/login');
  };

  if (!user) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>관리자 대시보드</h1>
      <p>환영합니다, {user.username} 님!</p>
      <p>역할: {user.role}</p>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
};

export default DashboardPage;

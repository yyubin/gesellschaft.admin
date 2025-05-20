// src/pages/LoginPage.tsx
import { useState } from 'react';
import { apiClient } from '../api/axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      await apiClient.post(
        '/login',
        { username, password },
        { withCredentials: true }
      );
      alert('로그인 성공');
      location.href = '/';
    } catch (e) {
      alert('로그인 실패');
    }
  };

  return (
    <div>
      <h2>관리자 로그인</h2>
      <input placeholder="ID" onChange={(e) => setUsername(e.target.value)} />
      <input
        type="password"
        placeholder="PW"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>로그인</button>
    </div>
  );
};

export default LoginPage;

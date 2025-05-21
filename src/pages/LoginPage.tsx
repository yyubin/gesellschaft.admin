// src/pages/LoginPage.tsx
import { useState } from 'react';
import { apiClient } from '../api/axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      await apiClient.post(
        '/login',
        { username, password },
        { withCredentials: true }
      );
      navigate('/');
    } catch {
      alert('로그인 실패');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h2>
        <input
          className="w-full border px-4 py-2 mb-4 rounded"
          placeholder="ID"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full border px-4 py-2 mb-6 rounded"
          type="password"
          placeholder="PW"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={login}
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      await apiClient.post(
        '/login',
        { username: email, password },
        { withCredentials: true }
      );
      navigate('/');
    } catch {
      alert('로그인 실패');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        {/* 로고 */}
        <div className="flex justify-center mb-4">
          <div className="text-2xl font-bold text-blue-600">for Gesellschaft Admin</div>
        </div>

        <h2 className="text-xl font-semibold text-center mb-6">Sign in</h2>

        <input
          className="w-full border px-4 py-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border px-4 py-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="text-right text-sm mb-4">
          <a href="#" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          onClick={login}
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
        >
          Sign in
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="text-center text-sm mt-6">
          Not a member?{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

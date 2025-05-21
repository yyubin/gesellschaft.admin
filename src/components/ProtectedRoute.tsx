// src/components/ProtectedRoute.tsx
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { apiClient } from '../api/axios';

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get('/admin/me')
      .then(() => setLoading(false))
      .catch(() => navigate('/login'));
  }, []);

  if (loading) return <div className="text-center mt-10">로딩 중...</div>;
  return <Outlet />;
};

export default ProtectedRoute;

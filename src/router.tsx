import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PersonasPage from './pages/PersonasPage';
import EgosPage from './pages/EgosPage';
import DequePage from './pages/DequePage';
import MirrorDungeonPage from './pages/MirrorDungeonPage';
import ProtectedRoute from './components/ProtectedRoute';
import PersonaDetailPage from './pages/PersonaDetailPage';
import PersonaImageManagePage from './pages/PersonaImageManagePage';
import SkillImageManagePage from './pages/SkillImageManagePage';
import BaseDataPage from './pages/BaseDataPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '', element: <DashboardPage /> },
          { path: 'personas', element: <PersonasPage /> },
          { path: 'egos', element: <EgosPage /> },
          { path: 'deque', element: <DequePage /> },
          { path: 'mirror-dungeon', element: <MirrorDungeonPage /> },
          {
            path: 'personas/:id',
            element: <PersonaDetailPage />
          },
          {
            path: 'personas/:id/images',
            element: <PersonaImageManagePage />
          },
          {
            path: 'personas/:id/skills/images',
            element: <SkillImageManagePage />
          },
          {
            path: 'base-data/:type',
            element: <BaseDataPage />
          }
        ],
      },
    ],
  },
]);

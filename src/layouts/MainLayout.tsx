import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Topbar } from '../components/app-shell/Topbar';
import { Sidebar } from '../components/app-shell/Sidebar';
import { useDemoSession } from '../context/DemoSessionContext';

export const MainLayout: React.FC = () => {
  const { currentRole } = useDemoSession();
  const location = useLocation();
  const navigate = useNavigate();

  // Route guard: keep portal in sync with role switcher
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') return;

    if (currentRole === 'admin' && !path.startsWith('/admin')) {
      navigate('/admin');
    } else if (
      (currentRole === 'institution_admin' || currentRole === 'institution_operator') &&
      !path.startsWith('/institution')
    ) {
      navigate('/institution');
    } else if (currentRole === 'student' && !path.startsWith('/student')) {
      navigate('/student');
    } else if (currentRole === 'stakeholder' && !path.startsWith('/stakeholder')) {
      navigate('/stakeholder');
    }
  }, [currentRole]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Topbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};


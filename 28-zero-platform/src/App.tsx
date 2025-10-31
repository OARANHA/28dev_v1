import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/common/Header';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { LandingPagesPage } from './pages/LandingPagesPage';
import { EditorPage } from './pages/EditorPage';
import { ChatbotsPage } from './pages/ChatbotsPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { SetupPage } from './pages/SetupPage';
import { supabase } from './lib/supabase';
import './index.css';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      {user && <Header />}
      <Routes>
        {/* Rota Pública - Landing Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Rotas de Autenticação */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        
        {/* Rotas Protegidas - Área Administrativa */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/landing-pages"
          element={
            <ProtectedRoute>
              <LandingPagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor/:pageId"
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbots"
          element={
            <ProtectedRoute>
              <ChatbotsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/integrations"
          element={
            <ProtectedRoute>
              <IntegrationsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  const [dbConfigured, setDbConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    checkDatabaseSetup();
  }, []);

  async function checkDatabaseSetup() {
    try {
      // Tentar acessar a tabela profiles
      const { error } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);

      setDbConfigured(!error);
    } catch (error) {
      setDbConfigured(false);
    }
  }

  if (dbConfigured === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Inicializando...</div>
      </div>
    );
  }

  if (!dbConfigured) {
    return <SetupPage onComplete={() => setDbConfigured(true)} />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

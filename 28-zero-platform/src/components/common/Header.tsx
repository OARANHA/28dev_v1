import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Bot, 
  Settings, 
  LogOut, 
  User 
} from 'lucide-react';

export function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate('/login');
  }

  if (!user) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 border-b border-primary/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">
              <span className="text-accent">28</span> Zero
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/landing-pages"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <FileText size={20} />
              <span>Landing Pages</span>
            </Link>
            <Link
              to="/chatbots"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Bot size={20} />
              <span>Chatbots</span>
            </Link>
            {user.role === 'admin' && (
              <Link
                to="/integrations"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Settings size={20} />
                <span>Integrações</span>
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <User size={20} />
              <span className="hidden sm:inline">{user.full_name || user.email}</span>
              {user.role === 'admin' && (
                <span className="bg-accent px-2 py-1 rounded text-xs font-medium">
                  ADMIN
                </span>
              )}
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { Plus, FileText, Eye, TrendingUp, Edit, Trash2 } from 'lucide-react';
import type { LandingPage } from '../types';

export function LandingPagesPage() {
  const { user } = useAuth();
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadPages();
  }, [user]);

  async function loadPages() {
    if (!user) return;

    const { data } = await supabase
      .from('landing_pages')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setPages(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir esta landing page?')) return;

    await supabase.from('landing_pages').delete().eq('id', id);
    loadPages();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Landing Pages</h1>
            <p className="text-gray-400">Gerencie suas páginas de captura</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Nova Landing Page
          </button>
        </div>

        {pages.length === 0 ? (
          <div className="bg-card border border-primary/30 rounded-lg p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nenhuma landing page criada</h3>
            <p className="text-gray-400 mb-6">
              Crie sua primeira landing page para começar a capturar leads
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Criar Primeira Landing Page
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map(page => (
              <div
                key={page.id}
                className="bg-card border border-primary/30 rounded-lg p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{page.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">/{page.slug}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      page.status === 'published'
                        ? 'bg-green-500/20 text-green-400'
                        : page.status === 'draft'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {page.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-primary/10">
                  <div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <Eye size={14} />
                      <span>Visitas</span>
                    </div>
                    <p className="text-lg font-bold text-white">{page.views_count}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <FileText size={14} />
                      <span>Leads</span>
                    </div>
                    <p className="text-lg font-bold text-white">{page.leads_count}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <TrendingUp size={14} />
                      <span>Conv.</span>
                    </div>
                    <p className="text-lg font-bold text-white">{page.conversion_rate}%</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/editor/${page.id}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(page.id)}
                    className="p-2 bg-destructive/20 hover:bg-destructive/30 text-destructive rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showCreateModal && (
          <CreatePageModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => {
              setShowCreateModal(false);
              loadPages();
            }}
          />
        )}
      </div>
    </div>
  );
}

interface CreatePageModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

function CreatePageModal({ onClose, onSuccess }: CreatePageModalProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await supabase.from('landing_pages').insert({
        user_id: user.id,
        title,
        slug,
        status: 'draft',
        views_count: 0,
        leads_count: 0,
        conversion_rate: 0,
      });

      onSuccess();
    } catch (error) {
      console.error('Error creating page:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-primary rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-6">Nova Landing Page</h2>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Título da Página
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
              }}
              required
              className="w-full px-4 py-3 bg-background border border-primary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Minha Landing Page"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL (Slug)
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background border border-primary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="minha-landing-page"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-muted hover:bg-muted/80 text-white py-3 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-accent hover:bg-accent/90 text-white py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Criando...' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Plus, Link as LinkIcon, Mail, MessageSquare, Webhook, Trash2, Power, PowerOff } from 'lucide-react';
import type { Integration } from '../types';

const INTEGRATION_TYPES = [
  { value: 'crm', label: 'CRM', icon: <LinkIcon size={20} /> },
  { value: 'email', label: 'Email Marketing', icon: <Mail size={20} /> },
  { value: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare size={20} /> },
  { value: 'webhook', label: 'Webhook', icon: <Webhook size={20} /> },
];

export function IntegrationsPage() {
  const { user } = useAuth();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadIntegrations();
  }, [user]);

  async function loadIntegrations() {
    if (!user) return;

    const { data } = await supabase
      .from('integrations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setIntegrations(data || []);
    setLoading(false);
  }

  async function toggleActive(id: string, isActive: boolean) {
    await supabase
      .from('integrations')
      .update({ is_active: !isActive })
      .eq('id', id);

    loadIntegrations();
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir esta integração?')) return;

    await supabase.from('integrations').delete().eq('id', id);
    loadIntegrations();
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Acesso restrito a administradores</div>
      </div>
    );
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
            <h1 className="text-3xl font-bold text-white mb-2">Integrações</h1>
            <p className="text-gray-400">Conecte com ferramentas externas</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Nova Integração
          </button>
        </div>

        {integrations.length === 0 ? (
          <div className="bg-card border border-primary/30 rounded-lg p-12 text-center">
            <LinkIcon size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nenhuma integração configurada</h3>
            <p className="text-gray-400 mb-6">
              Configure integrações com CRMs, email marketing e outras ferramentas
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Configurar Primeira Integração
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => {
              const typeInfo = INTEGRATION_TYPES.find(t => t.value === integration.type);
              return (
                <div
                  key={integration.id}
                  className="bg-card border border-primary/30 rounded-lg p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/20 rounded-lg text-accent">
                        {typeInfo?.icon || <LinkIcon size={24} />}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{integration.name}</h3>
                        <p className="text-sm text-gray-400">{typeInfo?.label}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleActive(integration.id, integration.is_active)}
                      className={`p-2 rounded-lg transition-colors ${
                        integration.is_active
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                      }`}
                    >
                      {integration.is_active ? <Power size={18} /> : <PowerOff size={18} />}
                    </button>
                  </div>

                  <div className="bg-muted rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-400 mb-2">Configuração:</p>
                    <p className="text-white text-sm font-mono">
                      {JSON.stringify(integration.config).substring(0, 50)}...
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition-colors">
                      Configurar
                    </button>
                    <button
                      onClick={() => handleDelete(integration.id)}
                      className="p-2 bg-destructive/20 hover:bg-destructive/30 text-destructive rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showCreateModal && (
          <CreateIntegrationModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => {
              setShowCreateModal(false);
              loadIntegrations();
            }}
          />
        )}
      </div>
    </div>
  );
}

interface CreateIntegrationModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

function CreateIntegrationModal({ onClose, onSuccess }: CreateIntegrationModalProps) {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [type, setType] = useState<'crm' | 'email' | 'whatsapp' | 'webhook'>('crm');
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await supabase.from('integrations').insert({
        user_id: user.id,
        name,
        type,
        config: {
          api_key: apiKey,
          api_url: apiUrl,
        },
        is_active: true,
      });

      onSuccess();
    } catch (error) {
      console.error('Error creating integration:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-primary rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-6">Nova Integração</h2>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nome da Integração
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background border border-primary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="HubSpot CRM"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              required
              className="w-full px-4 py-3 bg-background border border-primary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {INTEGRATION_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              API Key
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background border border-primary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="sua-api-key"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              API URL
            </label>
            <input
              type="url"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background border border-primary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="https://api.exemplo.com"
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

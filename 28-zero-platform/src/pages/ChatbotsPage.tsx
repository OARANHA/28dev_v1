import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Plus, Bot, MessageSquare, Trash2, Power, PowerOff } from 'lucide-react';
import type { Chatbot } from '../types';

export function ChatbotsPage() {
  const { user } = useAuth();
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadChatbots();
  }, [user]);

  async function loadChatbots() {
    if (!user) return;

    const { data } = await supabase
      .from('chatbots')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setChatbots(data || []);
    setLoading(false);
  }

  async function toggleActive(id: string, isActive: boolean) {
    await supabase
      .from('chatbots')
      .update({ is_active: !isActive })
      .eq('id', id);

    loadChatbots();
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir este chatbot?')) return;

    await supabase.from('chatbots').delete().eq('id', id);
    loadChatbots();
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
            <h1 className="text-3xl font-bold text-white mb-2">Chatbots & Agentes de IA</h1>
            <p className="text-gray-400">Gerencie seus assistentes virtuais</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Novo Chatbot
          </button>
        </div>

        {chatbots.length === 0 ? (
          <div className="bg-card border border-primary/30 rounded-lg p-12 text-center">
            <Bot size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nenhum chatbot criado</h3>
            <p className="text-gray-400 mb-6">
              Crie seu primeiro chatbot para automatizar conversas e capturar leads
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Criar Primeiro Chatbot
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chatbots.map((chatbot) => (
              <div
                key={chatbot.id}
                className="bg-card border border-primary/30 rounded-lg p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/20 rounded-lg text-accent">
                      <Bot size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{chatbot.name}</h3>
                      <p className="text-sm text-gray-400">{chatbot.purpose}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleActive(chatbot.id, chatbot.is_active)}
                    className={`p-2 rounded-lg transition-colors ${
                      chatbot.is_active
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                    }`}
                  >
                    {chatbot.is_active ? <Power size={18} /> : <PowerOff size={18} />}
                  </button>
                </div>

                <div className="bg-muted rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-400 mb-2">Mensagem de Saudação:</p>
                  <p className="text-white text-sm">
                    {chatbot.greeting_message || 'Não configurada'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-primary/10">
                  <div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <MessageSquare size={14} />
                      <span>Conversas</span>
                    </div>
                    <p className="text-lg font-bold text-white">0</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <MessageSquare size={14} />
                      <span>Leads</span>
                    </div>
                    <p className="text-lg font-bold text-white">0</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition-colors">
                    Configurar
                  </button>
                  <button
                    onClick={() => handleDelete(chatbot.id)}
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
          <CreateChatbotModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => {
              setShowCreateModal(false);
              loadChatbots();
            }}
          />
        )}
      </div>
    </div>
  );
}

interface CreateChatbotModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

function CreateChatbotModal({ onClose, onSuccess }: CreateChatbotModalProps) {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [greetingMessage, setGreetingMessage] = useState('');
  const [fallbackMessage, setFallbackMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await supabase.from('chatbots').insert({
        user_id: user.id,
        name,
        purpose,
        greeting_message: greetingMessage,
        fallback_message: fallbackMessage,
        is_active: true,
        training_data: [],
      });

      onSuccess();
    } catch (error) {
      console.error('Error creating chatbot:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-primary rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Novo Chatbot</h2>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nome do Chatbot
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background border border-primary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Assistente de Vendas"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Propósito
            </label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background border border-primary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Capturar leads e responder dúvidas"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mensagem de Saudação
            </label>
            <textarea
              value={greetingMessage}
              onChange={(e) => setGreetingMessage(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-primary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent h-24"
              placeholder="Olá! Como posso ajudar você hoje?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Mensagem de Fallback
            </label>
            <textarea
              value={fallbackMessage}
              onChange={(e) => setFallbackMessage(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-primary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent h-24"
              placeholder="Desculpe, não entendi. Pode reformular sua pergunta?"
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

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export function SetupPage({ onComplete }: { onComplete: () => void }) {
  const [status, setStatus] = useState<'checking' | 'setting-up' | 'success' | 'error'>('checking');
  const [message, setMessage] = useState('Verificando configuracao do banco de dados...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setupDatabase();
  }, []);

  async function setupDatabase() {
    try {
      // 1. Verificar se o banco ja esta configurado
      setMessage('Verificando tabelas existentes...');
      const { data: existingProfiles, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);

      if (!checkError) {
        // Banco ja configurado
        setStatus('success');
        setMessage('Banco de dados ja configurado!');
        setTimeout(() => onComplete(), 1500);
        return;
      }

      // 2. Banco precisa ser configurado
      setStatus('setting-up');
      setMessage('Configurando banco de dados automaticamente...');
      setProgress(10);

      // Tentar chamar Edge Function de setup
      const { data: setupData, error: setupError } = await supabase.functions.invoke('setup-database');
      
      if (setupError) {
        // Se a Edge Function falhar, mostrar instrucoes
        setStatus('error');
        setMessage('Necessaria configuracao manual do banco de dados.');
        return;
      }

      setProgress(100);
      setStatus('success');
      setMessage('Banco de dados configurado com sucesso!');
      setTimeout(() => onComplete(), 2000);

    } catch (error) {
      console.error('Erro ao configurar banco:', error);
      setStatus('error');
      setMessage('Erro ao configurar banco de dados.');
    }
  }

  if (status === 'checking' || status === 'setting-up') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="max-w-md w-full p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              <span className="text-accent">28</span> Zero
            </h1>
            <p className="text-gray-400">Plataforma de Solucoes Digitais</p>
          </div>

          <div className="bg-card border border-primary rounded-lg p-8">
            <div className="flex items-center justify-center mb-6">
              <Loader2 className="animate-spin text-accent" size={48} />
            </div>
            
            <h2 className="text-xl font-bold text-white text-center mb-4">
              Configurando Plataforma
            </h2>
            
            <p className="text-gray-400 text-center mb-6">{message}</p>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="max-w-md w-full p-8">
          <div className="bg-card border border-primary rounded-lg p-8 text-center">
            <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-white mb-2">
              Configuracao Completa!
            </h2>
            <p className="text-gray-400">{message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-card border border-destructive rounded-lg p-8">
          <XCircle className="mx-auto text-destructive mb-4" size={64} />
          
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            Configuracao Manual Necessaria
          </h2>
          
          <div className="bg-muted rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              Para usar a plataforma, voce precisa configurar o banco de dados manualmente.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="bg-accent text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span>
                <p className="text-gray-300">
                  Acesse o <a href="https://fdxrxspneinmuoxmmqrt.supabase.co" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Supabase Dashboard</a>
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="bg-accent text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
                <p className="text-gray-300">
                  Clique em "SQL Editor" no menu lateral
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="bg-accent text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</span>
                <p className="text-gray-300">
                  Copie e execute o script SQL localizado em <code className="bg-background px-2 py-1 rounded text-accent">/workspace/docs/database-setup.sql</code>
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="bg-accent text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">4</span>
                <p className="text-gray-300">
                  Atualize esta pagina
                </p>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Recarregar Pagina
          </button>
        </div>
      </div>
    </div>
  );
}

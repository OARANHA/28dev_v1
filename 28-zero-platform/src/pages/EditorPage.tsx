import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  GripVertical, 
  Type, 
  Image as ImageIcon, 
  Square, 
  Mail,
  Save,
  Eye,
  ArrowLeft,
  Trash2
} from 'lucide-react';
import type { PageComponent } from '../types';

interface ComponentType {
  id: string;
  type: string;
  label: string;
  icon: React.ReactNode;
}

const COMPONENT_TYPES: ComponentType[] = [
  { id: 'heading', type: 'heading', label: 'Título', icon: <Type size={20} /> },
  { id: 'text', type: 'text', label: 'Texto', icon: <Type size={20} /> },
  { id: 'image', type: 'image', label: 'Imagem', icon: <ImageIcon size={20} /> },
  { id: 'button', type: 'button', label: 'Botão', icon: <Square size={20} /> },
  { id: 'form', type: 'form', label: 'Formulário', icon: <Mail size={20} /> },
];

interface SortableComponentProps {
  component: PageComponent & { tempId: string };
  onEdit: (component: PageComponent & { tempId: string }) => void;
  onDelete: (id: string) => void;
}

function SortableComponent({ component, onEdit, onDelete }: SortableComponentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: component.tempId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-card border border-primary/30 rounded-lg p-4 mb-3 hover:border-primary/50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-white">
          <GripVertical size={20} />
        </div>
        <div className="flex-1">
          <ComponentPreview component={component} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(component)}
            className="text-primary hover:text-accent transition-colors"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(component.tempId)}
            className="text-destructive hover:text-destructive/80 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ComponentPreview({ component }: { component: PageComponent }) {
  const content = component.content;

  switch (component.component_type) {
    case 'heading':
      return <h2 className="text-2xl font-bold text-white">{content.text || 'Título'}</h2>;
    case 'text':
      return <p className="text-gray-400">{content.text || 'Parágrafo de texto'}</p>;
    case 'image':
      return <div className="bg-muted h-24 rounded flex items-center justify-center text-gray-400">Imagem</div>;
    case 'button':
      return <button className="bg-accent text-white px-6 py-2 rounded">{content.text || 'Botão'}</button>;
    case 'form':
      return <div className="bg-muted p-4 rounded text-gray-400">Formulário de Captura</div>;
    default:
      return <div className="text-gray-400">Componente</div>;
  }
}

export function EditorPage() {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<any>(null);
  const [components, setComponents] = useState<(PageComponent & { tempId: string })[]>([]);
  const [editingComponent, setEditingComponent] = useState<(PageComponent & { tempId: string }) | null>(null);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    loadPage();
  }, [pageId]);

  async function loadPage() {
    if (!pageId) return;

    const { data: pageData } = await supabase
      .from('landing_pages')
      .select('*')
      .eq('id', pageId)
      .maybeSingle();

    const { data: componentsData } = await supabase
      .from('page_components')
      .select('*')
      .eq('page_id', pageId)
      .order('position');

    setPage(pageData);
    setComponents(
      (componentsData || []).map((c, i) => ({ ...c, tempId: `${c.id || i}` }))
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((i) => i.tempId === active.id);
        const newIndex = items.findIndex((i) => i.tempId === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function addComponent(type: string) {
    const newComponent: PageComponent & { tempId: string } = {
      id: '',
      page_id: pageId!,
      component_type: type,
      position: components.length,
      config: {},
      content: { text: '' },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tempId: `temp-${Date.now()}`,
    };

    setComponents([...components, newComponent]);
    setEditingComponent(newComponent);
  }

  function deleteComponent(tempId: string) {
    setComponents(components.filter((c) => c.tempId !== tempId));
  }

  function updateComponent(updated: PageComponent & { tempId: string }) {
    setComponents(
      components.map((c) => (c.tempId === updated.tempId ? updated : c))
    );
    setEditingComponent(null);
  }

  async function handleSave() {
    if (!pageId) return;

    setSaving(true);
    try {
      await supabase.from('page_components').delete().eq('page_id', pageId);

      const componentsToInsert = components.map((c, index) => ({
        page_id: pageId,
        component_type: c.component_type,
        position: index,
        config: c.config,
        content: c.content,
      }));

      await supabase.from('page_components').insert(componentsToInsert);

      alert('Página salva com sucesso!');
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Erro ao salvar página');
    } finally {
      setSaving(false);
    }
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Carregando editor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/landing-pages')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{page.title}</h1>
              <p className="text-gray-400">Editor de Landing Page</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors">
              <Eye size={20} />
              Visualizar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-card border border-primary/30 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-4">Componentes</h2>
              <div className="space-y-2">
                {COMPONENT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => addComponent(type.type)}
                    className="w-full flex items-center gap-3 bg-muted hover:bg-muted/80 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    {type.icon}
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-card border border-primary/30 rounded-lg p-6 min-h-[600px]">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={components.map((c) => c.tempId)}
                  strategy={verticalListSortingStrategy}
                >
                  {components.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                      <p className="text-lg mb-2">Nenhum componente adicionado</p>
                      <p className="text-sm">Adicione componentes do menu lateral</p>
                    </div>
                  ) : (
                    components.map((component) => (
                      <SortableComponent
                        key={component.tempId}
                        component={component}
                        onEdit={setEditingComponent}
                        onDelete={deleteComponent}
                      />
                    ))
                  )}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </div>
      </div>

      {editingComponent && (
        <ComponentEditModal
          component={editingComponent}
          onSave={updateComponent}
          onClose={() => setEditingComponent(null)}
        />
      )}
    </div>
  );
}

interface ComponentEditModalProps {
  component: PageComponent & { tempId: string };
  onSave: (component: PageComponent & { tempId: string }) => void;
  onClose: () => void;
}

function ComponentEditModal({ component, onSave, onClose }: ComponentEditModalProps) {
  const [content, setContent] = useState(component.content);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    onSave({ ...component, content });
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-primary rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-6">Editar Componente</h2>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Conteúdo
            </label>
            <textarea
              value={content.text || ''}
              onChange={(e) => setContent({ ...content, text: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-primary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent h-32"
              placeholder="Digite o conteúdo..."
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
              className="flex-1 bg-accent hover:bg-accent/90 text-white py-3 rounded-lg transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

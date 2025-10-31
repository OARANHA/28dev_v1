export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'user' | 'client';
  avatar_url?: string;
  two_factor_enabled: boolean;
}

export interface LandingPage {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  meta_description?: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  views_count: number;
  leads_count: number;
  conversion_rate: number;
  created_at: string;
  updated_at: string;
}

export interface PageComponent {
  id: string;
  page_id: string;
  component_type: string;
  position: number;
  config: Record<string, any>;
  content: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Chatbot {
  id: string;
  user_id: string;
  name: string;
  purpose: string;
  training_data: any[];
  is_active: boolean;
  greeting_message?: string;
  fallback_message?: string;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  page_id?: string;
  chatbot_id?: string;
  name: string;
  email: string;
  phone?: string;
  metadata: Record<string, any>;
  source?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  created_at: string;
  updated_at: string;
}

export interface Integration {
  id: string;
  user_id: string;
  type: 'crm' | 'email' | 'whatsapp' | 'webhook';
  name: string;
  config: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DashboardMetrics {
  totalVisitors: number;
  totalLeads: number;
  totalSales: number;
  conversionRate: number;
  recentLeads: Lead[];
  topPages: LandingPage[];
}

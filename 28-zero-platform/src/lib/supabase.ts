import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://fdxrxspneinmuoxmmqrt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkeHJ4c3BuZWlubXVveG1tcXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNzczNzMsImV4cCI6MjA3Njg1MzM3M30.b9OH9vZSlVFLAOGLERrhIpWPBVIeNe6G3RGrSnol2gQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: 'admin' | 'user' | 'client';
          two_factor_enabled: boolean;
          two_factor_secret: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      landing_pages: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          slug: string;
          meta_description: string | null;
          status: 'draft' | 'published' | 'archived';
          published_at: string | null;
          views_count: number;
          leads_count: number;
          conversion_rate: number;
          created_at: string;
          updated_at: string;
        };
      };
      page_components: {
        Row: {
          id: string;
          page_id: string;
          component_type: string;
          position: number;
          config: any;
          content: any;
          created_at: string;
          updated_at: string;
        };
      };
      chatbots: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          purpose: string;
          training_data: any[];
          is_active: boolean;
          greeting_message: string | null;
          fallback_message: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          chatbot_id: string;
          visitor_id: string;
          messages: any[];
          lead_captured: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      leads: {
        Row: {
          id: string;
          page_id: string | null;
          chatbot_id: string | null;
          name: string;
          email: string;
          phone: string | null;
          metadata: any;
          source: string | null;
          status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
          created_at: string;
          updated_at: string;
        };
      };
      integrations: {
        Row: {
          id: string;
          user_id: string;
          type: 'crm' | 'email' | 'whatsapp' | 'webhook';
          name: string;
          config: any;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
};

import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TrendingUp, Users, MousePointer, DollarSign } from 'lucide-react';
import type { Lead, LandingPage } from '../types';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
}

function MetricCard({ title, value, icon, trend }: MetricCardProps) {
  return (
    <div className="bg-card border border-primary/30 rounded-lg p-6 hover:border-primary/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-primary/20 rounded-lg text-accent">
          {icon}
        </div>
        {trend && (
          <span className="text-sm text-green-400 flex items-center gap-1">
            <TrendingUp size={16} />
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

const columnHelper = createColumnHelper<Lead>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Nome',
    cell: info => <span className="text-white">{info.getValue()}</span>,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => <span className="text-gray-400">{info.getValue()}</span>,
  }),
  columnHelper.accessor('phone', {
    header: 'Telefone',
    cell: info => <span className="text-gray-400">{info.getValue() || '-'}</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue();
      const colors = {
        new: 'bg-blue-500/20 text-blue-400',
        contacted: 'bg-yellow-500/20 text-yellow-400',
        qualified: 'bg-purple-500/20 text-purple-400',
        converted: 'bg-green-500/20 text-green-400',
        lost: 'bg-red-500/20 text-red-400',
      };
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
          {status}
        </span>
      );
    },
  }),
  columnHelper.accessor('created_at', {
    header: 'Data',
    cell: info => (
      <span className="text-gray-400">
        {new Date(info.getValue()).toLocaleDateString('pt-BR')}
      </span>
    ),
  }),
];

export function DashboardPage() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    totalVisitors: 0,
    totalLeads: 0,
    totalSales: 0,
    conversionRate: 0,
  });
  const [leads, setLeads] = useState<Lead[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const table = useReactTable({
    data: leads,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    async function loadDashboardData() {
      if (!user) return;

      try {
        const { data: landingPages } = await supabase
          .from('landing_pages')
          .select('views_count, leads_count')
          .eq('user_id', user.id);

        const { data: leadsData } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        const totalVisitors = landingPages?.reduce((sum, p) => sum + p.views_count, 0) || 0;
        const totalLeads = landingPages?.reduce((sum, p) => sum + p.leads_count, 0) || 0;
        const totalSales = leadsData?.filter(l => l.status === 'converted').length || 0;
        const conversionRate = totalVisitors > 0 ? (totalLeads / totalVisitors) * 100 : 0;

        setMetrics({
          totalVisitors,
          totalLeads,
          totalSales,
          conversionRate: Math.round(conversionRate * 10) / 10,
        });

        setLeads(leadsData || []);

        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          return {
            date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
            leads: Math.floor(Math.random() * 20) + 5,
            vendas: Math.floor(Math.random() * 10) + 2,
          };
        });

        setChartData(last7Days);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Carregando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Visão geral das suas métricas e performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total de Visitantes"
            value={metrics.totalVisitors.toLocaleString()}
            icon={<MousePointer size={24} />}
            trend="+12%"
          />
          <MetricCard
            title="Total de Leads"
            value={metrics.totalLeads.toLocaleString()}
            icon={<Users size={24} />}
            trend="+8%"
          />
          <MetricCard
            title="Vendas Convertidas"
            value={metrics.totalSales.toLocaleString()}
            icon={<DollarSign size={24} />}
            trend="+15%"
          />
          <MetricCard
            title="Taxa de Conversão"
            value={`${metrics.conversionRate}%`}
            icon={<TrendingUp size={24} />}
            trend="+3%"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-primary/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Performance Semanal</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e3a8a',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#f97316" strokeWidth={2} />
                <Line type="monotone" dataKey="vendas" stroke="#1e3a8a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-primary/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Comparativo Mensal</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e3a8a',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="leads" fill="#f97316" />
                <Bar dataKey="vendas" fill="#1e3a8a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-primary/30 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Leads Recentes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id} className="border-b border-primary/30">
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="text-left py-3 px-4 text-gray-400 font-medium"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr
                    key={row.id}
                    className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="py-3 px-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

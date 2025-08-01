import { useState, useEffect } from 'react';

const API_BASE_URL = 'https://seudominio.com.br/api';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const apiClient = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
  
  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  put: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
};

export const useApi = <T,>(endpoint: string): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiClient.get(endpoint);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      // For demo purposes, set mock data
      setData(getMockData(endpoint) as T);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, error, refetch: fetchData };
};

// Mock data for development
const getMockData = (endpoint: string) => {
  if (endpoint.includes('/admin/dashboard')) {
    return {
      total_projects: 1247,
      projects_by_status: {
        submitted: 423,
        selected: 312,
        evaluated: 267,
        awarded: 45
      },
      projects_by_category: [
        { category: 'I', count: 156, percentage: 12.5 },
        { category: 'II', count: 189, percentage: 15.2 },
        { category: 'III', count: 245, percentage: 19.6 },
        { category: 'IV', count: 178, percentage: 14.3 }
      ],
      recent_submissions: [
        { date: '2024-01-15', count: 23 },
        { date: '2024-01-16', count: 31 },
        { date: '2024-01-17', count: 28 }
      ]
    };
  }

  if (endpoint.includes('/financial/reports')) {
    return {
      total_revenue: 125400.50,
      pending_payments: 34200.00,
      overdue_payments: 8750.00,
      exemptions_granted: 15600.00,
      payments_by_category: [
        { category: 'I', amount: 15600 },
        { category: 'II', amount: 23400 },
        { category: 'III', amount: 31200 }
      ]
    };
  }

  if (endpoint.includes('/projects')) {
    return [
      {
        id: 1,
        title: 'Projeto de Robótica Educacional',
        category: 'III',
        status: 'selected',
        created_at: '2024-01-10',
        members: ['João Silva', 'Maria Santos']
      },
      {
        id: 2,
        title: 'Sustentabilidade na Escola',
        category: 'II',
        status: 'submitted',
        created_at: '2024-01-12',
        members: ['Ana Costa', 'Pedro Lima']
      }
    ];
  }

  return {};
};

export { apiClient };
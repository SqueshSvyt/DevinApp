import { Container, ContainerListResponse, ContainerCreateData, ContainerUpdateData, PerformanceMetrics } from '../types/containers';
import { Tenant } from '../types/metrics';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new ApiError(response.status, errorText || response.statusText);
  }
  return response.json();
}

export const containerApi = {
  async getContainers(params: {
    skip?: number;
    limit?: number;
    search?: string;
    type_filter?: string;
    tenant_filter?: string;
    purpose_filter?: string;
    status_filter?: string;
    has_alerts?: boolean;
  } = {}): Promise<ContainerListResponse> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/containers?${searchParams}`);
    return handleResponse<ContainerListResponse>(response);
  },

  async getContainer(id: string): Promise<Container> {
    const response = await fetch(`${API_BASE_URL}/containers/${id}`);
    return handleResponse<Container>(response);
  },

  async createContainer(data: ContainerCreateData): Promise<Container> {
    const response = await fetch(`${API_BASE_URL}/containers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<Container>(response);
  },

  async updateContainer(id: string, data: ContainerUpdateData): Promise<Container> {
    const response = await fetch(`${API_BASE_URL}/containers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<Container>(response);
  },

  async deleteContainer(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/containers/${id}`, {
      method: 'DELETE',
    });
    await handleResponse<void>(response);
  },

  async getPerformanceMetrics(typeFilter?: string): Promise<PerformanceMetrics> {
    const searchParams = new URLSearchParams();
    if (typeFilter) {
      searchParams.append('type_filter', typeFilter);
    }
    
    const response = await fetch(`${API_BASE_URL}/containers/performance?${searchParams}`);
    return handleResponse<PerformanceMetrics>(response);
  },
};

export const tenantApi = {
  async getTenants(): Promise<Tenant[]> {
    const response = await fetch(`${API_BASE_URL}/tenants`);
    return handleResponse<Tenant[]>(response);
  },
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatDateTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return '#4caf50';
    case 'maintenance':
      return '#ff9800';
    case 'inactive':
      return '#9e9e9e';
    case 'created':
      return '#757575';
    default:
      return '#757575';
  }
};

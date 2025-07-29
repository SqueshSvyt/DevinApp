import { useState, useEffect } from 'react';
import { Container, ContainerFilters, PerformanceMetrics } from '../types/containers';
import { Tenant } from '../types/metrics';
import { containerApi, tenantApi } from '../utils';

export const useContainers = (filters: ContainerFilters) => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchContainers = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        search: filters.search || undefined,
        type_filter: filters.type || undefined,
        tenant_filter: filters.tenant || undefined,
        purpose_filter: filters.purpose || undefined,
        status_filter: filters.status || undefined,
        has_alerts: filters.hasAlerts || undefined,
      };
      
      const response = await containerApi.getContainers(params);
      setContainers(response.containers);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch containers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContainers();
  }, [filters]);

  return {
    containers,
    loading,
    error,
    total,
    refetch: fetchContainers,
  };
};

export const usePerformanceMetrics = (typeFilter?: string, timePeriod?: string) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await containerApi.getPerformanceMetrics(typeFilter, timePeriod);
      setMetrics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [typeFilter, timePeriod]);

  return {
    metrics,
    loading,
    error,
    refetch: fetchMetrics,
  };
};

export const useTenants = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTenants = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tenantApi.getTenants();
      setTenants(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tenants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return {
    tenants,
    loading,
    error,
    refetch: fetchTenants,
  };
};

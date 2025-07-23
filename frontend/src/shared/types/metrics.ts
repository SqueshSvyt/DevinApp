export interface Tenant {
  id: string;
  name: string;
}

export interface TimeRange {
  label: string;
  value: string;
  days: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface PerformanceChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

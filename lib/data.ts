import { addDays, format, subDays } from 'date-fns';
import { getRandomData } from './utils';

// Types for our data
export interface MetricData {
  id: string;
  name: string;
  value: number;
  change: number;
  previousValue: number;
  icon: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface TimeSeriesData {
  date: string;
  sales: number;
  visitors: number;
  orders: number;
}

export interface CustomerData {
  id: string;
  segment: string;
  value: number;
  color: string;
}

export interface ProductData {
  id: string;
  name: string;
  sales: number;
  change: number;
}

// Generate dates for the last 30 days
export function getDates(days: number = 30): string[] {
  return Array.from({ length: days }, (_, i) => {
    return format(subDays(new Date(), days - i - 1), 'MMM dd');
  });
}

// Generate mock data for metrics
export function getMetricsData(): MetricData[] {
  return [
    {
      id: 'revenue',
      name: 'Total Revenue',
      value: 254890,
      previousValue: 231560,
      change: 10.1,
      icon: 'banknote',
    },
    {
      id: 'orders',
      name: 'Total Orders',
      value: 12456,
      previousValue: 10983,
      change: 13.4,
      icon: 'shopping-cart',
    },
    {
      id: 'customers',
      name: 'New Customers',
      value: 3854,
      previousValue: 3621,
      change: 6.4,
      icon: 'users',
    },
    {
      id: 'aov',
      name: 'Avg. Order Value',
      value: 189,
      previousValue: 201,
      change: -6.0,
      icon: 'receipt',
    },
  ];
}

// Generate sales data for the line chart
export function getSalesData(days: number = 30): TimeSeriesData[] {
  const dates = getDates(days);
  const salesValues = getRandomData(days, 10000, 25000);
  const visitorsValues = getRandomData(days, 5000, 15000);
  const ordersValues = getRandomData(days, 500, 1200);

  return dates.map((date, index) => ({
    date,
    sales: salesValues[index],
    visitors: visitorsValues[index],
    orders: ordersValues[index],
  }));
}

// Generate customer segment data for the pie chart
export function getCustomerSegmentData(): CustomerData[] {
  return [
    { id: '1', segment: 'New Customers', value: 35, color: 'var(--chart-1)' },
    { id: '2', segment: 'Returning', value: 45, color: 'var(--chart-2)' },
    { id: '3', segment: 'Loyal', value: 20, color: 'var(--chart-3)' },
  ];
}

// Generate top products data
export function getTopProductsData(): ProductData[] {
  return [
    { id: '1', name: 'Wireless Headphones', sales: 1245, change: 12.5 },
    { id: '2', name: 'Smart Watch', sales: 986, change: 8.3 },
    { id: '3', name: 'Fitness Tracker', sales: 879, change: -3.2 },
    { id: '4', name: 'Bluetooth Speaker', sales: 765, change: 15.7 },
    { id: '5', name: 'Wireless Earbuds', sales: 652, change: 5.9 },
  ];
}

// Generate sales by channel data for the bar chart
export function getSalesByChannelData(): ChartData[] {
  return [
    { name: 'Direct', value: 45000 },
    { name: 'Organic', value: 28000 },
    { name: 'Referral', value: 15000 },
    { name: 'Social', value: 22000 },
    { name: 'Email', value: 18000 },
  ];
}

// Function to filter data based on date range
export function filterDataByDateRange(data: any[], from: Date, to: Date): any[] {
  // In a real app, this would filter based on actual dates
  // For this demo, we'll just return different random data based on the range
  const days = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
  return getSalesData(days);
}
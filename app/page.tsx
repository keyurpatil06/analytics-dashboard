"use client";

import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { 
  getMetricsData, 
  getSalesData, 
  getCustomerSegmentData, 
  getSalesByChannelData,
  getTopProductsData,
  filterDataByDateRange
} from '@/lib/data';
import { DEFAULT_DATE_RANGE, formatDateRange, getRandomData } from '@/lib/utils';
import { MetricCard } from '@/components/dashboard/metric-card';
import { SalesChart } from '@/components/dashboard/charts/sales-chart';
import { CustomersChart } from '@/components/dashboard/charts/customers-chart';
import { SalesByChannel } from '@/components/dashboard/charts/sales-by-channel';
import { TopProducts } from '@/components/dashboard/top-products';
import { DateRangePicker } from '@/components/ui/date-range-picker';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>(DEFAULT_DATE_RANGE);
  const [metrics, setMetrics] = useState(getMetricsData());
  const [salesData, setSalesData] = useState(getSalesData());
  const [customerData, setCustomerData] = useState(getCustomerSegmentData());
  const [channelData, setChannelData] = useState(getSalesByChannelData());
  const [productsData, setProductsData] = useState(getTopProductsData());
  
  // Generate historical data for metric cards
  const generateHistoricalData = (metric: string) => {
    const multiplier = metric === 'revenue' ? 1000 : metric === 'orders' ? 100 : metric === 'customers' ? 10 : 1;
    const min = metric === 'aov' ? 160 : 5;
    const max = metric === 'aov' ? 220 : 25;
    
    return Array.from({ length: 10 }).map((_, i) => ({
      date: `Day ${i + 1}`,
      value: (getRandomData(1, min, max)[0]) * multiplier,
    }));
  };

  const handleDateRangeChange = (range: DateRange) => {
    if (range?.from && range?.to) {
      setIsLoading(true);
      setDateRange(range);
      
      // Simulate API call with loading state
      setTimeout(() => {
        // In a real app, these would be API calls with the date range
        const days = Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24));
        setSalesData(getSalesData(days));
        setMetrics(getMetricsData());
        setCustomerData(getCustomerSegmentData());
        setChannelData(getSalesByChannelData());
        setProductsData(getTopProductsData());
        setIsLoading(false);
      }, 800);
    }
  };

  // Initial load simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container py-6 space-y-8 max-w-screen-2xl mx-2">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            {dateRange.from && dateRange.to 
              ? `Analytics for ${formatDateRange(dateRange.from, dateRange.to)}`
              : 'Welcome to your analytics dashboard'}
          </p>
        </div>
        <DateRangePicker 
          dateRange={dateRange} 
          onDateRangeChange={handleDateRangeChange} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div 
            key={metric.id}
            className={`${isLoading ? 'opacity-60 animate-pulse' : 'opacity-100'} transition-opacity duration-500`}
          >
            <MetricCard 
              data={metric}
              historicalData={generateHistoricalData(metric.id)}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div 
          className={`lg:col-span-3 ${isLoading ? 'opacity-60 animate-pulse' : 'opacity-100'} transition-opacity duration-500`}
        >
          <SalesChart data={salesData} />
        </div>
        <div 
          className={`${isLoading ? 'opacity-60 animate-pulse' : 'opacity-100'} transition-opacity duration-500`}
        >
          <TopProducts data={productsData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className={`${isLoading ? 'opacity-60 animate-pulse' : 'opacity-100'} transition-opacity duration-500`}
        >
          <CustomersChart data={customerData} />
        </div>
        <div 
          className={`${isLoading ? 'opacity-60 animate-pulse' : 'opacity-100'} transition-opacity duration-500`}
        >
          <SalesByChannel data={channelData} />
        </div>
      </div>
    </div>
  );
}
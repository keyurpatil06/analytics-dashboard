"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartData } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

interface SalesByChannelProps {
  data: ChartData[];
}

export function SalesByChannel({ data }: SalesByChannelProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Sales by Channel</CardTitle>
        <CardDescription>
          Distribution of revenue across marketing channels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 30,
                bottom: 5,
              }}
              barSize={36}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                contentStyle={{ 
                  background: 'var(--popover)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  color: 'var(--popover-foreground)'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="var(--chart-4)" 
                radius={[4, 4, 0, 0]}
                animationDuration={1200}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
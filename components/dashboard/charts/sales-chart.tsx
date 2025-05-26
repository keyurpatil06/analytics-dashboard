"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const dummyData = [
  { date: "2024-01", sales: 4000, visitors: 2400, orders: 240 },
  { date: "2024-02", sales: 3000, visitors: 2210, orders: 200 },
  { date: "2024-03", sales: 5000, visitors: 2290, orders: 278 },
  { date: "2024-04", sales: 4780, visitors: 2000, orders: 189 },
  { date: "2024-05", sales: 5890, visitors: 2181, orders: 239 },
  { date: "2024-06", sales: 4390, visitors: 2500, orders: 349 },
  { date: "2024-07", sales: 4490, visitors: 2100, orders: 400 },
];

function formatCurrency(val: number) {
  return `$${val.toLocaleString()}`;
}

function formatNumber(val: number) {
  return val.toLocaleString();
}

export function SalesChart() {
  const [activeKey, setActiveKey] = useState("sales");

  const formatYAxisTick = (value: number) =>
    activeKey === "sales" ? formatCurrency(value) : formatNumber(value);

  const formatTooltipValue = (value: number, name: string) => {
    if (name === "sales") return [formatCurrency(value), "Sales"];
    if (name === "visitors") return [formatNumber(value), "Visitors"];
    return [formatNumber(value), "Orders"];
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>Track sales, visitors, and orders over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sales" className="w-full" onValueChange={setActiveKey}>
          <TabsList className="grid w-[260px] grid-cols-3">
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="visitors">Visitors</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {["sales", "visitors", "orders"].map((key) => (
            <TabsContent key={key} value={key} className="mt-4 h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dummyData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={formatYAxisTick}
                  />
                  <Tooltip
                    formatter={formatTooltipValue}
                    contentStyle={{
                      background: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                      color: "#000",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey={key}
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill={`url(#color${key})`}
                    strokeWidth={2}
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

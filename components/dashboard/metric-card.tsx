"use client";

import React, { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { formatCurrency, formatNumber, formatPercent, cn } from "@/lib/utils";
import { MetricData } from "@/lib/data";

interface MetricCardProps {
  data: MetricData;
  historicalData?: { date: string; value: number }[];
}

export function MetricCard({ data, historicalData }: MetricCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Correctly type the icon component: get a React component or undefined
  // Safely extract the icon component
  const IconComponent = (LucideIcons as unknown as Record<string, React.ElementType>)[data.icon];

  const formatValue = (value: number) => {
    if (data.id === "revenue" || data.id === "aov") {
      return formatCurrency(value);
    }
    return formatNumber(value);
  };

  return (
    <>
      <Card
        className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {IconComponent && <IconComponent className="h-5 w-5 text-muted-foreground" />}
                <h3 className="font-medium text-sm text-muted-foreground">{data.name}</h3>
              </div>
              <div>
                <p className="text-2xl font-semibold">{formatValue(data.value)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div
                    className={cn(
                      "flex items-center text-xs font-medium",
                      data.change > 0 ? "text-emerald-500" : "text-rose-500"
                    )}
                  >
                    {data.change > 0 ? (
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3 mr-1" />
                    )}
                    {formatPercent(data.change)}
                  </div>
                  <span className="text-xs text-muted-foreground">vs. previous period</span>
                </div>
              </div>
            </div>
            {historicalData && (
              <div className="w-20 h-12 opacity-70">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalData}>
                    <defs>
                      <linearGradient id={`gradient-${data.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor={data.change >= 0 ? "var(--chart-1)" : "var(--chart-5)"}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="100%"
                          stopColor={data.change >= 0 ? "var(--chart-1)" : "var(--chart-5)"}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={data.change >= 0 ? "var(--chart-1)" : "var(--chart-5)"}
                      fillOpacity={1}
                      fill={`url(#gradient-${data.id})`}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {IconComponent && <IconComponent className="h-5 w-5" />}
              {data.name} Details
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Current</p>
                <p className="text-2xl font-semibold">{formatValue(data.value)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Previous</p>
                <p className="text-2xl font-semibold">{formatValue(data.previousValue)}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Period Change</p>
              <div
                className={cn(
                  "flex items-center text-lg font-medium",
                  data.change > 0 ? "text-emerald-500" : "text-rose-500"
                )}
              >
                {data.change > 0 ? (
                  <ArrowUpIcon className="h-5 w-5 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-5 w-5 mr-1" />
                )}
                {formatPercent(data.change)}
              </div>
            </div>
            {historicalData && (
              <div className="h-60">
                <p className="text-sm font-medium mb-2">Trend (Last 30 days)</p>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor={data.change >= 0 ? "var(--chart-1)" : "var(--chart-5)"}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={data.change >= 0 ? "var(--chart-1)" : "var(--chart-5)"}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) =>
                        data.id === "revenue" || data.id === "aov"
                          ? formatCurrency(value)
                          : formatNumber(value)
                      }
                    />
                    <Tooltip
                      formatter={(value: number) => [formatValue(value), data.name]}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={data.change >= 0 ? "var(--chart-1)" : "var(--chart-5)"}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

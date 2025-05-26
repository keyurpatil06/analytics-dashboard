"use client";

import { ArrowDownIcon, ArrowUpIcon, TrendingUpIcon } from "lucide-react";
import { ProductData } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatNumber, formatPercent } from "@/lib/utils";

interface TopProductsProps {
  data: ProductData[];
}

export function TopProducts({ data }: TopProductsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <TrendingUpIcon className="h-5 w-5 text-muted-foreground" />
              Top Products
            </CardTitle>
            <CardDescription>
              Best performing products by sales volume
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((product) => (
            <div key={product.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatNumber(product.sales)} units sold
                </p>
              </div>
              <div
                className={cn(
                  "flex items-center text-sm font-medium",
                  product.change > 0 ? "text-emerald-500" : "text-rose-500"
                )}
              >
                {product.change > 0 ? (
                  <ArrowUpIcon className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-4 w-4" />
                )}
                {formatPercent(product.change)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
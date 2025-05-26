"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3Icon,
  BoxIcon,
  LayoutDashboardIcon,
  ShoppingCartIcon,
  UsersIcon,
  Settings2Icon,
  GanttChartIcon,
  BellIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboardIcon className="h-5 w-5" />,
  },
];

export function NavSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-16 md:w-56 flex-col border-r bg-card">
      <div className="flex h-14 items-center px-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <BarChart3Icon className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight hidden md:block">
            InsightDash
          </span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 gap-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname === item.href
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground",
                "group"
              )}
            >
              {item.icon}
              <span className="hidden md:block">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center justify-between p-4 border-t">
        <div className="flex md:gap-2 items-center">
          <button className="rounded-full h-8 w-8 border flex items-center justify-center overflow-hidden bg-muted/50">
            <BellIcon className="h-4 w-4" />
          </button>
          <div className="hidden md:block">
            <p className="text-xs font-medium">Notifications</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}
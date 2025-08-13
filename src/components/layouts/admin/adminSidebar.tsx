"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart,
  Menu,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { name: "Inventory", path: "/admin/inventory", icon: Package },
  { name: "Sales", path: "/admin/sales", icon: BarChart },
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div>
      {/* Mobile Trigger Button */}
      <div className="md:hidden p-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SidebarContent
              pathname={pathname}
              onClickLink={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-white border-r">
        <SidebarContent pathname={pathname} />
      </aside>
    </div>
  );
}
function SidebarContent({
  pathname,
  onClickLink,
  isMobile = false,
}: {
  pathname: string;
  onClickLink?: () => void;
  isMobile?: boolean;
}) {
  return (
    <div className="flex flex-col h-full">
      {isMobile ? (
        // Inside mobile Sheet → OK to use SheetHeader
        <SheetHeader className="p-4">
          <SheetTitle className="text-lg font-bold">Admin Panel</SheetTitle>
        </SheetHeader>
      ) : (
        // Desktop header → plain div
        <div className="p-4">
          <h2 className="text-lg font-bold">Admin Panel</h2>
        </div>
      )}

      <Separator />

      <nav className="flex flex-col flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={onClickLink}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

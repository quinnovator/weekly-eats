"use client";

import { Icons } from "@weekly-eats/ui/icons";
import { Sidebar, SidebarProvider } from "@weekly-eats/ui/sidebar";
import { SidebarNav } from "@weekly-eats/ui/sidebar-nav";

const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: Icons.ForkKnife,
  },
  {
    title: "Weekly Meals",
    href: "/weekly-meals",
    icon: Icons.Calendar,
  },
  {
    title: "Family Members",
    href: "/family-members",
    icon: Icons.Settings,
  },
  {
    title: "Shopping List",
    href: "/shopping-list",
    icon: Icons.ShoppingCart,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen">
        <Sidebar>
          <div className="flex h-full flex-col gap-4">
            <div className="flex-1 overflow-auto">
              <SidebarNav items={navigation} />
            </div>
          </div>
        </Sidebar>
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}

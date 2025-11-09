import { Home, Image, Trophy, Mic2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Story Feed", url: "/", icon: Home },
  { title: "My Moments", url: "/moments", icon: Image },
  { title: "Community Hub", url: "/community", icon: Trophy },
  { title: "Narrator Studio", url: "/studio", icon: Mic2 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar
      className={`${
        collapsed ? "w-16" : "w-64"
      } glass-card border-r border-primary/20 transition-all duration-300`}
    >
      <SidebarContent className="pt-20">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                          isActive
                            ? "bg-primary/20 text-primary font-medium shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                            : "hover:bg-muted/50"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

import { Home, Image, Trophy, Mic2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { title: "Story Feed", url: "/", icon: Home },
  { title: "My Moments", url: "/moments", icon: Image },
  { title: "Community Hub", url: "/community", icon: Trophy },
  { title: "Narrator Studio", url: "/studio", icon: Mic2 },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-primary/20 pb-safe">
      <div className="flex items-center justify-around h-20 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end
          >
            {({ isActive }) => (
              <div
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all min-w-[70px] ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div
                  className={`relative ${
                    isActive ? "animate-float" : ""
                  }`}
                >
                  <item.icon
                    className={`h-6 w-6 ${
                      isActive ? "drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" : ""
                    }`}
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-primary/30 blur-xl -z-10" />
                  )}
                </div>
                <span className="text-xs font-medium">{item.title}</span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

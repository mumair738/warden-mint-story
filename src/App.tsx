import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { wagmiAdapter } from "@/config/wallet";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import Index from "./pages/Index";
import Moments from "./pages/Moments";
import Community from "./pages/Community";
import Studio from "./pages/Studio";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { sdk as miniAppSdk } from '@farcaster/miniapp-sdk'

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
function FarcasterProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    miniAppSdk.actions.ready();
  }, []);

  return <>{children}</>;
}
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
            <FarcasterProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SidebarProvider defaultOpen={true}>
              <div className="min-h-screen flex w-full bg-gradient-cyber">
                <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                
                <div className="flex w-full pt-16">
                  <AppSidebar />
                  
                  <main className="flex-1 p-6 pb-24 overflow-auto">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/moments" element={<Moments />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/studio" element={<Studio />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
                
                <BottomNav />
              </div>
            </SidebarProvider>
          </BrowserRouter>
        </TooltipProvider>
               </FarcasterProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;

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
import { useState, useEffect } from "react";
import { sdk as miniAppSdk } from '@farcaster/miniapp-sdk';
import React from "react";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHero, setIsHero] = useState(true); // Add state for hero view

  useEffect(() => {
    document.title = "Warden Mint Story 🛡️ | AI-Powered On-Chain Chronicles";
  }, []);

  const HeroSection = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-6 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
        Warden Mint Story
      </h1>
      <p className="max-w-2xl text-lg md:text-xl text-slate-300 mb-8">
        Transform your crypto history into an epic, AI-narrated saga.
        <span className="text-emerald-400">Mint your legacy,</span>
        share your story, and rise among the guardians of the blockchain.
      </p>
      <button
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg"
        onClick={() => setIsHero(false)}
      >
        Start Your Story
      </button>
      <div className="mt-16 text-sm text-slate-500">
        🛡️ AI + Blockchain = Your Immortal Story • Powered by Warden Engine
      </div>
    </div>
  );

 function FarcasterProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    miniAppSdk.actions.ready();
  }, []);

  return <>{children}</>;
 }

  if (isHero) {
    return <HeroSection />;
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

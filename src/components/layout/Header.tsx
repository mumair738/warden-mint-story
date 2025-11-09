import { Wallet, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { isConnected, address } = useAccount();
  const { open } = useAppKit();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 glass-card border-b border-primary/20">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-neon blur-lg opacity-50 animate-pulse" />
              <svg
                className="relative h-8 w-8"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 5L30 12.5L30 27.5L20 35L10 27.5L10 12.5L20 5Z"
                  className="stroke-primary fill-primary/20"
                  strokeWidth="2"
                />
                <path
                  d="M20 15L25 18L25 24L20 27L15 24L15 18L20 15Z"
                  className="fill-primary animate-pulse"
                />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                AI Crypto Story
              </h1>
              <p className="text-xs text-muted-foreground">Your Journey, Narrated</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <Button
              variant="glass"
              onClick={() => open()}
              className="gap-2"
            >
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="hidden sm:inline">{address && formatAddress(address)}</span>
              <Wallet className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="neon"
              onClick={() => open()}
              className="gap-2"
            >
              <Wallet className="h-4 w-4" />
              <span>Connect Wallet</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

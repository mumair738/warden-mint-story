import { StoryFeed } from "@/components/story/StoryFeed";
import { useAccount } from "wagmi";
import { Wallet, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppKit } from "@reown/appkit/react";

const Index = () => {
  const { isConnected } = useAccount();
  const { open } = useAppKit();

  if (!isConnected) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="glass-card rounded-xl p-12 border border-primary/20 text-center max-w-2xl">
          <div className="space-y-6">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-neon/20 mb-4 relative">
              <div className="absolute inset-0 bg-gradient-neon blur-xl opacity-50 animate-pulse" />
              <Wallet className="h-12 w-12 text-primary relative z-10" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                Connect Your Wallet
              </h2>
              <p className="text-muted-foreground">
                Transform your transaction history into epic, AI-narrated stories
              </p>
            </div>

            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex items-start gap-3 text-sm">
                <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium mb-1">AI-Powered Narratives</div>
                  <div className="text-muted-foreground">
                    Every swap, mint, and stake becomes an engaging story
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium mb-1">Mint as NFTs</div>
                  <div className="text-muted-foreground">
                    Turn your favorite stories into collectible moments
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium mb-1">Social & Gamified</div>
                  <div className="text-muted-foreground">
                    Share, vote, and compete with the community
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="neon"
              size="lg"
              onClick={() => open()}
              className="gap-2 text-base px-8"
            >
              <Wallet className="h-5 w-5" />
              Connect Wallet to Begin
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <StoryFeed />;
};

export default Index;

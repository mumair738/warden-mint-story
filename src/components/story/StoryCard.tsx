import { Heart, Share2, Sparkles, ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AudioVisualizer } from "./AudioVisualizer";
import { Story } from "@/types/story";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StoryCardProps {
  story: Story;
  onLike: (id: string) => void;
  onShare: (id: string) => void;
  onMint: (id: string) => void;
}

export const StoryCard = ({ story, onLike, onShare, onMint }: StoryCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const getProtocolIcon = (protocol: string) => {
    // In a real app, this would return actual protocol logos
    return protocol.charAt(0).toUpperCase();
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      swap: "↔️",
      mint: "🎨",
      stake: "🔒",
      transfer: "➡️",
      defi: "💰",
    };
    return icons[type] || "📝";
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  // Highlight token names and amounts in the narration
  const renderNarration = (text: string) => {
    const tokenRegex = /(\d+\.?\d*)\s*(ETH|PEPE|USDC|BTC|NFT)/g;
    const parts = text.split(tokenRegex);
    
    return parts.map((part, index) => {
      if (tokenRegex.test(`${parts[index - 1]}${part}`)) {
        return (
          <span key={index} className="text-primary font-semibold">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 relative overflow-hidden group"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-neon flex items-center justify-center text-lg font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            {getProtocolIcon(story.transaction.protocol)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">{getTypeIcon(story.transaction.type)}</span>
              <span className="font-semibold capitalize">{story.transaction.type}</span>
              <span className="text-muted-foreground">on</span>
              <span className="text-primary">{story.transaction.protocol}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {getTimeAgo(story.transaction.timestamp)}
            </div>
          </div>
        </div>
        {story.isMinted && (
          <div className="px-3 py-1 rounded-full bg-secondary/20 border border-secondary text-secondary text-xs font-medium flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Minted
          </div>
        )}
      </div>

      {/* Narration Text */}
      <div className="mb-6 relative z-10">
        <p className="text-lg leading-relaxed font-serif text-foreground/90">
          {renderNarration(story.narration)}
        </p>
      </div>

      {/* Audio Visualizer */}
      <div className="mb-6 relative z-10">
        <AudioVisualizer duration={story.audioDuration} audioUrl={story.audioUrl} />
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        {!story.isMinted && (
          <Button
            variant="neon"
            className="flex-1 gap-2"
            onClick={() => onMint(story.id)}
          >
            <Sparkles className="h-4 w-4" />
            MINT AS MOMENT
          </Button>
        )}
        
        <Button
          variant="glass"
          size="icon"
          onClick={() => onShare(story.id)}
          className="hover:scale-110 transition-transform"
        >
          <Share2 className="h-4 w-4" />
        </Button>
        
        <Button
          variant="glass"
          size="icon"
          onClick={() => onLike(story.id)}
          className={`hover:scale-110 transition-transform ${
            story.isLiked ? "text-secondary" : ""
          }`}
        >
          <Heart className={`h-4 w-4 ${story.isLiked ? "fill-secondary" : ""}`} />
        </Button>
        
        <div className="px-3 py-2 rounded-lg bg-muted/50 text-sm font-medium">
          {story.likes}
        </div>
      </div>

      {/* Expandable Details */}
      <div className="relative z-10">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-full"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              showDetails ? "rotate-180" : ""
            }`}
          />
          View On-Chain Details
        </button>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 pt-3 border-t border-border/50 space-y-2 text-sm overflow-hidden"
            >
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction Hash:</span>
                <a
                  href={`https://etherscan.io/tx/${story.transaction.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  {story.transaction.hash.slice(0, 10)}...{story.transaction.hash.slice(-8)}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Value:</span>
                <span className="font-medium">${story.transaction.valueUSD.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gas Fee:</span>
                <span className="font-medium">{story.transaction.gasFee}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

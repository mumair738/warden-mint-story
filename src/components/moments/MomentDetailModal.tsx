import { X, Share2, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MomentNFT } from "@/types/moment";
import { AudioVisualizer } from "@/components/story/AudioVisualizer";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface MomentDetailModalProps {
  moment: MomentNFT | null;
  onClose: () => void;
}

export const MomentDetailModal = ({ moment, onClose }: MomentDetailModalProps) => {
  if (!moment) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/moment/${moment.id}`);
    toast.success("Moment link copied!");
  };

  const handleOpenSea = () => {
    toast.info("OpenSea integration coming soon!");
  };

  const handleSetShowcase = () => {
    toast.success("Set as profile showcase!");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl border border-primary/20 p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-full bg-gradient-neon text-background font-mono font-semibold">
                #{moment.tokenId}
              </div>
              <div>
                <div className="text-sm text-muted-foreground capitalize">
                  {moment.type} • {moment.protocol}
                </div>
                <div className="text-xs text-muted-foreground">
                  {moment.timestamp.toLocaleDateString()}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Artwork */}
          <div className="mb-6 rounded-xl overflow-hidden aspect-video relative">
            <div
              className="absolute inset-0 animate-gradient"
              style={{
                background: `linear-gradient(135deg, ${moment.artworkColors.join(", ")})`,
                backgroundSize: "200% 200%",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 px-8">
              {Array.from({ length: 64 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-white/30 rounded-full backdrop-blur-sm"
                  animate={{
                    height: [
                      `${20 + Math.random() * 60}%`,
                      `${30 + Math.random() * 70}%`,
                      `${20 + Math.random() * 60}%`,
                    ],
                  }}
                  transition={{
                    duration: 0.5 + Math.random() * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Audio Player */}
          <div className="mb-6">
            <AudioVisualizer duration={moment.audioDuration} audioUrl={moment.audioUrl} />
          </div>

          {/* Narration Text */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Story</h3>
            <p className="text-lg font-serif leading-relaxed">{moment.narration}</p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-secondary fill-secondary" />
              <span className="font-semibold">{moment.likes} likes</span>
            </div>
            <div className="text-muted-foreground">•</div>
            <div className="text-muted-foreground">{moment.audioDuration} seconds</div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button variant="neon" className="flex-1 gap-2" onClick={handleOpenSea}>
              <ExternalLink className="h-4 w-4" />
              View on OpenSea
            </Button>
            <Button variant="glass" className="flex-1 gap-2" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="glass" className="flex-1 gap-2" onClick={handleSetShowcase}>
              <Star className="h-4 w-4" />
              Set as Showcase
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

import { useState } from "react";
import { Play, Sparkles } from "lucide-react";
import { MomentNFT } from "@/types/moment";
import { motion } from "framer-motion";

interface MomentCardProps {
  moment: MomentNFT;
  onClick: () => void;
}

export const MomentCard = ({ moment, onClick }: MomentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="glass-card rounded-xl overflow-hidden border border-primary/20 hover:border-primary/40 cursor-pointer transition-all duration-300 group"
      style={{ aspectRatio: "1/1" }}
    >
      {/* Animated Artwork Background */}
      <div className="relative h-3/4 overflow-hidden">
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            background: `linear-gradient(135deg, ${moment.artworkColors.join(", ")})`,
            backgroundSize: "200% 200%",
          }}
        />
        
        {/* Soundwave Visualization */}
        <div className="absolute inset-0 flex items-center justify-center gap-1 px-4">
          {Array.from({ length: 32 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-white/30 rounded-full backdrop-blur-sm"
              animate={{
                height: isHovered
                  ? [
                      `${20 + Math.random() * 60}%`,
                      `${30 + Math.random() * 70}%`,
                      `${20 + Math.random() * 60}%`,
                    ]
                  : `${20 + Math.random() * 40}%`,
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Play Button Overlay */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <div className="h-16 w-16 rounded-full bg-primary/80 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.8)]">
              <Play className="h-8 w-8 text-background ml-1" />
            </div>
          </motion.div>
        )}

        {/* Token ID Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-primary/30">
          <span className="text-xs font-mono text-primary">#{moment.tokenId}</span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="capitalize">{moment.type}</span>
          <span>•</span>
          <span>{moment.protocol}</span>
        </div>
        <p className="text-sm line-clamp-2 font-serif">{moment.narration}</p>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-secondary">
            <Sparkles className="h-3 w-3" />
            <span>{moment.likes} likes</span>
          </div>
          <span className="text-muted-foreground">{moment.audioDuration}s</span>
        </div>
      </div>
    </motion.div>
  );
};

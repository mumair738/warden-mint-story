import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioVisualizerProps {
  duration: number;
  audioUrl?: string;
}

export const AudioVisualizer = ({ duration, audioUrl }: AudioVisualizerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Generate random waveform for visualization
  const generateWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const bars = 80;
    const barWidth = width / bars;

    ctx.clearRect(0, 0, width, height);

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "hsl(188, 100%, 50%)");
    gradient.addColorStop(0.5, "hsl(270, 80%, 55%)");
    gradient.addColorStop(1, "hsl(320, 100%, 50%)");

    for (let i = 0; i < bars; i++) {
      const progress = currentTime / duration;
      const isPastPlayhead = i / bars < progress;
      
      // Dynamic height based on position and playback
      let barHeight = Math.random() * (height * 0.7) + height * 0.1;
      
      if (isPlaying && isPastPlayhead) {
        barHeight *= 1.2 + Math.sin(Date.now() / 200 + i) * 0.3;
      }

      ctx.fillStyle = isPastPlayhead ? gradient : "hsl(240, 12%, 25%)";
      
      const x = i * barWidth;
      const y = (height - barHeight) / 2;
      
      ctx.fillRect(x, y, barWidth - 2, barHeight);
      
      // Add glow effect for playing bars
      if (isPlaying && isPastPlayhead) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = "hsl(188, 100%, 50%)";
        ctx.fillRect(x, y, barWidth - 2, barHeight);
        ctx.shadowBlur = 0;
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    canvas.style.width = `${canvas.offsetWidth}px`;
    canvas.style.height = `${canvas.offsetHeight}px`;

    const animate = () => {
      generateWaveform();
      if (isPlaying) {
        setCurrentTime((prev) => {
          const next = prev + 0.016; // ~60fps
          return next >= duration ? 0 : next;
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, currentTime, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentTime >= duration) {
      setCurrentTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative w-full">
      <div className="relative h-24 rounded-lg overflow-hidden bg-gradient-to-r from-background via-card to-background border border-primary/20">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ width: "100%", height: "100%" }}
        />
        
        {/* Playback controls overlay */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button
            variant="glass"
            size="icon"
            onClick={togglePlay}
            className="h-12 w-12 rounded-full border-2 border-primary shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-primary" />
            ) : (
              <Play className="h-5 w-5 text-primary ml-0.5" />
            )}
          </Button>

          <div className="text-sm font-mono text-primary bg-background/50 px-3 py-1 rounded-full backdrop-blur-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>

      {/* Subtle glow effect under the visualizer */}
      <div className="absolute inset-0 bg-gradient-glow blur-xl opacity-30 -z-10" />
    </div>
  );
};

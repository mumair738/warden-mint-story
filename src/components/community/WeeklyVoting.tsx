import { useState, useEffect } from "react";
import { Vote, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { WeeklyStory } from "@/types/community";
import { toast } from "sonner";

interface WeeklyVotingProps {
  stories: WeeklyStory[];
  onVote: (storyId: string) => void;
}

export const WeeklyVoting = ({ stories, onVote }: WeeklyVotingProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVote = (storyId: string, hasVoted: boolean) => {
    if (hasVoted) {
      toast.error("You've already voted this week!");
      return;
    }
    onVote(storyId);
    toast.success("Vote submitted! Thank you for participating.");
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

  return (
    <div className="space-y-6">
      {/* Header with Countdown */}
      <div className="glass-card rounded-xl p-6 border border-primary/20 text-center">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-neon bg-clip-text text-transparent">
          Vote for the Best Story of the Week!
        </h2>
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
          <Clock className="h-5 w-5" />
          <span>Voting closes in:</span>
        </div>
        <div className="flex items-center justify-center gap-4 text-3xl font-mono font-bold">
          <div className="flex flex-col items-center">
            <span className="text-primary">{String(timeLeft.days).padStart(2, "0")}</span>
            <span className="text-xs text-muted-foreground">days</span>
          </div>
          <span className="text-primary">:</span>
          <div className="flex flex-col items-center">
            <span className="text-primary">{String(timeLeft.hours).padStart(2, "0")}</span>
            <span className="text-xs text-muted-foreground">hours</span>
          </div>
          <span className="text-primary">:</span>
          <div className="flex flex-col items-center">
            <span className="text-primary">{String(timeLeft.minutes).padStart(2, "0")}</span>
            <span className="text-xs text-muted-foreground">mins</span>
          </div>
          <span className="text-primary">:</span>
          <div className="flex flex-col items-center">
            <span className="text-primary">{String(timeLeft.seconds).padStart(2, "0")}</span>
            <span className="text-xs text-muted-foreground">secs</span>
          </div>
        </div>
      </div>

      {/* Story Cards */}
      <div className="space-y-4">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="glass-card rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{getTypeIcon(story.type)}</div>
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-primary">
                      #{index + 1}
                    </span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{story.protocol}</span>
                  </div>
                  <p className="text-lg font-serif leading-relaxed">
                    {story.narration}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {story.votes.toLocaleString()} votes
                    </span>
                    <span className="font-semibold text-primary">
                      {story.votePercentage}%
                    </span>
                  </div>
                  <Progress value={story.votePercentage} className="h-2" />
                </div>

                <Button
                  variant={story.hasVoted ? "glass" : "neon"}
                  className="w-full gap-2"
                  onClick={() => handleVote(story.id, story.hasVoted)}
                  disabled={story.hasVoted}
                >
                  <Vote className="h-4 w-4" />
                  {story.hasVoted ? "Already Voted" : "VOTE FOR THIS STORY"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

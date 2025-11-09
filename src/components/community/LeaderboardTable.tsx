import { Crown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeaderboardEntry } from "@/types/community";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  onViewStory: (storyId: string) => void;
}

export const LeaderboardTable = ({ entries, onViewStory }: LeaderboardTableProps) => {
  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-amber-600";
    return "text-muted-foreground";
  };

  return (
    <div className="glass-card rounded-xl border border-primary/20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary/20">
              <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Score</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr
                key={entry.userId}
                className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {entry.rank <= 3 && (
                      <Crown className={`h-4 w-4 ${getRankColor(entry.rank)}`} />
                    )}
                    <span className={`text-lg font-bold ${getRankColor(entry.rank)}`}>
                      #{entry.rank}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-neon flex items-center justify-center text-sm font-bold">
                      {entry.ensName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <button className="text-primary hover:underline font-medium">
                        {entry.ensName}
                      </button>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-lg">{entry.score}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => onViewStory(entry.topStoryId)}
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Top Story
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

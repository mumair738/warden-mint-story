import { Trophy, Vote, Frown, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs as SubTabs, TabsContent as SubTabsContent, TabsList as SubTabsList, TabsTrigger as SubTabsTrigger } from "@/components/ui/tabs";
import { LeaderboardTable } from "@/components/community/LeaderboardTable";
import { WeeklyVoting } from "@/components/community/WeeklyVoting";
import { mockLeaderboardTraders, mockLeaderboardCollectors, mockLeaderboardFavorites, mockWeeklyStories, LeaderboardEntry, WeeklyStory } from "@/types/community";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useMockData } from "@/hooks/useMockData";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Helper Components
const LeaderboardSkeleton = () => (
  <div className="glass-card rounded-xl border border-primary/20 overflow-hidden">
    <table className="w-full">
      <thead>
        <tr className="border-b border-primary/20">
          {Array.from({ length: 4 }).map((_, i) => (
            <th key={i} className="px-6 py-4 text-left"><Skeleton className="h-4 w-20" /></th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 3 }).map((_, i) => (
          <tr key={i} className="border-b border-primary/10">
            <td className="px-6 py-4"><Skeleton className="h-6 w-12" /></td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
            </td>
            <td className="px-6 py-4"><Skeleton className="h-6 w-24" /></td>
            <td className="px-6 py-4 text-right"><Skeleton className="h-9 w-36 ml-auto" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const EmptyState = ({ title, description }: { title: string; description: string }) => (
    <div className="glass-card rounded-xl p-12 border border-primary/20 text-center max-w-2xl mx-auto mt-10">
        <div className="space-y-4">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-neon/20 mb-4">
                <Users className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
        </div>
    </div>
);

const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
    <div className="glass-card rounded-xl p-12 border border-destructive/50 text-center max-w-2xl mx-auto mt-10">
        <div className="space-y-4">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-destructive/20 mb-4">
                <Frown className="h-10 w-10 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold">Something Went Wrong</h2>
            <p className="text-muted-foreground">{message}</p>
            <Button variant="destructive" onClick={onRetry} className="mt-4">
                Try Again
            </Button>
        </div>
    </div>
);

const Community = () => {
  const { data: traders, isLoading: tradersLoading, error: tradersError, refetch: refetchTraders } = useMockData<LeaderboardEntry>(mockLeaderboardTraders);
  const { data: collectors, isLoading: collectorsLoading, error: collectorsError, refetch: refetchCollectors } = useMockData<LeaderboardEntry>(mockLeaderboardCollectors, 1800);
  const { data: favorites, isLoading: favoritesLoading, error: favoritesError, refetch: refetchFavorites } = useMockData<LeaderboardEntry>(mockLeaderboardFavorites, 2100);
  const { data: weeklyStoriesData, isLoading: weeklyStoriesLoading, error: weeklyStoriesError, refetch: refetchWeeklyStories } = useMockData<WeeklyStory>(mockWeeklyStories);
  
  const [weeklyStories, setWeeklyStories] = useState<WeeklyStory[]>([]);
  useEffect(() => { setWeeklyStories(weeklyStoriesData); }, [weeklyStoriesData]);

  const [tradersPage, setTradersPage] = useState(1);
  const [collectorsPage, setCollectorsPage] = useState(1);
  const [favoritesPage, setFavoritesPage] = useState(1);
  const [votingPage, setVotingPage] = useState(1);

  const ITEMS_PER_PAGE = 3;
  const MAX_PAGES = 3;

  const handleViewStory = (storyId: string) => toast.info("Story view coming soon!");
  const handleVote = (storyId: string) => {
    setWeeklyStories((prev) => prev.map((story) => story.id === storyId ? { ...story, hasVoted: true, votes: story.votes + 1 } : story));
  };
  
  const paginatedData = (data: any[], currentPage: number) => {
    const totalPages = Math.min(MAX_PAGES, Math.ceil(data.length / ITEMS_PER_PAGE));
    const paginatedItems = data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    return { totalPages, paginatedItems };
  };

  const renderPagination = (totalPages: number, currentPage: number, setCurrentPage: (page: number) => void) => {
    if (totalPages <= 1) return null;
    return (
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(Math.max(currentPage - 1, 1)); }} className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}>{i + 1}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(Math.min(currentPage + 1, totalPages)); }} className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  
  const renderLeaderboardTab = (data: LeaderboardEntry[], isLoading: boolean, error: string | null, refetch: () => void, title: string, description: string, paginationState: [number, React.Dispatch<React.SetStateAction<number>>]) => {
    const [currentPage, setCurrentPage] = paginationState;
    if (isLoading) return <LeaderboardSkeleton />;
    if (error) return <ErrorState message={error} onRetry={refetch} />;
    if (data.length === 0) return <EmptyState title="Leaderboard is Empty" description="Check back later to see the top community members." />;
    const { totalPages, paginatedItems } = paginatedData(data, currentPage);
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <LeaderboardTable entries={paginatedItems} onViewStory={handleViewStory} />
        {renderPagination(totalPages, currentPage, setCurrentPage)}
      </div>
    );
  };

  const renderWeeklyVoting = () => {
    if (weeklyStoriesLoading) return <LeaderboardSkeleton/> // Reuse for now
    if (weeklyStoriesError) return <ErrorState message={weeklyStoriesError} onRetry={refetchWeeklyStories}/>
    if (weeklyStories.length === 0) return <EmptyState title="No Stories for Voting" description="The weekly story nominations are not available yet. Check back soon!"/>

    const { totalPages, paginatedItems } = paginatedData(weeklyStories, votingPage);
    return (
        <>
            <WeeklyVoting stories={paginatedItems} onVote={handleVote} />
            {renderPagination(totalPages, votingPage, setVotingPage)}
        </>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">Community Hub</h1>
        <p className="text-muted-foreground">Compete, vote, and discover the best crypto stories</p>
      </div>
      <Tabs defaultValue="leaderboards" className="space-y-6">
        <TabsList className="glass-card border-primary/20">
          <TabsTrigger value="leaderboards" className="gap-2"><Trophy className="h-4 w-4" />Leaderboards</TabsTrigger>
          <TabsTrigger value="weekly" className="gap-2"><Vote className="h-4 w-4" />Story of the Week</TabsTrigger>
        </TabsList>
        <TabsContent value="leaderboards" className="space-y-6">
          <SubTabs defaultValue="traders">
            <SubTabsList className="glass-card border-primary/20 mb-6">
              <SubTabsTrigger value="traders">Top Traders</SubTabsTrigger>
              <SubTabsTrigger value="collectors">Top Collectors</SubTabsTrigger>
              <SubTabsTrigger value="favorites">Community Favorites</SubTabsTrigger>
            </SubTabsList>
            <SubTabsContent value="traders">{renderLeaderboardTab(traders, tradersLoading, tradersError, refetchTraders, "Top Traders by Volume", "Ranked by total transaction volume across all protocols", [tradersPage, setTradersPage])}</SubTabsContent>
            <SubTabsContent value="collectors">{renderLeaderboardTab(collectors, collectorsLoading, collectorsError, refetchCollectors, "Top Collectors by Moments", "Users who have minted the most Story NFTs", [collectorsPage, setCollectorsPage])}</SubTabsContent>
            <SubTabsContent value="favorites">{renderLeaderboardTab(favorites, favoritesLoading, favoritesError, refetchFavorites, "Community Favorites by Likes", "The most loved stories in the community", [favoritesPage, setFavoritesPage])}</SubTabsContent>
          </SubTabs>
        </TabsContent>
        <TabsContent value="weekly">
          {renderWeeklyVoting()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;

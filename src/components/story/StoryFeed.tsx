import { useState, useEffect } from "react";
import { Search, Filter, Frown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StoryCard } from "./StoryCard";
import { mockStories, Story } from "@/types/story";
import { toast } from "sonner";
import { useMockData } from "@/hooks/useMockData";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const filterOptions = ["All", "Swaps", "Mints", "Staking", "DeFi", "NFTs"];

// Helper Components for different states
const StoryCardSkeleton = () => (
  <div className="glass-card rounded-xl p-6 border border-primary/20 space-y-4">
    <div className="flex items-center gap-3">
      <Skeleton className="h-10 w-10 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-3 w-[150px]" />
      </div>
    </div>
    <Skeleton className="h-5 w-full" />
    <Skeleton className="h-5 w-3/4" />
    <Skeleton className="h-24 w-full rounded-lg" />
    <div className="flex items-center gap-3">
      <Skeleton className="h-10 flex-1 rounded-md" />
      <Skeleton className="h-10 w-10 rounded-md" />
      <Skeleton className="h-10 w-10 rounded-md" />
      <Skeleton className="h-10 w-16 rounded-lg" />
    </div>
  </div>
);

const EmptyState = ({ title, description }: { title: string; description: string }) => (
  <div className="glass-card rounded-xl p-12 border border-primary/20 text-center max-w-2xl mx-auto mt-10">
    <div className="space-y-4">
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-neon/20 mb-4">
        <Search className="h-10 w-10 text-primary" />
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

export const StoryFeed = () => {
  const { data, isLoading, error, refetch } = useMockData<Story>(mockStories);
  const [stories, setStories] = useState<Story[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setStories(data);
  }, [data]);

  const STORIES_PER_PAGE = 3;
  const MAX_PAGES = 3;

  const handleLike = (id: string) => {
    setStories((prev) =>
      prev.map((story) =>
        story.id === id ? { ...story, isLiked: !story.isLiked, likes: story.isLiked ? story.likes - 1 : story.likes + 1 } : story
      )
    );
  };

  const handleShare = (id: string) => {
    const story = stories.find((s) => s.id === id);
    if (story) {
      navigator.clipboard.writeText(`Check out my crypto story: ${window.location.origin}/story/${id}`);
      toast.success("Story link copied to clipboard!");
    }
  };

  const handleMint = (id: string) => {
    toast.success("Minting feature coming soon! Connect Lovable Cloud to enable NFT minting.");
  };

  const totalPages = Math.min(MAX_PAGES, Math.ceil(stories.length / STORIES_PER_PAGE));
  const currentStories = stories.slice((currentPage - 1) * STORIES_PER_PAGE, currentPage * STORIES_PER_PAGE);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-6">
          <StoryCardSkeleton />
          <StoryCardSkeleton />
        </div>
      );
    }

    if (error) {
      return <ErrorState message={error} onRetry={refetch} />;
    }

    if (stories.length === 0) {
      return (
        <EmptyState
          title="No Stories Yet"
          description="Your transaction history is empty. Once you make a transaction, it will appear here."
        />
      );
    }

    return (
      <>
        <div className="space-y-6">
          {currentStories.map((story) => (
            <StoryCard key={story.id} story={story} onLike={handleLike} onShare={handleShare} onMint={handleMint} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => { e.preventDefault(); setCurrentPage((prev) => Math.max(prev - 1, 1)); }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => { e.preventDefault(); setCurrentPage((prev) => Math.min(prev + 1, totalPages)); }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">
            Your Crypto Story
          </h1>
          <p className="text-muted-foreground">Every transaction tells a tale. Discover yours.</p>
        </div>
        <div className="glass-card rounded-lg p-4 border border-primary/20 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for a token, protocol, or date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
              />
            </div>
            <Button variant="glass" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "glass"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className={activeFilter === filter ? "shadow-[0_0_15px_rgba(0,240,255,0.4)]" : ""}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

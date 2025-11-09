import { Image as ImageIcon, SortAsc, Clock, Heart, Zap, Frown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MomentCard } from "@/components/moments/MomentCard";
import { MomentDetailModal } from "@/components/moments/MomentDetailModal";
import { mockMoments, MomentNFT } from "@/types/moment";
import { useState, useEffect } from "react";
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

// Helper Components
const MomentCardSkeleton = () => (
  <div className="glass-card rounded-xl overflow-hidden border border-primary/20" style={{ aspectRatio: "1/1" }}>
    <Skeleton className="h-3/4 w-full" />
    <div className="p-4 space-y-2">
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

const EmptyState = ({ title, description }: { title: string; description: string }) => (
    <div className="glass-card rounded-xl p-12 border border-primary/20 text-center max-w-2xl mx-auto mt-10">
        <div className="space-y-4">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-neon/20 mb-4">
                <ImageIcon className="h-10 w-10 text-primary" />
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


const Moments = () => {
  const { data: moments, isLoading, error, refetch } = useMockData<MomentNFT>(mockMoments);
  const [selectedMoment, setSelectedMoment] = useState<MomentNFT | null>(null);
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);

  const MOMENTS_PER_PAGE = 4;
  const MAX_PAGES = 3;

  const sortedMoments = [...moments].sort((a, b) => {
    if (sortBy === "recent") return b.timestamp.getTime() - a.timestamp.getTime();
    if (sortBy === "liked") return b.likes - a.likes;
    return 0;
  });

  const totalPages = Math.min(MAX_PAGES, Math.ceil(sortedMoments.length / MOMENTS_PER_PAGE));
  const currentMoments = sortedMoments.slice((currentPage - 1) * MOMENTS_PER_PAGE, currentPage * MOMENTS_PER_PAGE);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => <MomentCardSkeleton key={i} />)}
        </div>
      );
    }

    if (error) {
      return <ErrorState message={error} onRetry={refetch} />;
    }
    
    if (sortedMoments.length === 0) {
        return (
            <EmptyState 
                title="No Moments Minted"
                description="Mint your favorite stories from the Story Feed to start your collection."
            />
        );
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentMoments.map((moment) => (
            <MomentCard key={moment.id} moment={moment} onClick={() => setSelectedMoment(moment)} />
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage((prev) => Math.max(prev - 1, 1)); }} className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}>{i + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage((prev) => Math.min(prev + 1, totalPages)); }} className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent mb-2">My Moments Collection</h1>
          <p className="text-muted-foreground">Your minted transaction stories as unique NFTs</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="glass" className="gap-2"><SortAsc className="h-4 w-4" />Sort by</Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-card border-primary/20">
            <DropdownMenuItem onClick={() => setSortBy("recent")} className="gap-2"><Clock className="h-4 w-4" />Most Recent</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("liked")} className="gap-2"><Heart className="h-4 w-4" />Most Liked</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("protocol")} className="gap-2"><Zap className="h-4 w-4" />Protocol</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {renderContent()}
      <MomentDetailModal moment={selectedMoment} onClose={() => setSelectedMoment(null)} />
    </div>
  );
};

export default Moments;

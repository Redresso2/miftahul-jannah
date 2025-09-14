import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  contentType: "surah" | "verse" | "dua" | "aamaal";
  contentId: string;
  title: string;
  metadata?: any;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export const BookmarkButton = ({ 
  contentType, 
  contentId, 
  title, 
  metadata,
  className,
  variant = "outline",
  size = "icon"
}: BookmarkButtonProps) => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const [isLoading, setIsLoading] = useState(false);
  
  const bookmarked = isBookmarked(contentType, contentId);

  const handleToggleBookmark = async () => {
    setIsLoading(true);
    
    if (bookmarked) {
      await removeBookmark(contentType, contentId);
    } else {
      await addBookmark(contentType, contentId, title, metadata);
    }
    
    setIsLoading(false);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleBookmark}
      disabled={isLoading}
      className={cn(
        bookmarked && "text-primary bg-primary/10",
        className
      )}
    >
      {bookmarked ? (
        <BookmarkCheck className="h-4 w-4" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
    </Button>
  );
};
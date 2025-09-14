import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Bookmark {
  id: string;
  content_type: string;
  content_id: string;
  title: string;
  metadata?: any;
  created_at: string;
}

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    } else {
      setBookmarks([]);
      setLoading(false);
    }
  }, [user]);

  const fetchBookmarks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookmarks(data || []);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addBookmark = async (
    contentType: "surah" | "verse" | "dua" | "aamaal",
    contentId: string,
    title: string,
    metadata?: any
  ) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to bookmark content",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from("bookmarks")
        .insert({
          user_id: user.id,
          content_type: contentType,
          content_id: contentId,
          title,
          metadata
        });

      if (error) throw error;

      toast({
        title: "Bookmark Added",
        description: `${title} has been bookmarked`
      });

      fetchBookmarks();
      return true;
    } catch (error: any) {
      if (error?.code === "23505") {
        toast({
          title: "Already Bookmarked",
          description: "This item is already in your bookmarks"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add bookmark",
          variant: "destructive"
        });
      }
      return false;
    }
  };

  const removeBookmark = async (contentType: string, contentId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("user_id", user.id)
        .eq("content_type", contentType)
        .eq("content_id", contentId);

      if (error) throw error;

      toast({
        title: "Bookmark Removed",
        description: "Item removed from bookmarks"
      });

      fetchBookmarks();
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove bookmark",
        variant: "destructive"
      });
      return false;
    }
  };

  const isBookmarked = (contentType: string, contentId: string) => {
    return bookmarks.some(
      (bookmark) => 
        bookmark.content_type === contentType && 
        bookmark.content_id === contentId
    );
  };

  return {
    bookmarks,
    loading,
    addBookmark,
    removeBookmark,
    isBookmarked,
    fetchBookmarks
  };
};
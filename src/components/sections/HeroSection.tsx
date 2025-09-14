import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            Welcome to <span className="text-islamic-gold">Miftahul Jannah</span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl mb-6 md:mb-8 text-primary-foreground/90 leading-relaxed">
            Your gateway to authentic Shia Islamic knowledge and spiritual guidance
          </p>
          <p className="text-sm md:text-lg mb-8 md:mb-12 text-primary-foreground/80 max-w-2xl mx-auto">
            Access comprehensive Islamic education with modern tools, bookmarks, and personalized learning experience
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <Button
              size="sm"
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-4 md:px-8 py-2 md:py-3 text-sm md:text-base w-full sm:w-auto"
              asChild
            >
              <a href="/quran" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 md:h-5 md:w-5" />
                <span>Explore Holy Quran</span>
              </a>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-4 md:px-8 py-2 md:py-3 text-sm md:text-base w-full sm:w-auto"
              asChild
            >
              <a href="/duas" className="flex items-center space-x-2">
                <Heart className="h-4 w-4 md:h-5 md:w-5" />
                <span>Browse Resources</span>
              </a>
            </Button>
          </div>

          <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary-foreground/10 rounded-full mb-2 md:mb-4">
                <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-islamic-gold" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Comprehensive Content</h3>
              <p className="text-sm md:text-base text-primary-foreground/80">Complete collection of Quranic verses, duas, and Islamic teachings</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary-foreground/10 rounded-full mb-2 md:mb-4">
                <Heart className="h-6 w-6 md:h-8 md:w-8 text-islamic-gold" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Personal Bookmarks</h3>
              <p className="text-sm md:text-base text-primary-foreground/80">Save and organize your favorite content for easy access</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary-foreground/10 rounded-full mb-2 md:mb-4">
                <Search className="h-6 w-6 md:h-8 md:w-8 text-islamic-gold" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Smart Organization</h3>
              <p className="text-sm md:text-base text-primary-foreground/80">Advanced sorting and filtering for efficient learning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
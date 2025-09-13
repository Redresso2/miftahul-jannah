import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-islamic-gold">Miftahul Jannah</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 leading-relaxed">
            Your gateway to authentic Shia Islamic knowledge and spiritual guidance
          </p>
          <p className="text-lg mb-12 text-primary-foreground/80 max-w-2xl mx-auto">
            Access comprehensive Islamic education with modern tools, bookmarks, and personalized learning experience
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-3"
              asChild
            >
              <a href="#quran" className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Explore Holy Quran</span>
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3"
              asChild
            >
              <a href="#duas" className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Browse Duas & Aamaals</span>
              </a>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground/10 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-islamic-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Content</h3>
              <p className="text-primary-foreground/80">Complete collection of Quranic verses, duas, and Islamic teachings</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground/10 rounded-full mb-4">
                <Heart className="h-8 w-8 text-islamic-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal Bookmarks</h3>
              <p className="text-primary-foreground/80">Save and organize your favorite content for easy access</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground/10 rounded-full mb-4">
                <Search className="h-8 w-8 text-islamic-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Organization</h3>
              <p className="text-primary-foreground/80">Advanced sorting and filtering for efficient learning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
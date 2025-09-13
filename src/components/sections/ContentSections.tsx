import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Filter, Bookmark } from "lucide-react";

const ContentSections = () => {
  return (
    <section className="py-16 bg-background" id="content">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Holy Quran Section */}
          <Card className="shadow-card hover:shadow-lg transition-shadow duration-300" id="quran">
            <CardHeader className="text-center pb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-foreground">Holy Quran</CardTitle>
              <p className="text-muted-foreground">Complete Quranic content with translations and commentary</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">114</div>
                  <div className="text-sm text-muted-foreground">Surahs</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">6,236</div>
                  <div className="text-sm text-muted-foreground">Verses</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Arabic text with English translation</li>
                  <li>• Verse-by-verse navigation</li>
                  <li>• Audio recitation support</li>
                  <li>• Bookmark favorite verses</li>
                  <li>• Search within text</li>
                </ul>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button className="flex-1" asChild>
                  <a href="#quran-reader">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Reading
                  </a>
                </Button>
                <Button variant="outline" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Duas & Aamaals Section */}
          <Card className="shadow-card hover:shadow-lg transition-shadow duration-300" id="duas">
            <CardHeader className="text-center pb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-foreground">Duas, Aamaals & More</CardTitle>
              <p className="text-muted-foreground">Comprehensive collection of supplications, practices, and spiritual guidance</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Duas</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">200+</div>
                  <div className="text-sm text-muted-foreground">Aamaals</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Categories:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Daily supplications</li>
                  <li>• Namaz and prayer guides</li>
                  <li>• Taqeebat (supplementary prayers)</li>
                  <li>• Ziarat (pilgrimage information)</li>
                  <li>• Special occasion duas</li>
                </ul>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button className="flex-1" asChild>
                  <a href="#duas-browser">
                    <Heart className="h-4 w-4 mr-2" />
                    Browse Collection
                  </a>
                </Button>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sorting & Organization Info */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto shadow-card">
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/50 rounded-full mb-4">
                <Filter className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Smart Organization</h3>
              <p className="text-muted-foreground mb-6">
                Easily sort and organize content by category, topic, length, or personal preference. 
                Create custom collections and access your bookmarks across all devices.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Category", "Alphabetical", "Most Popular", "Recently Added", "My Bookmarks"].map((filter) => (
                  <span key={filter} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    {filter}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContentSections;
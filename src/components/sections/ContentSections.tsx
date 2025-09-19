import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Filter, Search, Star } from "lucide-react";
import TaqeebatSection from "./TaqeebatSection";
import ZiyaratSection from "./ZiyaratSection";

const ContentSections = () => {
  return (
    <>
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Islamic Resources</h2>
            <p className="text-lg text-muted-foreground">Comprehensive collection of authentic Islamic content</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Holy Quran Card */}
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10"></div>
              <CardHeader className="relative">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl text-primary">Holy Quran</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Complete Quran with translations, audio recitations, and study tools
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>114 Surahs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>6,236 Verses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Multiple Translations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Audio Recitations</span>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Start Reading
                </Button>
              </CardContent>
            </Card>

            {/* Resources Card */}
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-islamic-green/5 to-islamic-green/10"></div>
              <CardHeader className="relative">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-islamic-green/10 rounded-lg">
                    <Heart className="h-6 w-6 text-islamic-green" />
                  </div>
                  <CardTitle className="text-2xl text-islamic-green">Duas & Supplications</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Essential prayers and supplications for daily spiritual practice
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-islamic-green rounded-full"></div>
                    <span>Daily Duas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-islamic-green rounded-full"></div>
                    <span>Special Occasions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-islamic-green rounded-full"></div>
                    <span>Arabic & Translation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-islamic-green rounded-full"></div>
                    <span>Audio Guides</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-islamic-green text-islamic-green hover:bg-islamic-green hover:text-islamic-green-foreground">
                  Browse Collection
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Smart Organization Card */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Smart Organization</CardTitle>
              <CardDescription>Easily find what you're looking for with our intelligent categorization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Advanced Search</h3>
                  <p className="text-sm text-muted-foreground">Find specific verses, duas, or topics instantly</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Filter className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Smart Filtering</h3>
                  <p className="text-sm text-muted-foreground">Filter by category, occasion, or difficulty level</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Personal Favorites</h3>
                  <p className="text-sm text-muted-foreground">Bookmark and organize your preferred content</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <TaqeebatSection />
      <ZiyaratSection />
    </>
  );
};

export default ContentSections;
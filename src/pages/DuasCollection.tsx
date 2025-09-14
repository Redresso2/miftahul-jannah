import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Heart, BookOpen, Star } from "lucide-react";
import Header from "@/components/layout/Header";
import { BookmarkButton } from "@/components/ui/bookmark-button";

const DuasCollection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All", count: 150 },
    { id: "daily", name: "Daily Prayers", count: 45 },
    { id: "special", name: "Special Occasions", count: 30 },
    { id: "protection", name: "Protection", count: 25 },
    { id: "gratitude", name: "Gratitude", count: 20 },
    { id: "forgiveness", name: "Forgiveness", count: 30 },
  ];

  const duas = [
    {
      id: 1,
      title: "Morning Prayer",
      arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا",
      translation: "O Allah, by You we enter the morning and by You we enter the evening",
      category: "daily",
      isFavorite: true,
    },
    {
      id: 2,
      title: "Before Eating",
      arabic: "بِسْمِ اللهِ وَعَلَى بَرَكَةِ اللهِ",
      translation: "In the name of Allah and with the blessing of Allah",
      category: "daily",
      isFavorite: false,
    },
    {
      id: 3,
      title: "For Protection",
      arabic: "أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      translation: "I seek refuge in Allah from Satan the accursed",
      category: "protection",
      isFavorite: true,
    },
  ];

  const filteredDuas = duas.filter(dua => 
    (selectedCategory === "all" || dua.category === selectedCategory) &&
    (dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     dua.translation.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Duas & Aamaals Collection</h1>
          <p className="text-muted-foreground">Comprehensive collection of Islamic supplications and righteous deeds</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Browse Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Search duas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-between"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredDuas.map((dua) => (
                <Card key={dua.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-5 w-5" />
                        <span>{dua.title}</span>
                        <BookmarkButton
                          contentType="dua"
                          contentId={dua.id.toString()}
                          title={dua.title}
                          metadata={{ category: dua.category }}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{dua.category}</Badge>
                        <Button variant="ghost" size="sm">
                          <Star className={`h-4 w-4 ${dua.isFavorite ? 'fill-current text-yellow-500' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <p className="text-2xl leading-relaxed text-right font-arabic mb-4">
                        {dua.arabic}
                      </p>
                      <p className="text-muted-foreground italic">
                        "{dua.translation}"
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Copy Text
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DuasCollection;
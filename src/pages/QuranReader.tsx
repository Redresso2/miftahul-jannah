import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, BookOpen, Play, Pause } from "lucide-react";
import Header from "@/components/layout/Header";
import { BookmarkButton } from "@/components/ui/bookmark-button";

const QuranReader = () => {
  const [selectedSurah, setSelectedSurah] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const surahs = [
    { number: 1, name: "Al-Fatiha", arabicName: "الفاتحة", verses: 7 },
    { number: 2, name: "Al-Baqarah", arabicName: "البقرة", verses: 286 },
    { number: 3, name: "Al-Imran", arabicName: "آل عمران", verses: 200 },
    // Add more surahs as needed
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Holy Quran</h1>
          <p className="text-muted-foreground">Read and explore the Holy Quran with translations and audio recitation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Browse Surahs</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Search surah..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Select value={selectedSurah} onValueChange={setSelectedSurah}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a surah" />
                  </SelectTrigger>
                  <SelectContent>
                    {surahs.map((surah) => (
                      <SelectItem key={surah.number} value={surah.number.toString()}>
                        {surah.number}. {surah.name} ({surah.verses} verses)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Al-Fatiha - الفاتحة</span>
                    <BookmarkButton
                      contentType="surah"
                      contentId="1"
                      title="Al-Fatiha"
                      metadata={{ arabicName: "الفاتحة", verses: 7 }}
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Play Audio
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-secondary/20 rounded-lg">
                  <p className="text-2xl leading-relaxed text-right font-arabic mb-4">
                    بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ
                  </p>
                  <p className="text-muted-foreground">
                    In the name of Allah, the Most Gracious, the Most Merciful.
                  </p>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6, 7].map((verse) => (
                    <div key={verse} className="p-4 border rounded-lg hover:bg-secondary/10 transition-colors">
                      <div className="flex items-start space-x-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          {verse}
                        </span>
                        <div className="flex-1 space-y-2">
                          <p className="text-xl leading-relaxed text-right font-arabic">
                            Sample Arabic text for verse {verse}
                          </p>
                          <p className="text-muted-foreground">
                            Sample English translation for verse {verse}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuranReader;
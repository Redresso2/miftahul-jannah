import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw, Plus, Minus, BarChart3, History } from "lucide-react";
import Header from "@/components/layout/Header";

const TasbeehCounter = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [selectedDhikr, setSelectedDhikr] = useState("subhanallah");
  const [history, setHistory] = useState<{ dhikr: string; count: number; date: string }[]>([]);

  const dhikrOptions = [
    { value: "subhanallah", label: "سُبْحَانَ اللهِ", translation: "Subhan Allah" },
    { value: "alhamdulillah", label: "الْحَمْدُ للهِ", translation: "Alhamdulillah" },
    { value: "allahuakbar", label: "اللهُ أَكْبَر", translation: "Allahu Akbar" },
    { value: "lailahaillallah", label: "لَا إِلٰهَ إِلَّا الله", translation: "La ilaha illa Allah" },
    { value: "astaghfirullah", label: "أَسْتَغْفِرُ اللهَ", translation: "Astaghfirullah" },
    { value: "bismillah", label: "بِسْمِ اللهِ", translation: "Bismillah" }
  ];

  const targetOptions = [33, 99, 100, 500, 1000];

  const currentDhikr = dhikrOptions.find(d => d.value === selectedDhikr);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
    }
  };

  const reset = () => {
    if (count > 0) {
      const newEntry = {
        dhikr: currentDhikr?.translation || selectedDhikr,
        count,
        date: new Date().toLocaleDateString()
      };
      setHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
    }
    setCount(0);
  };

  const progress = (count / target) * 100;

  useEffect(() => {
    // Vibrate on mobile when reaching target
    if (count === target && navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  }, [count, target]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Tasbeeh Counter</h1>
          <p className="text-muted-foreground">Digital counter for dhikr and remembrance of Allah</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Dhikr</label>
                  <Select value={selectedDhikr} onValueChange={setSelectedDhikr}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dhikrOptions.map((dhikr) => (
                        <SelectItem key={dhikr.value} value={dhikr.value}>
                          <div className="text-right">
                            <div className="text-lg font-arabic">{dhikr.label}</div>
                            <div className="text-sm text-muted-foreground">{dhikr.translation}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Count</label>
                  <Select value={target.toString()} onValueChange={(value) => setTarget(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {targetOptions.map((option) => (
                        <SelectItem key={option} value={option.toString()}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Dhikr Display */}
          <Card>
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="text-4xl font-arabic leading-relaxed">
                  {currentDhikr?.label}
                </div>
                <div className="text-lg text-muted-foreground">
                  {currentDhikr?.translation}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Counter */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                {/* Progress Circle */}
                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-muted"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                      className="text-primary transition-all duration-300"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-primary">{count}</div>
                      <div className="text-sm text-muted-foreground">of {target}</div>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={decrement}
                    disabled={count === 0}
                    className="w-16 h-16 rounded-full"
                  >
                    <Minus className="h-6 w-6" />
                  </Button>

                  <Button
                    size="lg"
                    onClick={increment}
                    className="w-24 h-24 rounded-full text-2xl"
                  >
                    <Plus className="h-8 w-8" />
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={reset}
                    className="w-16 h-16 rounded-full"
                  >
                    <RotateCcw className="h-6 w-6" />
                  </Button>
                </div>

                {count === target && (
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full">
                    🎉 Target Reached! Allahu Akbar!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* History */}
          {history.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="h-5 w-5" />
                  <span>Recent Sessions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {history.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                      <div>
                        <p className="font-medium">{entry.dhikr}</p>
                        <p className="text-sm text-muted-foreground">{entry.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{entry.count}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default TasbeehCounter;
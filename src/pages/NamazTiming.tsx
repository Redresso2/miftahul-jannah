import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, MapPin, Bell, Sunrise, Sun, Sunset, Moon } from "lucide-react";
import Header from "@/components/layout/Header";

const NamazTiming = () => {
  const [location, setLocation] = useState<string>("Loading...");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null);

  // Sample prayer times - in a real app, you'd fetch these from an API
  const prayerTimes = [
    { name: "Fajr", time: "05:30", icon: Sunrise, description: "Dawn Prayer" },
    { name: "Dhuhr", time: "12:45", icon: Sun, description: "Noon Prayer" },
    { name: "Asr", time: "16:15", icon: Sun, description: "Afternoon Prayer" },
    { name: "Maghrib", time: "18:30", icon: Sunset, description: "Sunset Prayer" },
    { name: "Isha", time: "20:00", icon: Moon, description: "Night Prayer" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation("Current Location");
        },
        () => {
          setLocation("Location access denied");
        }
      );
    }

    // Calculate next prayer
    const now = new Date();
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
    
    for (const prayer of prayerTimes) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTimeInMinutes = hours * 60 + minutes;
      
      if (prayerTimeInMinutes > currentTimeInMinutes) {
        setNextPrayer(prayer);
        break;
      }
    }
    
    // If no prayer found for today, next is Fajr tomorrow
    if (!nextPrayer) {
      setNextPrayer(prayerTimes[0]);
    }

    return () => clearInterval(timer);
  }, []);

  const getCurrentPrayerStatus = () => {
    const now = new Date();
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
    
    for (let i = 0; i < prayerTimes.length; i++) {
      const [hours, minutes] = prayerTimes[i].time.split(':').map(Number);
      const prayerTimeInMinutes = hours * 60 + minutes;
      
      if (currentTimeInMinutes < prayerTimeInMinutes) {
        const timeLeft = prayerTimeInMinutes - currentTimeInMinutes;
        const hoursLeft = Math.floor(timeLeft / 60);
        const minutesLeft = timeLeft % 60;
        
        return {
          next: prayerTimes[i].name,
          timeLeft: `${hoursLeft}h ${minutesLeft}m`
        };
      }
    }
    
    // After Isha, next is Fajr tomorrow
    const fajrTime = prayerTimes[0].time.split(':').map(Number);
    const fajrTimeInMinutes = fajrTime[0] * 60 + fajrTime[1];
    const timeUntilMidnight = (24 * 60) - currentTimeInMinutes;
    const timeAfterMidnight = fajrTimeInMinutes;
    const totalTimeLeft = timeUntilMidnight + timeAfterMidnight;
    const hoursLeft = Math.floor(totalTimeLeft / 60);
    const minutesLeft = totalTimeLeft % 60;
    
    return {
      next: "Fajr",
      timeLeft: `${hoursLeft}h ${minutesLeft}m`
    };
  };

  const prayerStatus = getCurrentPrayerStatus();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Prayer Times</h1>
          <p className="text-muted-foreground">Accurate daily prayer timings for your location</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Current Status */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
                </div>
                
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {currentTime.toLocaleTimeString('en-US', { 
                      hour12: false,
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentTime.toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <Alert>
                  <Bell className="h-4 w-4" />
                  <AlertDescription>
                    Next prayer: <strong>{prayerStatus.next}</strong> in {prayerStatus.timeLeft}
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Prayer Times Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {prayerTimes.map((prayer, index) => {
              const Icon = prayer.icon;
              const isNext = prayer.name === prayerStatus.next;
              
              return (
                <Card key={prayer.name} className={`hover:shadow-lg transition-all ${isNext ? 'ring-2 ring-primary bg-primary/5' : ''}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex flex-col items-center space-y-2">
                      <Icon className={`h-8 w-8 ${isNext ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="text-lg">{prayer.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    <p className={`text-2xl font-bold ${isNext ? 'text-primary' : 'text-foreground'}`}>
                      {prayer.time}
                    </p>
                    <p className="text-xs text-muted-foreground">{prayer.description}</p>
                    {isNext && (
                      <div className="pt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary text-primary-foreground">
                          Next Prayer
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Prayer Reminders</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Enable Notifications</span>
                    <Button variant="outline" size="sm">
                      <Bell className="h-4 w-4 mr-2" />
                      Setup
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Adhan Audio</span>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Reminder Before</span>
                    <Button variant="outline" size="sm">5 min</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Today's Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunrise:</span>
                  <span className="font-medium">06:15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunset:</span>
                  <span className="font-medium">18:30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Day Length:</span>
                  <span className="font-medium">12h 15m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hijri Date:</span>
                  <span className="font-medium">15 Rajab 1445</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NamazTiming;
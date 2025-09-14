import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, MapPin, Bell, Sunrise, Sun, Sunset, Moon, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import adhan from "adhan";

const NamazTiming = () => {
  const [location, setLocation] = useState<{ city: string; coordinates: { lat: number; lng: number } } | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculatePrayerTimes = (lat: number, lng: number) => {
    try {
      const coordinates = new adhan.Coordinates(lat, lng);
      const date = new Date();
      const params = adhan.CalculationMethod.MuslimWorldLeague();
      const prayers = new adhan.PrayerTimes(coordinates, date, params);
      
      return {
        fajr: prayers.fajr,
        dhuhr: prayers.dhuhr,
        asr: prayers.asr,
        maghrib: prayers.maghrib,
        isha: prayers.isha,
        sunrise: prayers.sunrise,
        sunset: prayers.sunset
      };
    } catch (error) {
      console.error("Error calculating prayer times:", error);
      return null;
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 600000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Get city name using reverse geocoding
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data = await response.json();
        const city = data.city || data.locality || "Current Location";
        
        setLocation({
          city,
          coordinates: { lat: latitude, lng: longitude }
        });
      } catch {
        setLocation({
          city: "Current Location",
          coordinates: { lat: latitude, lng: longitude }
        });
      }

      const prayers = calculatePrayerTimes(latitude, longitude);
      setPrayerTimes(prayers);
    } catch (error) {
      setError("Unable to retrieve your location. Please enable location services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    getCurrentLocation();

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCurrentPrayerStatus = () => {
    if (!prayerTimes) return null;

    const now = new Date();
    const prayers = [
      { name: "Fajr", time: prayerTimes.fajr },
      { name: "Dhuhr", time: prayerTimes.dhuhr },
      { name: "Asr", time: prayerTimes.asr },
      { name: "Maghrib", time: prayerTimes.maghrib },
      { name: "Isha", time: prayerTimes.isha }
    ];

    for (const prayer of prayers) {
      if (now < prayer.time) {
        const timeDiff = prayer.time.getTime() - now.getTime();
        const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        return {
          next: prayer.name,
          timeLeft: `${hoursLeft}h ${minutesLeft}m`
        };
      }
    }

    // After Isha, next is Fajr tomorrow
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFajr = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 
      prayerTimes.fajr.getHours(), prayerTimes.fajr.getMinutes());
    
    const timeDiff = tomorrowFajr.getTime() - now.getTime();
    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return {
      next: "Fajr",
      timeLeft: `${hoursLeft}h ${minutesLeft}m`
    };
  };

  const prayerStatus = getCurrentPrayerStatus();

  const prayerTimesArray = prayerTimes ? [
    { name: "Fajr", time: formatTime(prayerTimes.fajr), icon: Sunrise, description: "Dawn Prayer" },
    { name: "Dhuhr", time: formatTime(prayerTimes.dhuhr), icon: Sun, description: "Noon Prayer" },
    { name: "Asr", time: formatTime(prayerTimes.asr), icon: Sun, description: "Afternoon Prayer" },
    { name: "Maghrib", time: formatTime(prayerTimes.maghrib), icon: Sunset, description: "Sunset Prayer" },
    { name: "Isha", time: formatTime(prayerTimes.isha), icon: Moon, description: "Night Prayer" }
  ] : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Prayer Times</h1>
          <p className="text-muted-foreground">Accurate daily prayer timings for your location</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {loading ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p>Calculating prayer times for your location...</p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Alert>
                  <MapPin className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
                <Button onClick={getCurrentLocation} className="mt-4">
                  Retry
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Current Status */}
              <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{location?.city}</span>
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

                {prayerStatus && (
                  <Alert>
                    <Bell className="h-4 w-4" />
                    <AlertDescription>
                      Next prayer: <strong>{prayerStatus.next}</strong> in {prayerStatus.timeLeft}
                    </AlertDescription>
                  </Alert>
                )}
                  </div>
                </CardContent>
              </Card>

              {/* Prayer Times Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {prayerTimesArray.map((prayer, index) => {
                  const Icon = prayer.icon;
                  const isNext = prayerStatus?.next === prayer.name;
              
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
                {prayerTimes && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunrise:</span>
                      <span className="font-medium">{formatTime(prayerTimes.sunrise)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunset:</span>
                      <span className="font-medium">{formatTime(prayerTimes.sunset)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Day Length:</span>
                      <span className="font-medium">
                        {Math.floor((prayerTimes.sunset.getTime() - prayerTimes.sunrise.getTime()) / (1000 * 60 * 60))}h{' '}
                        {Math.floor(((prayerTimes.sunset.getTime() - prayerTimes.sunrise.getTime()) % (1000 * 60 * 60)) / (1000 * 60))}m
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hijri Date:</span>
                      <span className="font-medium">{new Date().toLocaleDateString('en-US-u-ca-islamic')}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default NamazTiming;
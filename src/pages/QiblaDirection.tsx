import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Compass, MapPin, Navigation, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";

const QiblaDirection = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateQiblaDirection = (lat: number, lng: number) => {
    // Kaaba coordinates (more precise)
    const kaabaLat = 21.4224779;
    const kaabaLng = 39.8251832;
    
    // Convert to radians
    const φ1 = lat * (Math.PI / 180);
    const φ2 = kaabaLat * (Math.PI / 180);
    const Δλ = (kaabaLng - lng) * (Math.PI / 180);
    
    // Calculate bearing using the forward azimuth formula
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    
    // Calculate initial bearing
    let bearing = Math.atan2(y, x) * (180 / Math.PI);
    
    // Normalize to 0-360 degrees
    bearing = (bearing + 360) % 360;
    
    return Math.round(bearing * 100) / 100; // Round to 2 decimal places
  };

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        const direction = calculateQiblaDirection(latitude, longitude);
        setQiblaDirection(direction);
        setLoading(false);
      },
      (error) => {
        setError("Unable to retrieve your location. Please enable location services.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 600000 }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Qibla Direction</h1>
          <p className="text-muted-foreground">Find the direction of the Holy Kaaba for your prayers</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Compass className="h-5 w-5" />
                <span>Qibla Compass</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert>
                  <MapPin className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="text-center">
                <div className="relative w-64 h-64 mx-auto mb-6">
                  <div className="w-full h-full border-4 border-primary rounded-full flex items-center justify-center bg-secondary/20">
                    {loading ? (
                      <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    ) : qiblaDirection !== null ? (
                      <div 
                        className="absolute inset-4 flex items-center justify-center"
                        style={{ transform: `rotate(${qiblaDirection}deg)` }}
                      >
                        <Navigation className="h-16 w-16 text-primary" />
                      </div>
                    ) : (
                      <Compass className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                  {qiblaDirection !== null && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        N
                      </div>
                    </div>
                  )}
                </div>

                {qiblaDirection !== null && (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-primary">
                      {Math.round(qiblaDirection)}°
                    </p>
                    <p className="text-muted-foreground">
                      Direction to Qibla from your location
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <Button onClick={getCurrentLocation} disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <MapPin className="h-4 w-4 mr-2" />
                  )}
                  {loading ? "Finding Location..." : "Update Location"}
                </Button>
              </div>

              {location && (
                <div className="bg-secondary/20 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    Your location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <p className="flex items-start space-x-2">
                  <span className="font-medium">1.</span>
                  <span>Allow location access when prompted by your browser</span>
                </p>
                <p className="flex items-start space-x-2">
                  <span className="font-medium">2.</span>
                  <span>Hold your device flat and point the arrow towards the direction shown</span>
                </p>
                <p className="flex items-start space-x-2">
                  <span className="font-medium">3.</span>
                  <span>The compass will show you the exact direction to face during prayer</span>
                </p>
                <p className="flex items-start space-x-2">
                  <span className="font-medium">4.</span>
                  <span>For best accuracy, calibrate your device's compass if needed</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default QiblaDirection;
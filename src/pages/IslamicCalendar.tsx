import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CalendarDays, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import Header from "@/components/layout/Header";

const IslamicCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const islamicEvents = [
    {
      date: "2024-03-10",
      name: "Ramadan Begins",
      type: "major",
      description: "Start of the holy month of fasting"
    },
    {
      date: "2024-03-27",
      name: "Laylat al-Qadr",
      type: "special",
      description: "The Night of Power"
    },
    {
      date: "2024-04-09",
      name: "Eid al-Fitr",
      type: "major",
      description: "Festival of Breaking the Fast"
    },
    {
      date: "2024-06-16",
      name: "Eid al-Adha",
      type: "major",
      description: "Festival of Sacrifice"
    },
    {
      date: "2024-07-07",
      name: "Islamic New Year",
      type: "special",
      description: "1st of Muharram"
    },
    {
      date: "2024-07-16",
      name: "Day of Ashura",
      type: "special",
      description: "10th of Muharram"
    }
  ];

  const islamicMonths = [
    "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani",
    "Jumada al-awwal", "Jumada al-thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
  ];

  const upcomingEvents = islamicEvents
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "major":
        return "bg-primary text-primary-foreground";
      case "special":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Islamic Calendar</h1>
          <p className="text-muted-foreground">Important Islamic dates and events for spiritual planning</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Hijri Calendar 1445</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
                
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold">Islamic Months</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {islamicMonths.map((month, index) => (
                      <Button
                        key={month}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        {index + 1}. {month}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Upcoming Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{event.name}</h4>
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                    <p className="text-xs font-medium text-primary">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarDays className="h-5 w-5" />
                  <span>Today's Date</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {new Date().toLocaleDateString('en-US', { 
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric' 
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">Gregorian Calendar</p>
                </div>
                
                <div className="border-t pt-3 text-center">
                  <p className="text-lg font-semibold">15 Rajab 1445</p>
                  <p className="text-sm text-muted-foreground">Hijri Calendar</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* All Events */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>All Islamic Events This Year</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {islamicEvents.map((event, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{event.name}</h3>
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                    <p className="text-sm font-medium text-primary">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default IslamicCalendar;
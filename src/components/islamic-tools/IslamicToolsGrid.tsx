import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  RotateCcw, 
  Compass,
  BookOpen,
  Heart,
  Settings,
  Archive
} from "lucide-react";

const IslamicToolsGrid = () => {
  const tools = [
    {
      title: "Islamic Calendar",
      description: "Important Islamic dates and events",
      icon: Calendar,
      color: "bg-blue-500",
      href: "/calendar"
    },
    {
      title: "Namaz Timing",
      description: "Accurate daily prayer times",
      icon: Clock,
      color: "bg-green-500",
      href: "/namaz"
    },
    {
      title: "Tasbeeh Counter",
      description: "Digital counter for dhikr",
      icon: RotateCcw,
      color: "bg-purple-500",
      href: "/tasbeeh"
    },
    {
      title: "Qibla Direction",
      description: "Find the direction of Kaaba",
      icon: Compass,
      color: "bg-orange-500",
      href: "/qibla"
    },
    {
      title: "Duas",
      description: "Collection of supplications",
      icon: Heart,
      color: "bg-pink-500",
      href: "/duas"
    },
    {
      title: "Aamaals",
      description: "Islamic deeds and prayers",
      icon: BookOpen,
      color: "bg-indigo-500",
      href: "/duas"
    },
    {
      title: "Taqeebat",
      description: "Supplementary prayers",
      icon: Settings,
      color: "bg-teal-500",
      href: "/duas"
    },
    {
      title: "Ziarat",
      description: "Pilgrimage information",
      icon: Archive,
      color: "bg-amber-500",
      href: "/duas"
    }
  ];

  return (
    <section className="py-12 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Islamic Tools & Resources</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive collection of Islamic educational tools and resources for your spiritual journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card key={tool.title} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-4 rounded-full ${tool.color} text-white`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      <a href={tool.href}>Access Tool</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IslamicToolsGrid;
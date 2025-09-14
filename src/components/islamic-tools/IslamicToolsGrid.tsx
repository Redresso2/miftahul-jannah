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
      title: "Resources",
      description: "Duas, Aamaals, Taqeebat & Ziarat",
      icon: Heart,
      color: "bg-pink-500",
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

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card key={tool.title} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-3 md:p-6">
                  <div className="flex flex-col items-center text-center space-y-2 md:space-y-4">
                    <div className={`p-2 md:p-4 rounded-full ${tool.color} text-white`}>
                      <Icon className="h-4 w-4 md:h-8 md:w-8" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm md:text-lg text-foreground mb-1 md:mb-2">{tool.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-4 hidden sm:block">{tool.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full text-xs md:text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      <a href={tool.href}>Access</a>
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
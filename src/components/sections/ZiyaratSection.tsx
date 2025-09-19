import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ZiyaratSection = () => {
  const ziyarats = [
    {
      title: "Ziyarat-e-Ashura",
      description: "The sacred visitation of Imam Hussain (AS) recited especially on the day of Ashura",
      category: "Holy Imams",
      significance: "High",
      link: "/ziyarat/ashura"
    },
    {
      title: "Ziyarat-e-Waritha",
      description: "A comprehensive visitation prayer for Imam Hussain (AS) and the martyrs of Karbala",
      category: "Holy Imams", 
      significance: "High",
      link: "/ziyarat/waritha"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Sacred Ziyarats</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sacred visitation prayers to connect with our holy personalities and seek their intercession
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {ziyarats.map((ziyarat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl text-primary">{ziyarat.title}</CardTitle>
                  <Badge variant="secondary" className="ml-2">
                    {ziyarat.significance}
                  </Badge>
                </div>
                <CardDescription className="text-sm text-muted-foreground">
                  {ziyarat.description}
                </CardDescription>
                <Badge variant="outline" className="w-fit mt-2">
                  {ziyarat.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => window.location.href = ziyarat.link}
                >
                  Read Ziyarat
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            More sacred visitations and their spiritual significance
          </p>
          <Button variant="outline" size="lg">
            Explore All Ziyarats
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ZiyaratSection;
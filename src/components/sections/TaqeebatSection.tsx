import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const TaqeebatSection = () => {
  const taqeebatCategories = [
    {
      title: "General Taqeebat",
      description: "Essential post-prayer recitations for all prayers",
      link: "/taqeebat/general"
    },
    {
      title: "Taqeebat-e-Namaz-e-Fajr",
      description: "Special recitations after Fajr prayer",
      link: "/taqeebat/fajr"
    },
    {
      title: "Taqeebat-e-Namaz-e-Zohr",
      description: "Special recitations after Zohr prayer",
      link: "/taqeebat/zohr"
    },
    {
      title: "Taqeebat-e-Namaz-e-Asr",
      description: "Special recitations after Asr prayer",
      link: "/taqeebat/asr"
    },
    {
      title: "Taqeebat-e-Namaz-e-Maghrib",
      description: "Special recitations after Maghrib prayer",
      link: "/taqeebat/maghrib"
    },
    {
      title: "Taqeebat-e-Namaz-e-Isha",
      description: "Special recitations after Isha prayer",
      link: "/taqeebat/isha"
    },
    {
      title: "Nafilah Fajr",
      description: "Recommended prayers before Fajr",
      link: "/taqeebat/nafilah-fajr"
    },
    {
      title: "Nafilah Zohr",
      description: "Recommended prayers before and after Zohr",
      link: "/taqeebat/nafilah-zohr"
    }
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Taqeebat-e-Namaz</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete collection of post-prayer recitations and recommended prayers to enhance your spiritual connection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {taqeebatCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-primary">{category.title}</CardTitle>
                <CardDescription className="text-sm">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-primary hover:text-primary-foreground"
                  onClick={() => window.location.href = category.link}
                >
                  Read Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-12" />

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Enhance your daily prayers with authentic Taqeebat from reliable Islamic sources
          </p>
          <Button variant="default" size="lg">
            View All Taqeebat
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TaqeebatSection;
import { Button } from "@/components/ui/button";
import { AlertTriangle, Mail } from "lucide-react";

const DevelopmentNotice = () => {
  const handleContactClick = () => {
    window.open("mailto:help.miftahuljannah@gmail.com?subject=Website Feedback&body=Hello, I found an issue with the website:", "_blank");
  };

  return (
    <div className="bg-notice-bg border-b border-notice-border">
      <div className="container py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-notice-text">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">🛠️ Website Under Development:</span>
          </div>
          
          <div className="flex-1 text-notice-text text-sm">
            This site is currently being improved. If you come across any errors or broken links, please let us know.
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleContactClick}
            className="border-notice-border text-notice-text hover:bg-notice-border/20 whitespace-nowrap"
          >
            <Mail className="h-4 w-4 mr-2" />
            Report Issue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentNotice;
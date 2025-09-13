import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import QuranReader from "./pages/QuranReader";
import DuasCollection from "./pages/DuasCollection";
import QiblaDirection from "./pages/QiblaDirection";
import IslamicCalendar from "./pages/IslamicCalendar";
import NamazTiming from "./pages/NamazTiming";
import TasbeehCounter from "./pages/TasbeehCounter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/quran" element={<QuranReader />} />
            <Route path="/duas" element={<DuasCollection />} />
            <Route path="/qibla" element={<QiblaDirection />} />
            <Route path="/calendar" element={<IslamicCalendar />} />
            <Route path="/namaz" element={<NamazTiming />} />
            <Route path="/tasbeeh" element={<TasbeehCounter />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

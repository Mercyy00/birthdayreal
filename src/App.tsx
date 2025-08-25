import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { MusicProvider } from "@/components/music/MusicProvider";
import MusicControls from "@/components/music/MusicControls";

const queryClient = new QueryClient();


const App = () => (
  <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 overflow-x-hidden">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <MusicProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <MusicControls />
        </MusicProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </div>
);

export default App;

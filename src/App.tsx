import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExchangeProvider } from "@/context/ExchangeContext";
import Home from "./pages/Home";
import CreateExchange from "./pages/CreateExchange";
import ExchangeDetail from "./pages/ExchangeDetail";
import ExchangesList from "./pages/ExchangesList";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ExchangeProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateExchange />} />
            <Route path="/exchange/:id" element={<ExchangeDetail />} />
            <Route path="/exchanges" element={<ExchangesList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ExchangeProvider>
  </QueryClientProvider>
);

export default App;

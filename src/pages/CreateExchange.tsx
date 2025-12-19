import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, DollarSign, Gift, ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useExchange } from "@/context/ExchangeContext";
import { useToast } from "@/hooks/use-toast";

const CreateExchange = () => {
  const navigate = useNavigate();
  const { createNewExchange } = useExchange();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("50");
  const [date, setDate] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please give your exchange a name.",
        variant: "destructive",
      });
      return;
    }

    const exchange = createNewExchange(
      name.trim(),
      parseFloat(budget) || 50,
      date || new Date().toISOString().split("T")[0]
    );

    toast({
      title: "Exchange created!",
      description: `${name} is ready. Now add some participants!`,
    });

    navigate(`/exchange/${exchange.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-xl"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-festive shadow-glow">
              <Gift className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Create Your Exchange
            </h1>
            <p className="mt-2 text-muted-foreground">
              Set up your gift exchange in just a few steps
            </p>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <Sparkles className="h-5 w-5 text-accent" />
                Exchange Details
              </CardTitle>
              <CardDescription>
                Give your exchange a name and set some guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-muted-foreground" />
                    Exchange Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Family Christmas 2024"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      Budget (USD)
                    </Label>
                    <Input
                      id="budget"
                      type="number"
                      min="1"
                      placeholder="50"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Exchange Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="festive"
                  size="lg"
                  className="w-full"
                >
                  Create Exchange
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default CreateExchange;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Gift,
  Plus,
  Calendar,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useExchange } from "@/context/ExchangeContext";

const ExchangesList = () => {
  const { exchanges } = useExchange();

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                My Exchanges
              </h1>
              <p className="mt-2 text-muted-foreground">
                Manage all your gift exchange groups
              </p>
            </div>
            <Link to="/create">
              <Button variant="festive" size="lg">
                <Plus className="mr-2 h-5 w-5" />
                New Exchange
              </Button>
            </Link>
          </div>

          {exchanges.length === 0 ? (
            <Card className="border-2 border-dashed border-muted">
              <CardContent className="flex flex-col items-center py-16 text-center">
                <div className="mb-4 rounded-2xl bg-muted/50 p-4">
                  <Gift className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  No exchanges yet
                </h3>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  Create your first gift exchange and start spreading the
                  holiday cheer!
                </p>
                <Link to="/create" className="mt-6">
                  <Button variant="festive">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Create Your First Exchange
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {exchanges.map((exchange, index) => (
                <motion.div
                  key={exchange.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/exchange/${exchange.id}`}>
                    <Card className="group h-full cursor-pointer shadow-soft transition-all hover:shadow-card">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-festive">
                            <Gift className="h-6 w-6 text-primary-foreground" />
                          </div>
                          {exchange.isDrawn ? (
                            <Badge className="bg-primary">Drawn</Badge>
                          ) : (
                            <Badge variant="outline">Draft</Badge>
                          )}
                        </div>
                        <CardTitle className="mt-4 font-display text-xl">
                          {exchange.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {exchange.participants.length}
                          </span>
                          <span className="flex items-center gap-1">
                            ${exchange.budget}
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          {exchange.date && (
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {new Date(exchange.date).toLocaleDateString()}
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                            View
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default ExchangesList;

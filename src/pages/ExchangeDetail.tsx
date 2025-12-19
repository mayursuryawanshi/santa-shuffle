import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Gift,
  Users,
  Shuffle,
  Calendar,
  DollarSign,
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ParticipantForm, ParticipantList } from "@/components/ParticipantForm";
import { AssignmentReveal } from "@/components/AssignmentReveal";
import { WishlistManager } from "@/components/WishlistManager";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useExchange } from "@/context/ExchangeContext";
import { useToast } from "@/hooks/use-toast";

const ExchangeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    getExchangeById,
    addParticipant,
    removeParticipant,
    updateParticipantWishlist,
    performDraw,
    resetDraw,
    setCurrentExchange,
  } = useExchange();

  const [exchange, setExchange] = useState(getExchangeById(id || ""));
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(
    null
  );

  useEffect(() => {
    const ex = getExchangeById(id || "");
    if (ex) {
      setExchange(ex);
      setCurrentExchange(ex);
    } else {
      navigate("/exchanges");
    }
  }, [id, getExchangeById, navigate, setCurrentExchange]);

  // Re-fetch exchange when participants or draw changes
  useEffect(() => {
    const interval = setInterval(() => {
      const ex = getExchangeById(id || "");
      if (ex) setExchange(ex);
    }, 500);
    return () => clearInterval(interval);
  }, [id, getExchangeById]);

  if (!exchange) {
    return null;
  }

  const handleDraw = () => {
    if (exchange.participants.length < 2) {
      toast({
        title: "Need more participants",
        description: "Add at least 2 participants to draw names.",
        variant: "destructive",
      });
      return;
    }

    const success = performDraw(exchange.id);
    if (success) {
      toast({
        title: "Names drawn! 🎉",
        description: "Secret Santa assignments have been made.",
      });
    } else {
      toast({
        title: "Draw failed",
        description:
          "Could not create valid assignments. Try removing some exclusions.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    resetDraw(exchange.id);
    toast({
      title: "Draw reset",
      description: "You can now draw names again.",
    });
  };

  const currentParticipant = exchange.participants.find(
    (p) => p.id === selectedParticipant
  );

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/exchanges")}
                className="mb-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Exchanges
              </Button>
              <h1 className="font-display text-3xl font-bold text-foreground">
                {exchange.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {exchange.participants.length} participants
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />${exchange.budget} budget
                </span>
                {exchange.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(exchange.date).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {exchange.isDrawn ? (
                <>
                  <Badge variant="default" className="gap-1 bg-primary">
                    <CheckCircle className="h-3 w-3" />
                    Names Drawn
                  </Badge>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </>
              ) : (
                <Button
                  variant="festive"
                  size="lg"
                  onClick={handleDraw}
                  disabled={exchange.participants.length < 2}
                >
                  <Shuffle className="mr-2 h-5 w-5" />
                  Draw Names
                </Button>
              )}
            </div>
          </div>

          {/* Main content */}
          <Tabs defaultValue="participants" className="space-y-6">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="participants" className="gap-2">
                <Users className="h-4 w-4" />
                Participants
              </TabsTrigger>
              {exchange.isDrawn && (
                <TabsTrigger value="assignments" className="gap-2">
                  <Gift className="h-4 w-4" />
                  Assignments
                </TabsTrigger>
              )}
              <TabsTrigger value="wishlists" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Wishlists
              </TabsTrigger>
            </TabsList>

            <TabsContent value="participants" className="space-y-6">
              {!exchange.isDrawn && (
                <ParticipantForm
                  onAdd={(name, email) =>
                    addParticipant(exchange.id, name, email)
                  }
                />
              )}

              {exchange.isDrawn && (
                <Card className="border-accent/20 bg-accent/5">
                  <CardContent className="flex items-center gap-3 p-4">
                    <AlertCircle className="h-5 w-5 text-accent" />
                    <p className="text-sm text-foreground">
                      Names have been drawn. Reset the draw to modify
                      participants.
                    </p>
                  </CardContent>
                </Card>
              )}

              <ParticipantList
                participants={exchange.participants}
                onRemove={(participantId) =>
                  removeParticipant(exchange.id, participantId)
                }
              />
            </TabsContent>

            {exchange.isDrawn && (
              <TabsContent value="assignments" className="space-y-6">
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="flex items-center gap-3 p-4">
                    <Gift className="h-5 w-5 text-primary" />
                    <p className="text-sm text-foreground">
                      Click "Reveal" on each card to see who they're giving a
                      gift to. Keep it secret! 🤫
                    </p>
                  </CardContent>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {exchange.participants.map((participant) => (
                    <AssignmentReveal
                      key={participant.id}
                      participant={participant}
                      assignedTo={exchange.participants.find(
                        (p) => p.id === exchange.assignments[participant.id]
                      )}
                    />
                  ))}
                </div>
              </TabsContent>
            )}

            <TabsContent value="wishlists" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display">
                    Manage Wishlists
                  </CardTitle>
                  <CardDescription>
                    Select a participant to view or edit their wishlist
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {exchange.participants.map((p) => (
                      <Button
                        key={p.id}
                        variant={
                          selectedParticipant === p.id ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedParticipant(p.id)}
                      >
                        {p.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {currentParticipant && (
                <motion.div
                  key={currentParticipant.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <WishlistManager
                    wishlist={currentParticipant.wishlist}
                    onUpdate={(wishlist) =>
                      updateParticipantWishlist(
                        exchange.id,
                        currentParticipant.id,
                        wishlist
                      )
                    }
                  />
                </motion.div>
              )}

              {!selectedParticipant && exchange.participants.length > 0 && (
                <div className="rounded-xl border-2 border-dashed border-muted p-8 text-center">
                  <Sparkles className="mx-auto h-10 w-10 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">
                    Select a participant above to manage their wishlist
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default ExchangeDetail;

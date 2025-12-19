import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Eye, EyeOff, Sparkles, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Participant } from "@/context/ExchangeContext";

interface AssignmentRevealProps {
  participant: Participant;
  assignedTo: Participant | undefined;
}

export const AssignmentReveal = ({
  participant,
  assignedTo,
}: AssignmentRevealProps) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <Card className="overflow-hidden bg-card shadow-soft transition-all hover:shadow-card">
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-festive text-sm font-semibold text-primary-foreground">
              {participant.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-foreground">{participant.name}</p>
              <p className="text-sm text-muted-foreground">
                {participant.email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setRevealed(!revealed)}
            className="gap-2"
          >
            {revealed ? (
              <>
                <EyeOff className="h-4 w-4" />
                Hide
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                Reveal
              </>
            )}
          </Button>
        </div>

        <div className="relative min-h-[100px] p-4">
          <AnimatePresence mode="wait">
            {revealed ? (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center gap-3 py-4"
              >
                <div className="flex items-center gap-2 text-accent">
                  <Gift className="h-5 w-5" />
                  <span className="text-sm font-medium">Giving to:</span>
                </div>
                <p className="font-display text-2xl font-semibold text-foreground">
                  {assignedTo?.name || "Unknown"}
                </p>
                <PartyPopper className="h-6 w-6 text-cranberry" />
              </motion.div>
            ) : (
              <motion.div
                key="hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 py-4 text-center"
              >
                <div className="relative">
                  <Gift className="h-12 w-12 text-muted-foreground/30" />
                  <Sparkles className="absolute -right-1 -top-1 h-5 w-5 animate-sparkle text-accent" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Click reveal to see the assignment
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

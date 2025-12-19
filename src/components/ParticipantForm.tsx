import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, User, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ParticipantFormProps {
  onAdd: (name: string, email: string) => void;
}

export const ParticipantForm = ({ onAdd }: ParticipantFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: 'Name required',
        description: 'Please enter a participant name.',
        variant: 'destructive',
      });
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: 'Valid email required',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }
    onAdd(name.trim(), email.trim());
    setName('');
    setEmail('');
    toast({
      title: 'Participant added!',
      description: `${name} has been added to the exchange.`,
    });
  };

  return (
    <Card className="border-2 border-dashed border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <UserPlus className="h-5 w-5" />
            <span className="font-display text-lg font-semibold">Add Participant</span>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Name
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background"
              />
            </div>
          </div>

          <Button type="submit" variant="festive" className="w-full sm:w-auto">
            <Sparkles className="mr-2 h-4 w-4" />
            Add to Exchange
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

interface Participant {
  id: string;
  name: string;
  email: string;
}

interface ParticipantListProps {
  participants: Participant[];
  onRemove: (id: string) => void;
}

export const ParticipantList = ({ participants, onRemove }: ParticipantListProps) => {
  if (participants.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-muted p-8 text-center">
        <Sparkles className="mx-auto h-10 w-10 text-muted-foreground/50" />
        <p className="mt-4 text-muted-foreground">
          No participants yet. Add some people to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {participants.map((participant, index) => (
        <motion.div
          key={participant.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="group overflow-hidden bg-card shadow-soft transition-all hover:shadow-card">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-festive text-sm font-semibold text-primary-foreground">
                  {participant.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-foreground">{participant.name}</p>
                  <p className="text-sm text-muted-foreground">{participant.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(participant.id)}
                className="opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

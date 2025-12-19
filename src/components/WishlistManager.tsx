import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WishlistManagerProps {
  wishlist: string[];
  onUpdate: (wishlist: string[]) => void;
  editable?: boolean;
}

export const WishlistManager = ({ wishlist, onUpdate, editable = true }: WishlistManagerProps) => {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem.trim() && !wishlist.includes(newItem.trim())) {
      onUpdate([...wishlist, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemove = (item: string) => {
    onUpdate(wishlist.filter((i) => i !== item));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <Card className="bg-card shadow-soft">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 font-display text-lg">
          <Gift className="h-5 w-5 text-accent" />
          Wishlist
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {editable && (
          <div className="flex gap-2">
            <Input
              placeholder="Add a gift idea..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-background"
            />
            <Button variant="festive" size="icon" onClick={handleAdd}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}

        {wishlist.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-muted p-6 text-center">
            <Sparkles className="mx-auto h-8 w-8 text-muted-foreground/40" />
            <p className="mt-2 text-sm text-muted-foreground">
              {editable ? 'Add some gift ideas to your wishlist!' : 'No wishlist items yet.'}
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {wishlist.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Badge
                  variant="secondary"
                  className="gap-1 py-1.5 pl-3 pr-2 text-sm"
                >
                  {item}
                  {editable && (
                    <button
                      onClick={() => handleRemove(item)}
                      className="ml-1 rounded-full p-0.5 hover:bg-muted"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

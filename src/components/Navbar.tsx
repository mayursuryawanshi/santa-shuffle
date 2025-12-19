import { Gift, TreePine } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-festive">
            <TreePine className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-semibold text-foreground">
            Secret Santa
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/exchanges"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            My Exchanges
          </Link>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            <Gift className="h-4 w-4" />
            New Exchange
          </Link>
        </div>
      </div>
    </nav>
  );
};

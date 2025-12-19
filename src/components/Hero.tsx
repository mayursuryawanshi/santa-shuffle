import { Gift, Users, Sparkles, Shuffle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: Users,
    title: 'Invite Participants',
    description: 'Add friends and family to your gift exchange group with ease.',
  },
  {
    icon: Shuffle,
    title: 'Random Drawing',
    description: 'Our smart algorithm ensures fair and secret assignments.',
  },
  {
    icon: Gift,
    title: 'Wishlists',
    description: 'Share gift ideas to make giving easier and more thoughtful.',
  },
];

const Snowflake = ({ delay, left }: { delay: number; left: string }) => (
  <motion.div
    className="absolute text-primary-foreground/20 pointer-events-none"
    style={{ left }}
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: '100vh', opacity: [0, 1, 1, 0] }}
    transition={{
      duration: 10 + Math.random() * 5,
      delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    <Sparkles size={12 + Math.random() * 8} />
  </motion.div>
);

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-festive">
      {/* Animated snowflakes */}
      {[...Array(15)].map((_, i) => (
        <Snowflake key={i} delay={i * 0.8} left={`${Math.random() * 100}%`} />
      ))}

      <div className="container relative z-10 mx-auto px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-accent" />
              Make gift-giving magical
            </span>
          </motion.div>

          <motion.h1
            className="mt-8 font-display text-5xl font-bold tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Secret Santa,{' '}
            <span className="text-gradient-gold">Simplified</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Organize memorable gift exchanges with friends, family, or colleagues.
            Create groups, draw names secretly, and share wishlists—all in one place.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate('/create')}
              className="w-full sm:w-auto"
            >
              <Gift className="mr-2 h-5 w-5" />
              Start Your Exchange
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
              onClick={() => navigate('/exchanges')}
            >
              View My Exchanges
            </Button>
          </motion.div>
        </div>

        {/* Features grid */}
        <motion.div
          className="mx-auto mt-24 grid max-w-4xl gap-8 sm:grid-cols-3"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group rounded-2xl bg-primary-foreground/5 p-6 backdrop-blur-sm transition-all hover:bg-primary-foreground/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            >
              <div className="mb-4 inline-flex rounded-xl bg-accent/20 p-3 text-accent">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-primary-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-primary-foreground/70">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

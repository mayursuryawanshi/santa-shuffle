import { Hero } from "@/components/Hero";
import { motion } from "framer-motion";
import { Shield, Clock, Heart, Zap } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data stays on your device. No accounts required.",
  },
  {
    icon: Clock,
    title: "Quick Setup",
    description: "Create an exchange and draw names in under 2 minutes.",
  },
  {
    icon: Heart,
    title: "Thoughtful Giving",
    description: "Wishlists help everyone give meaningful gifts.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Draw names instantly with our fair randomization.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />

      {/* Benefits section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Why Choose Our Secret Santa?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Simple, secure, and delightful gift exchange management.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-light">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Made with ❤️ for gift-givers everywhere</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;


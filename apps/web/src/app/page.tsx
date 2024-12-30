import FeatureCard from "@/components/feature-card";
import Step from "@/components/step";
import { Button } from "@weekly-eats/ui/button";
import { Icons } from "@weekly-eats/ui/icons";

export default function Page() {
  return (
    <div className="min-h-screen bg-secondary">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Weekly Eats: Your Family's Meal Planning Solution
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Simplify your family's meal planning, save time, and eat healthier
            with Weekly Eats.
          </p>
          <Button size="lg">Try Free</Button>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            title="Weekly Meal Generation"
            description="Get personalized meal plans for your entire family, refreshed every week."
            icon={Icons.Calendar}
          />
          <FeatureCard
            title="Preference Consideration"
            description="Advanced algorithms consider each family member's tastes and health goals."
            icon={Icons.Settings}
          />
          <FeatureCard
            title="Smart Shopping Lists"
            description="Automatically generate cost-effective shopping lists for your weekly meals."
            icon={Icons.ShoppingCart}
          />
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <Step number={1} text="Input family preferences and goals" />
            <Step number={2} text="Receive weekly personalized meal plans" />
            <Step number={3} text="Get your optimized shopping list" />
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Ready to Simplify Your Meal Planning?
          </h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Join thousands of families who have transformed their eating habits
            with Weekly Eats.
          </p>
          <Button size="lg">Start Your Free Trial</Button>
        </section>
      </main>
    </div>
  );
}

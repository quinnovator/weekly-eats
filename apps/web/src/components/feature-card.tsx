import { Card, CardContent } from "@weekly-eats/ui/card";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6 text-center">
        <Icon className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h3 className="text-xl font-semibold mb-2 text-green-800">{title}</h3>
        <p className="text-green-700">{description}</p>
      </CardContent>
    </Card>
  );
}

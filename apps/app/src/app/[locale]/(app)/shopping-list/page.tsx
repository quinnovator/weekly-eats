import { Button } from "@weekly-eats/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@weekly-eats/ui/card";
import { Checkbox } from "@weekly-eats/ui/checkbox";
import { Icons } from "@weekly-eats/ui/icons";
import { Label } from "@weekly-eats/ui/label";
import { Separator } from "@weekly-eats/ui/separator";

interface GroceryItem {
  name: string;
  quantity: string;
  category: string;
}

// Temporary mock data
const mockGroceryList: Record<string, GroceryItem[]> = {
  Produce: [
    { name: "Spinach", quantity: "2 bags", category: "Produce" },
    { name: "Tomatoes", quantity: "4", category: "Produce" },
    { name: "Carrots", quantity: "1 lb", category: "Produce" },
  ],
  Protein: [
    { name: "Chicken breast", quantity: "2 lbs", category: "Protein" },
    { name: "Salmon", quantity: "1 lb", category: "Protein" },
    { name: "Eggs", quantity: "1 dozen", category: "Protein" },
  ],
  Pantry: [
    { name: "Quinoa", quantity: "1 bag", category: "Pantry" },
    { name: "Olive oil", quantity: "1 bottle", category: "Pantry" },
  ],
};

export default function ShoppingListPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shopping List</h1>
          <p className="text-muted-foreground">
            Everything you need for this week's meals.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Icons.Copy className="mr-2 h-4 w-4" />
            Copy to Clipboard
          </Button>
          <Button>
            <Icons.Check className="mr-2 h-4 w-4" />
            Mark All Complete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(mockGroceryList).map(([category, items]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.name} className="flex items-center space-x-4">
                    <Checkbox id={`${category}-${item.name}`} />
                    <div className="flex-1 space-y-1">
                      <Label
                        htmlFor={`${category}-${item.name}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Last updated: Today at 9:00 AM
        </p>
        <Button variant="outline" size="sm">
          <Icons.ArrowDown className="mr-2 h-4 w-4" />
          Export List
        </Button>
      </div>
    </div>
  );
}

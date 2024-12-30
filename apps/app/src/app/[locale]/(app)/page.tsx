import { getI18n } from "@/locales/server";
import { getUser } from "@weekly-eats/supabase/queries";
import { Button } from "@weekly-eats/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@weekly-eats/ui/card";
import { Icons } from "@weekly-eats/ui/icons";

export const metadata = {
  title: "Dashboard - Weekly Eats",
};

export default async function Page() {
  const { data } = await getUser();
  const t = await getI18n();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("welcome", { name: data?.user?.email })}
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your family's meal planning.
          </p>
        </div>
        <Button>
          <Icons.Calendar className="mr-2 h-4 w-4" />
          Plan This Week's Meals
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Today's Meals</CardTitle>
            <CardDescription>What's cooking today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Breakfast</h3>
                <p className="text-sm text-muted-foreground">
                  Oatmeal with berries
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Lunch</h3>
                <p className="text-sm text-muted-foreground">Chicken salad</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Dinner</h3>
                <p className="text-sm text-muted-foreground">Grilled salmon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shopping List</CardTitle>
            <CardDescription>Items needed for this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">12 items remaining</p>
              <Button variant="outline" size="sm" className="w-full">
                <Icons.ShoppingCart className="mr-2 h-4 w-4" />
                View Shopping List
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Family Members</CardTitle>
            <CardDescription>Dietary preferences and goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">2 family members</p>
              <Button variant="outline" size="sm" className="w-full">
                <Icons.Settings className="mr-2 h-4 w-4" />
                Manage Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

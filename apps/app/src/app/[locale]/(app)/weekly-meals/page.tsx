import { Card, CardContent, CardHeader, CardTitle } from "@weekly-eats/ui/card";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const MEALS = ["Breakfast", "Lunch", "Dinner"];

interface MealPlan {
  familyMember: string;
  meal: string;
}

// Temporary mock data
const mockMealPlans: Record<string, Record<string, MealPlan[]>> = {
  Monday: {
    Breakfast: [
      { familyMember: "John", meal: "Oatmeal with berries" },
      { familyMember: "Jane", meal: "Yogurt parfait" },
    ],
    Lunch: [
      { familyMember: "John", meal: "Chicken salad" },
      { familyMember: "Jane", meal: "Quinoa bowl" },
    ],
    Dinner: [
      { familyMember: "John", meal: "Grilled salmon" },
      { familyMember: "Jane", meal: "Grilled salmon" },
    ],
  },
  // Add more days as needed
};

export default function WeeklyMealsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Weekly Meal Plan</h1>
        <p className="text-muted-foreground">
          Plan and view your family's meals for the week.
        </p>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {DAYS.map((day) => (
          <div key={day} className="space-y-4">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-center text-sm font-medium">
                  {day}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                {MEALS.map((mealTime) => (
                  <div key={mealTime} className="mb-4 last:mb-0">
                    <h3 className="text-sm font-semibold mb-2">{mealTime}</h3>
                    <div className="space-y-2">
                      {mockMealPlans[day]?.[mealTime]?.map((plan) => (
                        <div
                          key={`${day}-${mealTime}-${plan.familyMember}`}
                          className="rounded-md border p-2 text-xs"
                        >
                          <div className="font-medium">{plan.familyMember}</div>
                          <div className="text-muted-foreground">
                            {plan.meal}
                          </div>
                        </div>
                      )) ?? (
                        <div className="rounded-md border border-dashed p-2 text-xs text-muted-foreground">
                          No meal planned
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Button } from "@weekly-eats/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@weekly-eats/ui/card";
import { Icons } from "@weekly-eats/ui/icons";

interface FamilyMember {
  name: string;
  preferences: string[];
  restrictions: string[];
  goals: string[];
}

// Temporary mock data
const mockFamilyMembers: FamilyMember[] = [
  {
    name: "John",
    preferences: ["Italian", "Mexican", "Thai"],
    restrictions: ["Dairy-free"],
    goals: ["Eat more vegetables", "Reduce processed foods"],
  },
  {
    name: "Jane",
    preferences: ["Mediterranean", "Japanese", "Indian"],
    restrictions: ["Gluten-free"],
    goals: ["High protein", "Low carb"],
  },
];

export default function FamilyMembersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Family Members</h1>
          <p className="text-muted-foreground">
            Manage your family's dietary preferences and goals.
          </p>
        </div>
        <Button>
          <Icons.Settings className="mr-2 h-4 w-4" />
          Add Family Member
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockFamilyMembers.map((member) => (
          <Card key={member.name}>
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
              <CardDescription>Dietary Profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Food Preferences</h3>
                <div className="flex flex-wrap gap-2">
                  {member.preferences.map((pref) => (
                    <span
                      key={pref}
                      className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Dietary Restrictions</h3>
                <div className="flex flex-wrap gap-2">
                  {member.restrictions.map((restriction) => (
                    <span
                      key={restriction}
                      className="inline-flex items-center rounded-md bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive ring-1 ring-inset ring-destructive/20"
                    >
                      {restriction}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Health Goals</h3>
                <div className="flex flex-wrap gap-2">
                  {member.goals.map((goal) => (
                    <span
                      key={goal}
                      className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary-foreground/20"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                <Icons.Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

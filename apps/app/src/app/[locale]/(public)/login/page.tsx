import { GoogleSignin } from "@/components/google-signin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@weekly-eats/ui/card";
import { Icons } from "@weekly-eats/ui/icons";

export const metadata = {
  title: "Login - Weekly Eats",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Icons.ForkKnife width={120} height={120} className="rounded-lg" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Welcome to Weekly Eats
          </CardTitle>
          <CardDescription>
            Sign in to start planning your family's meals
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <GoogleSignin />
        </CardContent>
      </Card>
    </div>
  );
}

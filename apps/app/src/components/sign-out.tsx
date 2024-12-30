"use client";

import { createClient } from "@weekly-eats/supabase/client";
import { Button } from "@weekly-eats/ui/button";
import { Icons } from "@weekly-eats/ui/icons";

export function SignOut() {
  const supabase = createClient();

  const handleSignOut = () => {
    supabase.auth.signOut();
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      className="font-mono gap-2 flex items-center"
    >
      <Icons.SignOut className="size-4" />
      <span>Sign out</span>
    </Button>
  );
}

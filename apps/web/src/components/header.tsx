import { Button } from "@weekly-eats/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="bg-green-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold">
            Weekly Eats
          </Link>
          <Button
            size="default"
            className="bg-white hover:bg-green-50 text-green-800 font-semibold"
          >
            Try Free
          </Button>
        </div>
      </div>
    </nav>
  );
}

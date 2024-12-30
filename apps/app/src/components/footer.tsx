export function Footer() {
  return (
    <div className="fixed bottom-4 w-full text-center">
      <span className="font-mono text-xs">
        © {new Date().getFullYear()} Weekly Eats. All rights reserved.
      </span>
    </div>
  );
}

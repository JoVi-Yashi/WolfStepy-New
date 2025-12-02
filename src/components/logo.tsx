import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-primary"
      >
        <path d="M19.25 12.25A6.25 6.25 0 0 1 13 18.5H5.75A3.75 3.75 0 0 1 2 14.75V11A6 6 0 0 1 8 5h.25" />
        <path d="M8 5.25A3.75 3.75 0 0 1 11.75 9" />
        <path d="M13 18.5v-5.25A3.75 3.75 0 0 1 16.75 9.5h1.5A3.75 3.75 0 0 1 22 13.25" />
        <path d="M17.5 9.5v-2.5" />
        <path d="M9.25 12H9" />
      </svg>

      <span className="font-headline text-3xl font-bold text-foreground">
        WolfStep
      </span>
    </div>
  );
}

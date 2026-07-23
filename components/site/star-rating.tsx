import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Rating ${rating} dari 5 bintang`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "size-4",
            index < rating ? "fill-star-rating text-star-rating" : "fill-none text-muted-soft"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

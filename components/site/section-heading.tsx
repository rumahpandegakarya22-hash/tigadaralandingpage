import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 max-w-2xl",
        align === "center" && "items-center text-center mx-auto",
        className
      )}
    >
      {eyebrow ? (
        <span className="font-heading text-xs font-bold uppercase tracking-[0.32px] text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ink text-balance">
        {title}
      </h2>
      {description ? (
        <p className="text-base text-ink text-balance">{description}</p>
      ) : null}
    </div>
  );
}

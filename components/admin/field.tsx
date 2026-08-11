import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type FieldConfig =
  | { name: string; label: string; type: "text" | "url" | "number"; defaultValue?: string }
  | { name: string; label: string; type: "textarea"; defaultValue?: string }
  | { name: string; label: string; type: "select"; options: readonly string[]; defaultValue?: string };

export function FormField({ field }: { field: FieldConfig }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={field.name}>{field.label}</Label>
      {field.type === "textarea" ? (
        <textarea
          id={field.name}
          name={field.name}
          defaultValue={field.defaultValue}
          rows={3}
          className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      ) : field.type === "select" ? (
        <select
          id={field.name}
          name={field.name}
          defaultValue={field.defaultValue}
          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <Input
          id={field.name}
          name={field.name}
          type={field.type === "number" ? "number" : "text"}
          defaultValue={field.defaultValue}
        />
      )}
    </div>
  );
}

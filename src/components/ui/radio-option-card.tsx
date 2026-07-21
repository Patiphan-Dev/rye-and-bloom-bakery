import { cn } from "@/lib/utils/cn";

interface RadioOptionCardProps {
  name: string;
  value: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export function RadioOptionCard({ name, value, label, description, checked, onChange }: RadioOptionCardProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors",
        checked ? "border-terracotta bg-terracotta/5" : "border-ink/15 hover:border-ink/30",
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="mt-1 h-4 w-4 accent-terracotta"
      />
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        <span className="block text-xs text-ink-soft">{description}</span>
      </span>
    </label>
  );
}

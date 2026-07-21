import Link from "next/link";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}

export function SectionHeading({ eyebrow, title, description, actionHref, actionLabel }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && <p className="mb-1 text-sm font-medium uppercase tracking-wide text-terracotta">{eyebrow}</p>}
        <h2 className="font-heading text-2xl text-ink sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-xl text-sm text-ink-soft">{description}</p>}
      </div>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="shrink-0 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink hover:border-terracotta hover:text-terracotta"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

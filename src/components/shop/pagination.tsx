import { cn } from "@/lib/utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="เปลี่ยนหน้า" className="mt-10 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-full border border-ink/15 px-3 py-2 text-sm text-ink disabled:opacity-40"
      >
        ก่อนหน้า
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            "h-9 w-9 rounded-full text-sm font-medium",
            page === currentPage ? "bg-terracotta text-cream" : "text-ink-soft hover:bg-cream-dark/60",
          )}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-full border border-ink/15 px-3 py-2 text-sm text-ink disabled:opacity-40"
      >
        ถัดไป
      </button>
    </nav>
  );
}

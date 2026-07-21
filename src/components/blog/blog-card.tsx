import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/content";
import { formatDateThai } from "@/lib/utils/format";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group overflow-hidden rounded-2xl border border-ink/10 bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={post.coverImageUrl}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-moss/10 px-2.5 py-1 text-[10px] font-medium text-moss-dark">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="mt-3 line-clamp-2 font-heading text-lg text-ink group-hover:text-terracotta">{post.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-ink-soft/80">
          <span>{post.author}</span>
          <span>
            {formatDateThai(post.publishedAt)} · อ่าน {post.readMinutes} นาที
          </span>
        </div>
      </div>
    </Link>
  );
}

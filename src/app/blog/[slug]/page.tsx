import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { blogPosts, getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/mock-data/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { ShareButtons } from "@/components/product/share-buttons";
import { formatDateThai } from "@/lib/utils/format";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "ไม่พบบทความ" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = getRelatedBlogPosts(post.slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-moss/10 px-2.5 py-1 text-xs font-medium text-moss-dark">
            {tag}
          </span>
        ))}
      </div>
      <h1 className="mt-4 font-heading text-3xl text-ink sm:text-4xl">{post.title}</h1>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-soft">
        <span>
          โดย {post.author} · {formatDateThai(post.publishedAt)} · อ่าน {post.readMinutes} นาที
        </span>
        <ShareButtons title={post.title} />
      </div>

      <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl">
        <Image src={post.coverImageUrl} alt={post.title} fill sizes="768px" className="object-cover" />
      </div>

      <div className="mt-8 space-y-4 text-base leading-relaxed text-ink-soft">
        {post.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-14">
          <h2 className="font-heading text-2xl text-ink">บทความที่เกี่ยวข้อง</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

import type { Metadata } from "next";
import { blogPosts } from "@/lib/mock-data/blog";
import { BlogCard } from "@/components/blog/blog-card";

export const metadata: Metadata = {
  title: "บล็อก | เคล็ดลับและเรื่องราวเบเกอรี่",
  description: "บทความให้ความรู้เรื่องขนมปัง เค้ก และเคล็ดลับการเก็บรักษาเบเกอรี่",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="font-heading text-3xl text-ink">บล็อกของเรา</h1>
        <p className="mt-2 text-sm text-ink-soft">เคล็ดลับ ความรู้ และเรื่องราวเกี่ยวกับเบเกอรี่</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

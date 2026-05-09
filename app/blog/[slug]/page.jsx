import { notFound } from "next/navigation";
import Link from "next/link";
import { plannedPosts } from "@/data/blog";

export function generateStaticParams() {
  return plannedPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = plannedPosts.find((item) => item.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: `${post.title} is planned for the Portfolio Gazette technical archive.`,
    robots: {
      index: false,
      follow: true
    }
  };
}

export default async function BlogPlaceholder({ params }) {
  const { slug } = await params;
  const post = plannedPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <main className="not-found">
      <p className="kicker">Blog Archive Prepared</p>
      <h1>{post.title}</h1>
      <p>This article route is reserved for the future technical archive.</p>
      <Link href="/" className="mag-target">Return to the Gazette</Link>
    </main>
  );
}

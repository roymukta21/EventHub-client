import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";
import { blogPosts } from "../data/blog";

export default function BlogDetail() {
  const { id } = useParams({ from: "/public/blog/$id" });
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold mb-2">
            Post not found
          </h2>
          <Button onClick={() => navigate({ to: "/blog" })}>
            Back to Blog
          </Button>
        </div>
      </div>
    );

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: "/blog" })}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Button>
        <span className="text-xs text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold mt-4 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 mb-8 text-sm text-muted-foreground">
          <img
            src={post.authorAvatar}
            alt={post.author}
            className="w-8 h-8 rounded-full"
          />
          <span>{post.author}</span>
          <span>·</span>
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>·</span>
          <span>{post.readTime} min read</span>
        </div>
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-64 sm:h-80 object-cover rounded-2xl mb-8"
        />
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            {post.content}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-8">
          {post.tags.map((t) => (
            <span
              key={t}
              className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-border">
        <h3 className="font-display font-bold text-xl mb-6">More Articles</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {related.map((p) => (
            <Button
              key={p.id}
              variant="ghost"
              className="h-auto p-0 text-left"
              onClick={() =>
                navigate({ to: "/blog/$id", params: { id: String(p.id) } })
              }
            >
              <div className="bg-card border border-border rounded-xl overflow-hidden w-full">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-28 object-cover"
                />
                <div className="p-3">
                  <p className="text-xs font-semibold line-clamp-2">
                    {p.title}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

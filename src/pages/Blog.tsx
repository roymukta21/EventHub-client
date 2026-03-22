import { Link } from "@tanstack/react-router";
import { useState } from "react";
import Footer from "../components/Footer";
import { blogPosts } from "../data/blog";

const CATEGORIES = [
  "All",
  "Guides",
  "Technology",
  "Food & Culture",
  "Music",
  "Health & Wellness",
];

export default function Blog() {
  const [cat, setCat] = useState("All");
  const filtered =
    cat === "All" ? blogPosts : blogPosts.filter((p) => p.category === cat);

  return (
    <div className="min-h-screen">
      <div className="bg-primary/5 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-display font-bold mb-2">
            EventHub Blog
          </h1>
          <p className="text-muted-foreground">
            Insights, guides, and stories about events and experiences.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10"}`}
              data-ocid="blog.category_tab"
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <Link key={post.id} to="/blog/$id" params={{ id: String(post.id) }}>
              <article
                className="bg-card border border-border rounded-2xl overflow-hidden card-hover h-full flex flex-col"
                data-ocid={`blog.item.${i + 1}`}
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs text-primary font-semibold bg-primary/10 px-2.5 py-0.5 rounded-full w-fit mb-3">
                    {post.category}
                  </span>
                  <h2 className="font-display font-semibold text-base line-clamp-2 mb-2 flex-1">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-7 h-7 rounded-full"
                    />
                    <div className="text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span className="mx-1">·</span>
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

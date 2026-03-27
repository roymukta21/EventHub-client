"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import SkeletonCard from "../components/SkeletonCard";
import { events } from "../data/events";
import type { Event } from "../data/events";

const CATEGORIES = [
  "All",
  "Music",
  "Technology",
  "Sports",
  "Arts",
  "Food",
  "Business",
  "Health",
  "Education",
];
const PAGE_SIZE = 8;

export default function Explore() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [minRating, setMinRating] = useState("0");
  const [maxPrice, setMaxPrice] = useState("1000");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const filtered = events
    .filter((e) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q);
      const matchCat = category === "All" || e.category === category;
      const matchPrice = e.price <= Number(maxPrice);
      const matchRating = e.rating >= Number(minRating);
      return matchSearch && matchCat && matchPrice && matchRating;
    })
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "popular") return b.totalBookings - a.totalBookings;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (v: string) => {
    setSearch(v);
    setPage(1);
  };
  const handleCategory = (v: string) => {
    setCategory(v);
    setPage(1);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-primary/5 border-b border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-display font-bold mb-2">
            Explore Events
          </h1>
          <p className="text-muted-foreground">
            Discover {events.length} amazing events across all categories
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search events, venues, cities..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 rounded-xl"
                data-ocid="explore.search_input"
              />
            </div>
            <Select
              value={sort}
              onValueChange={(v) => {
                setSort(v);
                setPage(1);
              }}
            >
              <SelectTrigger
                className="w-full sm:w-48 rounded-xl"
                data-ocid="explore.sort_select"
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    category === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                  data-ocid={`explore.category_${cat.toLowerCase()}_tab`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-muted-foreground">
                Max price: ${maxPrice}
              </span>
              <input
                type="range"
                min={0}
                max={300}
                step={10}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setPage(1);
                }}
                className="w-24"
                data-ocid="explore.price_range_input"
              />
            </div>
            <Select
              value={minRating}
              onValueChange={(v) => {
                setMinRating(v);
                setPage(1);
              }}
            >
              <SelectTrigger
                className="w-32 rounded-xl h-8 text-xs"
                data-ocid="explore.rating_select"
              >
                <SelectValue placeholder="Min rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any rating</SelectItem>
                <SelectItem value="4">4+ stars</SelectItem>
                <SelectItem value="4.5">4.5+ stars</SelectItem>
                <SelectItem value="4.8">4.8+ stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Showing {paginated.length} of {filtered.length} events
        </p>

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static array has no stable id
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-20" data-ocid="explore.empty_state">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display font-semibold text-xl mb-2">
              No events found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters.
            </p>
            <Button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setMaxPrice("1000");
                setMinRating("0");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginated.map((ev, i) => (
              <EventCard key={ev.id} event={ev} index={i + 1} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              data-ocid="explore.pagination_prev"
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === page ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(p)}
                className={
                  p === page ? "bg-primary text-primary-foreground" : ""
                }
              >
                {p}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              data-ocid="explore.pagination_next"
            >
              Next
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

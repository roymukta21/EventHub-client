//import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, MapPin, Star } from "lucide-react";
import type { Event } from "../data/events";

const CATEGORY_COLORS: Record<string, string> = {
  Music: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  Technology: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Sports: "bg-green-500/10 text-green-600 dark:text-green-400",
  Arts: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  Food: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  Business: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  Health: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  Education: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

interface EventCardProps {
  event: Event;
  index?: number;
}

export default function EventCard({ event, index = 1 }: EventCardProps) {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div
      className="bg-card rounded-2xl overflow-hidden border border-border card-hover flex flex-col h-full"
      data-ocid={`event_card.card.${index}`}
    >
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/80 dark:bg-black/60 ${CATEGORY_COLORS[event.category]}`}
          >
            {event.category}
          </span>
        </div>
        {event.price === 0 && (
          <div className="absolute top-3 right-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-500 text-white">
              FREE
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-base leading-tight line-clamp-2 text-card-foreground mb-1.5">
          {event.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3 flex-1">
          {event.description}
        </p>
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-3.5 h-3.5 ${s <= Math.round(event.rating) ? "fill-accent text-accent" : "text-muted-foreground"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            {event.rating} ({event.totalReviews})
          </span>
        </div>
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-bold text-primary text-lg">
            {event.price === 0 ? "Free" : `$${event.price}`}
          </span>
          <Link href={`/events/${event.id}`}>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs"
              data-ocid={`event_card.view_details_button.${index}`}
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

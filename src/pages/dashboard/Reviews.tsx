import { Button } from "@/components/ui/button";
import { Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import { events } from "../../data/events";
import { reviews as allReviews } from "../../data/reviews";
import type { Review } from "../../data/reviews";

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(
    allReviews.filter((r) => r.userId === user?.id),
  );

  const deleteReview = (id: number) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast.success("Review deleted");
  };

  const getEventTitle = (eventId: number) =>
    events.find((e) => e.id === eventId)?.title ?? "Unknown Event";

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-8">My Reviews</h1>
      {reviews.length === 0 ? (
        <div
          className="text-center py-16 bg-card border border-border rounded-2xl"
          data-ocid="reviews.empty_state"
        >
          <p className="text-4xl mb-3">⭐</p>
          <h3 className="font-display font-semibold text-lg mb-1">
            No reviews yet
          </h3>
          <p className="text-muted-foreground text-sm">
            Attend events and share your experience!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r, idx) => (
            <div
              key={r.id}
              className="bg-card border border-border rounded-2xl p-5"
              data-ocid={`reviews.item.${idx + 1}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-sm">
                    {getEventTitle(r.eventId)}
                  </p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${s <= r.rating ? "fill-accent text-accent" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => deleteReview(r.id)}
                    data-ocid={`reviews.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

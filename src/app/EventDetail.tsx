"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, MapPin, Star, Tag, Users } from "lucide-react";
import { useState } from "react";
import BookingModal from "../components/BookingModal";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { events } from "../data/events";
import { reviews as allReviews } from "../data/reviews";

export default function EventDetail() {
  const { id } = useParams({ from: "/public/events/$id" });
  const navigate = useNavigate();
  const { user } = useAuth();
  const event = events.find((e) => e.id === Number(id));
  const [bookingOpen, setBookingOpen] = useState(false);
  const [reviews, setReviews] = useState(
    allReviews.filter((r) => r.eventId === Number(id)),
  );
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [reviewError, setReviewError] = useState("");

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold mb-2">
            Event not found
          </h2>
          <Button onClick={() => navigate({ to: "/explore" })}>
            Back to Explore
          </Button>
        </div>
      </div>
    );
  }

  const related = events
    .filter((e) => e.category === event.category && e.id !== event.id)
    .slice(0, 4);
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const handleBook = () => {
    if (!user) {
      navigate({ to: "/login" });
      return;
    }
    setBookingOpen(true);
  };

  const submitReview = () => {
    if (!newComment.trim()) {
      setReviewError("Please write a comment");
      return;
    }
    setReviewError("");
    const review = {
      id: Date.now(),
      eventId: event.id,
      userId: user?.id ?? 0,
      userName: user?.name ?? "Anonymous",
      userAvatar: user?.avatar ?? "",
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews((prev) => [review, ...prev]);
    setNewComment("");
    setNewRating(5);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: "/explore" })}
          className="mb-6 gap-2"
          data-ocid="event_detail.back_button"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Explore
        </Button>

        {/* Hero */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full object-cover"
            style={{ maxHeight: "400px", width: "100%" }}
          />
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-white/90 text-foreground font-semibold">
              {event.category}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3">
                {event.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>
                  By{" "}
                  <strong className="text-foreground">{event.organizer}</strong>
                </span>
                <span>·</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= Math.round(event.rating) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                    />
                  ))}
                  <span className="ml-1">
                    {event.rating} ({event.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display font-semibold text-xl mb-3">
                About this Event
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {event.longDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs bg-primary/10 text-primary rounded-full px-3 py-1"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Reviews */}
            <div>
              <h2 className="font-display font-semibold text-xl mb-6">
                Reviews ({reviews.length})
              </h2>
              {user && (
                <div
                  className="bg-card border border-border rounded-2xl p-5 mb-6"
                  data-ocid="review.panel"
                >
                  <h3 className="font-semibold mb-3">Write a Review</h3>
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setNewRating(s)}
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${s <= newRating ? "fill-accent text-accent" : "text-muted-foreground hover:text-accent"}`}
                        />
                      </button>
                    ))}
                  </div>
                  <Textarea
                    placeholder="Share your experience..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-2 rounded-xl"
                    data-ocid="review.textarea"
                  />
                  {reviewError && (
                    <p className="text-destructive text-xs mb-2">
                      {reviewError}
                    </p>
                  )}
                  <Button
                    onClick={submitReview}
                    className="bg-primary text-primary-foreground"
                    data-ocid="review.submit_button"
                  >
                    Submit Review
                  </Button>
                </div>
              )}
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <div
                    className="text-center py-8 text-muted-foreground"
                    data-ocid="reviews.empty_state"
                  >
                    No reviews yet. Be the first!
                  </div>
                ) : (
                  reviews.map((r, idx) => (
                    <div
                      key={r.id}
                      className="bg-card border border-border rounded-2xl p-5"
                      data-ocid={`reviews.item.${idx + 1}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-9 h-9">
                            <AvatarImage src={r.userAvatar} />
                            <AvatarFallback>{r.userName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-sm">
                              {r.userName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {r.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${s <= r.rating ? "fill-accent text-accent" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {r.comment}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 sticky top-20">
              <div className="text-3xl font-display font-bold text-primary mb-4">
                {event.price === 0 ? "Free" : `$${event.price}`}
              </div>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    {event.totalBookings.toLocaleString()} attending ·{" "}
                    {(event.capacity - event.totalBookings).toLocaleString()}{" "}
                    spots left
                  </span>
                </div>
              </div>
              <Button
                onClick={handleBook}
                className="w-full bg-primary text-primary-foreground rounded-xl"
                size="lg"
                data-ocid="event_detail.book_button"
              >
                {event.price === 0 ? "Register Free" : "Book Now"}
              </Button>
              {!user && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Login required to book
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Related events */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display font-bold mb-6">
              Related Events
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((ev, i) => (
                <EventCard key={ev.id} event={ev} index={i + 1} />
              ))}
            </div>
          </div>
        )}
      </div>
      <BookingModal
        event={event}
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
      <Footer />
    </div>
  );
}

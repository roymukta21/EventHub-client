import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, MapPin, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Event } from "../data/events";

interface BookingModalProps {
  event: Event | null;
  open: boolean;
  onClose: () => void;
}

export default function BookingModal({
  event,
  open,
  onClose,
}: BookingModalProps) {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);

  if (!event) return null;

  const total = event.price * qty;
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const handleBook = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setBooked(true);
    toast.success(
      `Booked ${qty} ticket${qty > 1 ? "s" : ""} for ${event.title}!`,
    );
  };

  const handleClose = () => {
    setQty(1);
    setBooked(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md" data-ocid="booking.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {booked ? "Booking Confirmed! 🎉" : "Book Tickets"}
          </DialogTitle>
        </DialogHeader>
        {booked ? (
          <div
            className="py-6 text-center space-y-4"
            data-ocid="booking.success_state"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">✓</span>
            </div>
            <p className="text-muted-foreground">
              Your booking for <strong>{event.title}</strong> has been
              confirmed.
            </p>
            <p className="font-semibold text-lg">Total: ${total}</p>
            <Button
              onClick={handleClose}
              className="w-full"
              data-ocid="booking.close_button"
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-40 object-cover rounded-xl"
              />
              <div>
                <h3 className="font-semibold text-base">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Calendar className="w-4 h-4" /> {formatDate(event.date)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                  <MapPin className="w-4 h-4" /> {event.location}
                </div>
              </div>
              <div className="border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Quantity</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="font-bold w-6 text-center">{qty}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setQty((q) => Math.min(10, q + 1))}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Price per ticket
                  </span>
                  <span>{event.price === 0 ? "Free" : `$${event.price}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">
                    {event.price === 0 ? "Free" : `$${total}`}
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={handleClose}
                data-ocid="booking.cancel_button"
              >
                Cancel
              </Button>
              <Button
                onClick={handleBook}
                disabled={loading}
                className="bg-primary text-primary-foreground"
                data-ocid="booking.confirm_button"
              >
                {loading ? "Processing..." : "Confirm Booking"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

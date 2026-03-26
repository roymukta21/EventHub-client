import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import { bookings as allBookings } from "../../data/bookings";
import type { Booking } from "../../data/bookings";

const STATUS_COLORS: Record<string, string> = {
  confirmed:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const PAGE_SIZE = 5;

export default function Bookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>(
    allBookings.filter((b) => b.userId === user?.id),
  );
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const cancelBooking = (id: number) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: "cancelled" as const } : b,
      ),
    );
    toast.success("Booking cancelled");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold">My Bookings</h1>
        <Select
          value={filter}
          onValueChange={(v) => {
            setFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger
            className="w-40 rounded-xl"
            data-ocid="bookings.filter_select"
          >
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {paginated.length === 0 ? (
        <div
          className="text-center py-16 bg-card border border-border rounded-2xl"
          data-ocid="bookings.empty_state"
        >
          <p className="text-4xl mb-3">🎫</p>
          <h3 className="font-display font-semibold text-lg mb-1">
            No bookings found
          </h3>
          <p className="text-muted-foreground text-sm">
            Your event bookings will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {paginated.map((b, idx) => (
            <div
              key={b.id}
              className="bg-card border border-border rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              data-ocid={`bookings.item.${idx + 1}`}
            >
              <img
                src={b.eventImage}
                alt={b.eventTitle}
                className="w-20 h-16 object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{b.eventTitle}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(b.eventDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {b.quantity} ticket{b.quantity > 1 ? "s" : ""} · $
                  {b.totalPrice}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[b.status]}`}
                >
                  {b.status}
                </span>
                {b.status !== "cancelled" && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive text-xs"
                        data-ocid={`bookings.delete_button.${idx + 1}`}
                      >
                        Cancel
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent data-ocid="bookings.dialog">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to cancel your booking for{" "}
                          {b.eventTitle}?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel data-ocid="bookings.cancel_button">
                          Keep Booking
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => cancelBooking(b.id)}
                          className="bg-destructive text-destructive-foreground"
                          data-ocid="bookings.confirm_button"
                        >
                          Yes, Cancel
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            data-ocid="bookings.pagination_prev"
          >
            Prev
          </Button>
          <span className="text-sm text-muted-foreground">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            data-ocid="bookings.pagination_next"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

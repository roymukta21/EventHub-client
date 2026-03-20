export interface Booking {
  id: number;
  userId: number;
  eventId: number;
  eventTitle: string;
  eventDate: string;
  eventImage: string;
  quantity: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled";
  bookedAt: string;
}

export const bookings: Booking[] = [
  {
    id: 1,
    userId: 1,
    eventId: 1,
    eventTitle: "Neon Dreams Music Festival",
    eventDate: "2026-04-15",
    eventImage:
      "https://images.unsplash.com/photo-1493225457153-02f9aef44e67?w=400&h=300&fit=crop",
    quantity: 2,
    totalPrice: 178,
    status: "confirmed",
    bookedAt: "2025-12-10",
  },
  {
    id: 2,
    userId: 1,
    eventId: 2,
    eventTitle: "TechCon 2026 Summit",
    eventDate: "2026-05-22",
    eventImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    quantity: 1,
    totalPrice: 299,
    status: "confirmed",
    bookedAt: "2025-12-15",
  },
  {
    id: 3,
    userId: 1,
    eventId: 5,
    eventTitle: "Global Street Food Carnival",
    eventDate: "2026-05-10",
    eventImage:
      "https://images.unsplash.com/photo-1555244162-09c340d938a7?w=400&h=300&fit=crop",
    quantity: 3,
    totalPrice: 60,
    status: "pending",
    bookedAt: "2026-01-05",
  },
  {
    id: 4,
    userId: 1,
    eventId: 7,
    eventTitle: "Holistic Wellness Retreat",
    eventDate: "2026-04-25",
    eventImage:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    quantity: 1,
    totalPrice: 149,
    status: "cancelled",
    bookedAt: "2026-01-10",
  },
  {
    id: 5,
    userId: 2,
    eventId: 1,
    eventTitle: "Neon Dreams Music Festival",
    eventDate: "2026-04-15",
    eventImage:
      "https://images.unsplash.com/photo-1493225457153-02f9aef44e67?w=400&h=300&fit=crop",
    quantity: 4,
    totalPrice: 356,
    status: "confirmed",
    bookedAt: "2025-11-20",
  },
  {
    id: 6,
    userId: 2,
    eventId: 3,
    eventTitle: "Urban Marathon Championship",
    eventDate: "2026-03-28",
    eventImage:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    quantity: 1,
    totalPrice: 45,
    status: "confirmed",
    bookedAt: "2025-12-01",
  },
  {
    id: 7,
    userId: 3,
    eventId: 9,
    eventTitle: "Jazz Under the Stars",
    eventDate: "2026-08-20",
    eventImage:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop",
    quantity: 2,
    totalPrice: 130,
    status: "confirmed",
    bookedAt: "2026-02-14",
  },
  {
    id: 8,
    userId: 4,
    eventId: 11,
    eventTitle: "NBA All-Star Fan Experience",
    eventDate: "2026-02-14",
    eventImage:
      "https://images.unsplash.com/photo-1461896836374-cf9bac6d658c?w=400&h=300&fit=crop",
    quantity: 2,
    totalPrice: 240,
    status: "confirmed",
    bookedAt: "2025-10-30",
  },
];

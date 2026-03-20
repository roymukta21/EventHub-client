export interface Review {
  id: number;
  eventId: number;
  userId: number;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    eventId: 1,
    userId: 3,
    userName: "Sarah Chen",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
    rating: 5,
    comment:
      "Absolutely incredible festival! The lineup was top-notch, the atmosphere was electric, and the production value was world-class. Can't wait for next year!",
    date: "2025-09-20",
  },
  {
    id: 2,
    eventId: 1,
    userId: 4,
    userName: "Marcus Johnson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusJohnson",
    rating: 5,
    comment:
      "Best music festival I've attended in years. The multiple stages meant there was always something amazing to see. Food vendors were great too!",
    date: "2025-09-21",
  },
  {
    id: 3,
    eventId: 1,
    userId: 1,
    userName: "John Doe",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe",
    rating: 4,
    comment:
      "Amazing experience overall. The crowd was incredible and the artists delivered. Only minor issue was the long lines at food stalls.",
    date: "2025-09-22",
  },
  {
    id: 4,
    eventId: 2,
    userId: 1,
    userName: "John Doe",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe",
    rating: 5,
    comment:
      "TechCon exceeded all expectations. The AI track alone was worth the ticket price. Met incredible people and learned so much in 3 days.",
    date: "2025-10-05",
  },
  {
    id: 5,
    eventId: 2,
    userId: 3,
    userName: "Sarah Chen",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
    rating: 5,
    comment:
      "The workshops were hands-on and incredibly valuable. The speaker lineup this year was the best yet. Already registered for next year!",
    date: "2025-10-06",
  },
  {
    id: 6,
    eventId: 3,
    userId: 4,
    userName: "Marcus Johnson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusJohnson",
    rating: 5,
    comment:
      "Ran my first marathon here and it was an unforgettable experience. The course was beautiful, the crowds cheering were amazing, and the finish line celebration was epic.",
    date: "2025-11-01",
  },
  {
    id: 7,
    eventId: 4,
    userId: 3,
    userName: "Sarah Chen",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
    rating: 4,
    comment:
      "Beautifully curated exhibition. Some of the interactive installations were genuinely moving. A couple of galleries were crowded but overall a wonderful afternoon.",
    date: "2025-08-15",
  },
  {
    id: 8,
    eventId: 5,
    userId: 1,
    userName: "John Doe",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe",
    rating: 5,
    comment:
      "The variety of food was mind-blowing. I tried dishes I'd never even heard of before. The Ethiopian and Japanese stalls were my favorites. A must-do event!",
    date: "2025-07-20",
  },
];

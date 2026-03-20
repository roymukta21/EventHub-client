export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  imageUrl: string;
  date: string;
  readTime: number;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Tips for Choosing the Perfect Event in Your City",
    excerpt:
      "Finding events that match your interests, schedule, and budget can be overwhelming. Here's our expert guide to curating your perfect event calendar.",
    content:
      "Finding events that match your interests, schedule, and budget can be overwhelming in a city full of options. The key is to start with your core interests and build outward. Consider the time commitment — a weekend festival is very different from an evening lecture. Budget wisely: some of the best events are free, while premium experiences justify higher prices. Read reviews from past attendees to set realistic expectations. Follow event organizers whose taste aligns with yours. And don't be afraid to try something completely new — some of our most memorable experiences come from stepping outside our comfort zones.",
    author: "Emma Rodriguez",
    authorAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaRodriguez",
    category: "Guides",
    imageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop",
    date: "2026-01-15",
    readTime: 6,
    tags: ["tips", "guide", "events", "city life"],
  },
  {
    id: 2,
    title: "The Rise of AI-Powered Event Recommendations",
    excerpt:
      "How artificial intelligence is transforming the way we discover and connect with events that truly resonate with our unique interests and lifestyle.",
    content:
      "Artificial intelligence is fundamentally changing how people discover events. Traditional recommendation systems relied on simple demographic targeting and past purchase history. Modern AI systems analyze hundreds of signals — your listening habits, social connections, past event attendance patterns, and even weather preferences — to surface events you'll genuinely love. At EventHub, our AI assistant considers not just what you've liked before but what the people most similar to you are excited about. The result is a discovery experience that feels almost intuitive.",
    author: "David Kim",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidKim",
    category: "Technology",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
    date: "2026-01-28",
    readTime: 8,
    tags: ["AI", "technology", "recommendations", "future"],
  },
  {
    id: 3,
    title: "From Stalls to Stars: The Evolution of Food Festivals",
    excerpt:
      "Food festivals have transformed from humble local markets into global culinary destinations attracting millions of visitors annually.",
    content:
      "The humble food festival has undergone a remarkable transformation over the past two decades. What began as local farmers' markets and church fetes has evolved into multi-day culinary spectacles featuring Michelin-starred chefs, international street food, and immersive dining experiences. The social media era supercharged this evolution — an Instagrammable dish can make a food stall famous overnight. Today's food festivals are as much about storytelling and culture as they are about eating. The best ones offer a genuine window into the culinary traditions of communities around the world.",
    author: "Priya Patel",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaPatel",
    category: "Food & Culture",
    imageUrl:
      "https://images.unsplash.com/photo-1555244162-09c340d938a7?w=800&h=400&fit=crop",
    date: "2026-02-05",
    readTime: 5,
    tags: ["food", "festivals", "culture", "history"],
  },
  {
    id: 4,
    title: "How Tech Conferences Became the New Networking Goldmine",
    excerpt:
      "The return of in-person tech events has created unprecedented networking opportunities that virtual conferences simply couldn't replicate.",
    content:
      "There's a reason the world's biggest tech companies send their teams to conferences even in an era of perfect video calling: the serendipitous connections that happen in hallways, at coffee stations, and during evening events are simply irreplaceable. Studies show that the most valuable meetings at tech conferences aren't the scheduled ones but the spontaneous conversations that happen between sessions. The best conferences design for serendipity — creating spaces and activities that bring people together in organic ways.",
    author: "Alex Chen",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexChen",
    category: "Technology",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
    date: "2026-02-18",
    readTime: 7,
    tags: ["tech", "networking", "conferences", "career"],
  },
  {
    id: 5,
    title: "Music Festival Survival Guide: Packing, Planning & Enjoying",
    excerpt:
      "After attending 50+ festivals, our resident expert shares the ultimate guide to having the best possible festival experience.",
    content:
      "The difference between a great festival experience and a miserable one often comes down to preparation. The basics: comfortable shoes you can stand in for 12 hours, layers for temperature swings, a portable charger that'll last all day, and cash for vendors who don't take cards. The pro tips: download the app and build your schedule the night before but stay flexible, discover your favorite artists by wandering to the smaller stages, eat before the headliners when lines are longest, and always identify the medical tents and nearest exits when you arrive.",
    author: "Jake Morrison",
    authorAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=JakeMorrison",
    category: "Music",
    imageUrl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=400&fit=crop",
    date: "2026-03-01",
    readTime: 9,
    tags: ["festival", "music", "tips", "survival guide"],
  },
  {
    id: 6,
    title: "The Wellness Event Boom: Why Self-Care Went Public",
    excerpt:
      "Wellness retreats and health-focused events have exploded in popularity, reflecting a fundamental shift in how we think about work, rest, and community.",
    content:
      "Something profound is happening in the events industry: wellness has gone mainstream and public. A decade ago, yoga retreats and meditation workshops were niche offerings for dedicated practitioners. Today they're selling out alongside music festivals and sports events. This reflects a genuine cultural shift — as work-life boundaries blur and mental health awareness grows, people are actively seeking community experiences centered on wellbeing rather than just entertainment. The best wellness events create space for genuine transformation, not just a weekend of spa treatments.",
    author: "Maya Williams",
    authorAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=MayaWilliams",
    category: "Health & Wellness",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop",
    date: "2026-03-10",
    readTime: 6,
    tags: ["wellness", "health", "self-care", "trends"],
  },
];

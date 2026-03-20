export interface MockUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  avatar: string;
  bio: string;
  phone: string;
  location: string;
  joinedAt: string;
}

export const mockUsers: MockUser[] = [
  {
    id: 1,
    name: "John Doe",
    email: "user@example.com",
    password: "123456",
    role: "user",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe",
    bio: "Event enthusiast and avid concert-goer. Love discovering new experiences in the city.",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    joinedAt: "2024-08-15",
  },
  {
    id: 2,
    name: "Admin User",
    email: "admin@example.com",
    password: "123456",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminUser",
    bio: "Platform administrator managing events and ensuring the best experience for all users.",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    joinedAt: "2023-01-01",
  },
  {
    id: 3,
    name: "Sarah Chen",
    email: "sarah@example.com",
    password: "123456",
    role: "user",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
    bio: "Tech professional and foodie. Always looking for the next great event.",
    phone: "+1 (555) 345-6789",
    location: "Seattle, WA",
    joinedAt: "2024-11-20",
  },
  {
    id: 4,
    name: "Marcus Johnson",
    email: "marcus@example.com",
    password: "123456",
    role: "user",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusJohnson",
    bio: "Sports fanatic and entrepreneur. Building the next big startup between events.",
    phone: "+1 (555) 456-7890",
    location: "Chicago, IL",
    joinedAt: "2025-02-10",
  },
];

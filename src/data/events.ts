export interface Event {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category:
    | "Music"
    | "Technology"
    | "Sports"
    | "Arts"
    | "Food"
    | "Business"
    | "Health"
    | "Education";
  price: number;
  date: string;
  location: string;
  imageUrl: string;
  rating: number;
  totalReviews: number;
  totalBookings: number;
  tags: string[];
  organizer: string;
  isFeatured: boolean;
  capacity: number;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Neon Dreams Music Festival",
    description:
      "Three stages of live music featuring top artists across genres from electronic to indie rock.",
    longDescription:
      "Neon Dreams Music Festival is the premier outdoor music event of the year. Set against a stunning backdrop, this festival brings together over 50 artists across three massive stages. From pulsating electronic beats to soulful indie rock anthems, there's something for every music lover. Enjoy gourmet food stalls, art installations, and an unforgettable atmosphere as the sun sets and the neon lights come alive.",
    category: "Music",
    price: 89,
    date: "2026-04-15",
    location: "Central Park, New York",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457153-02f9aef44e67?w=400&h=300&fit=crop",
    rating: 4.8,
    totalReviews: 342,
    totalBookings: 1200,
    tags: ["festival", "live music", "outdoor", "electronic", "indie"],
    organizer: "Stellar Events Co.",
    isFeatured: true,
    capacity: 2000,
  },
  {
    id: 2,
    title: "TechCon 2026 Summit",
    description:
      "The world's largest tech conference featuring AI, blockchain, and next-gen computing.",
    longDescription:
      "TechCon 2026 Summit brings together the brightest minds in technology for three days of innovation, networking, and discovery. Explore cutting-edge demos of artificial intelligence, quantum computing, and next-generation blockchain applications. Over 200 speakers, 50 workshops, and an expo floor featuring 300+ exhibitors. Whether you're a developer, entrepreneur, or tech enthusiast, TechCon 2026 is where the future is built.",
    category: "Technology",
    price: 299,
    date: "2026-05-22",
    location: "Moscone Center, San Francisco",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    rating: 4.9,
    totalReviews: 518,
    totalBookings: 3500,
    tags: ["tech", "AI", "blockchain", "networking", "conference"],
    organizer: "TechCon Global",
    isFeatured: true,
    capacity: 5000,
  },
  {
    id: 3,
    title: "Urban Marathon Championship",
    description:
      "42km through the heart of the city with thousands of runners from 80 countries.",
    longDescription:
      "The Urban Marathon Championship is one of the world's most iconic races, winding through the historic streets and modern districts of the city. With 42,195 meters of carefully curated route, runners pass landmarks, cross bridges, and experience the city like never before. The event welcomes elite athletes and amateur runners alike, with full race support, pacers, and a massive celebration at the finish line.",
    category: "Sports",
    price: 45,
    date: "2026-03-28",
    location: "Downtown Chicago, IL",
    imageUrl:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    rating: 4.7,
    totalReviews: 289,
    totalBookings: 8500,
    tags: ["marathon", "running", "fitness", "championship"],
    organizer: "City Sports Authority",
    isFeatured: true,
    capacity: 15000,
  },
  {
    id: 4,
    title: "Contemporary Art Immersion",
    description:
      "An interactive art experience with 30 emerging artists across 12 stunning galleries.",
    longDescription:
      "Contemporary Art Immersion transforms a historic warehouse into a labyrinthine gallery experience unlike any other. Thirty emerging and established artists present interactive installations, mixed media works, and performance art pieces that challenge, inspire, and transport visitors. Guided tours available, plus artist talks and live creation sessions throughout the weekend.",
    category: "Arts",
    price: 35,
    date: "2026-04-08",
    location: "DUMBO Arts Center, Brooklyn",
    imageUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf145a?w=400&h=300&fit=crop",
    rating: 4.6,
    totalReviews: 156,
    totalBookings: 780,
    tags: ["art", "contemporary", "installation", "gallery", "interactive"],
    organizer: "ArtHouse Collective",
    isFeatured: true,
    capacity: 1000,
  },
  {
    id: 5,
    title: "Global Street Food Carnival",
    description:
      "Over 100 food stalls celebrating cuisines from 60 countries in one spectacular venue.",
    longDescription:
      "The Global Street Food Carnival is a foodie's paradise, bringing together over 100 vendors representing the best street food traditions from around the world. From Japanese takoyaki to Mexican elotes, Ethiopian injera to Australian meat pies, the carnival is a world tour in a single afternoon. Cooking demonstrations, food competitions, and cultural performances run throughout the event.",
    category: "Food",
    price: 20,
    date: "2026-05-10",
    location: "Prospect Park, Brooklyn",
    imageUrl:
      "https://images.unsplash.com/photo-1555244162-09c340d938a7?w=400&h=300&fit=crop",
    rating: 4.8,
    totalReviews: 423,
    totalBookings: 4200,
    tags: ["food", "street food", "international", "carnival", "culture"],
    organizer: "World Food Events",
    isFeatured: false,
    capacity: 8000,
  },
  {
    id: 6,
    title: "Startup Founders Summit",
    description:
      "Connect with 500+ founders, investors, and mentors shaping tomorrow's businesses.",
    longDescription:
      "The Startup Founders Summit is the definitive gathering for the entrepreneurial community. Over two days, founders at every stage connect with Series A and B investors, seasoned mentors, and potential co-founders. Pitch competitions with $500K in prizes, intimate roundtable discussions, and keynote speeches from founders who've built billion-dollar companies from scratch.",
    category: "Business",
    price: 199,
    date: "2026-06-14",
    location: "WeWork HQ, New York",
    imageUrl:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
    rating: 4.7,
    totalReviews: 201,
    totalBookings: 950,
    tags: ["startup", "entrepreneurship", "networking", "investors", "pitch"],
    organizer: "Founders Network Inc.",
    isFeatured: false,
    capacity: 1500,
  },
  {
    id: 7,
    title: "Holistic Wellness Retreat",
    description:
      "A transformative weekend of yoga, meditation, nutrition workshops, and mindful living.",
    longDescription:
      "The Holistic Wellness Retreat is a full immersion into health and mindfulness. Set in a serene estate outside the city, this weekend retreat offers morning yoga flows, guided meditation sessions, nutritional cooking classes, and one-on-one wellness consultations. Certified practitioners in Ayurveda, breathwork, and somatic therapy lead specialized workshops throughout the weekend.",
    category: "Health",
    price: 149,
    date: "2026-04-25",
    location: "Blue Ridge Mountain Estate, VA",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    rating: 4.9,
    totalReviews: 178,
    totalBookings: 450,
    tags: ["wellness", "yoga", "meditation", "retreat", "mindfulness"],
    organizer: "Zen Life Studios",
    isFeatured: false,
    capacity: 100,
  },
  {
    id: 8,
    title: "Future of Learning Conference",
    description:
      "EdTech leaders, educators, and policymakers explore the transformation of education.",
    longDescription:
      "The Future of Learning Conference brings together educators, technologists, and policymakers to address the most pressing challenges and opportunities in modern education. Sessions cover personalized learning pathways, AI tutoring systems, gamification strategies, and inclusive education practices. Special workshops for K-12 teachers, university professors, and corporate learning professionals.",
    category: "Education",
    price: 79,
    date: "2026-07-09",
    location: "MIT Media Lab, Cambridge",
    imageUrl:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop",
    rating: 4.6,
    totalReviews: 134,
    totalBookings: 680,
    tags: ["education", "edtech", "learning", "AI", "conference"],
    organizer: "EduFuture Foundation",
    isFeatured: false,
    capacity: 1200,
  },
  {
    id: 9,
    title: "Jazz Under the Stars",
    description:
      "An intimate evening of jazz performed by Grammy-winning artists in an outdoor amphitheater.",
    longDescription:
      "Jazz Under the Stars is an annual celebration of America's most beloved musical tradition. Under a canopy of stars, Grammy-winning jazz musicians and rising stars perform an evening of standards, improvisation, and original compositions. The intimate amphitheater setting ensures every seat is perfect. Wine and artisan food pairings available. Come early for the pre-show musician workshops.",
    category: "Music",
    price: 65,
    date: "2026-08-20",
    location: "Hollywood Bowl, Los Angeles",
    imageUrl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop",
    rating: 4.9,
    totalReviews: 267,
    totalBookings: 890,
    tags: ["jazz", "live music", "outdoor", "intimate", "grammy"],
    organizer: "Harmony Events",
    isFeatured: false,
    capacity: 1200,
  },
  {
    id: 10,
    title: "Web3 & DeFi Builders Hackathon",
    description:
      "48 hours to build the next generation of decentralized applications with $100K in prizes.",
    longDescription:
      "The Web3 & DeFi Builders Hackathon challenges developers, designers, and entrepreneurs to create groundbreaking decentralized applications in just 48 hours. With $100K in prizes across 10 categories, access to mentors from leading blockchain projects, and API credits from major protocols, this is the hackathon where careers are launched and protocols are born.",
    category: "Technology",
    price: 0,
    date: "2026-05-30",
    location: "Hack Reactor, San Francisco",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
    rating: 4.7,
    totalReviews: 189,
    totalBookings: 620,
    tags: ["hackathon", "web3", "DeFi", "blockchain", "free"],
    organizer: "BlockBuild Labs",
    isFeatured: false,
    capacity: 800,
  },
  {
    id: 11,
    title: "NBA All-Star Fan Experience",
    description:
      "An immersive basketball experience with player meet-and-greets, skills challenges, and live games.",
    longDescription:
      "The NBA All-Star Fan Experience is three days of basketball heaven. Meet your favorite NBA players, compete in skills challenges, join 3-on-3 tournaments, and watch live games in an arena buzzing with energy. Special appearances, autograph sessions, and exclusive merchandise drops make this the must-attend event for every basketball fan.",
    category: "Sports",
    price: 120,
    date: "2026-02-14",
    location: "Chase Center, San Francisco",
    imageUrl:
      "https://images.unsplash.com/photo-1461896836374-cf9bac6d658c?w=400&h=300&fit=crop",
    rating: 4.8,
    totalReviews: 445,
    totalBookings: 5200,
    tags: ["NBA", "basketball", "sports", "fan experience", "all-star"],
    organizer: "NBA Events",
    isFeatured: false,
    capacity: 10000,
  },
  {
    id: 12,
    title: "Sculpture Garden Gala",
    description:
      "An evening reception in one of the world's most renowned sculpture gardens with live performances.",
    longDescription:
      "The Sculpture Garden Gala is a black-tie evening reception set among world-class sculptures. Guests enjoy champagne receptions, canapés from a Michelin-starred chef, and live chamber music as they explore the illuminated garden. A curated auction of emerging artists' works follows, with proceeds supporting arts education programs.",
    category: "Arts",
    price: 250,
    date: "2026-06-05",
    location: "MOMA Sculpture Garden, New York",
    imageUrl:
      "https://images.unsplash.com/photo-1578301978693-b0e1b04de07a?w=400&h=300&fit=crop",
    rating: 4.9,
    totalReviews: 98,
    totalBookings: 320,
    tags: ["gala", "sculpture", "art", "black-tie", "charity"],
    organizer: "MOMA Foundation",
    isFeatured: false,
    capacity: 400,
  },
  {
    id: 13,
    title: "Farm-to-Table Chef's Table",
    description:
      "An exclusive 8-course tasting menu by Chef Maria Santos sourced entirely from local farms.",
    longDescription:
      "The Farm-to-Table Chef's Table is the most intimate dining experience in the city. Chef Maria Santos, winner of multiple James Beard awards, prepares an 8-course tasting menu that changes with the seasons. Every ingredient is sourced within 50 miles, and Chef Santos introduces each course personally. Limited to 20 guests per evening, this is a once-in-a-season opportunity.",
    category: "Food",
    price: 180,
    date: "2026-04-18",
    location: "The Green Barn, Hudson Valley",
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    rating: 5.0,
    totalReviews: 62,
    totalBookings: 180,
    tags: [
      "fine dining",
      "farm-to-table",
      "exclusive",
      "tasting menu",
      "local",
    ],
    organizer: "Santos Culinary Arts",
    isFeatured: false,
    capacity: 20,
  },
  {
    id: 14,
    title: "Women in Leadership Forum",
    description:
      "A powerful gathering of 1000+ women leaders sharing strategies for success in the modern workplace.",
    longDescription:
      "The Women in Leadership Forum is an annual celebration and empowerment event bringing together women at all career stages. From C-suite executives to early-career professionals, participants engage in workshops on negotiation, executive presence, board readiness, and entrepreneurship. Keynotes from Fortune 500 CEOs, panel discussions, and a mentorship marketplace make this a transformative experience.",
    category: "Business",
    price: 149,
    date: "2026-03-08",
    location: "Marriott Marquis, Times Square",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604082-c2cfe3168b07?w=400&h=300&fit=crop",
    rating: 4.8,
    totalReviews: 312,
    totalBookings: 1850,
    tags: ["women", "leadership", "empowerment", "business", "networking"],
    organizer: "SheLeads Global",
    isFeatured: false,
    capacity: 2000,
  },
  {
    id: 15,
    title: "Half Marathon & Fun Run",
    description:
      "Scenic 21km route through national park trails, open to all fitness levels.",
    longDescription:
      "The Half Marathon & Fun Run offers two distance options through breathtaking national park scenery. The competitive 21km half marathon winds through old-growth forests, mountain meadows, and along crystal-clear streams. The 5km Fun Run is perfect for families and beginners. Professional timing, finisher medals, and a post-race festival with live music await all participants.",
    category: "Sports",
    price: 30,
    date: "2026-09-15",
    location: "Shenandoah National Park, VA",
    imageUrl:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    rating: 4.6,
    totalReviews: 198,
    totalBookings: 2100,
    tags: [
      "half marathon",
      "trail running",
      "national park",
      "fitness",
      "fun run",
    ],
    organizer: "Trail Blazers Running Club",
    isFeatured: false,
    capacity: 3000,
  },
  {
    id: 16,
    title: "Mental Health & Mindfulness Summit",
    description:
      "Leading psychologists and wellness experts tackle the mental health crisis with practical solutions.",
    longDescription:
      "The Mental Health & Mindfulness Summit brings together clinical psychologists, neuroscientists, mindfulness teachers, and lived-experience advocates for a frank, compassionate conversation about mental wellbeing. Sessions address workplace burnout, digital anxiety, trauma-informed practices, and evidence-based mindfulness techniques. Every attendee receives a comprehensive wellbeing toolkit.",
    category: "Health",
    price: 99,
    date: "2026-10-10",
    location: "Javits Center, New York",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613576-1a6e73d1c0af?w=400&h=300&fit=crop",
    rating: 4.7,
    totalReviews: 221,
    totalBookings: 1200,
    tags: ["mental health", "mindfulness", "wellness", "psychology", "burnout"],
    organizer: "MindWell Foundation",
    isFeatured: false,
    capacity: 2000,
  },
  {
    id: 17,
    title: "Coding Bootcamp for Beginners",
    description:
      "Intensive 2-day workshop taking complete beginners to building their first web application.",
    longDescription:
      "The Coding Bootcamp for Beginners is designed for people who've always wanted to code but never knew where to start. Over two intensive days, expert instructors guide participants from zero knowledge to deploying a functional web application. Topics include HTML, CSS, JavaScript fundamentals, and basic React. Small cohorts ensure personalized attention.",
    category: "Education",
    price: 0,
    date: "2026-04-04",
    location: "General Assembly, Chicago",
    imageUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
    rating: 4.8,
    totalReviews: 156,
    totalBookings: 890,
    tags: ["coding", "bootcamp", "beginners", "web development", "free"],
    organizer: "Code For All",
    isFeatured: false,
    capacity: 50,
  },
  {
    id: 18,
    title: "Electronic Music Open Air",
    description:
      "12 hours of continuous electronic music across 4 stages in a stunning waterfront location.",
    longDescription:
      "Electronic Music Open Air is the city's premier outdoor electronic music event, transforming the waterfront into a pulsating world of sound and light. Four stages showcase different sub-genres: main stage for headline DJ acts, a techno room in a converted warehouse, a deep house outdoor terrace, and an ambient chill-out dome. Professional sound systems, cutting-edge light shows, and world-class artists make this an unmissable experience.",
    category: "Music",
    price: 55,
    date: "2026-07-25",
    location: "Brooklyn Navy Yard, New York",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457153-02f9aef44e67?w=400&h=300&fit=crop",
    rating: 4.7,
    totalReviews: 389,
    totalBookings: 3200,
    tags: ["electronic", "techno", "house", "DJ", "outdoor"],
    organizer: "Bass Nation Events",
    isFeatured: false,
    capacity: 5000,
  },
  {
    id: 19,
    title: "AI & Machine Learning Workshop",
    description:
      "Hands-on workshop building real ML models with PyTorch and TensorFlow.",
    longDescription:
      "The AI & Machine Learning Workshop is a hands-on technical experience for developers and data scientists. Over one day, participants build and train real machine learning models using PyTorch and TensorFlow. Topics include neural network architecture, natural language processing, computer vision, and deployment strategies. Bring your laptop — this is a coding workshop, not a lecture series.",
    category: "Technology",
    price: 149,
    date: "2026-06-28",
    location: "Stanford Research Park, Palo Alto",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    rating: 4.8,
    totalReviews: 143,
    totalBookings: 420,
    tags: ["AI", "machine learning", "workshop", "PyTorch", "TensorFlow"],
    organizer: "AI Academy",
    isFeatured: false,
    capacity: 100,
  },
  {
    id: 20,
    title: "Vegan Food & Lifestyle Expo",
    description:
      "The largest plant-based food and lifestyle expo in North America with 200+ exhibitors.",
    longDescription:
      "The Vegan Food & Lifestyle Expo is North America's largest celebration of plant-based living. Two hundred exhibitors showcase innovative vegan foods, cruelty-free fashion, eco-friendly homeware, and natural beauty products. Celebrity chefs host live cooking demonstrations, nutritionists lead workshops, and speakers address the environmental impact of plant-based lifestyles.",
    category: "Food",
    price: 25,
    date: "2026-05-17",
    location: "Los Angeles Convention Center",
    imageUrl:
      "https://images.unsplash.com/photo-1555244162-09c340d938a7?w=400&h=300&fit=crop",
    rating: 4.6,
    totalReviews: 278,
    totalBookings: 4800,
    tags: ["vegan", "plant-based", "expo", "lifestyle", "sustainable"],
    organizer: "Green Planet Events",
    isFeatured: false,
    capacity: 10000,
  },
];

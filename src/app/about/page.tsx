//import Footer from "../components/Footer";

import Footer from "@/components/Footer";

const TEAM = [
  {
    name: "Elena Vasquez",
    role: "CEO & Co-Founder",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    bio: "Former Google PM with 10 years in event tech. Passionate about connecting people through shared experiences.",
  },
  {
    name: "James Park",
    role: "CTO & Co-Founder",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    bio: "Ex-Stripe engineer. Built infrastructure serving millions of transactions. Loves distributed systems and jazz.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Design",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    bio: "Design lead with roots in interaction design. Believes great design should be invisible and delightful.",
  },
  {
    name: "Marcus Allen",
    role: "Head of AI",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    bio: "PhD in ML from MIT. Built recommendation systems used by 10M+ people. Runner, chef, dog enthusiast.",
  },
];

const STORY_STATS = [
  { val: "2022", lbl: "Founded" },
  { val: "50K+", lbl: "Users" },
  { val: "100+", lbl: "Cities" },
  { val: "10K+", lbl: "Events" },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-display font-bold mb-6">Our Mission</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We believe life&apos;s most meaningful moments happen when people gather.
            EventHub exists to make those moments more discoverable, more
            accessible, and more extraordinary.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold mb-4">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  EventHub was born in 2022 when our founders realized that
                  despite living in the most connected era in history, people
                  were still missing out on incredible events happening in their
                  own cities.
                </p>
                <p>
                  We built EventHub to solve exactly that problem: a platform
                  that uses AI to cut through the noise and surface events
                  you&apos;ll genuinely love, with a booking experience so smooth it
                  feels magical.
                </p>
                <p>
                  Today, EventHub connects millions of people with tens of
                  thousands of events across hundreds of cities. We&apos;re just
                  getting started.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {STORY_STATS.map((s) => (
                <div
                  key={s.lbl}
                  className="bg-card border border-border rounded-2xl p-6 text-center"
                >
                  <div className="text-3xl font-display font-bold text-primary mb-1">
                    {s.val}
                  </div>
                  <div className="text-sm text-muted-foreground">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-3">
              Meet the Team
            </h2>
            <p className="text-muted-foreground">
              The people building EventHub with passion and purpose.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-card border border-border rounded-2xl p-6 text-center card-hover"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 bg-muted"
                />
                <h3 className="font-display font-semibold">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

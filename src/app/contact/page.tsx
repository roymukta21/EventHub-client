"use client";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Invalid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 20)
      e.message = "Message must be at least 20 characters";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-primary/5 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-display font-bold mb-3">Get in Touch</h1>
          <p className="text-muted-foreground">
            Have a question, suggestion, or just want to say hello? We&apos;d
            love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-display font-semibold text-xl mb-4">
                Contact Information
              </h2>
              {[
                { icon: Mail, label: "Email", val: "hello@eventhub.com" },
                { icon: Phone, label: "Phone", val: "+1 (555) 987-6543" },
                {
                  icon: MapPin,
                  label: "Address",
                  val: "123 Event Plaza, Suite 400, New York, NY 10001",
                },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-3 py-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <c.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">
                      {c.label}
                    </p>
                    <p className="text-sm font-medium">{c.val}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Map placeholder */}
            <div className="bg-muted rounded-2xl h-48 flex items-center justify-center border border-border">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">New York, NY</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div
                className="bg-card border border-border rounded-2xl p-12 text-center"
                data-ocid="contact.success_state"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="font-display font-bold text-2xl mb-2">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground">
                  Thanks for reaching out. We&apos;ll get back to you within 24
                  hours.
                </p>
                <Button className="mt-6" onClick={() => setSubmitted(false)}>
                  Send Another
                </Button>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="font-display font-semibold text-xl mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="c-name">Name</Label>
                      <Input
                        id="c-name"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="Your name"
                        className="mt-1 rounded-xl"
                        data-ocid="contact.name_input"
                      />
                      {errors.name && (
                        <p className="text-destructive text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="c-email">Email</Label>
                      <Input
                        id="c-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="your@email.com"
                        className="mt-1 rounded-xl"
                        data-ocid="contact.email_input"
                      />
                      {errors.email && (
                        <p className="text-destructive text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="c-subject">Subject</Label>
                    <Input
                      id="c-subject"
                      value={form.subject}
                      onChange={(e) => set("subject", e.target.value)}
                      placeholder="How can we help?"
                      className="mt-1 rounded-xl"
                      data-ocid="contact.subject_input"
                    />
                    {errors.subject && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="c-message">Message</Label>
                    <Textarea
                      id="c-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="Tell us more..."
                      className="mt-1 rounded-xl"
                      data-ocid="contact.textarea"
                    />
                    {errors.message && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground rounded-xl"
                    disabled={loading}
                    data-ocid="contact.submit_button"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

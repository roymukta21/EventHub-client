import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: "EventHub",
    contactEmail: "hello@eventhub.com",
    maxBookingsPerUser: "10",
    allowRegistration: true,
    emailNotifications: true,
    maintenanceMode: false,
  });
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: string | boolean) =>
    setSettings((s) => ({ ...s, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-xl space-y-8">
      <h1 className="text-2xl font-display font-bold">Platform Settings</h1>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-display font-semibold">General</h2>
        <div>
          <Label>Site Name</Label>
          <Input
            value={settings.siteName}
            onChange={(e) => set("siteName", e.target.value)}
            className="mt-1 rounded-xl"
            data-ocid="settings.site_name_input"
          />
        </div>
        <div>
          <Label>Contact Email</Label>
          <Input
            type="email"
            value={settings.contactEmail}
            onChange={(e) => set("contactEmail", e.target.value)}
            className="mt-1 rounded-xl"
            data-ocid="settings.contact_email_input"
          />
        </div>
        <div>
          <Label>Max Bookings per User</Label>
          <Input
            type="number"
            value={settings.maxBookingsPerUser}
            onChange={(e) => set("maxBookingsPerUser", e.target.value)}
            className="mt-1 rounded-xl"
            data-ocid="settings.max_bookings_input"
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-display font-semibold">Toggles</h2>
        {[
          {
            key: "allowRegistration",
            label: "Allow New Registrations",
            desc: "Users can create new accounts",
          },
          {
            key: "emailNotifications",
            label: "Email Notifications",
            desc: "Send booking confirmation emails",
          },
          {
            key: "maintenanceMode",
            label: "Maintenance Mode",
            desc: "Show maintenance page to visitors",
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-start justify-between gap-4"
          >
            <div>
              <p className="font-medium text-sm">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <Switch
              checked={settings[item.key as keyof typeof settings] as boolean}
              onCheckedChange={(v) => set(item.key, v)}
              data-ocid={`settings.${item.key}_switch`}
            />
          </div>
        ))}
      </div>

      <Button
        onClick={handleSave}
        disabled={saving}
        className="bg-primary text-primary-foreground rounded-xl px-8"
        data-ocid="settings.save_button"
      >
        {saving ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  );
}

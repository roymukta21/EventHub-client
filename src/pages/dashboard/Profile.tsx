import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";

interface ProfileField {
  label: string;
  val: string;
}

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? "",
    bio: user?.bio ?? "",
    phone: user?.phone ?? "",
    location: user?.location ?? "",
  });
  const [saving, setSaving] = useState(false);

  if (!user) return null;

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    updateUser(form);
    setSaving(false);
    setEditing(false);
    toast.success("Profile updated!");
  };

  const profileFields: ProfileField[] = [
    { label: "Full Name", val: user.name },
    { label: "Email", val: user.email },
    { label: "Bio", val: user.bio || "No bio added yet" },
    { label: "Phone", val: user.phone || "Not provided" },
    { label: "Location", val: user.location || "Not provided" },
    {
      label: "Member since",
      val: new Date(user.joinedAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    },
  ];

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold">My Profile</h1>
        {!editing && (
          <Button
            onClick={() => setEditing(true)}
            variant="outline"
            data-ocid="profile.edit_button"
          >
            Edit Profile
          </Button>
        )}
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
          </Avatar>
          {editing && (
            <div>
              <Button
                variant="outline"
                size="sm"
                data-ocid="profile.upload_button"
              >
                Change Avatar
              </Button>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG up to 2MB
              </p>
            </div>
          )}
        </div>

        {editing ? (
          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="mt-1 rounded-xl"
                data-ocid="profile.name_input"
              />
            </div>
            <div>
              <Label>Bio</Label>
              <Textarea
                value={form.bio}
                onChange={(e) => set("bio", e.target.value)}
                rows={3}
                className="mt-1 rounded-xl"
                placeholder="Tell us about yourself..."
                data-ocid="profile.bio_textarea"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Phone</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className="mt-1 rounded-xl"
                  placeholder="+1 (555) 000-0000"
                  data-ocid="profile.phone_input"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  className="mt-1 rounded-xl"
                  placeholder="City, State"
                  data-ocid="profile.location_input"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-primary text-primary-foreground"
                data-ocid="profile.save_button"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditing(false)}
                data-ocid="profile.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {profileFields.map((f) => (
              <div
                key={f.label}
                className="flex flex-col sm:flex-row sm:items-start gap-1 py-3 border-b border-border last:border-0"
              >
                <span className="text-sm text-muted-foreground w-32 shrink-0">
                  {f.label}
                </span>
                <span className="text-sm font-medium">{f.val}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { events as initialEvents } from "../../../data/events";
import type { Event } from "../../../data/events";

const CATEGORIES = [
  "Music",
  "Technology",
  "Sports",
  "Arts",
  "Food",
  "Business",
  "Health",
  "Education",
] as const;
const PAGE_SIZE = 5;

export default function ManageEvents() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Music",
    price: "0",
    date: "",
    location: "",
    organizer: "",
    imageUrl: "",
    capacity: "100",
  });

  const filtered = events.filter((e) => {
    const q = search.toLowerCase();
    return (
      (!q || e.title.toLowerCase().includes(q)) &&
      (catFilter === "all" || e.category === catFilter)
    );
  });
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openAdd = () => {
    setEditing(null);
    setForm({
      title: "",
      description: "",
      category: "Music",
      price: "0",
      date: "",
      location: "",
      organizer: "",
      imageUrl: "",
      capacity: "100",
    });
    setModalOpen(true);
  };
  const openEdit = (ev: Event) => {
    setEditing(ev);
    setForm({
      title: ev.title,
      description: ev.description,
      category: ev.category,
      price: String(ev.price),
      date: ev.date,
      location: ev.location,
      organizer: ev.organizer,
      imageUrl: ev.imageUrl,
      capacity: String(ev.capacity),
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title) {
      toast.error("Title required");
      return;
    }
    if (editing) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editing.id
            ? ({
                ...e,
                ...form,
                price: Number(form.price),
                capacity: Number(form.capacity),
              } as Event)
            : e,
        ),
      );
      toast.success("Event updated");
    } else {
      const newEv: Event = {
        ...editing!,
        id: Date.now(),
        ...form,
        price: Number(form.price),
        capacity: Number(form.capacity),
        longDescription: form.description,
        rating: 0,
        totalReviews: 0,
        totalBookings: 0,
        tags: [],
        isFeatured: false,
        category: form.category as Event["category"],
      };
      setEvents((prev) => [newEv, ...prev]);
      toast.success("Event added");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    toast.success("Event deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Manage Events</h1>
        <Button
          onClick={openAdd}
          className="bg-primary text-primary-foreground gap-2"
          data-ocid="admin_events.open_modal_button"
        >
          <Plus className="w-4 h-4" /> Add Event
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9 rounded-xl"
            data-ocid="admin_events.search_input"
          />
        </div>
        <Select
          value={catFilter}
          onValueChange={(v) => {
            setCatFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger
            className="w-40 rounded-xl"
            data-ocid="admin_events.category_select"
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="admin_events.table">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Event
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Price
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Date
                </th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map((ev, idx) => (
                <tr
                  key={ev.id}
                  className="hover:bg-muted/30 transition-colors"
                  data-ocid={`admin_events.row.${idx + 1}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={ev.imageUrl}
                        alt={ev.title}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <span className="font-medium truncate max-w-[200px]">
                        {ev.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <Badge variant="secondary" className="text-xs">
                      {ev.category}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {ev.price === 0 ? "Free" : `$${ev.price}`}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                    {ev.date}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEdit(ev)}
                        data-ocid={`admin_events.edit_button.${idx + 1}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(ev.id)}
                        data-ocid={`admin_events.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            data-ocid="admin_events.pagination_prev"
          >
            Prev
          </Button>
          <span className="text-sm">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            data-ocid="admin_events.pagination_next"
          >
            Next
          </Button>
        </div>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg" data-ocid="admin_events.dialog">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Event" : "Add New Event"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            <div>
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                className="mt-1"
                data-ocid="admin_events.title_input"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                className="mt-1"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Capacity</Label>
                <Input
                  type="number"
                  value={form.capacity}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, capacity: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Organizer</Label>
              <Input
                value={form.organizer}
                onChange={(e) =>
                  setForm((f) => ({ ...f, organizer: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, imageUrl: e.target.value }))
                }
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleSave}
              className="bg-primary text-primary-foreground flex-1"
              data-ocid="admin_events.save_button"
            >
              Save
            </Button>
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
              data-ocid="admin_events.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

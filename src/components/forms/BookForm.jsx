"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User2, Mail } from "lucide-react";

const categories = [
  "Fiction",
  "Non-Fiction",
  "History",
  "Programming",
  "Science",
  "Biography",
  "Fantasy",
  "Self-Help",
  "Mystery",
  "Horror",
  "Poetry",
  "Children's Books",
  "Cookbooks",
  "Travel",
];

const BookForm = ({ book, user, onSubmit, disabled }) => {
const isEdit = Boolean(book);

  const [form, setForm] = useState({
    title: book?.title,
    author: book?.author,
    image: book?.image,
    category: book?.category,
    description: book?.description,
    totalCopies: book?.totalCopies ?? 1,
  });

  const [copiesError, setCopiesError] = useState("");

  const handleChange = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const copies = Number(form.totalCopies);

    if (!Number.isInteger(copies) || copies <= 0) {
      setCopiesError("Total copies must be a positive whole number");
      return;
    }

    setCopiesError("");

    onSubmit({
      title: form.title.trim(),
      author: form.author.trim(),
      image: form.image.trim(),
      category: form.category,
      description: form.description.trim(),
      totalCopies: copies,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {user && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="userName">User Name</Label>
            <div className="relative">
              <User2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="userName"
                className="pl-9"
                value={user.name}
                readOnly
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Read-only, from your account
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="userEmail">User Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="userEmail"
                className="pl-9"
                value={user.email}
                readOnly
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Read-only, from your account
            </p>
          </div>
        </div>
      )}

      {/* Book Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Book Title</Label>
        <Input
          id="title"
          placeholder="Clean Code"
          value={form.title}
          onChange={(event) => handleChange("title")(event.target.value)}
          required
        />
      </div>

      {/* Author Name */}
      <div className="space-y-2">
        <Label htmlFor="author">Author Name</Label>
        <Input
          id="author"
          placeholder="Robert C. Martin"
          value={form.author}
          onChange={(event) => handleChange("author")(event.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={form.category || undefined}
            onValueChange={handleChange("category")}
            required
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalCopies">Total Copies</Label>
          <Input
            id="totalCopies"
            type="number"
            min={1}
            value={form.totalCopies}
            onChange={(event) =>
              handleChange("totalCopies")(event.target.value)
            }
            required
          />

          {copiesError && (
            <p className="text-sm text-destructive">{copiesError}</p>
          )}
        </div>
      </div>

      {/* Book Cover Image URL */}
      <div className="space-y-2">
        <Label htmlFor="image">Book Cover Image URL</Label>
        <Input
          id="image"
          type="url"
          placeholder="https://example.com/cover.jpg"
          value={form.image}
          onChange={(event) => handleChange("image")(event.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          rows={4}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="A short summary of the book..."
          value={form.description}
          onChange={(event) => handleChange("description")(event.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={disabled}>
        {isEdit ? "Update Book" : "Add Book"}
      </Button>
    </form>
  );
};

export default BookForm;

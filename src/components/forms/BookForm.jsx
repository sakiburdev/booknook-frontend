"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
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
import { BookOpen, ImagePlus, User2, Mail } from "lucide-react";

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
    title: book?.title ?? "",
    author: book?.author ?? "",
    image: book?.image ?? "",
    category: book?.category ?? "",
    description: book?.description ?? "",
    totalCopies: book?.totalCopies ?? 1,
  });

  const [copiesError, setCopiesError] = useState("");

  // ImgBB upload
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCoverUpload = async (event) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      toast.error("Image upload is not configured");
      return;
    }

    setUploading(true);

    try {
      const body = new FormData();
      body.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        { method: "POST", body },
      );

      const result = await response.json();

      if (!response.ok || !result?.success || !result?.data?.url) {
        throw new Error(result?.error?.message || "Image upload failed");
      }

      handleChange("image")(result.data.url);
    } catch (error) {
      toast.error(error.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
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

      {/* Book Cover Image — ImgBB upload */}
      <div className="space-y-2">
        <Label htmlFor="image">Book Cover Image</Label>

        <input
          id="image"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverUpload}
        />

        <div className="flex items-center gap-3">
          {/* Preview */}
          <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border bg-muted">
            {form.image ? (
              <Image
                src={form.image}
                alt="Book cover preview"
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <BookOpen className="size-6 text-muted-foreground/40" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || disabled}
            >
              <ImagePlus className="size-4" />
              {uploading ? "Uploading..." : "Upload cover"}
            </Button>

            <p className="mt-1.5 truncate text-xs text-muted-foreground">
              {form.image || "JPG, PNG or WEBP — hosted on ImgBB"}
            </p>
          </div>
        </div>
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

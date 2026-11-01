import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User2, Mail, BookPlus } from "lucide-react";

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

const BookForm = () => {
  return (
    <form className="space-y-5">
      
      {/* User Information */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="userName">User Name</Label>
          <div className="relative">
            <User2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="userName"
              placeholder="Your name"
              className="pl-9"
              disabled
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="userEmail">User Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="userEmail"
              type="email"
              placeholder="Your email"
              className="pl-9"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Book Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Book Title</Label>
        <Input id="title" placeholder="Clean Code" />
      </div>

      {/* Author Name */}
      <div className="space-y-2">
        <Label htmlFor="author">Author Name</Label>
        <Input id="author" placeholder="Robert C. Martin" />
      </div>

      {/* Category and Total Copies */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select>
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
          <Input id="totalCopies" type="number" min={1} placeholder="1" />
        </div>
      </div>

      {/* Book Cover Image */}
      <div className="space-y-2">
        <Label htmlFor="image">Book Cover Image URL</Label>
        <Input
          id="image"
          type="url"
          placeholder="https://example.com/cover.jpg"
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
        />
      </div>

      {/* Submit Button */}
      <Button type="button" className="w-full">
        <BookPlus className="mr-2 size-4" />
        Add Book
      </Button>
    </form>
  );
};

export default BookForm;

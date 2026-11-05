"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { EmptyState, ErrorState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LibraryBig, SearchX } from "lucide-react";
import BookCard, { BookCardSkeleton } from "../shared/BookCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const PAGE_SIZE = 6;

const AllBooksView = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Search, filter and sort states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("New Arrivals");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Fetch all books
  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch(`${API_URL}/books`, {
          method: "GET",
        });

        const data = await response.json();

        if (response.ok) {
          setAllBooks(Array.isArray(data) ? data : []);
        } else {
          setError(true);
          toast.error(data.message || "Could not load books.");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setError(true);
        toast.error("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, [retryCount]);

  const handleRetry = () => {
    setLoading(true);
    setError(false);
    setRetryCount((previous) => previous + 1);
  };

  const categories = useMemo(
    () => [
      "All",
      ...new Set(allBooks.map((book) => book.category).filter(Boolean)),
    ],
    [allBooks],
  );

  const visibleBooks = useMemo(() => {
    const searchLower = search.trim().toLowerCase();

    const filtered = allBooks.filter((book) => {
      const matchesSearch =
        !searchLower ||
        book.title?.toLowerCase().includes(searchLower) ||
        book.author?.toLowerCase().includes(searchLower);

      const matchesCategory = category === "All" || book.category === category;

      return matchesSearch && matchesCategory;
    });

    // Sort by Arrivals
    if (sortBy === "New Arrivals") {
      filtered.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
    } else {
      filtered.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
    }

    return filtered;
  }, [allBooks, search, category, sortBy]);

  const shownBooks = visibleBooks.slice(0, visibleCount);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="max-w-xl">
        <p className="text-sm font-medium text-primary">The whole collection</p>

        <h1 className="mt-1 text-3xl font-bold md:text-4xl">All Books</h1>

        <p className="mt-2 text-muted-foreground">
          Search by title or author, filter by category, and sort the shelf any
          way you like.
        </p>
      </div>

      {/* Search */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          className="sm:max-w-xs"
          placeholder="Search title or author..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
        />

        <Select
          value={category}
          onValueChange={(value) => {
            setCategory(value);
            setVisibleCount(PAGE_SIZE);
          }}
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Category" />
          </SelectTrigger>

          <SelectContent>
            {categories.map((item) => (
              <SelectItem key={item} value={item}>
                {item === "All" ? "All categories" : item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={sortBy}
          onValueChange={(value) => {
            setSortBy(value);
            setVisibleCount(PAGE_SIZE);
          }}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="New Arrivals">New Arrivals</SelectItem>
            <SelectItem value="Old Arrivals">Old Arrivals</SelectItem>
          </SelectContent>
        </Select>

        <p className="text-sm text-muted-foreground sm:ml-auto">
          {loading || error ? "" : `${visibleBooks.length} book(s)`}
        </p>
      </div>

      <div className="mt-8">
        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <ErrorState
            title="Could not load books"
            description="The server might be offline. Check that the Express backend is running and try again."
            onRetry={handleRetry}
          />
        ) : visibleBooks.length === 0 ? (
          // No matching books found
          allBooks.length > 0 ? (
            <EmptyState
              icon={SearchX}
              title="No matching books"
              description="No book matches your search or filter. Try different keywords or clear the category filter."
            >
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setVisibleCount(PAGE_SIZE);
                }}
              >
                Clear filters
              </Button>
            </EmptyState>
          ) : (
            // Database is empty
            <EmptyState
              icon={LibraryBig}
              title="The library is empty"
              description="No books have been added yet. Be the first one to add a book to BookNook."
            >
              <Button render={<Link href="/add-book" />}>
                Add the first book
              </Button>
            </EmptyState>
          )
        ) : (
          <>
            {/* Books grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shownBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>

            {/* Load more books */}
            {visibleCount < visibleBooks.length && (
              <div className="mt-10 text-center">
                <Button
                  variant="outline"
                  onClick={() =>
                    setVisibleCount((previous) => previous + PAGE_SIZE)
                  }
                >
                  Load more books
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllBooksView;

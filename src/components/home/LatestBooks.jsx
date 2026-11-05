"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchBooks } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { BookHeart } from "lucide-react";
import BookCard, { BookCardSkeleton } from "../shared/BookCard";

const PAGE_SIZE = 6;

const MAX_BOOKS = 36;

const LatestBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBooks = () => {
    setLoading(true);

    fetchBooks().then(({ ok, data }) => {
      setBooks(ok ? data.slice(0, MAX_BOOKS) : []);
      setLoading(false);
    });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadBooks();
  }, []);

  const shownBooks = books.slice(0, PAGE_SIZE);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 text-center">
        <p className="text-sm font-medium text-primary">Fresh off the shelf</p>
        <h2 className="mt-1 text-3xl font-bold md:text-4xl">Latest Books</h2>
        <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
          The most recently added books in the library, straight from the
          collection.
        </p>
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
        </div>
      ) : books.length === 0 ? (
        <EmptyState
          icon={BookHeart}
          title="No books yet"
          description="The shelf is empty right now. Be the very first to add a book to BookNook."
        >
          <Button render={<Link href="/add-book" />}>Add the first book</Button>
        </EmptyState>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shownBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="outline" render={<Link href="/books" />}>
              See All Books
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default LatestBooks;

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { fetchMyBorrows, returnBook } from "@/lib/api";
import { EmptyState, ErrorState } from "@/components/shared/EmptyState";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookMarked, Undo2 } from "lucide-react";

export default function MyBorrowsView() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [returningBorrow, setReturningBorrow] = useState(null);
  const [returning, setReturning] = useState(false);

  const loadBorrows = async () => {
    setLoading(true);
    setError(false);

    const { ok, data } = await fetchMyBorrows();

    if (ok) {
      setBorrows(Array.isArray(data) ? data : []);
    } else {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchBorrows = async () => {
      const { ok, data } = await fetchMyBorrows();

      if (ok) {
        setBorrows(Array.isArray(data) ? data : []);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchBorrows();
  }, []);

  // Book return
  const handleConfirmReturn = async () => {
    if (!returningBorrow?._id) {
      toast.error("Borrow record not found");
      return;
    }

    const borrowId = returningBorrow._id;

    setReturning(true);

    const { ok, data } = await returnBook(borrowId);

    setReturning(false);

    if (ok) {
      toast.success(data.message || "Book returned successfully");
      setReturningBorrow(null);

      loadBorrows();
    } else {
      toast.error(data.message || "Failed to return the book");
    }
  };

  const formatDate = (value) =>
    value ? new Date(value).toLocaleDateString() : "—";

  // Loading skeleton
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="h-4 w-24 animate-pulse rounded-full bg-muted" />
        <div className="mt-2 h-9 w-64 animate-pulse rounded-md bg-muted" />
        <div className="h-5 w-80 max-w-full animate-pulse rounded-md bg-muted" />

        <div className="mt-8 space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-28 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="max-w-xl">
        <p className="text-sm font-medium text-primary">Currently out</p>

        <h1 className="mt-1 flex items-center gap-2 text-3xl font-bold md:text-4xl">
          <BookMarked className="size-7 text-primary" />
          My Borrows
        </h1>

        <p className="mt-2 text-muted-foreground">
          All the books you have borrowed. Return a book to make it available to
          others again.
        </p>
      </div>

      <div className="mt-8">
        {error ? (
          <ErrorState
            title="Could not load your borrows"
            description="The server might be offline. Check that the Express backend is running and try again."
            onRetry={loadBorrows}
            retrying={loading}
          />
        ) : borrows.length === 0 ? (
          <EmptyState
            icon={BookMarked}
            title="Nothing borrowed yet"
            description="When you borrow a book, it will appear here with its borrow and return dates."
          >
            <Button render={<Link href="/books" />}>Browse the library</Button>
          </EmptyState>
        ) : (
          <div className="space-y-4">
            {borrows.map((borrow) => (
              <div
                key={borrow._id}
                className="flex flex-col gap-4 rounded-2xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center"
              >
                {/* Book cover */}
                <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                  {borrow.bookImage ? (
                    <Image
                      src={borrow.bookImage}
                      alt={borrow.bookTitle || "Book cover"}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <BookMarked className="size-6 text-muted-foreground/40" />
                    </div>
                  )}
                </div>

                {/* Borrow info */}
                <div className="flex-1">
                  <p className="font-semibold">{borrow.bookTitle}</p>

                  <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">
                      Borrowed: {formatDate(borrow.borrowDate)}
                    </Badge>

                    <Badge variant="outline">
                      Return by: {formatDate(borrow.returnDate)}
                    </Badge>
                  </div>
                </div>

                {/* Return button */}
                <Button
                  variant="outline"
                  onClick={() => setReturningBorrow(borrow)}
                >
                  <Undo2 className="size-4" />
                  Return
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Return confirmation modal */}
      <ConfirmDialog
        open={Boolean(returningBorrow)}
        onOpenChange={(open) => !open && setReturningBorrow(null)}
        title={`Return “${returningBorrow?.bookTitle}”?`}
        description="The copy will go back to the shelf and count will increase. Other readers can borrow it again."
        confirmLabel="Return book"
        loading={returning}
        onConfirm={handleConfirmReturn}
      />
    </div>
  );
}

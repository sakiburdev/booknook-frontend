"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchBook, borrowBook } from "@/lib/api";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BookOpen,
  CalendarDays,
  Copy,
  LibraryBig,
} from "lucide-react";

export default function BookDetailsView({ bookId }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadBook = () => {
    setLoading(true);
    setError(false);

    fetchBook(bookId).then(({ ok, data }) => {
      if (ok) {
        setBook(data);
      } else {
        setBook(null);
        setError(!ok);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId]);

  // Loading skeleton
  if (loading) {
    return <DetailsSkeleton />;
  }

  // Book Not Found
  if (!book) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          icon={BookOpen}
          title="Book not found"
          description="This book does not exist or was removed from the library."
        >
          <Button render={<Link href="/books" />}>Back to all books</Button>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-3">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border bg-muted shadow-xl">
          {book.image ? (
            <Image
              src={book.image}
              alt={book.title}
              fill
              unoptimized
              className=" object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <BookOpen className="size-16 text-muted-foreground/40" />
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          {book.category ? (
            <Badge variant="secondary">{book.category}</Badge>
          ) : null}

          <h1 className="mt-3 text-3xl font-bold md:text-4xl">{book.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">by {book.author}</p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <StatCard
              icon={Copy}
              label="Available copies"
              value={`${book.totalCopies} of yours to borrow`}
            />
            <StatCard
              icon={LibraryBig}
              label="Total copies"
              value={`${book.totalCopies} in the library`}
            />
          </div>

          {book.addedAt ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Added on {new Date(book.addedAt).toLocaleDateString()}
            </p>
          ) : null}

          {/* Description */}
          <div className="mt-6">
            <h2 className="font-semibold">About this book</h2>
            <p className="mt-2 whitespace-pre-line leading-relaxed text-muted-foreground">
              {book.description || "No description was provided for this book."}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {/* Copies 0 হলে button disabled */}
            {book.totalCopies > 0 ? (
              <BorrowModal book={book} onBorrowed={loadBook} />
            ) : (
              <Button size="lg" disabled>
                Unavailable — all copies borrowed
              </Button>
            )}

            <Button
              size="lg"
              variant="outline"
              render={<Link href="/my-borrows" />}
            >
              My borrows
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Copies and value
function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border bg-muted/30 p-4">
      <p className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
        <Icon className="size-4" /> {label}
      </p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

// Borrow confirm modal
function BorrowModal({ book, onBorrowed }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen);

    if (nextOpen) {
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
      setDate(tomorrow.toISOString().split("T")[0]);
    }
  };

  const handleConfirmBorrow = async () => {
    if (!date) {
      toast.error("Please choose a return date");
      return;
    }

    setSubmitting(true);

    const { ok, data } = await borrowBook(book._id, date);

    setSubmitting(false);

    if (ok) {
      toast.success(data.message || "Book borrowed successfully");

      setOpen(false);

      onBorrowed?.();
      router.push("/my-borrows");
    } else {
      toast.error(data.message || "Failed to borrow this book");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button size="lg" />}>
        Borrow this book
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm borrow</DialogTitle>
          <DialogDescription>
            One copy will be reserved in your name until the return date.
          </DialogDescription>
        </DialogHeader>

        {/* Book info */}
        <div className="space-y-2 rounded-xl border bg-muted/30 p-4 text-sm">
          <p className="font-semibold">{book.title}</p>
          <p className="flex items-center gap-2 text-muted-foreground">
            <Copy className="size-4" />
            {book.totalCopies} {book.totalCopies === 1 ? "copy" : "copies"}{" "}
            available
          </p>
        </div>

        {/* Return date */}
        <div className="space-y-2">
          <Label htmlFor="returnDate">
            <CalendarDays className="inline size-4" /> Return date
          </Label>
          <Input
            id="returnDate"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={submitting}
          >
            Cancel
          </Button>

          <Button onClick={handleConfirmBorrow} disabled={submitting}>
            {submitting ? "Borrowing..." : "Confirm Borrow"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Loading Skeleton
function DetailsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div className="aspect-[3/4] w-full animate-pulse rounded-3xl bg-muted" />

        <div className="space-y-4 md:col-span-2">
          <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
          <div className="h-10 w-2/3 animate-pulse rounded-md bg-muted" />
          <div className="h-5 w-1/3 animate-pulse rounded-md bg-muted" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 animate-pulse rounded-2xl bg-muted" />
            <div className="h-20 animate-pulse rounded-2xl bg-muted" />
          </div>
          <div className="h-24 animate-pulse rounded-md bg-muted" />
          <div className="h-11 w-48 animate-pulse rounded-md bg-muted" />
        </div>
      </div>
    </div>
  );
}

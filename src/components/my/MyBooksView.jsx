"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { fetchBooks, deleteBook, updateBook } from "@/lib/api";
import { BookCardSkeleton } from "@/components/shared/BookCard";
import { EmptyState, ErrorState } from "@/components/shared/EmptyState";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookLock, Pencil, Trash2 } from "lucide-react";
import BookForm from "../forms/BookForm";

export default function MyBooksView() {
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadBooks = () => {
    setLoading(true);
    setError(false);

    fetchBooks().then(({ ok, data }) => {
      if (ok) {
        setMyBooks(data);
      } else {
        setError(true);
      }

      setLoading(false);
    });
  };

  useEffect(() => {
    const loadData = async () => {
      await loadBooks();
    };

    loadData();
  }, []);

  // Edit modal state
  const [editingBook, setEditingBook] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Delete confirm state
  const [deletingBook, setDeletingBook] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Update book function
  const handleUpdateBook = async (bookData) => {
    if (!editingBook?._id) {
      toast.error("Book not found");
      return;
    }

    setUpdating(true);

    const { ok, data } = await updateBook(editingBook._id, bookData);

    setUpdating(false);

    if (ok) {
      toast.success(data.message);

      setEditingBook(null);
      loadBooks();
    } else {
      toast.error(data.message);
    }
  };

  // Delete book function
  const handleDeleteBook = async () => {
    if (!deletingBook?._id) {
      toast.error("Book not found");
      return;
    }

    setDeleting(true);

    const { ok, data } = await deleteBook(deletingBook._id);

    setDeleting(false);

    if (ok) {
      toast.success(data.message);

      setDeletingBook(null);
      loadBooks();
    } else {
      toast.error(data.message);
    }
  };

  // Loading Skeleton
  if (loading) {
    return <BooksPageSkeleton />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="max-w-xl">
        <p className="text-sm font-medium text-primary">Your shelf</p>

        <h1 className="mt-1 text-3xl font-bold md:text-4xl">My Books</h1>

        <p className="mt-2 text-muted-foreground">
          Books you added to the library. You can update details or remove them
          anytime.
        </p>
      </div>

      <div className="mt-8">
        {error ? (
          <ErrorState
            title="Could not load your books"
            description="The server might be offline. Check that the Express backend is running and try again."
            onRetry={loadBooks}
            retrying={loading}
          />
        ) : myBooks.length === 0 ? (
          <EmptyState
            icon={BookLock}
            title="You haven't added any books yet"
            description="Books you add will appear here, and you can edit or remove them anytime."
          >
            <Button render={<Link href="/add-book" />}>Add a book</Button>
          </EmptyState>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myBooks.map((book) => (
              <MyBookCard
                key={book._id}
                book={book}
                onEdit={() => setEditingBook(book)}
                onDelete={() => setDeletingBook(book)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit modal */}
      <Dialog
        open={Boolean(editingBook)}
        onOpenChange={(open) => !open && setEditingBook(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit “{editingBook?.title}”</DialogTitle>

            <DialogDescription>
              Update the details of your book. Copies update instantly for
              readers.
            </DialogDescription>
          </DialogHeader>

          <BookForm
            book={editingBook}
            onSubmit={handleUpdateBook}
            disabled={updating}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Book */}
      <ConfirmDialog
        open={Boolean(deletingBook)}
        onOpenChange={(open) => !open && setDeletingBook(null)}
        title={`Delete “${deletingBook?.title}”?`}
        description="This will permanently remove the book from the library. This action cannot be undone."
        confirmLabel="Delete book"
        loading={deleting}
        onConfirm={handleDeleteBook}
      />
    </div>
  );
}

// Page Loading Skeleton
function BooksPageSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="h-4 w-24 animate-pulse rounded-full bg-muted" />
      <div className="mt-2 h-9 w-56 animate-pulse rounded-md bg-muted" />
      <div className="h-5 w-80 animate-pulse rounded-md bg-muted" />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <BookCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

function MyBookCard({ book, onEdit, onDelete }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/4] w-full bg-muted">
        {book.image ? (
          <Image
            src={book.image}
            alt={book.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookLock className="size-10 text-muted-foreground/40" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        {book.category ? (
          <Badge variant="secondary" className="w-fit">
            {book.category}
          </Badge>
        ) : null}

        <p className="line-clamp-1 font-semibold">{book.title}</p>
        <p className="text-sm text-muted-foreground">by {book.author}</p>

        <p className="mt-1 text-sm font-medium text-primary">
          {book.totalCopies} {book.totalCopies === 1 ? "copy" : "copies"}{" "}
          available
        </p>
      </div>

      <div className="flex gap-2 border-t p-3">
        <Button variant="outline" size="sm" className="flex-1" onClick={onEdit}>
          <Pencil className="size-4" /> Edit
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="size-4" /> Delete
        </Button>
      </div>
    </div>
  );
}

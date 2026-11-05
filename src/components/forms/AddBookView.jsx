"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { addBook } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import BookForm from "@/components/forms/BookForm";

const AddBookView = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (bookData) => {
    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    setSubmitting(true);

    const { ok, data } = await addBook({
      ...bookData,
      userEmail: session.user.email,
    });

    setSubmitting(false);

    if (ok) {
      toast.success(data.message || "Book added successfully");
      router.push("/my-books");
    } else {
      toast.error(data.message || "Failed to add the book");
    }
  };

  // Skeleton
  if (isPending || !session?.user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Skeleton className="mb-6 h-9 w-52 max-w-full" />
        <Skeleton className="mb-3 h-5 w-72 max-w-full" />
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="max-w-xl">
        <p className="text-sm font-medium text-primary">Contribute</p>

        <h1 className="mt-1 text-3xl font-bold md:text-4xl">Add a Book</h1>

        <p className="mt-2 text-muted-foreground">
          Share a book you love with the BookNook community.
        </p>
      </div>

      <Card className="mt-6">
        <CardContent className="pt-6">
          <BookForm
            user={session?.user}
            onSubmit={handleSubmit}
            disabled={submitting}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBookView;

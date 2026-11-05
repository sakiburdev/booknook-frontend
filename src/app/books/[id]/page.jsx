import { Suspense } from "react";
import { headers } from "next/headers";
import BookDetailsView from "@/components/books/BookDetailsView";
import { ErrorState } from "@/components/shared/EmptyState";
import { auth } from "@/lib/auth";
import { fetchBook } from "@/lib/api";

export const instant = false;

// Dynamic Metadata for Book Details Page
export async function generateMetadata({ params }) {
  const { id } = await params;

  let token = null;

  try {
    const { token: jwtToken } = await auth.api.getToken({
      headers: await headers(),
    });

    token = jwtToken || null;
  } catch {
    token = null;
  }

  const { ok, data: book } = await fetchBook(id, token);

  if (!ok || !book) {
    return {
      title: "Book Not Found | BookNook",
      description: "The requested book could not be found on BookNook.",
    };
  }

  return {
    title: `${book.title} | BookNook`,
    description: book.description
      ? book.description.slice(0, 160)
      : `Read and borrow ${book.title} by ${book.author} on BookNook.`,
  };
}

// Details page fallback
function DetailsFallback() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <ErrorState
        title="Loading book..."
        description="Fetching the book information from the library."
      />
    </div>
  );
}

const BookDetailsPage = async ({ params }) => {
  const { id } = await params;

  return (
    <Suspense fallback={<DetailsFallback />}>
      <BookDetailsView bookId={id} />
    </Suspense>
  );
};

export default BookDetailsPage;

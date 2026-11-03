import { Suspense } from "react";
import BookDetailsView from "@/components/books/BookDetailsView";
import { ErrorState } from "@/components/shared/EmptyState";

export const instant = false;

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

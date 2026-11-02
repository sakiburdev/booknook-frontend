import BookForm from "@/components/forms/BookForm";

const AddBookPage = () => {
 return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Add a New Book</h1>
          <p className="mt-2 text-muted-foreground">
            Share your favorite books with the BookNook community.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <BookForm />
        </div>
      </div>
    </main>
  );
};

export default AddBookPage;

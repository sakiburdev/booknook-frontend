"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

const BookCard = ({ book }) => {
 return (
    <Card className="group flex h-full flex-col overflow-hidden pt-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      <CardHeader className="p-3 pb-0">
        <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl bg-muted">
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
              <BookOpen className="size-10 text-muted-foreground/40" />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-1 pt-4">
        {book.category ? (
          <Badge variant="secondary" className="w-fit">
            {book.category}
          </Badge>
        ) : null}

        <CardTitle className="line-clamp-1 text-lg leading-snug">
          {book.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">by {book.author}</p>

        {/* Short description */}
        {book.description ? (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {book.description}
          </p>
        ) : null}
      </CardContent>

      <CardFooter className="mt-auto items-center justify-between">
        {/* Available copies */}
        {book.totalCopies > 0 ? (
          <p className="text-sm font-medium text-primary">
            {book.totalCopies}{" "}
            {book.totalCopies === 1 ? "copy" : "copies"} available
          </p>
        ) : (
          <Badge variant="destructive">Not available</Badge>
        )}

        <Button render={<Link href={`/books/${book._id}`} />}>Details</Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;

// Skeleton
export function BookCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-3 pb-0">
        <div className="aspect-[3/4] w-full animate-pulse rounded-xl bg-muted" />
      </CardHeader>
      <CardContent className="pt-4 space-y-2">
        <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
        <div className="h-5 w-3/4 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
      </CardContent>
      <CardFooter className="justify-between">
        <div className="h-4 w-20 animate-pulse rounded-md bg-muted" />
        <div className="h-8 w-16 animate-pulse rounded-md bg-muted" />
      </CardFooter>
    </Card>
  );
}

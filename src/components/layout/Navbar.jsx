import Link from "next/link";
import Image from "next/image";
import { BookMarked, BookPlus, Library, LibraryBig } from "lucide-react";

const Navbar = () => {

  const linkClass = "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted";

 return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo2.webp"
            alt="BookNook"
            width={36}
            height={36}
            className="rounded-md"
          />
          <span className="text-xl font-bold">BookNook</span>
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-1">
          <Link href="/" className={linkClass}>
            <Library className="mr-1 inline size-4" />
            Home
          </Link>

          <Link href="/books" className={linkClass}>
            <LibraryBig className="mr-1 inline size-4" />
            All Books
          </Link>

          <Link href="/add-book" className={linkClass}>
            <BookPlus className="mr-1 inline size-4" />
            Add Book
          </Link>

          <Link href="/my-books" className={linkClass}>
            <BookMarked className="mr-1 inline size-4" />
            My Books
          </Link>

          <Link href="/my-borrows" className={linkClass}>
            <BookMarked className="mr-1 inline size-4" />
            My Borrows
          </Link>
        </nav>

        {/* Login / Register */}
        <div className="flex items-center gap-2">
          <Link href="/login" className={linkClass}>
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

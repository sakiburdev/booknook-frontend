import Link from "next/link";
import { FaFacebook, FaGithub, FaYoutube } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-16 border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand information */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex w-fit items-center gap-2">
              <Image
                src="/logo2.webp"
                alt="BookNook"
                width={28}
                height={28}
                className="rounded-md"
              />
              <span className="text-xl font-bold">BookNook</span>
            </Link>

            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              BookNook is a small online library — discover great books, borrow
              them with one click, and manage your reading collection from one
              cozy place.
            </p>

            {/* Social links */}
            <div className="mt-5 flex gap-2">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FaFacebook className="size-4" />
              </Link>

              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FaYoutube className="size-4" />
              </Link>

              <Link
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FaGithub className="size-4" />
              </Link>
            </div>
          </div>

          {/* Explore links */}
          <div>
            <p className="mb-3 text-sm font-semibold">Explore</p>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/books"
                  className="transition-colors hover:text-primary"
                >
                  All Books
                </Link>
              </li>

              <li>
                <Link
                  href="/add-book"
                  className="transition-colors hover:text-primary"
                >
                  Add Book
                </Link>
              </li>
            </ul>
          </div>

          {/* Account links */}
          <div>
            <p className="mb-3 text-sm font-semibold">Account</p>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/login"
                  className="transition-colors hover:text-primary"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="transition-colors hover:text-primary"
                >
                  Register
                </Link>
              </li>

              <li>
                <Link
                  href="/my-borrows"
                  className="transition-colors hover:text-primary"
                >
                  My Borrows
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <p className="border-t mt-10 pt-6 text-center text-sm text-muted-foreground">
          © BookNook — Built with Next.js & Express. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

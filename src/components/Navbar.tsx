import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/assets/logo.png" alt="logo" width={40} height={40} />
          <span className="text-xl font-bold tracking-tight first-letter:text-3xl">
            Job Hub
          </span>
        </Link>

        <Button asChild>
          <Link href="/jobs/new">Post a job</Link>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;

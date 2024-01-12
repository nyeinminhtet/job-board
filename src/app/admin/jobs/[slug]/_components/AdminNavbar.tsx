"use client";

import React from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

const AdminNavbar = () => {
  const { user, signOut } = useClerk();
  const router = useRouter();

  return (
    <div className="p-3">
      <div className="m-auto flex h-10 max-w-5xl items-center justify-between gap-2">
        <Link href="/admin" className={buttonVariants({ variant: "ghost" })}>
          Admin Dashboard
        </Link>
        <div className="space-x-2">
          <span className="font-semibold">
            {user?.primaryEmailAddress?.emailAddress}
          </span>
          <Button
            variant="link"
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import AdminNavbar from "./jobs/[slug]/_components/AdminNavbar";

const adminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <AdminNavbar />
      {children}
    </ClerkProvider>
  );
};

export default adminLayout;

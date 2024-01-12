import React from "react";

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import JobPage from "@/app/jobs/[slug]/_components/JobPage";
import AdminSidebar from "./_components/AdminSidebar";

interface Props {
  params: { slug: string };
}

const AdminJobDetailsPage = async ({ params: { slug } }: Props) => {
  const job = await prisma.job.findUnique({
    where: {
      slug,
    },
  });
  if (!job) notFound();

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />

      <AdminSidebar job={job} />
    </main>
  );
};

export default AdminJobDetailsPage;

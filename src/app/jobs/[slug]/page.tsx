import React, { cache } from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import JobPage from "./_components/JobPage";
import { Button } from "@/components/ui/button";

interface JobDetailsPageProps {
  params: {
    slug: string;
  };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: {
      slug,
    },
  });

  if (!job) notFound();

  return job;
});

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    select: { slug: true },
  });

  return jobs.map(({ slug }) => slug);
}

export const generateMetadata = async ({
  params: { slug },
}: JobDetailsPageProps): Promise<Metadata> => {
  const job = await getJob(slug);

  return {
    title: job.title,
  };
};

const JobDetailsPage = async ({ params: { slug } }: JobDetailsPageProps) => {
  const job = await getJob(slug);

  const { applicationEmail, applicationUrl } = job;
  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.error("Job has no application link or email");
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />

      <aside>
        <Button asChild>
          <a href={applicationLink} className="w-40 md:w-fit">
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  );
};

export default JobDetailsPage;

import React from "react";

import JobListItem from "./JobListItem";
import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import Pagination from "./Pagination";

interface JobResultsProps {
  filterValues: JobFilterValues;
  page?: number;
}

const JobResults = async ({ filterValues, page = 1 }: JobResultsProps) => {
  const { q, type, location, remote } = filterValues;
  const searchString = q
    ?.split(" ")
    .filter((world) => world.length > 0)
    .join(" & ");

  const jobsPerPage = 6;
  const skip = (page - 1) * jobsPerPage;

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { location: { search: searchString } },
          { locationType: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobsPerPage,
    skip,
  });

  const countPromise = prisma.job.count({ where });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}

      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filter.
        </p>
      )}

      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / jobsPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
};

export default JobResults;

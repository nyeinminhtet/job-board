"use server";
import prisma from "@/lib/prisma";
import { jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

export default async function filterJob(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const { q, remote, location, type } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
}

export const getOnlyLocations = async () => {
  const locations = await prisma.job.findMany({
    where: { approved: true },
    select: { location: true },
    distinct: ["location"],
  });
  return locations.map(({ location }) => location).filter(Boolean);
};

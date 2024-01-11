"use server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

import { toSlug } from "@/lib/utils";
import { createJobFormSchema, jobFilterSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";

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

export const createJobPosting = async (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());

  const {
    title,
    description,
    type,
    locationType,
    location,
    companyName,
    companyLogo,
    applicationEmail,
    applicationUrl,
    salary,
  } = createJobFormSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  let companyLogoUrl: string | undefined = undefined;

  if (companyLogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );

    companyLogoUrl = blob.url;
  }

  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      companyLogoUrl,
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary),
    },
  });

  redirect("/job-submitted");
};

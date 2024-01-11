import React from "react";
import { Job } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { formatMoney, relativeDate } from "@/lib/utils";
import { Briefcase, MapPin, Globe2, Banknote, Clock } from "lucide-react";
import Markdown from "./Markdown";

interface JobPageProps {
  job: Job;
}

const JobPage = ({
  job: {
    title,
    type,
    description,
    companyName,
    companyLogoUrl,
    location,
    locationType,
    salary,
    applicationUrl,
  },
}: JobPageProps) => {
  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-3">
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            alt="Company logo"
            width={100}
            height={100}
            className="rounded-xl"
          />
        )}

        <div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="font-semibold">
              {applicationUrl ? (
                <Link
                  href={new URL(applicationUrl).origin}
                  className="text-green-500 hover:underline"
                >
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p>
          </div>

          <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              {type}
            </p>
            <p className="flex items-center gap-1.5 ">
              <MapPin size={16} className="shrink-0" />
              {locationType}
            </p>
            <p className="flex items-center gap-1.5 ">
              <Globe2 size={16} className="shrink-0" />
              {location || "Worldwide"}
            </p>
            <p className="flex items-center gap-1.5 ">
              <Banknote size={16} className="shrink-0" />
              {formatMoney(salary)}
            </p>
          </div>
        </div>
      </div>
      <div>{description && <Markdown>{description}</Markdown>}</div>
    </section>
  );
};

export default JobPage;

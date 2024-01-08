import React from "react";

import { Label } from "./ui/label";
import filterJob, { getOnlyLocations } from "@/actions/job-actions";
import { Input } from "./ui/input";
import Select from "./ui/select";
import { JobTypes } from "@/lib/jobs-types";
import { Button } from "./ui/button";
import { JobFilterValues } from "@/lib/validation";
import FormSubmittingButton from "./FormSubmittingButton";

interface JobFilterSidebarProps {
  defaultValue: JobFilterValues;
}

const JobFilterSidebar = async ({ defaultValue }: JobFilterSidebarProps) => {
  const locations = (await getOnlyLocations()) as string[];

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px] ">
      <form action={filterJob}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Job-Title, company, etc."
              defaultValue={defaultValue.q}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Job-Type</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValue.type || ""}
            >
              <option value="">All types</option>
              {JobTypes.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValue.location || ""}
            >
              <option value="">All locations</option>
              {locations.map((location) => (
                <option value={location} key={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remote"
              name="remote"
              className="scale-125 accent-black"
              defaultChecked={defaultValue.remote}
            />
            <Label htmlFor="remote">Remote</Label>
          </div>
          <FormSubmittingButton className="w-full">
            Find jobs
          </FormSubmittingButton>
        </div>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;

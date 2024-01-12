import React from "react";

import { Job } from "@prisma/client";
import { ApprovedButton, DeleteButton } from "./AdminButtons";

interface Props {
  job: Job;
}

const AdminSidebar = ({ job }: Props) => {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {job.approved ? (
        <span className="text-center font-semibold text-green-500">
          Approved
        </span>
      ) : (
        <ApprovedButton jobId={job.id} />
      )}
      <DeleteButton jobId={job.id} />
    </aside>
  );
};

export default AdminSidebar;

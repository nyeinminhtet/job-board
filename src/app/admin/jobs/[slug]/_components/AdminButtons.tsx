"use client";

import React from "react";

import FormSubmittingButton from "@/components/FormSubmittingButton";
import { useFormState } from "react-dom";
import { approvedJobSubmission, deleteJob } from "@/actions/job-submission";

interface Props {
  jobId: number;
}

export const ApprovedButton = ({ jobId }: Props) => {
  const [formState, formAction] = useFormState(
    approvedJobSubmission,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-1">
      <input hidden value={jobId} name="jobId" />
      <FormSubmittingButton className="w-full bg-green-500 hover:bg-green-600">
        Approve
      </FormSubmittingButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState?.error}</p>
      )}
    </form>
  );
};

export const DeleteButton = ({ jobId }: Props) => {
  const [formState, formAction] = useFormState(deleteJob, undefined);

  return (
    <form action={formAction} className="space-y-1">
      <input hidden value={jobId} name="jobId" />
      <FormSubmittingButton className="w-full bg-red-500 hover:bg-red-600">
        Delete
      </FormSubmittingButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState?.error}</p>
      )}
    </form>
  );
};

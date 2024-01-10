"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import LoadingButton from "@/components/LoadingButton";

const FormSubmittingButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { pending } = useFormStatus();

  return <LoadingButton {...props} loading={pending} type="submit" />;
};

export default FormSubmittingButton;

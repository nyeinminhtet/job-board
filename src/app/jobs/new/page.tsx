import { Metadata } from "next";
import React from "react";
import NewJobForm from "./_components/NewJobForm";

export const metadata: Metadata = {
  title: "Post a new Job",
};

const NewJobPage = () => {
  return <NewJobForm />;
};

export default NewJobPage;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Workbench } from "./_components/workbench";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

// The workbench is for tuning tokens and motion on this machine; it is never deployed.
export default function StudioPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <Workbench />;
}

import EssayPage from "@/components/EssayPage";
import { essayMetadata } from "@/lib/essay";

export const dynamic = "force-static";
export const metadata = essayMetadata("en");

export default function WhatIsAgenticJournaling() {
  return <EssayPage locale="en" />;
}

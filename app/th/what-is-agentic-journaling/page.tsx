import EssayPage from "@/components/EssayPage";
import { essayMetadata } from "@/lib/essay";

export const dynamic = "force-static";
export const metadata = essayMetadata("th");

export default function WhatIsAgenticJournalingTh() {
  return <EssayPage locale="th" />;
}

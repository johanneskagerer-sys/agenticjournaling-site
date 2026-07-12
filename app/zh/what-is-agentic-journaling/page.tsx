import EssayPage from "@/components/EssayPage";
import { essayMetadata } from "@/lib/essay";

export const dynamic = "force-static";
export const metadata = essayMetadata("zh");

export default function WhatIsAgenticJournalingZh() {
  return <EssayPage locale="zh" />;
}

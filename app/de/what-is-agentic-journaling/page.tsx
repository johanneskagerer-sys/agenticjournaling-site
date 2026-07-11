import EssayPage from "@/components/EssayPage";
import { essayMetadata } from "@/lib/essay";

export const dynamic = "force-static";
export const metadata = essayMetadata("de");

export default function WasIstAgenticJournaling() {
  return <EssayPage locale="de" />;
}

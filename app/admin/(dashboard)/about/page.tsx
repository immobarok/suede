import { listAboutContentForAdmin } from "@/app/actions/about-content";
import { AboutClient, type AboutContentItem } from "./_components/about-client";

export default async function AdminAboutPage() {
  const items = await listAboutContentForAdmin();
  return <AboutClient initialItems={items as AboutContentItem[]} />;
}

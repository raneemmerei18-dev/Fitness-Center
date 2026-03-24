import connectDB from "@/lib/db/connect";
import { SiteContent } from "@/lib/db/models";

type SiteContentItem = {
  key: string;
  title?: string | null;
  subtitle?: string | null;
  body?: string | null;
  imageUrl?: string | null;
  details?: string | null;
};

export async function getSiteContentMap() {
  await connectDB();
  const items = (await SiteContent.find().lean().exec()) as unknown as SiteContentItem[];
  return items.reduce<Record<string, SiteContentItem>>((acc, item) => {
    acc[item.key] = item;
    return acc;
  }, {});
}

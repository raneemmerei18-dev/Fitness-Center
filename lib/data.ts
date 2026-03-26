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
  const map = items.reduce<Record<string, SiteContentItem>>((acc, item) => {
    acc[item.key] = item;
    return acc;
  }, {});

  // Backward-compatible aliases for older seed keys.
  if (!map.home_hero && map.hero_title) {
    map.home_hero = map.hero_title;
  }
  if (!map.about_main && map.about_intro) {
    map.about_main = map.about_intro;
  }

  return map;
}

import { prisma } from "@/lib/prisma";

export async function getSiteContentMap() {
  const items = await prisma.siteContent.findMany();
  return items.reduce<Record<string, (typeof items)[number]>>((acc, item) => {
    acc[item.key] = item;
    return acc;
  }, {});
}

import { Section } from "@/lib/db/models";

export const sectionLabels: Record<Section, string> = {
  HOME: "Home",
  ABOUT: "About",
  SERVICES: "Services",
  PROJECTS: "Projects",
  BLOG: "Blog",
  NEWS: "News",
  CONTACT: "Contact",
  SUBMISSIONS: "Submissions",
  USERS: "Users",
};

export function hasSectionPermission(
  isSuperAdmin: boolean,
  grantedSections: Section[],
  section: Section,
) {
  if (isSuperAdmin) {
    return true;
  }

  return grantedSections.includes(section);
}

import { PrismaClient, Section } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type RoleDelegate = {
  upsert(args: unknown): Promise<{ id: number }>;
};

type RolePermissionDelegate = {
  deleteMany(args: unknown): Promise<unknown>;
  createMany(args: unknown): Promise<unknown>;
};

type UserDelegate = {
  upsert(args: unknown): Promise<{ id: number }>;
  update(args: unknown): Promise<unknown>;
};

const prismaDynamic = prisma as unknown as {
  role: RoleDelegate;
  rolePermission: RolePermissionDelegate;
  user: UserDelegate;
};

async function main() {
  const blogEditorRole = await prismaDynamic.role.upsert({
    where: { name: "Editor" },
    update: {
      description: "Can create and edit blog posts",
    },
    create: {
      name: "Editor",
      description: "Can create and edit blog posts",
    },
  });

  await prismaDynamic.rolePermission.deleteMany({ where: { roleId: blogEditorRole.id } });
  await prismaDynamic.rolePermission.createMany({
    data: [{ roleId: blogEditorRole.id, section: Section.BLOG }],
  });

  const passwordHash = await bcrypt.hash("Admin@123", 10);

  const admin = await prismaDynamic.user.upsert({
    where: { email: "admin@fitmotion.local" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@fitmotion.local",
      passwordHash,
      isSuperAdmin: true,
    },
  });

  await prismaDynamic.user.update({
    where: { id: admin.id },
    data: {
      isSuperAdmin: true,
      roleId: null,
    },
  });

  const editorPasswordHash = await bcrypt.hash("Editor@123", 10);

  const editor = await prismaDynamic.user.upsert({
    where: { email: "editor@fitmotion.local" },
    update: {},
    create: {
      name: "Blog Editor",
      email: "editor@fitmotion.local",
      passwordHash: editorPasswordHash,
      isSuperAdmin: false,
      roleId: blogEditorRole.id,
    },
  });

  await prismaDynamic.user.update({
    where: { id: editor.id },
    data: {
      isSuperAdmin: false,
      roleId: blogEditorRole.id,
    },
  });

  const siteContent = [
    {
      key: "home_hero",
      title: "Transform Your Body at FitMotion Center",
      subtitle: "Premium coaching, smart programming, and a community that keeps you moving.",
      body: "Join a fitness center built for real progress. From strength training to group sessions, our team helps you reach your goals faster and safer.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      details: "Personal training | Functional area | Recovery lounge",
    },
    {
      key: "about_main",
      title: "About FitMotion",
      subtitle: "Results-driven fitness in a motivating environment",
      body: "FitMotion is a modern fitness center focused on measurable outcomes. We blend coaching, accountability, and custom programs for all levels.",
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
      details: "Founded in 2017 | 25+ coaches | 2000+ success stories",
    },
    {
      key: "contact_info",
      title: "Contact Us",
      subtitle: "Visit, call, or send a message",
      body: "Phone: +1 555 0100\nEmail: hello@fitmotion.example\nAddress: 125 Active Ave, Wellness City",
      imageUrl: null,
      details: "Open daily 6:00 AM - 11:00 PM",
    },
  ];

  for (const content of siteContent) {
    await prisma.siteContent.upsert({
      where: { key: content.key },
      update: content,
      create: content,
    });
  }

  const services = [
    {
      title: "Personal Training",
      summary: "One-on-one coaching tailored to your goals.",
      details: "Dedicated sessions with certified coaches, progress tracking, and nutrition guidance.",
      imageUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
      displayOrder: 1,
    },
    {
      title: "Group Classes",
      summary: "High-energy classes for all levels.",
      details: "HIIT, strength circuits, mobility, and cardio classes designed for consistency and fun.",
      imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      displayOrder: 2,
    },
    {
      title: "Nutrition Coaching",
      summary: "Fuel your performance with expert advice.",
      details: "Custom nutrition plans and weekly check-ins to support fat loss, muscle gain, or maintenance.",
      imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
      displayOrder: 3,
    },
  ];

  await prisma.service.deleteMany();
  await prisma.service.createMany({ data: services });

  const projects = [
    {
      title: "12-Week Strength Reboot",
      slug: "12-week-strength-reboot",
      description: "A full-body progressive strength transformation.",
      details: "Includes initial assessment, 3 weekly sessions, meal framework, and weekly progression tracking.",
      imageUrl: "https://images.unsplash.com/photo-1549476464-37392f717541",
      location: "Main Branch",
      duration: "12 Weeks",
      gallery: [
        "https://images.unsplash.com/photo-1579758629938-03607ccdbaba",
        "https://images.unsplash.com/photo-1554344728-77cf90d9ed26",
      ],
    },
    {
      title: "Body Fat Reduction Camp",
      slug: "body-fat-reduction-camp",
      description: "Structured fat-loss challenge with coaching support.",
      details: "Daily workouts, calorie coaching, weekly composition review, and accountability group.",
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a",
      location: "Downtown Studio",
      duration: "8 Weeks",
      gallery: [
        "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa",
      ],
    },
  ];

  await prisma.project.deleteMany();
  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  await prisma.blogPost.deleteMany();
  await prisma.blogPost.createMany({
    data: [
      {
        title: "How to Stay Consistent in Training",
        slug: "stay-consistent-in-training",
        excerpt: "Simple systems to keep your workouts on track every week.",
        content:
          "Consistency is built with scheduling, clear targets, and realistic intensity. Start with 3 sessions weekly, track reps, and increase gradually.",
        imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b",
      },
      {
        title: "Protein Basics for Muscle Growth",
        slug: "protein-basics-for-muscle-growth",
        excerpt: "Understand daily protein intake and practical meal planning.",
        content:
          "Aim for protein with each meal, spread intake across the day, and prioritize whole foods with enough hydration.",
        imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
      },
    ],
  });

  await prisma.newsPost.deleteMany();
  await prisma.newsPost.createMany({
    data: [
      {
        title: "FitMotion Opens New Functional Zone",
        slug: "fitmotion-opens-functional-zone",
        excerpt: "Our main branch now includes a dedicated functional training area.",
        content:
          "The upgraded floor features sled lanes, rig stations, and mobility corners to improve conditioning sessions.",
        imageUrl: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb",
      },
      {
        title: "Community Challenge Registration Open",
        slug: "community-challenge-registration-open",
        excerpt: "Join our monthly challenge and train with accountability.",
        content:
          "Participants receive scorecards, coach feedback, and weekly prizes for consistency and progress.",
        imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5",
      },
    ],
  });

  console.log("Database seeded.\nAdmin: admin@fitmotion.local / Admin@123\nEditor: editor@fitmotion.local / Editor@123");
  console.log(`Admin user id: ${admin.id}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

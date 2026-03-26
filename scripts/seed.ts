import "dotenv/config";
import connectDB from "../lib/db/connect";
import {
  User,
  Role,
  RolePermission,
  Section,
  Service,
  BlogPost,
  NewsPost,
  Project,
  SiteContent,
} from "../lib/db/models";
import bcrypt from "bcryptjs";

async function main() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await connectDB();
    console.log("✅ Connected!");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await User.deleteMany({});
    await Role.deleteMany({});
    await RolePermission.deleteMany({});
    await Service.deleteMany({});
    await BlogPost.deleteMany({});
    await NewsPost.deleteMany({});
    await Project.deleteMany({});
    await SiteContent.deleteMany({});

    // Create roles
    console.log("📋 Creating roles...");
    const editorRole = await Role.create({
      name: "Editor",
      description: "Can create and edit blog posts",
    });

    // Create role permissions
    console.log("🔐 Creating role permissions...");
    await RolePermission.create({
      roleId: editorRole._id,
      section: Section.BLOG,
    });

    // Create users
    console.log("👥 Creating users...");
    const adminPasswordHash = await bcrypt.hash("Admin@123", 10);
    const editorPasswordHash = await bcrypt.hash("Editor@123", 10);

    await User.create({
      name: "Super Admin",
      email: "admin@fitmotion.local",
      passwordHash: adminPasswordHash,
      isSuperAdmin: true,
    });

    await User.create({
      name: "Blog Editor",
      email: "editor@fitmotion.local",
      passwordHash: editorPasswordHash,
      isSuperAdmin: false,
      roleId: editorRole._id,
    });

    // Create services
    console.log("🏋️  Creating services...");
    await Service.create({
      title: "Personal Training",
      summary: "One-on-one coaching tailored to your goals",
      details: "Work with certified trainers who design customized workout plans",
      displayOrder: 1,
    });

    await Service.create({
      title: "Group Classes",
      summary: "High-energy group fitness sessions",
      details: "Join group classes including yoga, HIIT, and more",
      displayOrder: 2,
    });

    await Service.create({
      title: "Nutrition Coaching",
      summary: "Expert nutrition guidance",
      details: "Get personalized meal plans and nutritional coaching",
      displayOrder: 3,
    });

    // Create blog posts
    console.log("📝 Creating blog posts...");
    await BlogPost.create({
      title: "5 Tips for Home Workouts",
      slug: "5-tips-home-workouts",
      excerpt: "Get fit without leaving your house",
      content:
        "Here are our top 5 tips for effective home workouts...\n\n1. Create a dedicated space\n2. Invest in basic equipment\n3. Set a schedule\n4. Stay motivated\n5. Track progress",
    });

    await BlogPost.create({
      title: "Nutrition for Athletes",
      slug: "nutrition-athletes",
      excerpt: "Fuel your body for peak performance",
      content: "Proper nutrition is crucial for athletic performance...",
    });

    // Create news posts
    console.log("📰 Creating news posts...");
    await NewsPost.create({
      title: "New Class Schedule Released",
      slug: "new-class-schedule",
      excerpt: "Check out our exciting new fitness classes this month",
      content: "We're introducing new classes to our schedule...",
    });

    // Create projects
    console.log("🎯 Creating projects...");
    await Project.create({
      title: "Transformational 12-Week Program",
      slug: "transformation-12-week",
      description: "Complete body transformation in 12 weeks",
      details:
        "This intensive program combines strength training, cardio, and nutrition coaching for complete transformation.",
      location: "All Fitness Center Locations",
      duration: "12 weeks",
    });

    await Project.create({
      title: "Marathon Training Program",
      slug: "marathon-training",
      description: "Train for your first or next marathon",
      details:
        "Join our expert coaches for a comprehensive marathon training program.",
      location: "Downtown Fitness Center",
      duration: "16 weeks",
    });

    // Create site content
    console.log("📄 Creating site content...");
    await SiteContent.create({
      key: "home_hero",
      title: "Transform Your Body, Transform Your Life",
      subtitle: "Join Fit Motion and Achieve Your Fitness Goals",
      body: "Our expert trainers and proven programs help you reach your fitness goals faster.",
      imageUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80",
    });

    await SiteContent.create({
      key: "about_intro",
      title: "About Fit Motion",
      body: "Welcome to Fit Motion, where your fitness journey begins.",
    });

    console.log("✅ Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

main().catch(console.error);

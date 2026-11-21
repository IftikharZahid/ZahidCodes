import Project from "./models/Project.js";

export const defaultSeedProjects = [
  {
    title: "The Seeks Academy Management Suite",
    slug: "the-seeks-academy-management-suite",
    category: "Education Technology",
    summary: "A connected institute platform with an admin dashboard, teacher app and student app.",
    description: "A customized digital management ecosystem for academic institutions. The showcase includes the actual admin dashboard screenshot and app previews from the earlier combined product artwork.",
    image: "/assets/seeks-admin-dashboard.png",
    technologies: ["React", "React Native", "Firebase", "Expo"],
    featured: true,
    status: "published",
    liveUrl: "",
    githubUrl: ""
  },
  {
    title: "Teacher Mobile Application",
    slug: "teacher-mobile-application",
    category: "Mobile Applications",
    summary: "A teacher-focused toolkit for attendance, timetable, diary, exams and learning resources.",
    description: "Teacher app preview recovered from the previously saved The Seeks Academy app showcase artwork.",
    image: "/assets/seeks-teacher-app-preview.jpg",
    technologies: ["React Native", "Expo", "Firebase"],
    featured: true,
    status: "published"
  },
  {
    title: "Student Learning Application",
    slug: "student-learning-application",
    category: "Mobile Applications",
    summary: "A student portal for attendance, results, timetable, video lectures and e-Library.",
    description: "Student app preview recovered from the previously saved The Seeks Academy app showcase artwork.",
    image: "/assets/seeks-student-app-preview.jpg",
    technologies: ["React Native", "Expo", "Firebase"],
    featured: true,
    status: "published"
  },
  {
    title: "AI Workflow Assistant",
    slug: "ai-workflow-assistant",
    category: "AI & Automation",
    summary: "A concept showcase for practical AI-powered workflows and productivity tools.",
    description: "A concept showcase for practical AI-powered workflows and productivity tools.",
    image: "/assets/projects/ai-tools.svg",
    technologies: ["Python", "AI", "Automation"],
    featured: false,
    status: "published"
  },
  {
    title: "Business Analytics Dashboard",
    slug: "business-analytics-dashboard",
    category: "Web Development",
    summary: "A responsive dashboard concept for operational metrics, reporting and insights.",
    description: "A responsive dashboard concept for operational metrics, reporting and insights.",
    image: "/assets/projects/dashboard.svg",
    technologies: ["React", "Charts", "Tailwind CSS"],
    featured: false,
    status: "published"
  },
  {
    title: "Cloud-Based Service Platform",
    slug: "cloud-based-service-platform",
    category: "Cloud & Backend",
    summary: "A scalable web-service concept with API-first architecture and cloud deployment.",
    description: "A scalable web-service concept with API-first architecture and cloud deployment.",
    image: "/assets/projects/cloud-systems.svg",
    technologies: ["Node.js", "Express", "MongoDB"],
    featured: false,
    status: "published"
  },
  {
    title: "Custom Mobile App Experience",
    slug: "custom-mobile-app-experience",
    category: "Mobile Applications",
    summary: "A modern mobile product concept designed around a clean, intuitive user experience.",
    description: "A modern mobile product concept designed around a clean, intuitive user experience.",
    image: "/assets/projects/mobile-app.svg",
    technologies: ["React Native", "Expo"],
    featured: false,
    status: "published"
  },
  {
    title: "Modern Web Platform",
    slug: "modern-web-platform",
    category: "Web Development",
    summary: "A responsive website concept with reusable components and a polished interface.",
    description: "A responsive website concept with reusable components and a polished interface.",
    image: "/assets/projects/web-platform.svg",
    technologies: ["React", "Vite", "CSS"],
    featured: false,
    status: "published"
  },
  {
    title: "Digital Learning Experience",
    slug: "digital-learning-experience",
    category: "Education Technology",
    summary: "A learning platform concept for institutions, educators and students.",
    description: "A learning platform concept for institutions, educators and students.",
    image: "/assets/projects/education.svg",
    technologies: ["React", "Node.js", "MongoDB"],
    featured: false,
    status: "published"
  }
];

export async function seedDatabaseIfEmpty() {
  try {
    console.log("Checking seed projects in MongoDB...");
    let added = 0;
    for (const p of defaultSeedProjects) {
      const exists = await Project.findOne({ slug: p.slug });
      if (!exists) {
        await Project.create(p);
        added++;
        console.log(`Seeded project: ${p.title} (${p.slug})`);
      }
    }
    const total = await Project.countDocuments();
    console.log(`Seeding complete. Added: ${added}, Total projects in DB: ${total}`);
  } catch (err) {
    console.error("Auto-seed error:", err.message);
  }
}

export const links = {
  email: "mailto:sarthakmadan88@gmail.com",
  linkedin: "https://www.linkedin.com/in/sarthak-madan-5b002235b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  github: "https://github.com/Sarthak-madan334",
  leetcode: "https://leetcode.com/u/xEKuuC6du4/",
};

export const projects = [
  {
    index: "01", title: "DEADLOCK", subtitle: "AI-powered failure intelligence",
    description: "A multi-agent platform that pressure-tests goals, surfaces hidden risks, and turns possible failure into a concrete recovery strategy.",
    highlights: ["5 expert-agent workflows", "Risk simulation & debate", "Actionable recovery plans"],
    tech: ["Next.js", "TypeScript", "Tailwind", "DeepSeek R1", "OpenRouter"],
    live: "https://deadlock-alpha.vercel.app", github: "https://github.com/Sarthak-madan334/Deadlock", accent: "cyan",
  },
  {
    index: "02", title: "NexStore", subtitle: "AI-powered e-commerce",
    description: "A responsive shopping experience with product discovery, cart, wishlist, flash sales, and an AI assistant for useful recommendations.",
    highlights: ["AI shopping assistant", "Search, cart & wishlist", "Responsive storefront"],
    tech: ["React.js", "JavaScript", "Claude AI", "Vercel"],
    live: "https://nexstore-dusky.vercel.app/", github: "https://github.com/Sarthak-madan334/nexstore", accent: "acid",
  },
] as const;

export type StackItem = { name: string; mark: string; use: string };
export type StackGroup = { title: string; items: StackItem[] };

export const stackGroups: StackGroup[] = [
  { title: "Programming Languages", items: [
    { name: "C++", mark: "C+", use: "Problem solving & DSA" }, { name: "Python", mark: "Py", use: "Scripting & AI workflows" },
    { name: "JavaScript", mark: "JS", use: "Interactive web products" }, { name: "TypeScript", mark: "TS", use: "Type-safe applications" },
  ]},
  { title: "Frontend", items: [
    { name: "HTML5", mark: "H5", use: "Semantic interfaces" }, { name: "CSS3", mark: "C3", use: "Responsive visual systems" },
    { name: "React.js", mark: "Re", use: "Component-driven UIs" }, { name: "Next.js", mark: "Nx", use: "Production React apps" },
    { name: "Tailwind CSS", mark: "Tw", use: "Scalable UI styling" },
  ]},
  { title: "Backend", items: [
    { name: "Node.js", mark: "No", use: "JavaScript services" }, { name: "Express.js", mark: "Ex", use: "RESTful backends" },
    { name: "API Routes", mark: "AP", use: "Full-stack features" },
  ]},
  { title: "Databases", items: [
    { name: "MongoDB", mark: "Mo", use: "Flexible app data" }, { name: "Firebase", mark: "Fb", use: "Realtime experiences" },
    { name: "PostgreSQL", mark: "Pg", use: "Relational data design" }, { name: "MySQL", mark: "My", use: "SQL-backed applications" },
  ]},
  { title: "AI / APIs", items: [
    { name: "OpenRouter", mark: "OR", use: "Multi-model AI access" }, { name: "DeepSeek", mark: "DS", use: "Reasoning pipelines" },
    { name: "Groq API", mark: "Gq", use: "Fast LLM inference" }, { name: "REST APIs", mark: "Rs", use: "Service integrations" },
  ]},
  { title: "Tools & Platforms", items: [
    { name: "Git", mark: "Gt", use: "Version control" }, { name: "GitHub", mark: "GH", use: "Collaboration & open source" },
    { name: "Vercel", mark: "Vr", use: "Web deployment" }, { name: "VS Code", mark: "VS", use: "Daily development" },
    { name: "Postman", mark: "Pm", use: "API testing" },
  ]},
  { title: "Core Concepts", items: [
    { name: "DSA", mark: "DS", use: "Efficient problem solving" }, { name: "OOP", mark: "OO", use: "Maintainable architecture" },
    { name: "DBMS", mark: "DB", use: "Reliable data systems" }, { name: "Operating Systems", mark: "OS", use: "Systems fundamentals" },
    { name: "Computer Networks", mark: "CN", use: "Web & network foundations" },
  ]},
];

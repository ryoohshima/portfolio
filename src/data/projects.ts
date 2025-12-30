export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  url?: string;
  github?: string;
  tags?: string[];
}

export const projects: Project[] = [
  {
    slug: "portfolio",
    title: "Portfolio Site",
    description: "Astro + Tailwind CSSで構築したポートフォリオサイト",
    longDescription:
      "View Transitions APIを活用したモダンなポートフォリオサイト。Astroの画像最適化やTailwind CSSによるレスポンシブデザインを採用。",
    url: "https://example.com",
    github: "https://github.com/username/portfolio",
    tags: ["Astro", "Tailwind CSS", "TypeScript"],
  },
  {
    slug: "ecommerce-app",
    title: "E-Commerce App",
    description: "フルスタックECサイト",
    longDescription:
      "Next.jsとStripeを使用したECサイト。認証、カート機能、決済処理を実装。",
    url: "https://example.com",
    github: "https://github.com/username/ecommerce",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
  },
  {
    slug: "task-manager",
    title: "Task Manager",
    description: "リアルタイムタスク管理アプリ",
    longDescription:
      "Firebaseを使用したリアルタイム同期機能付きのタスク管理アプリケーション。",
    github: "https://github.com/username/task-manager",
    tags: ["React", "Firebase", "TypeScript"],
  },
  {
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    description: "天気予報ダッシュボード",
    longDescription:
      "OpenWeather APIを使用した天気予報アプリ。位置情報と週間予報に対応。",
    url: "https://example.com",
    tags: ["Vue.js", "Chart.js", "API"],
  },
  {
    slug: "blog-platform",
    title: "Blog Platform",
    description: "マークダウン対応ブログ",
    longDescription:
      "MDXを使用したブログプラットフォーム。シンタックスハイライトとOGP画像自動生成機能付き。",
    github: "https://github.com/username/blog",
    tags: ["Astro", "MDX", "Vercel"],
  },
  {
    slug: "chat-app",
    title: "Chat Application",
    description: "リアルタイムチャットアプリ",
    longDescription:
      "WebSocketを使用したリアルタイムチャット。ルーム機能とファイル共有に対応。",
    url: "https://example.com",
    github: "https://github.com/username/chat",
    tags: ["Node.js", "Socket.io", "MongoDB"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

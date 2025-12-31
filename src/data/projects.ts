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
    slug: "global-saiyo-lab",
    title: "外国人材採用ラボ",
    description: "外国人材の採用支援プラットフォーム",
    longDescription:
      "特定技能制度に対応した外国人材採用支援サイト。複雑な制度をわかりやすく解説し、人材紹介から義務的支援代行までワンストップでサポート。フロントエンド開発を担当。",
    url: "https://global-saiyo-lab.jp/",
    tags: ["WordPress", "JavaScript", "CSS"],
  },
  {
    slug: "palmtree-science",
    title: "Palm Tree サイエンス校",
    description: "実験を通じた科学教育を提供する学習塾サイト",
    longDescription:
      "横須賀で創業38年の学習塾のサイエンス校サイト。「なぜ？を育む」をコンセプトに、少人数制の実験中心授業で子どもの知的好奇心を養う教育を紹介。フロントエンド開発を担当。",
    url: "https://palmtree-science.com/",
    tags: ["WordPress", "React", "JavaScript"],
  },
  {
    slug: "salotan",
    title: "サロタン",
    description: "美容室・サロン検索アプリ",
    longDescription:
      "美容室・サロンを検索・予約できるWebアプリケーション。Nuxt.jsとFirebaseを使用したモダンなSPA構成で、スムーズなユーザー体験を実現。フロントエンド開発を担当。",
    url: "https://salotan.jp/",
    tags: ["Nuxt.js", "Vue.js", "Firebase"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

import { createClient } from "microcms-js-sdk";
import { MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY } from "astro:env/server";
import type { Project } from "@/data/projects";

// microCMS の画像フィールドが返す構造。url とともに実寸(width/height)を含むため、
// astro:assets の <Image> にそのまま渡してビルド時最適化できる。
export interface MicroCMSImage {
  url: string;
  width: number;
  height: number;
}

// microCMS の projects API が返すコンテンツの型（スキーマと一対一）。
export interface MicroCMSProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  url?: string;
  github?: string;
  tags?: string[];
  image?: MicroCMSImage;
}

// 既存 UI が使う Project に画像を加えた表示用の型。
export type ProjectEntry = Project & { image?: MicroCMSImage };

const client = createClient({
  serviceDomain: MICROCMS_SERVICE_DOMAIN,
  apiKey: MICROCMS_API_KEY,
});

// microCMS のテキスト系フィールドは未入力でも空文字を返すため、
// 既存テンプレートの {project.url && ...} 条件分岐を活かせるよう undefined に正規化する。
function toProjectEntry(content: MicroCMSProject): ProjectEntry {
  return {
    slug: content.slug,
    title: content.title,
    description: content.description,
    longDescription: content.longDescription || undefined,
    url: content.url || undefined,
    github: content.github || undefined,
    tags: content.tags && content.tags.length > 0 ? content.tags : undefined,
    image: content.image,
  };
}

// 全プロジェクトを publishedAt 降順で取得する。フェッチ失敗時はそのまま例外を投げ、
// SSG ビルドを失敗させて早期検知する（壊れたデータでの公開を防ぐ）。
export async function getAllProjects(): Promise<ProjectEntry[]> {
  const contents = await client.getAllContents<MicroCMSProject>({
    endpoint: "projects",
    queries: { orders: "-publishedAt" },
  });
  return contents.map(toProjectEntry);
}

// microCMS から取得するプロジェクトの基本型。
// 画像を含む表示用の拡張型は src/lib/microcms.ts の ProjectEntry を参照。
export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  url?: string;
  github?: string;
  tags?: string[];
}

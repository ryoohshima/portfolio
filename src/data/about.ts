export interface Experience {
  period: string;
  title: string;
  company: string;
  description?: string;
}

export const profile = {
  name: "Ryo Ohshima",
  title: "WEB DEVELOPER",
  bio: "Web開発に情熱を持つエンジニアです。ユーザー体験を重視したモダンなWebアプリケーションの開発を得意としています。",
};

export const experiences: Experience[] = [
  {
    period: "2023 - 現在",
    title: "Webエンジニア",
    company: "株式会社サンプル",
    description: "フロントエンド開発を中心に、React/Next.jsを使用したWebアプリケーション開発に従事。",
  },
  {
    period: "2021 - 2023",
    title: "ジュニアエンジニア",
    company: "テック株式会社",
    description: "Webサイト制作やCMS構築を担当。HTML/CSS/JavaScriptの基礎を習得。",
  },
  {
    period: "2017 - 2021",
    title: "情報工学科",
    company: "サンプル大学",
    description: "コンピュータサイエンスの基礎を学習。卒業研究ではWebアプリケーション開発に取り組む。",
  },
];

export const iconDescription = {
  title: "Profile Icon",
  description:
    "このアイコンは、シンプルでモダンなデザインをコンセプトに作成しました。ミニマルな線で構成されたプロフィールアイコンは、クリーンなWebデザインへのこだわりを表現しています。",
};

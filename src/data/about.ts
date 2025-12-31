export interface Experience {
  period: string;
  title: string;
  company: string;
  description?: string;
}

export const profile = {
  name: "Ryo Ohshima",
  title: "FE ENGINEER",
  bio: "FEエンジニアとして活動しています。新卒ではオウンドメディアの運営やライティングをしていましたが、縁あって途中でエンジニアとなりました。",
};

export const experiences: Experience[] = [
  {
    period: "2022 - 現在",
    title: "FEエンジニア",
    company: "株式会社ニジボックス",
    description: "親会社であるリクルートのサービスの開発",
  },
  {
    period: "2020 - 2022",
    title: "FEエンジニア",
    company: "アクトデザインラボ株式会社",
    description: "自社HPの実装や受託開発など",
  },
  {
    period: "2017 - 2020",
    title: "WEBメディアのライター・運営",
    company: "アクトデザインラボ株式会社",
    description: "記事のライティングやサイトのマネタイズ、企画、取材など",
  },
];

export const iconDescription = {
  title: "Profile Icon",
  description:
    "イニシャルと我が家に伝わる家紋、自分の名前を組み合わせてシンプルでもモダンなデザインをコンセプトに作成しました。",
};

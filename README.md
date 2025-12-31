# Portfolio - Ryo Ohshima

FEエンジニア 大島 龍 のポートフォリオサイトです。

🔗 **https://ryoohshima.com**

## Tech Stack

- **Framework**: [Astro](https://astro.build/) v5
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Language**: TypeScript
- **Icons**: [astro-icon](https://www.astroicon.dev/) (Simple Icons)
- **Hosting**: Cloudflare Pages

## Features

- **View Transitions API** - ページ間のスムーズなアニメーション遷移
- **タイピングアニメーション** - Heroセクションの職種表示
- **パーティクル背景** - CSS アニメーションによる動的な背景
- **レスポンシブデザイン** - モバイル・タブレット・デスクトップ対応
- **OGP画像** - SNSシェア用の画像生成
- **SSG** - 静的サイト生成による高速なページ読み込み

## Project Structure

```
/
├── public/
│   ├── favicon.svg
│   └── og-image.png
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── projects/        # プロジェクト画像
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Projects.astro
│   │   ├── Skills.astro
│   │   └── Contact.astro
│   ├── data/
│   │   ├── about.ts             # プロフィール・経歴データ
│   │   └── projects.ts          # プロジェクトデータ
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro
│       ├── about.astro
│       ├── icon.astro
│       └── projects/
│           └── [slug].astro     # プロジェクト詳細ページ
├── astro.config.mjs
├── tailwind.config.ts
└── package.json
```

## Development

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動 (localhost:4321)
pnpm dev

# 本番ビルド
pnpm build

# ビルド結果のプレビュー
pnpm preview
```

## Deployment

Cloudflare Pages で自動デプロイされます。

### Release Workflow

1. `develop` ブランチで開発
2. リリースタグ (`v*`) をプッシュ
3. GitHub Actions が `develop` を `main` にマージ
4. Cloudflare Pages が `main` ブランチを自動デプロイ

```bash
# リリース例
git tag v1.0.0
git push origin v1.0.0
```

## Author

**Ryo Ohshima** - FE Engineer

- GitHub: [@Ryo-Ohshima](https://github.com/Ryo-Ohshima)
- X: [@Ryo_Ohshima_](https://x.com/Ryo_Ohshima_)
- LinkedIn: [龍 大島](https://www.linkedin.com/in/龍-大島-178625351/)

## License

This project is private.

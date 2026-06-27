# microCMS セットアップ手順（project セクション）

ポートフォリオの「project（制作実績）」セクションは microCMS から入稿する。本書は microCMS 管理画面・環境変数・デプロイの設定手順をまとめたもの。

- データ取得層: `src/lib/microcms.ts`（`getAllProjects`）
- 表示: `src/components/Projects.astro`（一覧）/ `src/pages/projects/[slug].astro`（詳細）
- SSG（ビルド時フェッチ）。コンテンツ更新はビルドで反映される。

> **最重要**: API レスポンスのキー（フィールドID）は `src/lib/microcms.ts` の `MicroCMSProject` 型と完全一致させること。1文字でも違うと値が `undefined` になる。表示名（日本語ラベル）は自由。

## 1. API（コンテンツ）作成

- API名: 任意（例: プロジェクト）
- **エンドポイント: `projects`** ← コードが参照する固定値。厳守
- APIの型: **リスト形式**

## 2. APIスキーマ（フィールド定義）

| フィールドID（厳守） | 表示名（自由） | 種類 | 必須 | 備考 |
|---|---|---|---|---|
| `slug` | スラッグ | テキストフィールド | ○ | URL に使用。半角英数字とハイフン。値の重複は運用で回避 |
| `title` | タイトル | テキストフィールド | ○ | |
| `description` | 概要 | テキストエリア | ○ | カード・メタ description 用の短文 |
| `longDescription` | 詳細説明 | テキストエリア | – | 詳細ページ本文（プレーンテキスト。改行のみ反映） |
| `url` | サイトURL | テキストフィールド | – | `https://` から記載 |
| `github` | GitHub URL | テキストフィールド | – | |
| `tags` | 技術タグ | セレクトフィールド | – | **「複数選択を許可」をON**。選択肢は下記 |
| `image` | サムネイル画像 | 画像 | – | `{ url, width, height }` を返す。最適化対象 |

### tags セレクトフィールドの選択肢（初期値）

```
WordPress, JavaScript, CSS, React, Nuxt.js, Vue.js, Firebase
```

後から追加可能。新技術はこの選択肢リストに足す。

## 3. 初期コンテンツ（既存3件を転記）

`slug` は既存 URL を壊さぬよう厳密に踏襲する（被リンク・SEO 保護）。画像は本リポジトリの `src/assets/images/projects/{slug}.png` をアップロードする。

| slug | title | url | tags |
|---|---|---|---|
| `global-saiyo-lab` | 外国人材採用ラボ | https://global-saiyo-lab.jp/ | WordPress, JavaScript, CSS |
| `palmtree-science` | Palm Tree サイエンス校 | https://palmtree-science.com/ | WordPress, React, JavaScript |
| `salotan` | サロタン | https://salotan.jp/ | Nuxt.js, Vue.js, Firebase |

`description` / `longDescription` の本文は、移行前の `src/data/projects.ts`（git 履歴に残存）からそのまま転記できる。`github` は既存データに値が無いため空でよい。

## 4. APIキー発行

- 管理画面 > APIキー で発行
- 権限は **GET のみ**で十分（ビルド時に読み取るだけ）

## 5. 環境変数

### ローカル `.env`（`.env.example` をコピーして作成）

```
MICROCMS_SERVICE_DOMAIN=あなたのサービスID   # https://<これ>.microcms.io の <これ>
MICROCMS_API_KEY=発行したGET用APIキー
```

`.gitignore` で `.env` は除外済み。`.env.example` のみコミットされる。

### Cloudflare Pages（本番）

- Settings > Environment variables で **Production / Preview 両方**に登録:
  - `MICROCMS_SERVICE_DOMAIN`
  - `MICROCMS_API_KEY`（Secret/暗号化を推奨）
- ビルドコマンド `pnpm build`・出力 `dist/` は現状維持。

## 6. 更新の自動反映（任意・推奨）

SSG ゆえコンテンツ更新はビルド時にしか反映されない。運用を楽にするには:

1. Cloudflare Pages の **Deploy Hook**（URL）を発行
2. microCMS 管理画面 > API設定 > **Webhook** に Cloudflare 種別で登録（コンテンツの公開・更新で発火）

→ 「microCMS で公開 → 自動で再ビルド → サイト反映」が繋がる。

## トラブルシューティング

| 症状 | 原因 | 対処 |
|---|---|---|
| ビルドが `MICROCMS_SERVICE_DOMAIN is missing` で失敗 | env 未設定 | `.env` または Cloudflare の環境変数を確認。これは未設定時の意図的な安全弁 |
| カードが空 / 「No Image」になる | フィールドID不一致 | スキーマのフィールドIDを `src/lib/microcms.ts` の `MicroCMSProject` と一致させる |
| `<Image>` が width/height でエラー | `image` を「複数画像」で作成した | 単一の「画像」種別で作り直す（配列ではなくオブジェクトを返す必要がある） |
| 一覧の並び順を変えたい | 現状 `publishedAt` 降順 | 数値フィールド `order` を追加し、`getAllProjects` の `orders` を `"order"` に変更 |

## 移行完了後のクリーンアップ

microCMS への入稿・本番反映を確認したら、不要になった以下を削除する（別コミット推奨）:

- `src/data/projects.ts` の旧データは既に型定義のみへ縮小済み
- `src/assets/images/projects/*.png`（約6MB。microCMS へ移行後は不要）

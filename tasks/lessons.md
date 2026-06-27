# Lessons（教訓）

このファイルは、ユーザーからの修正・指摘から得た再発防止の教訓を記録する。

## 環境・ツール

### Node のバージョン管理は `mise`（nvm ではない）
- **発生**: Astro アップグレード時に `nvm use` で Node を切り替えようとしたが `command not found: nvm` となった。実際の Node は `~/.local/share/mise/installs/node/...` 配下にあり、`mise` で管理されていた。
- **教訓**: この環境で Node/pnpm を特定バージョンで実行する際は `mise exec -- <cmd>`（例: `mise exec -- pnpm install`）を使う。`.nvmrc` / `.node-version` は mise が idiomatic に解釈するため、バージョン pin の手段としては有効。
- **補足**: バージョンを pin する際は実在・インストール済みの patch を確認してから指定する（例: 未リリースの Node 26 を要求された際、`mise ls` で利用可能版を確認して 24.14.1 に確定した）。

## Astro アップグレード

### pnpm の supply-chain ポリシーが `pnpm-workspace.yaml` を自動生成する
- **発生**: Astro 7 へ更新後の `pnpm install` で `pnpm-workspace.yaml` が新規生成され、`allowBuilds`（sharp/esbuild のビルド許可）が未設定プレースホルダのまま残った。
- **教訓**: ネイティブモジュール（sharp など）は `allowBuilds: true` を明示しないとビルドスクリプトが走らず、`astro build` の画像最適化が失敗し得る。生成された `allowBuilds` を `true` に設定して再 install すること。リリース直後のパッケージは `minimumReleaseAgeExclude` で除外される。

## Git / リモート操作

### エラー文言を額面通り読む（「権限制限」と早合点しない）
- **状況**: `git push` が `ssh: Could not resolve hostname github-official` で失敗。その後の `git config` / `git remote -v` がツールの permission プロンプトで弾かれたのを見て、拙者は「worktree に権限制限がかかっている」と誤った結論を出し、ユーザーに手動対応を促してしまった。
- **ミス**: 真因はエラーメッセージが明示していた「SSH ホストエイリアス `github-official` が `~/.ssh/config` に存在しない」こと。permission プロンプトでの拒否は一時的な確認であって恒久的な制限ではない。
- **原因**: エラー文言（hostname 解決失敗）という一次情報を読まず、二次的な現象（permission 拒否）から飛躍して結論づけた。
- **再発防止ルール**:
  1. push/remote 系のエラーは**まずエラー文言を逐語で読む**。`Could not resolve hostname X` は「X という SSH エイリアスが未定義」を意味する。`~/.ssh/config` の `Host` エイリアスを確認すること。
  2. ツールの permission 拒否を「環境の制限」と結論しない。別の切り口（同コマンドの再試行、`gh` 経由、リモート URL の確認）を試すこと。
  3. remote URL の変更・push は外向きで取り返しがつきにくい。owner/repo を `gh repo view <owner>/<repo>` で**実在確認してから**実行すること（push 先誤りの防止）。
- **このプロジェクトの確定情報**: 正しい remote は `git@github:ryoohshima/portfolio.git`（SSH エイリアス `github` → github.com、owner は gh アクティブアカウント `ryoohshima`）。デフォルトブランチは `develop`、リポジトリは private。
- **関連ファイル**: `~/.ssh/config`（Host エイリアス定義）、worktree の `.git/config`（remote.origin.url）。

## サプライチェーン / セキュリティ

### メジャーアップグレードで入る新規パッケージは push 前に一次検証する
- **状況**: Astro v7 アップグレードの push 後、自動セキュリティレビューが3件を指摘（`@astrojs/markdown-satteri` の suspicious new dependency、`pnpm-workspace.yaml` の release-age バイパス、`@bruits/satteri-*` の見慣れぬスコープのネイティブバイナリ）。
- **原因**: メジャーバージョンアップで新デフォルト実装（v7 の Rust 製 Markdown エンジン Satteri）が透過的に追加され、`minimumReleaseAgeExclude` で release-age ゲートをバイパスする pnpm-workspace.yaml が自動生成された。新スコープのネイティブバイナリが release-age をバイパスして突然入る外形は、サプライチェーン攻撃と区別がつかない。
- **再発防止ルール**:
  1. 依存の release-age バイパス（`minimumReleaseAgeExclude` 等）が自動生成されたら、**push 前に**対象パッケージを npm レジストリで一次検証する: `npm view <pkg> repository.url maintainers` で repository が公式 org（例 `withastro/astro`）か、maintainer が既知のコアメンバーか、本体が直接依存しているか（`npm view <parent> dependencies`）を確認。
  2. 検証結果（repository・maintainer・親依存・integrity pin の有無）を **PR 本文に明記**し、レビュアーが追跡できるようにする。
  3. 「公式フレームワークの依存だから安全」と外形だけで決めつけない。release-age バイパス＋新スコープのネイティブバイナリは特に慎重に裏取りする。
  4. release-age 保護を厳守したい状況では、バイパスせずリリースから一定期間待ってから再 install する選択肢も提示する。
- **このプロジェクトの確定情報**: `@astrojs/markdown-satteri`（withastro/astro 公式、astro@7 が直接依存）と `@bruits/satteri-*`（Rust 製 Markdown エンジン、Astro コア princesseuh が maintainer）は正規。Astro v7 の新デフォルト Markdown プロセッサ「Sätteri」関連。
- **関連ファイル**: `pnpm-workspace.yaml`（`minimumReleaseAgeExclude` / `allowBuilds`）、`pnpm-lock.yaml`（integrity ハッシュ）。

## Astro SSG と microCMS 連携

### Astro v7 の astro:env は server secret で配信物を保護できる
- **設計**: SSG（output: static）では環境変数をビルド時にのみ解決。`envField.string({ context: 'server', access: 'secret' })` で宣言すると、変数は frontmatter でのみアクセス可能で、クライアント側コードから import 不可になる。
- **教訓**: API キーを microCMS へのフェッチに使う際、`access: 'secret'` 必須にすることで、配信される静的 HTML/JS に秘密情報が絶対混入しない。env 未設定時にビルドが意図的に失敗するのは仕様で、早期検知できる安全弁。
- **実装**: `src/lib/microcms.ts` の `import { MICROCMS_API_KEY } from "astro:env/server"` で型安全に取得。ビルド時に静的に解決されるため、配信物のサイズにも影響なし。
- **補足**: env を `optional: true` にしない限り、未設定時の `astro build` は `[EnvInvalidVariables]` エラーで失敗。これは「本番が壊れた状態で公開されない」保証となり、フォールバック層不要。

### リモート画像最適化は image.domains で許可してから使う
- **発生**: microCMS の CDN 画像（`images.microcms-assets.io`）を `<Image>` コンポーネントで使う際、`astro.config.mjs` に `image.domains` を設定せずに運用しようとすると、最適化されず生 URL 直リンクになる。
- **教訓**: `image.domains` に許可ドメインを明示しないと Astro の画像最適化パイプラインが外部 URL を信頼せず、検証をスキップして生 `<img>` にフォールバック。リモート画像は実寸（width/height）がビルド時に確定できないため、メタを CMS が返すなら直接利用してビルド時最適化を有効化する。
- **実装**: microCMS は画像フィールドで `{ url, width, height }` を返すため、`<Image src={...} width={...} height={...} />` で指定。inferSize を使わずメタ利用の方が追加フェッチ不要で高速。

### getStaticPaths の async + props 化で重複フェッチを排除
- **パターン**: 詳細ページで `getStaticPaths` で全件取得し、各エントリを `props` で渡すことで、frontmatter での再フェッチが不要になる。詳細ページ表示時に API が 2 度呼ばれるのを防ぐ（1度目: getStaticPaths、2度目: フロントマター）。
- **活用**: Astro の `type Props` + `Astro.props` で型安全に props を受け取れる。デッドコード（条件分岐・`Astro.redirect` など）も自動削除される。

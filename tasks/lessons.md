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

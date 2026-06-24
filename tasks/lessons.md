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

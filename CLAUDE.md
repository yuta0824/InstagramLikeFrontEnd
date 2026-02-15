# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

Instagram風SNSのフロントエンド。Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4。
バックエンドはRails API（localhost:3030）で、`packages/http-client/api-docs.yaml` をAPI仕様の契約として連携している。

## 開発コマンド

```bash
pnpm dev                    # 開発サーバー起動 (port 8000)
pnpm build                  # ビルド（prebuildでhttp-clientも自動ビルド）
pnpm lint                   # ESLint
pnpm format                 # Prettierチェック
pnpm format:fix             # Prettier修正
pnpm storybook              # Storybook起動 (port 7000)
```

## APIクライアント生成

バックエンドのAPI仕様変更時は以下の順序で実行：

```bash
pnpm --filter @instagram-like-app/http-client generate  # OpenAPIから再生成（Docker必須）
pnpm --filter @instagram-like-app/http-client build      # ビルド
```

- 仕様ファイル: `packages/http-client/api-docs.yaml`
- 生成先: `packages/http-client/src/generated/`
- **生成コードは手動編集しない**

## コードスタイル

- Prettierルール: シングルクォート、セミコロンなし、printWidth 120、trailingCommaなし
- importは `@/*` エイリアスを使う（`./src/*` にマッピング）
- CSS class結合には `cn()` ユーティリティを使う（`src/lib/utils.ts`）

## アーキテクチャ

### 3層コンポーネント構成

1. **Presentational** (`src/components/`) — props受け取りのみ、API呼び出し禁止
   ```
   ComponentName/
     ├── index.tsx            # コンポーネント本体
     └── index.stories.tsx    # Storybook
   ```
2. **Container** (`src/features/*/views/`) — hooks経由でデータ取得、ビジネスロジック担当。基本的にpropsは受け取らない。UIの実装はPresentationalに任せ、データを渡すだけに留めるのが理想
3. **Page** (`app/`) — ContainerとLayoutを組み立てるだけ

### Feature-based構成

```
src/features/<feature>/
  ├── api/         # useQuery/useMutationカスタムフック
  ├── components/  # feature固有のUI
  ├── views/       # Container（データ取得+ロジック）
  ├── states/      # Jotai atoms
  └── modules/     # ユーティリティ
```

新機能追加時はこのパターンに従うこと。

### UIコンポーネント

- shadcn/ui（Radix UI + Tailwind）を使用。追加は `npx shadcn@latest add <component>`
- アイコンは `lucide-react` を優先

### FE/BEの責務分離

- **アプリケーションロジック・ビジネスルールはRails（BE）の責務**。FEでビジネスロジックやサーバー側で行うべきバリデーションを実装しようとしている場合は、「これはBE側で実装すべきでは？」と提案すること
- **FEのバリデーションはUX目的に限定する**: 入力中のリアルタイムフィードバック（文字数制限、フォーマットチェック等）に集中し、データの正当性の最終判断はAPIレスポンスに委ねる
- FEで複雑な条件分岐やデータ加工が必要になった場合は、APIの設計を見直すべきサインと考える

## データフェッチパターン

- サーバー状態: TanStack React Query（useQuery / useMutation）
- フォーム状態: Jotai atoms
- 認証: JWT（Cookie保存）、`getJwtFromCookie()` で取得
- エラー表示: `sonner` のtoast

## Gitルール

- **mainブランチでの作業禁止**: 必ず作業用ブランチ（`feature/`, `fix/`, `refactor/` 等）を作成して作業すること
- **git pushは実行しない**: pushはユーザーが手動で行う
- **大きな変更はコミットを分割する**: 1コミットにまとめず、レビューしやすい論理単位で分ける

## コミットメッセージ

- Conventional Commits形式: `feat:`, `fix:`, `refactor:`, `chore:` 等のプレフィックスを使用
- 日本語で簡潔に（1行目は50文字以内目安）
- 変更点だけでなく変更理由も記載

## コミット前チェック

**IMPORTANT: コミットを作成する前に、以下のチェックを必ず実行すること。エラーがある場合はコミットせず、すべて修正してからコミットすること。**

### 毎コミット必須

```bash
pnpm lint          # ESLintエラーがないこと
pnpm format:fix    # Prettierで自動整形（差分があればステージに追加）
```

### 節目で実行（機能実装完了時、PR作成前など）

```bash
pnpm build         # 型エラー・ビルドエラーがないこと
```

## 注意事項

- Node.js 22.11.0 必須（`.node-version` 参照）
- パッケージマネージャは **pnpm**（npm/yarn不可）
- `app/(authorized)/` 配下は認証必須のルート
- Tailwind CSS **v4**（v3とは設定方法が異なる、`@theme inline` で定義）

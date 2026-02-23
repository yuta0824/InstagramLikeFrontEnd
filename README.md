# InstagramLikeFrontEnd

Instagram風のSNSアプリケーション。写真投稿・いいね・コメント・フォロー・通知など、SNSの主要機能をフルスタックで実装したポートフォリオ作品です。

**本番環境**: https://instagram-like-front-end.vercel.app/

## 主な機能と使用技術

| 機能             | 詳細                                                  | 主な技術                                                  |
| ---------------- | ----------------------------------------------------- | --------------------------------------------------------- |
| **認証**         | Google OAuth によるログイン / ログアウト              | JWT（Cookie）、OAuth 2.0                                  |
| **投稿**         | 画像（最大3枚）＋キャプション付きで投稿・編集・削除   | FilePond、React Hook Form、Zod                            |
| **タイムライン** | フォロー中ユーザーの投稿を無限スクロールで閲覧        | TanStack Query（useInfiniteQuery）、Intersection Observer |
| **いいね**       | ワンタップでいいね / 取り消し                         | useMutation + 楽観的UI更新                                |
| **コメント**     | 投稿へのコメント追加・削除                            | React Query キャッシュ無効化                              |
| **フォロー**     | ユーザーのフォロー / フォロー解除                     | Jotai（状態管理）+ API連携                                |
| **プロフィール** | アバター・自己紹介の編集、フォロワー / フォロー中一覧 | FilePond（画像アップロード）、ダイアログUI                |
| **通知**         | いいね・コメント・フォローの通知、未読バッジ          | ポーリング、React Query                                   |
| **ユーザー検索** | 名前でのユーザー検索・探索                            | デバウンス検索、useQuery                                  |
| **レスポンシブ** | モバイル / デスクトップ対応レイアウト                 | Tailwind CSS v4、モバイルナビゲーション                   |

## 技術スタック

### フロントエンド（このリポジトリ）

| カテゴリ         | 技術                                                                  |
| ---------------- | --------------------------------------------------------------------- |
| フレームワーク   | Next.js 16（App Router）/ React 19 / TypeScript 5                     |
| スタイリング     | Tailwind CSS v4 / shadcn/ui（Radix UI）                               |
| 状態管理         | TanStack React Query v5（サーバー状態）/ Jotai v2（クライアント状態） |
| フォーム         | React Hook Form + Zod（バリデーション）                               |
| UIコンポーネント | Radix UI / Lucide React（アイコン）/ Embla Carousel                   |
| API連携          | OpenAPI Generator による型安全なHTTPクライアント自動生成              |
| テスト・品質     | ESLint / Prettier / Storybook / Chromatic（ビジュアルリグレッション） |
| デプロイ         | Vercel                                                                |

### バックエンド（[別リポジトリ](https://github.com/yuta0824/InstagramLikeApp)）

| カテゴリ     | 技術                                          |
| ------------ | --------------------------------------------- |
| 言語 / FW    | Ruby 3.3.2 / Rails 7.2（API モード）          |
| DB           | PostgreSQL 16                                 |
| KVS          | Redis 7（認証コード・キャッシュ）             |
| ストレージ   | Amazon S3 + CloudFront                        |
| 認証         | Google OAuth2 → JWT（devise-jwt）             |
| シリアライザ | ActiveModelSerializers（自動 camelCase 変換） |
| テスト       | RSpec, FactoryBot, Faker                      |
| Lint         | RuboCop                                       |
| CI/CD        | GitHub Actions（Lint → Test → Swagger 生成）  |
| インフラ     | Docker（開発）/ Heroku（本番）                |

## アーキテクチャ

### 全体構成

```
[Frontend (Vercel)]  ←── swagger.yaml(API契約) ──→  [Backend API (Heroku)]
        │                                                    │
        │  JWT Bearer Token                                  ├── PostgreSQL
        │  JSON (camelCase)                                  ├── Redis
        └────────────────────────────────────────────────────├── Amazon S3
                                                             └── CloudFront
```

### FE / BE の責務分離

```
┌─────────────────────────────────┐     ┌──────────────────────────────┐
│  Frontend (Next.js)             │     │  Backend (Rails API)         │
│                                 │     │                              │
│  ・UIの描画                　     │────▶│  ・ビジネスロジック             │
│  ・UX目的のバリデーション           │◀────│  ・データバリデーション          │
│  ・状態管理（表示用）     　        │     │  ・認証・認可                  │
│                                 │     │  ・OpenAPI仕様の管理           │
└─────────────────────────────────┘     └──────────────────────────────┘
         ▲                                         ▲
         │    OpenAPI仕様（唯一の契約）               │
         └─────────────────────────────────────────┘
```

### コンポーネント設計（3層構成）

```
Page（app/）─ 画面の組み立てのみ
  └─ Container（features/*/views/）─ データ取得・ロジック
       └─ Presentational（components/）─ UIの描画のみ（props駆動）
```

### ディレクトリ構成

```
src/
├── components/          # 共有UIコンポーネント（Presentational）
│   ├── layout/          #   レイアウト系
│   └── ui/              #   shadcn/ui + カスタムUI
├── features/            # 機能別モジュール
│   ├── auth/            #   認証
│   ├── post/            #   投稿・いいね
│   ├── user/            #   ユーザー・フォロー・プロフィール
│   ├── comment/         #   コメント
│   └── notification/    #   通知
├── hooks/               # 共有カスタムフック
├── constants/           # 定数
├── lib/                 # ユーティリティ（cn()等）
└── utils/               # ヘルパー関数

packages/
└── http-client/         # OpenAPIから自動生成されたAPIクライアント
```

## リポジトリ

|                | リンク                                                                              |
| -------------- | ----------------------------------------------------------------------------------- |
| フロントエンド | [yuta0824/InstagramLikeFrontEnd](https://github.com/yuta0824/InstagramLikeFrontEnd) |
| バックエンド   | [yuta0824/InstagramLikeApp](https://github.com/yuta0824/InstagramLikeApp)           |
| 本番環境       | [instagram-like-front-end.vercel.app](https://instagram-like-front-end.vercel.app/) |

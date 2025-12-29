# InstagramLikeFrontEnd (Next.js)

## 開発環境

### セットアップ

- Node のバージョンは `.node-version` を使用
- 環境変数の設定

### Module Install

```bash
pnpm i
```

### Build

```bash
pnpm build
```

### 起動

```bash
pnpm dev
```

### Storybook の起動

```bash
pnpm storybook
```

### OpenAPI クライアントの生成

```bash
pnpm --filter @instagram-like-app/http-client generate
pnpm --filter @instagram-like-app/http-client build
```

## Development Guidelines

### API Architecture

- サーバーサイド（Rails）が OpenAPI 仕様書を管理し、それに従ってデータの入出力を行う。仕様書がフロントとの唯一の契約。
- ビジネスロジックはサーバー優先で実装し、フロントは「仕様に沿って呼び出し結果を描画する」ことに専念する。
- フロントは生成された HTTP クライアント（`packages/http-client`）＋ React Query を用いて API を叩く。仕様変更時は OpenAPI 仕様を更新し、クライアントを再生成する。
- 仕様にないロジックや検証はフロントで独自実装しない。

### Component Architecture

#### Presentational Components (`src/components/`):

- **責務**: UIの描画のみ。
- **役割**:
  - 必要なデータやコールバックは全て `props` で受け取り、UIを描画する
- **禁止事項**:
  - API通信（`useMutation`, `useQuery` など API クライアントを直接呼ぶこと）。
  - 複雑なビジネスロジック。
  - 外部ライブラリ（Stripe など）の直接的な依存

#### Container Components (`src/views/`):

- **責務**: ビジネスロジックの統合、データフェッチ、状態管理。
- **役割**:
  - カスタムフックを使用して API と通信。
  - Presentational Components にデータとハンドラーを渡す。
  - エラーハンドリング（Toast 表示など）やリダイレクト処理を行う。
- **禁止事項**:
  - 不用意に UI を実装しない（UI は Presentational に任せ、ここでは「データを取得して渡すだけ」に徹する）。
  - グローバルな副作用の埋め込み（可能な限りカスタムフックに分離）。

#### Page Components (`app/**`):

- **責務**: 画面構成の最終組み立て。
- **役割**:
  - `src/views` の Container Components を組み合わせてページを構成する。
  - レイアウト指定やメタデータ設定など、Next.js 特有のページ設定。
- **禁止事項**:
  - ビジネスロジックを直接記述すること。
  - API クライアントの直接呼び出し。
  - 再利用可能な UI やロジックをここに閉じ込めること（必要に応じて components/views へ切り出す）。

### Project Structure

- 機能別 × 技術別のハイブリッド構成
  - `src/` 直下に共通レイヤー（`components/`, `views/`, `features/`, `constants/`, `lib/`, `styles/`, `utils/` など）を技術別に配置。
  - `src/features/<feature>/` 配下でも `api/`, `components/`, `hooks/`, `views/` など同じレイヤーを揃え、機能単位で完結させる（`src` 直下をクローンするイメージ）。

例:

```
src/                   # src直下で技術別分類
├── components/
├── views/
├── features/          # 機能別分類
│   └── user/          # 各機能ごとに技術別分類
│       ├── api/
│       ├── components/
│       ├── views/
│       └── hooks/
└── ...
```

import Link from 'next/link'
import { Users } from 'lucide-react'

export const TimelineEmptyState = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <Users className="text-muted-foreground size-12" />
      <div className="space-y-2">
        <p className="text-lg font-semibold">タイムラインに投稿がありません</p>
        <p className="text-muted-foreground text-sm">
          ユーザーをフォローして、
          <br className="sm:hidden" />
          タイムラインを充実させましょう。
        </p>
      </div>
      <Link
        href="/explore/"
        className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2 rounded-md px-6 py-2 text-sm font-medium transition-colors"
      >
        ユーザーを探す
      </Link>
    </div>
  )
}

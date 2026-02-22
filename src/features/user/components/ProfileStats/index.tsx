import Link from 'next/link'

export interface ProfileStatItemProps {
  label: string
  count: number
  href?: string
  onClick?: () => void
}

interface ProfileStatsProps {
  posts: ProfileStatItemProps
  followers: ProfileStatItemProps
  followings: ProfileStatItemProps
}

const StatItem = ({ label, count, href, onClick }: ProfileStatItemProps) => {
  if (onClick) {
    return (
      <button type="button" className="cursor-pointer text-center" onClick={onClick}>
        <p>{count}</p>
        <p className="text-brandGray text-sm">{label}</p>
      </button>
    )
  }

  return (
    <div className="text-center">
      <p>{count}</p>
      {href ? (
        <Link href={href} className="text-brandGray text-sm">
          {label}
        </Link>
      ) : (
        <p className="text-brandGray text-sm">{label}</p>
      )}
    </div>
  )
}

export const ProfileStats = ({ posts, followers, followings }: ProfileStatsProps) => {
  return (
    <div className="mx-auto grid w-fit grid-cols-3 gap-10">
      <StatItem {...posts} />
      <StatItem {...followers} />
      <StatItem {...followings} />
    </div>
  )
}

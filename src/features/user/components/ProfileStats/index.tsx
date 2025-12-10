import Link from 'next/link'

export interface ProfileStatItemProps {
  label: string
  count: number
  href?: string
}

interface ProfileStatsProps {
  posts: ProfileStatItemProps
  followers: ProfileStatItemProps
  followings: ProfileStatItemProps
}

const StatItem = ({ label, count, href }: ProfileStatItemProps) => {
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

import type { ComponentProps } from 'react'
import Link from 'next/link'
import { GoArrowLeft } from 'react-icons/go'

type BackLinkProps = Omit<ComponentProps<typeof Link>, 'children'>

export const BackLink = ({ ...props }: BackLinkProps) => {
  return (
    <Link {...props} className="inline-block aspect-square rounded-full p-1 transition duration-300 hover:bg-gray-100">
      <GoArrowLeft className="size-8" />
    </Link>
  )
}

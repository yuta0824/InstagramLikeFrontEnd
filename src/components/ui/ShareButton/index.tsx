'use client'

import { FiLink, FiShare } from 'react-icons/fi'
import { RiFacebookLine, RiTwitterXLine } from 'react-icons/ri'
import { SiLine } from 'react-icons/si'
import { Button } from '../button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../dropdown-menu'
import { copyTextToClipboard } from '@/utils/copy-to-clipboard'

export interface ShareButtonProps {
  url: string
}

const shareTargets = [
  {
    label: 'X',
    icon: RiTwitterXLine,
    url: (targetUrl: string) => `https://x.com/intent/tweet?url=${targetUrl}`
  },
  {
    label: 'LINE',
    icon: SiLine,
    url: (targetUrl: string) => `https://social-plugins.line.me/lineit/share?url=${targetUrl}`
  },
  {
    label: 'Facebook',
    icon: RiFacebookLine,
    url: (targetUrl: string) => `https://www.facebook.com/sharer/sharer.php?u=${targetUrl}`
  }
] as const

export const ShareButton = ({ url }: ShareButtonProps) => {
  const targetUrl = encodeURIComponent(url)
  const handleCopyToClipboard = async () => {
    await copyTextToClipboard(url)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <span className="sr-only">共有する</span>
          <FiShare aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="rounded-md">
        <DropdownMenuItem className="cursor-pointer" onSelect={handleCopyToClipboard}>
          <FiLink className="size-4 shrink-0" aria-hidden="true" />
          <span>リンクをコピー</span>
        </DropdownMenuItem>
        {shareTargets.map(target => (
          <DropdownMenuItem key={target.label} asChild>
            <a href={target.url(targetUrl)} target="_blank" rel="noopener noreferrer">
              <target.icon className="size-4 shrink-0" aria-hidden="true" />
              <span>{target.label} でシェア</span>
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

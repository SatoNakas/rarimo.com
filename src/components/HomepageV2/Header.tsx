'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import GithubFillIcon from '@/assets/icons/github-fill-icon.svg'
import LogoIcon from '@/assets/icons/logo-icon.svg'
import TelegramLineIcon from '@/assets/icons/telegram-line-icon.svg'
import TwitterXFillIcon from '@/assets/icons/twitter-x-fill-icon.svg'
import { config } from '@/config'
import { cn } from '@/theme/utils'

const SOCIAL_LINKS = [
  { label: 'X', href: config.xLink, Icon: TwitterXFillIcon },
  { label: 'Telegram', href: config.telegramLink, Icon: TelegramLineIcon },
  { label: 'GitHub', href: config.githubLink, Icon: GithubFillIcon },
]

const NAV_LINKS: {
  label: string
  href?: string
  external?: boolean
  soon?: boolean
}[] = [
  { label: 'Products', href: '#zk-passport' },
  { label: 'Pricing', soon: true },
  { label: 'Learning hub', href: '/learning-hub' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  /* the hero has its own CTAs; show the header one only past the hero */
  const [showCta, setShowCta] = useState(false)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        setShowCta(window.scrollY > window.innerHeight * 0.75)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <header className='sticky top-0 z-50 bg-white/70 backdrop-blur-xl'>
      <div className='mx-auto flex h-14 w-full max-w-[1312px] items-center justify-between px-4 md:px-8'>
        <a href='/' className='shrink-0 text-[#282828]'>
          <LogoIcon />
        </a>

        <nav className='hidden items-center gap-7 lg:flex'>
          {NAV_LINKS.map(link =>
            link.soon ? (
              <span
                key={link.label}
                className='flex cursor-default items-center gap-1.5 text-[14px] text-[#282828]/40'
              >
                {link.label}
                <span className='rounded-full bg-[#F4F4F4] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#282828]/50'>
                  soon
                </span>
              </span>
            ) : link.external ? (
              <a
                key={link.label}
                href={link.href}
                target='_blank'
                rel='noreferrer'
                className='text-[14px] text-[#282828]/70 transition-colors hover:text-[#282828]'
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href ?? '/'}
                className='text-[14px] text-[#282828]/70 transition-colors hover:text-[#282828]'
              >
                {link.label}
              </Link>
            ),
          )}
          <div className='flex items-center gap-4 pl-1'>
            {SOCIAL_LINKS.map(social => (
              <a
                key={social.label}
                href={social.href}
                target='_blank'
                rel='noreferrer'
                aria-label={social.label}
                className='text-[#282828]/60 transition-colors hover:text-[#282828]'
              >
                <social.Icon className='w-5' />
              </a>
            ))}
          </div>
          <a
            href={config.documentationLink}
            target='_blank'
            rel='noreferrer'
            tabIndex={showCta ? 0 : -1}
            aria-hidden={!showCta}
            className={cn(
              'overflow-hidden whitespace-nowrap rounded-full bg-[#161616] text-[14px] font-medium text-white',
              'transition-all duration-300 ease-out hover:opacity-85',
              showCta
                ? 'max-w-[200px] px-4 py-2 opacity-100'
                : 'pointer-events-none -ml-7 max-w-0 px-0 py-2 opacity-0',
            )}
          >
            Build with Rarimo
          </a>
        </nav>

        <button
          type='button'
          className='flex flex-col gap-1.5 p-2 lg:hidden'
          aria-label='Toggle menu'
          onClick={() => setIsMenuOpen(open => !open)}
        >
          <span
            className={cn(
              'h-0.5 w-5 bg-[#282828] transition-transform',
              isMenuOpen && 'translate-y-1 rotate-45',
            )}
          />
          <span
            className={cn(
              'h-0.5 w-5 bg-[#282828] transition-transform',
              isMenuOpen && '-translate-y-1 -rotate-45',
            )}
          />
        </button>
      </div>

      {isMenuOpen && (
        <nav className='flex flex-col gap-1 border-t border-black/5 bg-white px-6 py-4 lg:hidden'>
          {NAV_LINKS.map(link =>
            link.soon ? (
              <span
                key={link.label}
                className='flex items-center gap-1.5 py-2 text-[15px] text-[#282828]/40'
              >
                {link.label}
                <span className='rounded-full bg-[#F4F4F4] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#282828]/50'>
                  soon
                </span>
              </span>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                className='py-2 text-[15px] text-[#282828]'
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ),
          )}
          <div className='mt-2 flex items-center gap-5'>
            {SOCIAL_LINKS.map(social => (
              <a
                key={social.label}
                href={social.href}
                target='_blank'
                rel='noreferrer'
                aria-label={social.label}
                className='text-[#282828]/60'
              >
                <social.Icon className='w-5' />
              </a>
            ))}
          </div>
          <a
            href={config.documentationLink}
            target='_blank'
            rel='noreferrer'
            className='mt-3 w-fit rounded-full bg-[#161616] px-4 py-2 text-[14px] font-medium text-white'
          >
            Build with Rarimo
          </a>
        </nav>
      )}
    </header>
  )
}

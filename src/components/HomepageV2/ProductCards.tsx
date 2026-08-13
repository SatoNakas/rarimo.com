'use client'

import { ArrowRight } from 'lucide-react'

import { cn } from '@/theme/utils'

const PRODUCTS = [
  {
    overline: 'INPUT',
    title: 'ZK Passport',
    sub: 'documents',
    href: '#zk-passport',
  },
  {
    overline: 'INPUT',
    title: 'Bionetta',
    sub: 'biometrics',
    href: '#bionetta',
  },
  {
    overline: 'OUTPUT',
    title: 'ZK Registries',
    sub: 'onchain · ERC-7812',
    href: '#zk-registries',
  },
]

/* one continuous eased scroll with a capped duration, so reaching a far
   section stays quick instead of crawling through every pinned carousel
   at native smooth-scroll speed */
function jumpTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  const el = document.querySelector(href)
  if (!el) return
  e.preventDefault()
  const startY = window.scrollY
  const targetY = el.getBoundingClientRect().top + startY - 80
  const distance = targetY - startY
  const duration = Math.min(2200, Math.max(800, Math.abs(distance) / 4))
  const startTime = performance.now()
  /* sine easing has the lowest peak velocity, so long jumps glide
     instead of strobing past the content */
  const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
  const step = (now: number) => {
    const t = Math.min(1, (now - startTime) / duration)
    window.scrollTo({
      top: startY + distance * ease(t),
      behavior: 'instant' as ScrollBehavior,
    })
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
  history.pushState(null, '', href)
}

export default function ProductCards() {
  return (
    <div className='mt-4 grid gap-2 md:grid-cols-3'>
      {PRODUCTS.map(product => (
        <a
          key={product.title}
          href={product.href}
          onClick={e => jumpTo(e, product.href)}
          className={cn(
            'group flex min-h-[200px] flex-col justify-between rounded-xl bg-white p-8 pb-7',
            'border border-black/5 md:min-h-[269px]',
            'transition-all duration-200 hover:-translate-y-1 hover:border-black/10 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]',
          )}
        >
          <span className='text-[11px] font-semibold tracking-[0.14em] text-[#282828]/40 transition-colors duration-200 group-hover:text-[#282828]/60'>
            {product.overline}
          </span>
          <span className='flex flex-col gap-1'>
            <span className='flex items-center gap-2 text-[24px] font-bold text-[#282828]'>
              {product.title}
              <ArrowRight className='size-5 -translate-x-1 text-[#282828]/0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-[#282828]/60' />
            </span>
            <span className='text-[12px] text-[#282828]/40'>{product.sub}</span>
          </span>
        </a>
      ))}
    </div>
  )
}

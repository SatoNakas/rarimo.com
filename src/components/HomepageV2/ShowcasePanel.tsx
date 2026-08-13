'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/theme/utils'

export type ShowcaseMedia =
  | { type: 'video'; src: string; poster?: string }
  | { type: 'image'; src: string }

export type ShowcaseItem = {
  key: string
  label: string
  title: string
  description: string
  media: ShowcaseMedia
  mediaOverlay?: ReactNode
}

const ACCENTS = {
  green: {
    label: 'text-[#82ED96]',
    idleLabel: 'text-white/35',
    bar: 'bg-[#82ED96]',
    title: 'from-[#C9F8D1] to-[#82ED96]',
    cardTitle: 'text-[#82ED96]',
    glow: 'radial-gradient(90% 70% at 18% 32%, rgba(130,237,150,0.20) 0%, rgba(130,237,150,0.05) 45%, transparent 70%), linear-gradient(160deg, #0B120D 0%, #050705 100%)',
    cardText:
      'linear-gradient(180deg, rgba(130,237,150,0.16) 0%, rgba(130,237,150,0.04) 55%, rgba(130,237,150,0) 100%), linear-gradient(180deg, #0B130D 0%, #060806 100%)',
  },
  purple: {
    label: 'text-[#CD90F3]',
    idleLabel: 'text-white/35',
    bar: 'bg-[#CD90F3]',
    title: 'from-[#F0D3FE] to-[#CD90F3]',
    cardTitle: 'text-[#CD90F3]',
    glow: 'radial-gradient(90% 70% at 18% 32%, rgba(205,144,243,0.20) 0%, rgba(205,144,243,0.05) 45%, transparent 70%), linear-gradient(160deg, #0F0A12 0%, #060507 100%)',
    cardText:
      'linear-gradient(180deg, rgba(205,144,243,0.16) 0%, rgba(205,144,243,0.04) 55%, rgba(205,144,243,0) 100%), linear-gradient(180deg, #100A13 0%, #070608 100%)',
  },
} as const

function ShowcaseMediaEl({
  item,
  className,
  videoRef,
}: {
  item: ShowcaseItem
  className?: string
  videoRef?: (el: HTMLVideoElement | null) => void
}) {
  if (item.media.type === 'video') {
    return (
      <video
        ref={el => {
          /* React can drop the muted attribute in SSR markup; enforce it
             so autoplay never starts with sound */
          if (el) {
            el.muted = true
            el.defaultMuted = true
          }
          videoRef?.(el)
        }}
        className={cn('size-full object-cover', className)}
        src={item.media.src}
        poster={item.media.poster}
        muted
        loop
        playsInline
        preload='metadata'
      />
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn('size-full object-cover', className)}
      src={item.media.src}
      alt=''
    />
  )
}

export default function ShowcasePanel({
  items,
  accent,
  eyebrow,
  mediaTabs,
}: {
  items: ShowcaseItem[]
  accent: keyof typeof ACCENTS
  eyebrow: string
  /* Optional pill labels rendered over the media, one per item (e.g. Passport / ID) */
  mediaTabs?: string[]
}) {
  const a = ACCENTS[accent]
  const [activeIdx, setActiveIdx] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  /* tall track that the desktop panel pins inside; scroll progress through it
     drives which item is active and how full its bar is */
  const trackRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const barRef = useRef<HTMLSpanElement | null>(null)
  const activeIdxRef = useRef(0)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* scroll-driven progression (desktop pinned panel) */
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const track = trackRef.current
        if (!track || track.offsetParent === null) return
        const viewportH = window.innerHeight
        const scrollable = track.offsetHeight - viewportH
        if (scrollable <= 0) return
        const top = track.getBoundingClientRect().top
        const t = Math.min(1, Math.max(0, -top / scrollable))
        const pos = Math.min(items.length - 1e-4, t * items.length)
        const idx = Math.floor(pos)
        const segProgress = pos - idx
        if (idx !== activeIdxRef.current) {
          activeIdxRef.current = idx
          setActiveIdx(idx)
        }
        if (barRef.current) {
          barRef.current.style.height = `${segProgress * 100}%`
        }
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [items.length])

  /* hybrid auto-advance: while the panel is pinned and the user is idle,
     drip-scroll the window so the bar keeps filling and the carousel moves
     on its own. Any wheel / touch / key input pauses it. */
  const lastInputRef = useRef(0)
  useEffect(() => {
    const markInput = () => {
      lastInputRef.current = Date.now()
    }
    window.addEventListener('wheel', markInput, { passive: true })
    window.addEventListener('touchmove', markInput, { passive: true })
    window.addEventListener('mousedown', markInput)
    window.addEventListener('keydown', markInput)

    const IDLE_DELAY_MS = 2000
    const SECONDS_PER_ITEM = 7
    let raf = 0
    let prevTime = 0
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = prevTime ? (now - prevTime) / 1000 : 0
      prevTime = now
      const track = trackRef.current
      if (!track || track.offsetParent === null) return
      if (Date.now() - lastInputRef.current < IDLE_DELAY_MS) return
      const scrollable = track.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const t = -track.getBoundingClientRect().top / scrollable
      /* only drive while pinned; stop at the end so the page never
         scrolls on by itself */
      if (t < 0 || t >= 0.999) return
      const rate = scrollable / items.length / SECONDS_PER_ITEM
      window.scrollBy(0, rate * dt)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('wheel', markInput)
      window.removeEventListener('touchmove', markInput)
      window.removeEventListener('mousedown', markInput)
      window.removeEventListener('keydown', markInput)
      cancelAnimationFrame(raf)
    }
  }, [items.length])

  useEffect(() => {
    items.forEach((item, idx) => {
      /* desktop pinned video: play only the active one */
      const video = videoRefs.current[item.key]
      if (video) {
        if (idx === activeIdx && isInView) {
          video.currentTime = 0
          video.play().catch(() => undefined)
        } else {
          video.pause()
        }
      }
      /* mobile carousel video: play all while the panel is on screen */
      const mobileVideo = videoRefs.current[`m-${item.key}`]
      if (mobileVideo) {
        if (isInView) {
          mobileVideo.play().catch(() => undefined)
        } else {
          mobileVideo.pause()
        }
      }
    })
  }, [activeIdx, isInView, items])

  /* clicking a rail item / media tab scrolls the page to that segment */
  const goTo = useCallback(
    (idx: number) => {
      const track = trackRef.current
      if (!track || track.offsetParent === null) return
      /* treat the click as input so the auto-drive doesn't fight the
         smooth scroll */
      lastInputRef.current = Date.now() + 800
      const viewportH = window.innerHeight
      const scrollable = track.offsetHeight - viewportH
      const trackTop = track.getBoundingClientRect().top + window.scrollY
      const t = (idx + 0.55) / items.length
      window.scrollTo({ top: trackTop + t * scrollable, behavior: 'smooth' })
    },
    [items.length],
  )

  return (
    <div ref={rootRef}>
      {/* ------ mobile: eyebrow + horizontal snap carousel ------ */}
      <div className='lg:hidden'>
        <span className='text-[16px] text-[#282828]/60'>{eyebrow}</span>
        <div
          className={cn(
            '-mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:-mx-8 md:px-8',
            '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          )}
        >
          {items.map(item => (
            <div
              key={item.key}
              className='w-[84vw] max-w-[336px] shrink-0 snap-start overflow-hidden rounded-3xl bg-[#050505]'
            >
              <div className='relative h-[327px]'>
                <ShowcaseMediaEl
                  item={item}
                  videoRef={el => {
                    videoRefs.current[`m-${item.key}`] = el
                  }}
                />
                {item.mediaOverlay}
              </div>
              <div
                className='flex min-h-[230px] flex-col gap-3 p-6 pt-7'
                style={{ background: a.cardText }}
              >
                <h3
                  className={cn(
                    'text-[24px] font-semibold leading-[1.2]',
                    a.cardTitle,
                  )}
                >
                  {item.title}
                </h3>
                <p className='text-[14px] leading-[1.45] text-white/60'>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------ desktop: pinned panel, scroll drives the carousel ------ */}
      <div
        ref={trackRef}
        className='hidden lg:block'
        style={{ height: `${items.length * 100 + 50}vh` }}
      >
        <div
          className='sticky grid overflow-hidden rounded-3xl bg-[#050505] lg:min-h-[695px] lg:grid-cols-2'
          style={{ top: 'max(76px, calc(50vh - 360px))' }}
        >
          {/* rail */}
          <div
            className='relative flex flex-col p-8 md:p-12 lg:p-14'
            style={{ background: a.glow }}
          >
            <span className='text-[15px] text-white/70'>{eyebrow}</span>

            <div className='mt-10 flex flex-1 flex-col justify-start gap-8 lg:mt-14'>
              {items.map((item, idx) => {
                const isActive = idx === activeIdx
                return (
                  <button
                    key={item.key}
                    type='button'
                    onClick={() => goTo(idx)}
                    className='flex gap-4 text-left'
                  >
                    {/* progress track */}
                    <span className='relative w-[2px] shrink-0 self-stretch overflow-hidden rounded-full bg-white/15'>
                      {isActive && (
                        <span
                          ref={barRef}
                          className={cn('absolute left-0 top-0 w-full', a.bar)}
                          style={{ height: '0%' }}
                        />
                      )}
                    </span>

                    <span className='flex min-w-0 flex-col'>
                      {!(
                        isActive &&
                        item.label.toLowerCase() === item.title.toLowerCase()
                      ) && (
                        <span
                          className={cn(
                            'font-mono text-[12px] uppercase tracking-[0.12em] transition-colors duration-300',
                            isActive ? a.label : a.idleLabel,
                          )}
                        >
                          {item.label}
                        </span>
                      )}

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: 'easeInOut' }}
                            className='block overflow-hidden'
                          >
                            <span
                              className={cn(
                                'mt-3 block bg-gradient-to-r bg-clip-text text-transparent',
                                'text-[32px] font-semibold leading-[1.1] md:text-[40px]',
                                a.title,
                              )}
                            >
                              {item.title}
                            </span>
                            <span className='mt-4 block max-w-[400px] text-[15px] leading-[1.5] text-white/55'>
                              {item.description}
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* media */}
          <div className='relative bg-black'>
            {items.map((item, idx) => {
              const isActive = idx === activeIdx
              return (
                <div
                  key={item.key}
                  className={cn(
                    'absolute inset-0 transition-opacity duration-700',
                    isActive ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  <ShowcaseMediaEl
                    item={item}
                    videoRef={el => {
                      videoRefs.current[item.key] = el
                    }}
                  />
                  {item.mediaOverlay}
                </div>
              )
            })}

            {mediaTabs && (
              <div className='absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/40 p-1 backdrop-blur-md'>
                {mediaTabs.map((tab, idx) => (
                  <button
                    key={tab}
                    type='button'
                    onClick={() => goTo(idx)}
                    className={cn(
                      'rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors',
                      idx === activeIdx
                        ? 'bg-white text-[#161616]'
                        : 'text-white/70 hover:text-white',
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

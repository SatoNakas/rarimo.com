'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'

import HeroBadgeCheckIcon from '@/assets/icons/hero-badge-check-icon.svg'
import HeroCloudOffIcon from '@/assets/icons/hero-cloud-off-icon.svg'
import { config } from '@/config'
import { cn } from '@/theme/utils'

const RAISE_LINK =
  'https://crypto.news/rarimo-secures-2-5m-for-zk-identity-protocol-with-backing-from-vitalik-buterin/'

export default function HeroSection() {
  const mediaRef = useRef<HTMLDivElement>(null)

  /* gentle parallax drift on the hero media */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - card.left) / card.width - 0.5
    const dy = (e.clientY - card.top) / card.height - 0.5
    if (mediaRef.current) {
      mediaRef.current.style.transform = `translate(${dx * -14}px, ${dy * -10}px)`
    }
  }

  const handleMouseLeave = () => {
    if (mediaRef.current) mediaRef.current.style.transform = 'translate(0, 0)'
  }

  return (
    <section className='mx-auto w-full max-w-[1440px] px-5 md:px-8'>
      <div
        className='relative overflow-hidden rounded-3xl bg-[#F4F4F4]'
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className='relative z-10 flex min-h-[560px] flex-col p-6 pb-0 md:p-[56px] md:pb-0 lg:min-h-[752px] lg:justify-between lg:px-[114px] lg:py-[56px]'>
          <div className='max-w-[560px]'>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: 'easeOut' }}
              className='hidden lg:block'
            >
              <a
                href={RAISE_LINK}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-4 pr-3 shadow-sm transition-shadow hover:shadow-md'
              >
                <span className='text-[13px] font-medium text-[#282828]'>
                  Rarimo raised $2.5m vision round
                </span>
                <ArrowRight className='size-4 text-[#282828]/60' />
              </a>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                'mt-2 text-[52px] font-bold leading-[0.98] tracking-[-0.03em] text-[#282828]',
                'lg:mt-8 lg:text-[80px]',
              )}
            >
              Verify
              <br />
              <HeroBadgeCheckIcon className='mr-3 inline size-[0.72em] align-baseline' />
              anyone.
              <br />
              Store
              <HeroCloudOffIcon className='mx-3 inline size-[0.68em] align-baseline text-[#A9A9A9]' />
              <br />
              nothing.
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className='mt-8 max-w-[470px] lg:mt-0'
          >
            <p className='text-[15px] leading-[1.6] text-[#282828]/55'>
              KYC, screening, age and document checks, rebuilt so personal data
              never leaves the phone. A proof goes out. Nothing is stored.
            </p>
            <div className='mt-6 flex items-center gap-3'>
              <a
                href={config.documentationLink}
                target='_blank'
                rel='noreferrer'
                className='rounded-full bg-[#161616] px-5 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-85'
              >
                Build with Rarimo
              </a>
              <a
                href={config.telegramLink}
                target='_blank'
                rel='noreferrer'
                className='rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-[#282828] shadow-sm transition-shadow hover:shadow-md'
              >
                Talk to us
              </a>
            </div>
          </motion.div>

          {/* mobile media: full-bleed at the bottom of the card, chips are
              part of the artwork */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className='mt-10 lg:hidden'
          >
            <video
              ref={el => {
                if (el) {
                  el.muted = true
                  el.defaultMuted = true
                }
              }}
              className='mx-auto w-full max-w-[480px] object-contain'
              src='/videos/hero-tap.mp4'
              poster='/images/v2/hero-tap-poster.jpg'
              autoPlay
              muted
              loop
              playsInline
              preload='auto'
            />
          </motion.div>
        </div>

        {/* desktop media: chips are part of the artwork */}
        <div className='pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block'>
          <motion.div
            ref={mediaRef}
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className='absolute inset-0 will-change-transform [transition:transform_0.25s_ease-out]'
          >
            <video
              ref={el => {
                if (el) {
                  el.muted = true
                  el.defaultMuted = true
                }
              }}
              className='absolute right-0 top-1/2 w-full -translate-y-1/2 object-contain'
              src='/videos/hero-tap.mp4'
              poster='/images/v2/hero-tap-poster.jpg'
              autoPlay
              muted
              loop
              playsInline
              preload='auto'
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

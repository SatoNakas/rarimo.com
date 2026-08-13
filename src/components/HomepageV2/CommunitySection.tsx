'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper/types'

import { backersList, communitiesList } from '@/assets/data'
import { cn } from '@/theme/utils'

import Reveal from './Reveal'

type Tab = 'community' | 'backers'

export default function CommunitySection() {
  const [tab, setTab] = useState<Tab>('community')
  const swiperRef = useRef<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const syncEdges = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  return (
    <section className='mx-auto w-full max-w-[1440px] px-5 md:px-8'>
      <div className='relative overflow-hidden rounded-3xl bg-[#F0F0EF] py-16 md:py-[100px]'>
        {/* green aurora glow at the bottom */}
        <div
          className='pointer-events-none absolute inset-x-0 bottom-0 h-[70%]'
          style={{
            background:
              'radial-gradient(70% 90% at 50% 115%, rgba(130,237,150,0.65) 0%, rgba(130,237,150,0.25) 45%, rgba(130,237,150,0) 75%)',
          }}
        />

        <Reveal className='relative z-10'>
          <h2 className='mx-auto max-w-[560px] text-center text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#282828] md:text-[40px]'>
            Backed by the best
          </h2>

          <div className='mt-8 flex items-center justify-center gap-2'>
            {(
              [
                ['community', 'Vision round'],
                ['backers', 'Investors'],
              ] as [Tab, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type='button'
                onClick={() => {
                  setTab(key)
                  swiperRef.current?.slideTo(0)
                }}
                className={cn(
                  'border-b-2 px-4 py-2 text-[15px] font-medium transition-colors',
                  tab === key
                    ? 'border-[#282828] text-[#282828]'
                    : 'border-transparent text-[#282828]/40 hover:text-[#282828]/70',
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className='mt-12 pl-4 md:pl-[64px]'>
            <Swiper
              onSwiper={swiper => {
                swiperRef.current = swiper
                syncEdges(swiper)
              }}
              onProgress={syncEdges}
              onSlideChange={syncEdges}
              modules={[Mousewheel]}
              mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
              slidesPerView='auto'
              spaceBetween={16}
              breakpoints={{ 768: { spaceBetween: 24 } }}
              grabCursor
            >
              {tab === 'community'
                ? communitiesList.map(person => (
                    <SwiperSlide
                      key={person.name}
                      className='!w-[270px] md:!w-[318px]'
                    >
                      <div className='flex h-[280px] flex-col gap-5 overflow-hidden rounded-2xl bg-gradient-to-b from-white to-white/40 p-6 md:h-[260px]'>
                        <div className='flex items-center gap-3'>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={person.imageUrl}
                            alt={person.name}
                            className='size-11 rounded-full object-cover'
                          />
                          <div className='flex flex-col'>
                            <span className='text-[15px] font-semibold text-[#282828]'>
                              {person.name}
                            </span>
                            <span className='text-[13px] text-[#282828]/50'>
                              {person.position}
                            </span>
                          </div>
                        </div>
                        <p className='line-clamp-[9] text-[13.5px] leading-[1.5] text-[#282828]/70 md:line-clamp-none'>
                          {person.description}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))
                : backersList.map(backer => (
                    <SwiperSlide
                      key={backer.title}
                      className='!w-[280px] md:!w-[336px]'
                    >
                      <div className='flex h-[260px] flex-col justify-between rounded-2xl bg-gradient-to-b from-white to-white/40 p-6'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={backer.image}
                          alt={backer.title}
                          width={backer.width}
                          height={backer.height}
                          className='w-auto max-w-[170px] object-contain opacity-70 grayscale'
                          style={{ height: Math.min(backer.height, 36) }}
                        />
                        <span className='text-[15px] font-medium text-[#282828]'>
                          {backer.title}
                        </span>
                      </div>
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>

          <div className='mt-12 flex items-center justify-center gap-3'>
            <button
              type='button'
              aria-label='Previous'
              disabled={isBeginning}
              onClick={() => swiperRef.current?.slidePrev()}
              className={cn(
                'flex size-11 items-center justify-center rounded-full transition-all duration-300',
                isBeginning
                  ? 'cursor-default text-[#282828]/35'
                  : 'bg-white text-[#282828] shadow-md hover:shadow-lg',
              )}
            >
              <ChevronLeft className='size-5' />
            </button>
            <button
              type='button'
              aria-label='Next'
              disabled={isEnd}
              onClick={() => swiperRef.current?.slideNext()}
              className={cn(
                'flex size-11 items-center justify-center rounded-full transition-all duration-300',
                isEnd
                  ? 'cursor-default text-[#282828]/35'
                  : 'bg-white text-[#282828] shadow-md hover:shadow-lg',
              )}
            >
              <ChevronRight className='size-5' />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

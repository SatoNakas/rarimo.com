'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper/types'

import { newsList } from '@/assets/data'
import { cn } from '@/theme/utils'

import Reveal from './Reveal'

export default function NewsSection() {
  const swiperRef = useRef<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const syncEdges = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  return (
    <section className='mx-auto w-full max-w-[1440px] px-5 md:px-8'>
      <Reveal>
        <h2 className='text-center text-[32px] font-bold tracking-[-0.01em] text-[#282828] md:text-[40px]'>
          News and blogs
        </h2>
      </Reveal>

      <Reveal delay={0.1} className='mx-auto mt-12 max-w-[1084px]'>
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
          grabCursor
        >
          {newsList.map(news => (
            <SwiperSlide key={news.link} className='!w-[258px]'>
              <a
                href={news.link}
                target='_blank'
                rel='noreferrer'
                className='group flex flex-col gap-3'
              >
                <div className='aspect-[258/160] overflow-hidden rounded-xl bg-[#F4F4F4]'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={news.image}
                    alt=''
                    className='size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]'
                  />
                </div>
                <p className='line-clamp-3 text-[14px] font-medium leading-[1.4] text-[#282828]'>
                  {news.title}
                </p>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className='mt-10 flex items-center justify-center gap-3'>
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
    </section>
  )
}

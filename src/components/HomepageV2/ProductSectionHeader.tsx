import { ReactNode } from 'react'

import { cn } from '@/theme/utils'

export type UseCaseChip = {
  label: string
  icon: string
  href?: string
}

export default function ProductSectionHeader({
  breadcrumb,
  title,
  description,
  useCases,
  className,
}: {
  breadcrumb: ReactNode
  title: string
  description: string
  useCases?: UseCaseChip[]
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between',
        className,
      )}
    >
      <div className='flex max-w-[560px] flex-col gap-4'>
        <span className='font-mono text-[13px] tracking-[0.02em]'>
          {breadcrumb}
        </span>
        <h2 className='text-[32px] font-bold leading-[1.15] tracking-[-0.01em] text-[#282828] md:text-[36px]'>
          {title}
        </h2>
        <p className='text-[14px] leading-[1.45] text-[#282828]/55'>
          {description}
        </p>
      </div>

      {useCases && (
        <div className='flex shrink-0 flex-col gap-3'>
          <span className='text-[13px] text-[#282828]/55'>Use cases</span>
          <div
            className={cn(
              '-mx-5 flex items-center gap-2 overflow-x-auto px-5 md:mx-0 md:px-0',
              'lg:flex-wrap lg:overflow-visible',
              '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            )}
          >
            {useCases.map(useCase =>
              useCase.href ? (
                <a
                  key={useCase.label}
                  href={useCase.href}
                  target='_blank'
                  rel='noreferrer'
                  className='flex shrink-0 items-center gap-2 rounded-full bg-[#F4F4F4] py-1.5 pl-1.5 pr-4 transition-colors hover:bg-[#ECECEC]'
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={useCase.icon}
                    alt=''
                    className='size-6 rounded-full'
                  />
                  <span className='text-[14px] font-medium text-[#282828]'>
                    {useCase.label}
                  </span>
                </a>
              ) : (
                <span
                  key={useCase.label}
                  className='flex shrink-0 items-center gap-2 rounded-full bg-[#F4F4F4] py-1.5 pl-1.5 pr-4'
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={useCase.icon}
                    alt=''
                    className='size-6 rounded-full'
                  />
                  <span className='text-[14px] font-medium text-[#282828]'>
                    {useCase.label}
                  </span>
                </span>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}

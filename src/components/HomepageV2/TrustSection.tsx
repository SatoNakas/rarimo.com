import { ExternalLink } from 'lucide-react'

import Reveal from './Reveal'

const BADGES: { label: string; href?: string }[] = [
  { label: 'GDPR by design' },
  {
    label: 'ICAO 9303 passports',
    href: 'https://docs.rarimo.com/zk-passport/biometric-passports-101/',
  },
  {
    label: 'Circuits audit',
    href: 'https://docs.rarimo.com/resources/audits/',
  },
]

const STATS = [
  { value: '100%', caption: 'Uptime over the last 12 months' },
  { value: '0', caption: 'Breaches. There is no database to crack' },
  { value: '100k+', caption: 'People verified' },
  { value: '90+', caption: 'Countries supported from day one' },
]

export default function TrustSection() {
  return (
    <section className='mx-auto w-full max-w-[1440px] px-5 md:px-8'>
      <div className='mx-auto max-w-[1084px]'>
        <Reveal>
          <div className='flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between'>
            <h2 className='text-[32px] font-bold leading-[1.15] tracking-[-0.01em] text-[#282828] md:text-[40px]'>
              Audited and
              <br />
              standards-aligned
            </h2>

            <div className='flex flex-wrap items-center gap-3 lg:justify-end'>
              {BADGES.map(badge =>
                badge.href ? (
                  <a
                    key={badge.label}
                    href={badge.href}
                    target='_blank'
                    rel='noreferrer'
                    className='flex items-center gap-2.5 rounded-full bg-[#F4F4F4] px-5 py-3 transition-colors hover:bg-[#ECECEC]'
                  >
                    <span className='text-[14px] font-medium text-[#282828]'>
                      {badge.label}
                    </span>
                    <ExternalLink className='size-4 text-[#282828]/45' />
                  </a>
                ) : (
                  <span
                    key={badge.label}
                    className='flex items-center rounded-full bg-[#F4F4F4] px-5 py-3'
                  >
                    <span className='text-[14px] font-medium text-[#282828]'>
                      {badge.label}
                    </span>
                  </span>
                ),
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <hr className='mt-10 border-black/10 md:mt-14' />

          <div className='mt-10 grid grid-cols-2 gap-10 md:mt-14 md:grid-cols-4'>
            {STATS.map(stat => (
              <div
                key={stat.caption}
                className='flex flex-col items-center gap-2 text-center'
              >
                <span className='text-[36px] font-semibold leading-none tracking-[-0.02em] text-[#282828] md:text-[40px]'>
                  {stat.value}
                </span>
                <span className='text-[14px] text-[#282828]/50'>
                  {stat.caption}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

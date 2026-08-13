import { CircleCheck } from 'lucide-react'

import { cn } from '@/theme/utils'

import Reveal from './Reveal'

const ROWS = [
  {
    label: 'Data custody',
    rarimo: 'Nothing is stored. The proof is built on the user’s phone.',
    legacy: 'Your users’ documents sit in someone else’s database.',
  },
  {
    label: 'Biometric risk',
    rarimo: 'Faces are matched on the phone. No face data ever leaves it.',
    legacy: 'Face scans are kept on file, sometimes for years.',
  },
  {
    label: 'Repeat onboarding',
    rarimo: 'Verify a person once. Every app can check the same proof.',
    legacy: 'The same person is re-verified by every company, every time.',
  },
  {
    label: 'Breach surface',
    rarimo: 'No database. Nothing to hack, nothing to leak.',
    legacy:
      'One central database with millions of identities. A magnet for attackers.',
  },
  {
    label: 'GDPR / BIPA liability',
    rarimo: 'No personal data is collected, so there is nothing to regulate.',
    legacy:
      'The liability lands on you. Consent, storage and deletion are your problem.',
  },
  {
    label: 'Auditability',
    rarimo: 'Every check produces a receipt anyone can verify.',
    legacy: 'You trust the provider’s internal logs.',
  },
  {
    label: 'For developers',
    rarimo: 'One SDK with one job: prove a fact, store nothing.',
    legacy: '15+ products to stitch together before you ship.',
  },
]

export default function ComparisonSection() {
  return (
    <section
      id='compare'
      className='mx-auto w-full max-w-[1440px] scroll-mt-20 px-5 md:px-8'
    >
      <Reveal>
        <h2 className='mx-auto max-w-[560px] text-center text-[32px] font-bold leading-[1.2] tracking-[-0.01em] text-[#282828] md:text-[40px]'>
          Rarimo proof layer vs Legacy providers
        </h2>
      </Reveal>

      {/* one table everywhere; swipes horizontally on small screens */}
      <Reveal
        delay={0.1}
        className={cn(
          '-mx-5 mt-10 overflow-x-auto px-5 md:mx-0 md:mt-16 md:px-0',
          '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        )}
      >
        <div className='relative mx-auto grid min-w-[840px] max-w-[1084px] grid-cols-[220px_1fr_1fr] pb-[90px]'>
          {/* green column backdrop */}
          <div
            className='pointer-events-none absolute inset-y-0 rounded-2xl'
            style={{
              left: '220px',
              width: 'calc((100% - 220px) / 2)',
              background: 'linear-gradient(180deg, #F6FCF8 0%, #E9F7EF 100%)',
            }}
          />

          <div />
          <p className='relative z-10 px-8 pb-8 pt-10 text-[22px] font-bold text-[#282828]'>
            Rarimo proof layer
          </p>
          <p className='px-8 pb-8 pt-10 text-[22px] font-bold text-[#282828]'>
            Legacy providers
          </p>

          {ROWS.map(row => (
            <div key={row.label} className='group contents'>
              <div className='border-t border-black/10 py-6 pr-6 text-[14px] text-[#282828]/50 transition-colors duration-200 group-hover:text-[#282828]/80'>
                {row.label}
              </div>
              <div className='relative z-10 flex items-start gap-3 border-t border-black/5 px-8 py-6 transition-colors duration-200 group-hover:bg-[#DFF2E7]/60'>
                <CircleCheck className='mt-0.5 size-[18px] shrink-0 text-[#1E9E4D] transition-transform duration-200 group-hover:scale-110' />
                <p className='text-[15px] leading-[1.45] text-[#1B1B1B]'>
                  {row.rarimo}
                </p>
              </div>
              <div className='border-t border-black/10 px-8 py-6'>
                <p className='text-[15px] leading-[1.45] text-[#282828]/60 transition-colors duration-200 group-hover:text-[#282828]/85'>
                  {row.legacy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

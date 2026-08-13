import {
  Briefcase,
  Glasses,
  Handshake,
  Heart,
  LucideIcon,
  Star,
  Trophy,
  Wallet,
} from 'lucide-react'

import { config } from '@/config'
import { cn } from '@/theme/utils'

import ProductSectionHeader from './ProductSectionHeader'
import Reveal from './Reveal'

const REGISTRY_TILES: { label: string; icon: LucideIcon }[] = [
  { label: 'Likes', icon: Heart },
  { label: 'Identity', icon: Glasses },
  { label: 'Achievements', icon: Trophy },
  { label: 'Assets', icon: Wallet },
  { label: 'Connections', icon: Handshake },
  { label: 'Reputation', icon: Star },
]

const LEFT_FLOWS = [
  { card: 'Freelance Jobs', label: 'Proof of Qualification' },
  { card: 'Social Networks', label: 'Proof of Connection' },
  { card: 'Games', label: 'Proof of Ownership' },
]

const RIGHT_FLOWS = [
  { card: 'Airdrops', label: 'Proof of Uniqueness' },
  { card: 'Dao', label: 'Proof of Membership' },
  { card: 'Elections', label: 'Proof of Citizenship' },
]

function SideCard({ label }: { label: string }) {
  return (
    <div
      className={cn(
        'group flex h-[110px] w-[129px] flex-col items-center justify-center gap-2.5 rounded-xl border border-dashed border-white/15 bg-white/[0.03] px-3',
        'transition-all duration-200 hover:-translate-y-1 hover:border-white/40 hover:bg-white/[0.07]',
      )}
    >
      <Briefcase
        className='size-5 text-white/60 transition-colors duration-200 group-hover:text-white'
        strokeWidth={1.6}
      />
      <span className='text-center text-[13px] leading-tight text-white/80 transition-colors duration-200 group-hover:text-white'>
        {label}
      </span>
    </div>
  )
}

function FlowArrow({
  label,
  direction,
}: {
  label: string
  direction: 'left' | 'right'
}) {
  const arrowHead = (
    <span
      className={cn(
        'border-y-[3.5px] border-y-transparent',
        direction === 'left'
          ? 'border-r-[5px] border-r-white/30'
          : 'border-l-[5px] border-l-white/30',
      )}
    />
  )

  return (
    <div className='group flex w-full cursor-default items-center gap-2 px-3'>
      {direction === 'left' && arrowHead}
      <span className='h-px flex-1 bg-white/15 transition-colors duration-200 group-hover:bg-white/35' />
      <span className='whitespace-nowrap text-[11px] text-white/40 transition-colors duration-200 group-hover:text-white/80'>
        {label}
      </span>
      <span className='h-px flex-1 bg-white/15 transition-colors duration-200 group-hover:bg-white/35' />
      {direction === 'right' && arrowHead}
    </div>
  )
}

export default function RegistriesSection() {
  return (
    <section
      id='zk-registries'
      className='mx-auto w-full max-w-[1440px] scroll-mt-20 px-5 md:px-8'
    >
      <div className='mx-auto max-w-[1084px]'>
        <Reveal>
          <ProductSectionHeader
            breadcrumb={
              <span className='text-[#282828]/50'>
                onchain&ensp;&middot;&ensp;
                <a
                  href={config.ercLink}
                  target='_blank'
                  rel='noreferrer'
                  className='underline decoration-[#282828]/40 underline-offset-4 transition-colors hover:text-[#282828] hover:decoration-[#282828]'
                >
                  ERC-7812
                </a>
              </span>
            }
            title='Build registries that store no personal data'
            description='ZK Registries are shared onchain databases built on ERC-7812. Many parties write to and verify the same registry, while none of them stores any personal data. You get provable correctness and guaranteed uniqueness, with nothing that falls under GDPR.'
          />
        </Reveal>
      </div>

      <Reveal
        delay={0.1}
        className='mt-10 overflow-hidden rounded-3xl px-6 py-16 md:px-10 md:py-24 lg:mt-16'
        style={{
          background:
            'radial-gradient(80% 90% at 50% 0%, #1B1B1B 0%, #0A0A0A 55%, #050505 100%)',
        }}
      >
        {/* desktop diagram */}
        <div className='mx-auto hidden max-w-[1084px] grid-cols-[129px_1fr_396px_1fr_129px] items-center gap-y-5 lg:grid'>
          <div className='col-start-1 row-start-1 flex flex-col gap-5'>
            {LEFT_FLOWS.map(flow => (
              <SideCard key={flow.card} label={flow.card} />
            ))}
          </div>

          <div className='col-start-2 row-start-1 flex flex-col gap-[86px]'>
            {LEFT_FLOWS.map(flow => (
              <FlowArrow key={flow.label} label={flow.label} direction='left' />
            ))}
          </div>

          <div className='col-start-3 row-start-1 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm'>
            <p className='py-4 text-center text-[20px] font-semibold text-white'>
              ZK-Registry
            </p>
            <div className='grid grid-cols-2 gap-2'>
              {REGISTRY_TILES.map(tile => (
                <div
                  key={tile.label}
                  className={cn(
                    'group flex h-[88px] flex-col items-center justify-center gap-2 rounded-lg bg-white/[0.06]',
                    'transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.12]',
                  )}
                >
                  <tile.icon
                    className='size-5 text-white transition-colors duration-200 group-hover:text-[#82ED96]'
                    strokeWidth={1.6}
                  />
                  <span className='text-[13px] text-white/90'>
                    {tile.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className='col-start-4 row-start-1 flex flex-col gap-[86px]'>
            {RIGHT_FLOWS.map(flow => (
              <FlowArrow
                key={flow.label}
                label={flow.label}
                direction='right'
              />
            ))}
          </div>

          <div className='col-start-5 row-start-1 flex flex-col gap-5'>
            {RIGHT_FLOWS.map(flow => (
              <SideCard key={flow.card} label={flow.card} />
            ))}
          </div>
        </div>

        {/* mobile stack */}
        <div className='flex flex-col items-center gap-8 lg:hidden'>
          <div className='w-full max-w-[396px] rounded-2xl border border-white/10 bg-white/[0.05] p-4'>
            <p className='py-3 text-center text-[18px] font-semibold text-white'>
              ZK-Registry
            </p>
            <div className='grid grid-cols-2 gap-2'>
              {REGISTRY_TILES.map(tile => (
                <div
                  key={tile.label}
                  className='flex h-[80px] flex-col items-center justify-center gap-2 rounded-lg bg-white/[0.06]'
                >
                  <tile.icon className='size-5 text-white' strokeWidth={1.6} />
                  <span className='text-[13px] text-white/90'>
                    {tile.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-wrap justify-center gap-3'>
            {[...LEFT_FLOWS, ...RIGHT_FLOWS].map(flow => (
              <span
                key={flow.card}
                className='rounded-full border border-dashed border-white/20 px-4 py-2 text-[13px] text-white/70'
              >
                {flow.card}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

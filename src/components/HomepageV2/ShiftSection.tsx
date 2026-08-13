import LogoIcon from '@/assets/icons/logo-icon.svg'

import ProductCards from './ProductCards'
import Reveal from './Reveal'

export default function ShiftSection() {
  return (
    <section
      id='products'
      className='mx-auto w-full max-w-[1440px] scroll-mt-20 px-5 md:px-8'
    >
      <div className='relative overflow-hidden rounded-3xl bg-[#F7F7F7]'>
        {/* green aurora at the bottom */}
        <div
          className='pointer-events-none absolute inset-x-0 bottom-0 h-[45%]'
          style={{
            background:
              'radial-gradient(75% 90% at 50% 115%, rgba(130,237,150,0.55) 0%, rgba(130,237,150,0.18) 45%, rgba(130,237,150,0) 75%)',
          }}
        />

        <div className='relative px-6 pb-20 pt-16 md:px-[110px] md:pb-[140px] md:pt-[140px]'>
          {/* centered title + two staggered illustration cards */}
          <Reveal>
            <h2 className='text-center text-[32px] font-bold tracking-[-0.01em] text-[#282828] md:text-[40px]'>
              The shift
            </h2>
          </Reveal>

          <div className='mx-auto mt-12 grid max-w-[948px] gap-8 md:mt-[104px] md:grid-cols-2 md:gap-10'>
            <Reveal delay={0.05}>
              <div className='rounded-[20px] border border-black/5 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.04)]'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src='/images/v2/shift-today.png'
                  alt='An ID copied into many third-party databases'
                  className='w-full rounded-xl'
                />
                <p className='px-5 pb-4 pt-7 text-[14px] leading-[1.5]'>
                  <span className='font-bold text-[#282828]'>Today</span>
                  <span className='text-[#282828]'> ID is photographed,</span>
                  <span className='text-[#282828]/45'>
                    {' '}
                    uploaded, and copied into third-party databases. They get
                    passed around. They leak.
                  </span>
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18} className='md:mt-[50px]'>
              <div className='rounded-[20px] border border-black/5 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.04)]'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src='/images/v2/shift-rarimo.png'
                  alt='A verified ID protected on the phone'
                  className='w-full rounded-xl'
                />
                <p className='px-5 pb-4 pt-7 text-[14px] leading-[1.5]'>
                  <span className='text-[#282828]'>With </span>
                  <span className='font-bold text-[#282828]'>Rarimo</span>
                  <span className='text-[#282828]'>
                    {' '}
                    The check runs on the phone.
                  </span>
                  <span className='text-[#282828]/45'>
                    {' '}
                    One proof leaves the device. It says &ldquo;they
                    qualify&rdquo; and nothing else.
                  </span>
                </p>
              </div>
            </Reveal>
          </div>

          {/* three products */}
          <div className='mx-auto mt-24 max-w-[943px] md:mt-[180px]'>
            <Reveal>
              <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
                <h2 className='text-[32px] font-bold leading-[1.15] tracking-[-0.01em] text-[#282828] md:text-[40px]'>
                  Three products.
                  <br />
                  One proof layer.
                </h2>
                <p className='max-w-[398px] text-[14px] leading-[1.55] text-[#282828]/50 md:text-right'>
                  Documents and biometrics go in. Proofs come out, recorded in a
                  registry that stores no personal data.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className='mt-14 rounded-2xl bg-white/45 p-4 backdrop-blur-[2px]'>
                {/* logo crowned divider */}
                <div className='flex items-center gap-4 px-1 py-2'>
                  <span className='h-px flex-1 bg-black/10' />
                  <span className='text-[#282828]'>
                    <LogoIcon className='h-5 w-auto' />
                  </span>
                  <span className='h-px flex-1 bg-black/10' />
                </div>

                <ProductCards />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

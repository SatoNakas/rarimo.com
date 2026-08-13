import ProductSectionHeader from './ProductSectionHeader'
import Reveal from './Reveal'
import ShowcasePanel, { ShowcaseItem } from './ShowcasePanel'

const ITEMS: ShowcaseItem[] = [
  {
    key: 'ai-proof',
    label: 'AI-proof',
    title: 'AI can fake the photo. Not the signature.',
    description:
      'Any document photo can now be generated. The chip carries the government’s cryptographic signature, and we verify it directly. Fakes fail the math.',
    media: {
      type: 'video',
      src: '/videos/ai-proof.mp4',
      poster: '/images/v2/passport-scan.png',
    },
  },
  {
    key: 'chip-face-match',
    label: 'Chip-grade face match',
    title: 'The photo comes off the chip, not out of a crop.',
    description:
      'Legacy IDV crops a face from a photo of the document and guesses. We read the original photo file from the chip, like a flash drive. Higher accuracy, fewer false rejects.',
    media: {
      type: 'video',
      src: '/videos/chip-crop.mp4',
      poster: '/images/v2/chip-crop-poster.jpg',
    },
  },
]

const USE_CASES = [
  {
    label: 'Agora',
    icon: '/images/v2/usecases/agora.png',
    href: 'https://agoracitizen.network/',
  },
  {
    label: 'Freedomtool',
    icon: '/images/v2/usecases/freedomtool.png',
    href: 'https://freedomtool.org/',
  },
  {
    label: 'Référendum Citoyen',
    icon: '/images/v2/usecases/referendum.png',
    href: 'https://referendumcitoyen.fr/',
  },
]

export default function PassportSection() {
  return (
    <section
      id='zk-passport'
      className='mx-auto w-full max-w-[1440px] scroll-mt-20 px-5 md:px-8'
    >
      <div className='mx-auto max-w-[1084px]'>
        <Reveal>
          <ProductSectionHeader
            breadcrumb={
              <span className='text-[#2FA34F]'>
                Documents&ensp;&mdash;&ensp;ZK Passport
              </span>
            }
            title='Your passport never leaves your phone.'
            description='Scan the photo page. Tap the chip. Your phone reads the passport and builds a proof. You prove you’re over 18, not your birthday, not your name, not your number. The proof is all that’s sent.'
            useCases={USE_CASES}
          />
        </Reveal>
      </div>

      <Reveal y={0} className='mt-10 lg:mt-16'>
        <ShowcasePanel
          items={ITEMS}
          accent='green'
          eyebrow='Why institutions switch'
          mediaTabs={['Passport', 'ID']}
        />
      </Reveal>
    </section>
  )
}

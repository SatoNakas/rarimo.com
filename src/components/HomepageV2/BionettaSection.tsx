import { CircleCheck } from 'lucide-react'

import ProductSectionHeader from './ProductSectionHeader'
import Reveal from './Reveal'
import ShowcasePanel, { ShowcaseItem } from './ShowcasePanel'

const LIVENESS_CHIPS = [
  '99.97% accuracy',
  'Guaranteed uniqueness',
  'Any device with a camera',
  'No personal data stored',
]

function LivenessChips() {
  return (
    <div className='absolute inset-x-4 bottom-4 flex flex-wrap gap-1.5 lg:inset-x-10 lg:bottom-6 lg:justify-center lg:gap-2'>
      {LIVENESS_CHIPS.map(chip => (
        <span
          key={chip}
          className='flex items-center gap-1.5 rounded-full bg-[#161616]/85 py-1 pl-1.5 pr-2.5 backdrop-blur-md lg:gap-2 lg:py-2 lg:pl-2.5 lg:pr-4'
        >
          <CircleCheck className='size-3 fill-white stroke-[#161616] lg:size-4' />
          <span className='text-[10px] font-medium text-white lg:text-[13px]'>
            {chip}
          </span>
        </span>
      ))}
    </div>
  )
}

const ITEMS: ShowcaseItem[] = [
  {
    key: 'liveness',
    label: 'Liveness',
    title: 'Liveness',
    description:
      'Confirms a real, live person in front of the camera, not a photo, mask, or deepfake.',
    media: {
      type: 'video',
      src: '/videos/liveness.mp4',
      poster: '/images/v2/bionetta-liveness.jpg',
    },
    mediaOverlay: <LivenessChips />,
  },
  {
    key: 'face-match',
    label: 'Face Match',
    title: 'Face Match',
    description:
      'Matches the selfie to the passport photo, entirely on device.',
    media: { type: 'video', src: '/videos/face-match-v2.mp4' },
  },
  {
    key: 'one-person',
    label: 'One person, one account',
    title: 'One person, one account',
    description:
      'Stop duplicate and fake signups. Prove each person is real and unique, without ever building a database of faces.',
    media: { type: 'image', src: '/images/v2/bionetta-account.png' },
  },
]

const USE_CASES = [
  {
    label: 'Unforgettable',
    icon: '/images/v2/usecases/unforgettable.png',
    href: 'https://unforgettable.app/',
  },
  {
    label: 'United Space',
    icon: '/images/v2/usecases/united-space.png',
    href: 'https://unitedspace.ge/',
  },
]

export default function BionettaSection() {
  return (
    <section
      id='bionetta'
      className='mx-auto w-full max-w-[1440px] scroll-mt-20 px-5 md:px-8'
    >
      <div className='mx-auto max-w-[1084px]'>
        <Reveal>
          <ProductSectionHeader
            breadcrumb={
              <span className='text-[#C13BD6]'>
                biometrics&ensp;&mdash;&ensp;Bionetta
              </span>
            }
            title='The world’s first ZKML biometrics that run on the user’s phone.'
            description='Face recognition has always meant sending your face to a server and storing a template. Bionetta runs the model on the device. Your face is never shared, and for the first time, no template is kept anywhere. The risk doesn’t shrink. It stops existing.'
            useCases={USE_CASES}
          />
        </Reveal>
      </div>

      <Reveal y={0} className='mt-10 lg:mt-16'>
        <ShowcasePanel
          items={ITEMS}
          accent='purple'
          eyebrow='On-device checks'
        />
      </Reveal>
    </section>
  )
}

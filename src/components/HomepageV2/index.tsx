import BionettaSection from './BionettaSection'
import CommunitySection from './CommunitySection'
import ComparisonSection from './ComparisonSection'
import Footer from './Footer'
import Header from './Header'
import HeroSection from './HeroSection'
import NewsSection from './NewsSection'
import PassportSection from './PassportSection'
import RegistriesSection from './RegistriesSection'
import ShiftSection from './ShiftSection'
import TrustSection from './TrustSection'

export default function HomepageV2() {
  return (
    <div className='min-h-screen bg-white font-primary text-[#282828] antialiased'>
      <Header />
      <main className='flex flex-col gap-20 pb-24 pt-2 md:gap-[120px]'>
        <HeroSection />
        <TrustSection />
        <ShiftSection />
        <PassportSection />
        <BionettaSection />
        <RegistriesSection />
        <ComparisonSection />
        <CommunitySection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  )
}

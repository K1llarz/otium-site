import { Hero } from '../components/sections/hero'
import { StatsMarquee } from '../components/sections/stats-marquee'
import { About } from '../components/sections/about'
import { InvestmentBlock } from '../components/sections/investment-block'
import { ApartmentsPreview } from '../components/sections/apartments-preview'
import { Amenities } from '../components/sections/amenities'
import { Location } from '../components/sections/location'
import { Contact } from '../components/sections/contact'

export function Home() {
  return (
    <>
      <Hero />
      <StatsMarquee />
      <About />
      <InvestmentBlock />
      <ApartmentsPreview />
      <Amenities />
      <Location />
      <Contact />
    </>
  )
}

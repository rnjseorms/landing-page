import Header from '@/components/Header'
import HeroSection from '@/components/sections/HeroSection'
import PainPointSection from '@/components/sections/PainPointSection'
import FundingSection from '@/components/sections/FundingSection'
import EligibilitySection from '@/components/sections/EligibilitySection'
import ProcessSection from '@/components/sections/ProcessSection'
import TestimonialSection from '@/components/sections/TestimonialSection'
import TrustSection from '@/components/sections/TrustSection'
import FAQSection from '@/components/sections/FAQSection'
import LeadFormSection from '@/components/sections/LeadFormSection'
import FloatingCTA from '@/components/FloatingCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      {/* Sticky Header */}
      <Header />

      <main>
        {/* S1: Hero Section */}
        <HeroSection />

        {/* S2: Pain Point / Empathy Section */}
        <PainPointSection />

        {/* S3: Government Funding Introduction */}
        <div id="funding">
          <FundingSection />
        </div>

        {/* S4: Eligibility / Requirements */}
        <EligibilitySection />

        {/* S5: Application Process */}
        <div id="process">
          <ProcessSection />
        </div>

        {/* S6: Testimonials / Success Stories */}
        <div id="testimonials">
          <TestimonialSection />
        </div>

        {/* S7: Trust Signals */}
        <TrustSection />

        {/* S8: FAQ */}
        <div id="faq">
          <FAQSection />
        </div>

        {/* S9: Lead Collection Form */}
        <LeadFormSection />

        {/* Footer */}
        <Footer />

        {/* Floating CTA */}
        <FloatingCTA />
      </main>
    </>
  )
}

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TaglineSection from '@/components/TaglineSection'
import ProcessSection from '@/components/ProcessSection'
import ServicesSection from '@/components/ServicesSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-midnight-gradient">
      <Navbar />
      <Hero />
      <TaglineSection />
      <ProcessSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

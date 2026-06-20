import { Navbar } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Experience } from '@/components/sections/experience'
import { Skills } from '@/components/sections/skills'
import { Portfolio } from '@/components/sections/portfolio'
import { Footer } from '@/components/sections/footer'

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Portfolio />
      <Footer />
    </main>
  )
}


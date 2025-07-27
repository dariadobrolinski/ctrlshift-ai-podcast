import Link from "next/link"
import { Headphones } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-4xl items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Headphones className="h-5 w-5" />
          <span className="font-bold">CTRL+Shift</span>
        </Link>
        <MainNav />
        <MobileNav />
      </div>
    </header>
  )
}

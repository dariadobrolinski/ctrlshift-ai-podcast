import Link from "next/link"
import { Headphones } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 max-w-4xl">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center gap-2">
            <Headphones className="h-5 w-5" />
            <span className="font-bold">CTRL+Shift</span>
          </Link>

        </div>
        <div className="flex gap-4">
          <Link href="https://open.spotify.com/show/6ipYFRVu8x9LTR9HbRyH4y?si=a342a80deff5464e" className="text-sm text-muted-foreground hover:text-foreground">
            Spotify
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Apple Podcasts
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Google Podcasts
          </Link>
        </div>
      </div>
    </footer>
  )
}

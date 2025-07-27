import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChevronRight, Headphones } from "lucide-react"
import { getLatestEpisode } from "@/lib/episodes"

export default async function Home() {
  const episode = await getLatestEpisode();

  return (
    <main className="container max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">CTRL+Shift</h1>
          <p className="text-muted-foreground">Exploring the cutting edge of technology, one episode at a time</p>
        </div>

        {episode ? (
          <Card className="bg-card border-muted">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Headphones className="h-4 w-4" />
                  <span>Latest Episode</span>
                </div>
                <h2 className="text-2xl font-bold">{episode.title}</h2>
                <p className="text-muted-foreground">
                  {episode.description}
                </p>

                {/* Spotify Embed */}
                <div className="w-full rounded-md overflow-hidden bg-black">
                  <iframe
                    src={episode.spotifyUrl.replace("episode", "embed/episode")}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowTransparency={true}
                    allow="encrypted-media"
                    className="border-0"
                  ></iframe>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-muted bg-muted/50 px-6 py-3">
              <div className="text-sm text-muted-foreground">Published: {episode.date}</div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/sources/${episode.id}`}>
                  View Sources & Timestamps
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="bg-card border-muted">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Headphones className="h-4 w-4" />
                  <span>Latest Episode</span>
                </div>
                <h2 className="text-2xl font-bold">No episodes yet</h2>
                <p className="text-muted-foreground">
                  We're working on our first episode. Check back soon!
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-1">
          <Link href="/archive" className="group">
            <Card className="h-full transition-colors hover:border-primary">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold group-hover:text-primary">Episode Archive</h3>
                <p className="text-sm text-muted-foreground mt-2">Browse all our past episodes and their resources</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  )
}

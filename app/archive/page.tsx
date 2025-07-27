import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Headphones } from "lucide-react"
import { getAllEpisodes } from "@/lib/episodes"

export default async function ArchivePage() {
  const episodes = await getAllEpisodes();

  return (
    <main className="container max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Episode Archive</h1>
          <p className="text-muted-foreground">Browse all our past episodes and their resources</p>
        </div>

        {episodes.length > 0 ? (
          <div className="grid gap-6">
            {episodes.map((episode) => (
              <Card key={episode._id || episode.id} className="bg-card border-muted">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Headphones className="h-4 w-4" />
                      <span>{episode.date}</span>
                    </div>
                    <h2 className="text-2xl font-bold">{episode.title}</h2>
                    <p className="text-muted-foreground">{episode.description}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-muted bg-muted/50 px-6 py-3">
                  <Button variant="outline" size="sm" asChild>
                    <a href={episode.spotifyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      Listen on Spotify
                      <Headphones className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/sources/${episode.id}`}>
                      View Sources & Timestamps
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Headphones className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No episodes yet</h3>
              <p className="text-muted-foreground">
                We're working on our first episodes. Check back soon!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}

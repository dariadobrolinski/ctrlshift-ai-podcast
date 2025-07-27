import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ExternalLink } from "lucide-react"
import { getEpisodeById, getLatestEpisode } from "@/lib/episodes"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function SourcesPage({ params }: PageProps) {
  const { id } = await params;
  let episode;
  
  // Handle "latest" special case
  if (id === "latest") {
    episode = await getLatestEpisode();
  } else {
    episode = await getEpisodeById(id);
  }

  // If episode doesn't exist, show 404
  if (!episode) {
    notFound();
  }

  return (
    <main className="container max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={id === "latest" ? "/" : "/archive"}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              {id === "latest" ? "Home" : "Archive"}
            </Link>
          </Button>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{episode.title}</h1>
          <p className="text-muted-foreground">{episode.description}</p>
          <p className="text-sm text-muted-foreground">Published: {episode.date}</p>
        </div>

        <div className="w-full rounded-lg overflow-hidden bg-muted p-1">
          <iframe
            src={episode.spotifyUrl.replace("episode", "embed/episode")}
            width="100%"
            height="152"
            frameBorder="0"
            allowTransparency={true}
            allow="encrypted-media"
            className="border-0 rounded-lg"
          ></iframe>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Episode Sections & References</h2>

          {episode.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{section.title}</h3>
                <p className="text-sm text-muted-foreground font-mono">{section.timestamp}</p>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-muted">
                          <th className="text-left p-4 font-medium">Reference</th>
                          <th className="text-right p-4 font-medium">Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.sources.map((source, sourceIndex) => (
                          <tr key={sourceIndex} className="border-b border-muted last:border-b-0 hover:bg-muted/50">
                            <td className="p-4">
                              <span className="font-medium">{source.title}</span>
                            </td>
                            <td className="p-4 text-right">
                              <Button variant="outline" size="sm" asChild>
                                <a href={source.url} target="_blank" rel="noopener noreferrer">
                                  Visit Source
                                  <ExternalLink className="ml-2 h-3 w-3" />
                                </a>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

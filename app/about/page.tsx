import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, MapPin, Briefcase } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="container max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Meet the Hosts</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know the voices behind CTRL+Shift - two computer science students passionate about exploring the
            cutting edge of technology.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Daria's Card */}
          <Card className="overflow-hidden">
            <div className="aspect-square relative bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20">
              <img src="/images/daria-avatar.png" alt="Daria Dobrolinski" className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Daria Dobrolinski</h2>
                <p className="text-muted-foreground">Co-host & Tech Enthusiast</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>Computer Science Undergraduate</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>UMass Boston</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>Unemployed, please hire me</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Daria is a computer science student with a curious mind and a love for asking "what if." She explores
                the intersection of tech, society, and the future, one AI-fueled rabbit hole at a time.
              </p>
            </CardContent>
          </Card>

          {/* Edward's Card */}
          <Card className="overflow-hidden">
            <div className="aspect-square relative bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20">
              <img src="/images/edward-avatar.png" alt="Edward Gaibor" className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Edward Gaibor</h2>
                <p className="text-muted-foreground">Co-host & Software Engineer</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>Computer Science Undergraduate</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>UMass Boston</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>Software Engineer at John Hancock</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Edward is a software engineer who brings logic, curiosity, and the occasional hot take to the table.
                He's all about exploring how emerging tech reshapes the world.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Our Story</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're Daria and Edward, two computer science students who kept finding ourselves deep in late-night
              conversations about tech, AI, and all the weird, wild, and world-changing "what ifs." Eventually, we
              figured... why not start recording? This podcast is our space to explore how technology is reshaping
              everything: from the everyday to the existential. Sometimes serious, sometimes ridiculous, always curious.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">UMass Boston</Badge>
            <Badge variant="outline">Computer Science</Badge>
            <Badge variant="outline">Tech Enthusiasts</Badge>
            <Badge variant="outline">Student Perspectives</Badge>
            <Badge variant="outline">Industry Insights</Badge>
          </div>
        </div>
      </div>
    </main>
  )
}

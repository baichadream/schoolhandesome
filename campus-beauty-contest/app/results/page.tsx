import type { Metadata } from "next"
import { getContestants } from "@/lib/data"
import { Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "排行榜 - 校花校草评选",
  description: "查看校花校草评选的实时排名",
}

export default function ResultsPage() {
  // In a real app, this would fetch from a database
  const contestants = getContestants()

  // Sort by votes in descending order
  const sortedContestants = [...contestants].sort((a, b) => b.votes - a.votes)

  // Separate by gender
  const maleContestants = sortedContestants.filter((c) => c.gender === "male")
  const femaleContestants = sortedContestants.filter((c) => c.gender === "female")

  return (
    <div className="container px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight">实时排行榜</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          查看当前校花校草评选的实时排名情况，排名每小时更新一次
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 校花排行榜 */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-6 text-pink-500">校花排行榜</h2>
          <div className="space-y-4">
            {femaleContestants.map((contestant, index) => (
              <Link key={contestant.id} href={`/contestants/${contestant.id}`} className="block">
                <div
                  className={cn(
                    "flex items-center p-4 rounded-lg transition-colors",
                    index < 3 ? "bg-pink-50 dark:bg-pink-950/20" : "bg-card hover:bg-muted/50",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full mr-4 font-bold",
                      index === 0
                        ? "bg-yellow-500 text-yellow-50"
                        : index === 1
                          ? "bg-gray-300 text-gray-800"
                          : index === 2
                            ? "bg-amber-700 text-amber-50"
                            : "bg-muted text-muted-foreground",
                    )}
                  >
                    {index + 1}
                  </div>

                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={contestant.photo || "/placeholder.svg"}
                      alt={contestant.name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="font-medium">{contestant.name}</div>
                    <div className="text-sm text-muted-foreground">{contestant.department}</div>
                  </div>

                  <div className="flex items-center gap-1 text-red-500">
                    <Heart className="h-4 w-4 fill-red-500" />
                    <span className="font-medium">{contestant.votes}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 校草排行榜 */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">校草排行榜</h2>
          <div className="space-y-4">
            {maleContestants.map((contestant, index) => (
              <Link key={contestant.id} href={`/contestants/${contestant.id}`} className="block">
                <div
                  className={cn(
                    "flex items-center p-4 rounded-lg transition-colors",
                    index < 3 ? "bg-blue-50 dark:bg-blue-950/20" : "bg-card hover:bg-muted/50",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full mr-4 font-bold",
                      index === 0
                        ? "bg-yellow-500 text-yellow-50"
                        : index === 1
                          ? "bg-gray-300 text-gray-800"
                          : index === 2
                            ? "bg-amber-700 text-amber-50"
                            : "bg-muted text-muted-foreground",
                    )}
                  >
                    {index + 1}
                  </div>

                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={contestant.photo || "/placeholder.svg"}
                      alt={contestant.name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="font-medium">{contestant.name}</div>
                    <div className="text-sm text-muted-foreground">{contestant.department}</div>
                  </div>

                  <div className="flex items-center gap-1 text-red-500">
                    <Heart className="h-4 w-4 fill-red-500" />
                    <span className="font-medium">{contestant.votes}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-6">排名每小时更新一次，最终结果将在评选结束后公布</p>
        <Button asChild size="lg">
          <Link href="/vote">
            <Heart className="h-5 w-5 mr-2" />
            去投票
          </Link>
        </Button>
      </div>
    </div>
  )
}


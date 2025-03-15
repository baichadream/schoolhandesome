import type { Metadata } from "next"
import ContestantGrid from "@/components/contestant-grid"
import { getContestants } from "@/lib/data"

export const metadata: Metadata = {
  title: "参赛者 - 校花校草评选",
  description: "查看所有校花校草评选参赛者",
}

export default function ContestantsPage() {
  // In a real app, this would fetch from a database
  const contestants = getContestants()

  return (
    <div className="container px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight">参赛者展示</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">浏览所有参加校花校草评选的优秀选手</p>
      </div>

      <ContestantGrid contestants={contestants} showVoting={false} />
    </div>
  )
}


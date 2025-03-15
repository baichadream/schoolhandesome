import type { Metadata } from "next"
import ContestantGrid from "@/components/contestant-grid"
import { getContestants } from "@/lib/data"

export const metadata: Metadata = {
  title: "投票 - 校花校草评选",
  description: "为你喜欢的校花校草候选人投票",
}

export default function VotePage() {
  // In a real app, this would fetch from a database
  const contestants = getContestants()

  return (
    <div className="container px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight">为你喜欢的候选人投票</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          每人每天可投5票，可以将票数分配给不同的候选人，也可以全部投给同一位候选人
        </p>
      </div>

      <ContestantGrid contestants={contestants} showVoting={true} />
    </div>
  )
}


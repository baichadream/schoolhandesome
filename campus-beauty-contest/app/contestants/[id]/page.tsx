import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, School, Trophy } from "lucide-react"
import { getContestantById } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ContestantPageProps {
  params: {
    id: string
  }
}

export default function ContestantPage({ params }: ContestantPageProps) {
  const contestant = getContestantById(params.id)

  if (!contestant) {
    notFound()
  }

  return (
    <div className="container px-4 py-12">
      <Button asChild variant="ghost" className="mb-8 gap-2">
        <Link href="/contestants">
          <ArrowLeft className="h-4 w-4" />
          返回所有参赛者
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative">
          <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
            <img
              src={contestant.photo || "/placeholder.svg"}
              alt={contestant.name}
              className="object-cover w-full h-full"
            />
          </div>
          <Badge
            className={cn(
              "absolute top-4 right-4 text-lg py-1 px-3",
              contestant.gender === "male" ? "bg-blue-500" : "bg-pink-500",
            )}
          >
            {contestant.gender === "male" ? "校草" : "校花"}
          </Badge>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{contestant.name}</h1>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <School className="h-4 w-4" />
              <span>{contestant.department}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">{contestant.votes}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                获得票数
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary">#{contestant.rank}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Trophy className="h-4 w-4 text-yellow-500" />
                当前排名
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-xl font-semibold mb-3">个人简介</h2>
            <p className="text-muted-foreground whitespace-pre-line">{contestant.introduction}</p>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-xl font-semibold mb-3">个人信息</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3">
              <div>
                <dt className="text-sm text-muted-foreground">院系</dt>
                <dd>{contestant.department}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">年级</dt>
                <dd>{contestant.grade}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">兴趣爱好</dt>
                <dd>{contestant.hobbies}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">特长</dt>
                <dd>{contestant.skills}</dd>
              </div>
            </dl>
          </div>

          <div className="flex gap-4 pt-6">
            <Button asChild size="lg" className="gap-2">
              <Link href="/vote">
                <Heart className="h-5 w-5" />
                去投票
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contestants">查看其他参赛者</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


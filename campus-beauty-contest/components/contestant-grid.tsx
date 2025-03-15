"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ChevronUp, ChevronDown, Filter } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import type { Contestant } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ContestantGridProps {
  contestants: Contestant[]
  showVoting: boolean
}

export default function ContestantGrid({ contestants: initialContestants, showVoting }: ContestantGridProps) {
  const [contestants, setContestants] = useState(initialContestants)
  const [remainingVotes, setRemainingVotes] = useState(5)
  const [filter, setFilter] = useState<"all" | "male" | "female">("all")
  const [sortBy, setSortBy] = useState<"votes" | "name">("votes")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredContestants = contestants
    .filter((contestant) => filter === "all" || contestant.gender === filter)
    .sort((a, b) => {
      if (sortBy === "votes") {
        return sortOrder === "desc" ? b.votes - a.votes : a.votes - b.votes
      } else {
        return sortOrder === "desc" ? b.name.localeCompare(a.name, "zh-CN") : a.name.localeCompare(b.name, "zh-CN")
      }
    })

  const handleVote = async (id: string) => {
    if (remainingVotes <= 0) {
      toast({
        title: "投票失败",
        description: "您今日的投票次数已用完",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real app, this would call a server action
      // await voteForContestant(id)

      setContestants((prev) =>
        prev.map((contestant) => (contestant.id === id ? { ...contestant, votes: contestant.votes + 1 } : contestant)),
      )

      setRemainingVotes((prev) => prev - 1)

      toast({
        title: "投票成功",
        description: `您还有 ${remainingVotes - 1} 次投票机会`,
      })
    } catch (error) {
      toast({
        title: "投票失败",
        description: "请稍后再试",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                {filter === "all" ? "全部" : filter === "male" ? "男生" : "女生"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>性别筛选</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilter("all")}>全部</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("male")}>男生</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("female")}>女生</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                排序
                {sortOrder === "desc" ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>排序方式</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("votes")
                  setSortOrder("desc")
                }}
              >
                票数高到低
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("votes")
                  setSortOrder("asc")
                }}
              >
                票数低到高
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("name")
                  setSortOrder("asc")
                }}
              >
                姓名 A-Z
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("name")
                  setSortOrder("desc")
                }}
              >
                姓名 Z-A
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {showVoting && (
          <div className="text-sm text-muted-foreground">
            剩余投票次数: <span className="font-bold text-primary">{remainingVotes}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredContestants.map((contestant) => (
          <Card key={contestant.id} className="overflow-hidden transition-all hover:shadow-md">
            <div className="aspect-[3/4] relative overflow-hidden">
              <img
                src={contestant.photo || "/placeholder.svg"}
                alt={contestant.name}
                className="object-cover w-full h-full transition-transform hover:scale-105"
              />
              <Badge
                className={cn("absolute top-2 right-2", contestant.gender === "male" ? "bg-blue-500" : "bg-pink-500")}
              >
                {contestant.gender === "male" ? "校草" : "校花"}
              </Badge>
            </div>

            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{contestant.name}</h3>
                <span className="text-sm text-muted-foreground">{contestant.department}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{contestant.introduction}</p>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                <span>{contestant.votes} 票</span>
              </div>

              {showVoting ? (
                <Button size="sm" onClick={() => handleVote(contestant.id)} disabled={remainingVotes <= 0}>
                  投票
                </Button>
              ) : (
                <Button asChild size="sm" variant="outline">
                  <Link href={`/contestants/${contestant.id}`}>查看详情</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}


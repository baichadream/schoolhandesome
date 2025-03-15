import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, UserPlus, Trophy } from "lucide-react"
import HeroCarousel from "@/components/hero-carousel"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <HeroCarousel />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 flex items-center justify-center">
          <div className="container px-4 py-16 md:py-24 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary animate-fade-up">
              2025校花校草评选
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up animation-delay-100">
              展示你的魅力，赢得全校瞩目
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-up animation-delay-200">
              <Button asChild size="lg" className="gap-2">
                <Link href="/register">
                  <UserPlus className="h-5 w-5" />
                  立即报名
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link href="/vote">
                  <Heart className="h-5 w-5" />
                  去投票
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">关于校花校草评选</h2>
              <p className="mt-4 text-muted-foreground">
                校花校草评选活动旨在发掘校园里的优秀学生，展示他们的才华、气质和个人魅力。
                这不仅是一场选美比赛，更是一个展示自我、结交朋友的平台。
              </p>
              <ul className="mt-6 space-y-3">
                {["展示个人风采与才艺", "获得校园内外的广泛关注", "丰厚奖品与荣誉证书", "结交志同道合的朋友"].map(
                  (item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="校园活动照片"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">活动流程</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-muted"></div>
            <div className="space-y-12">
              {[
                { title: "报名阶段", date: "2025年3月15日 - 4月15日", description: "填写报名表并上传个人照片和简介" },
                {
                  title: "初选阶段",
                  date: "2025年4月20日 - 5月5日",
                  description: "评委会审核所有报名者，选出入围决赛的候选人",
                },
                { title: "投票阶段", date: "2025年5月10日 - 5月30日", description: "全校师生可为自己喜爱的候选人投票" },
                { title: "颁奖典礼", date: "2025年6月10日", description: "公布最终结果并举行颁奖仪式" },
              ].map((item, i) => (
                <div key={i} className={`relative flex items-center ${i % 2 === 0 ? "flex-row-reverse" : ""}`}>
                  <div className={`w-1/2 ${i % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                    <div className="bg-card p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.date}</p>
                      <p className="mt-2">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">{i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">准备好展示你的魅力了吗？</h2>
          <p className="mt-4 max-w-2xl mx-auto">
            无论你是阳光帅气还是清新甜美，只要你有自信，就有机会成为今年的校花校草！
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href="/register">
                <UserPlus className="h-5 w-5" />
                立即报名
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 bg-transparent border-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/contestants">
                <Trophy className="h-5 w-5" />
                查看参赛者
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}


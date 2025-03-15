import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="font-bold text-xl text-primary mb-4">校花校草评选</h2>
            <p className="text-muted-foreground max-w-md">
              展示你的魅力，赢得全校瞩目。校花校草评选活动是展示个人风采、结交朋友的绝佳平台。
            </p>
            <div className="flex gap-4 mt-6">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-muted-foreground hover:text-primary">
                  报名
                </Link>
              </li>
              <li>
                <Link href="/contestants" className="text-muted-foreground hover:text-primary">
                  参赛者
                </Link>
              </li>
              <li>
                <Link href="/vote" className="text-muted-foreground hover:text-primary">
                  投票
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-muted-foreground hover:text-primary">
                  排行榜
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>学生会活动部</li>
              <li>邮箱: campus-contest@example.com</li>
              <li>电话: 123-456-7890</li>
              <li>地址: 大学路123号学生活动中心</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} 校花校草评选. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  )
}


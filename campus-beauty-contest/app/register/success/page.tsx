import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function RegistrationSuccessPage() {
  return (
    <div className="container max-w-md px-4 py-16 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle className="h-20 w-20 text-green-500" />
      </div>

      <h1 className="text-3xl font-bold tracking-tight mb-4">报名成功！</h1>

      <p className="text-muted-foreground mb-8">
        您的报名信息已成功提交，我们将尽快进行审核。 审核结果将通过短信和邮件通知您，请保持通讯畅通。
      </p>

      <div className="space-y-4">
        <Button asChild className="w-full">
          <Link href="/contestants">查看所有参赛者</Link>
        </Button>

        <Button asChild variant="outline" className="w-full">
          <Link href="/">返回首页</Link>
        </Button>
      </div>
    </div>
  )
}


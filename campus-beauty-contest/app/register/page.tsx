import type { Metadata } from "next"
import RegistrationForm from "@/components/registration-form"

export const metadata: Metadata = {
  title: "报名参加校花校草评选",
  description: "填写表单报名参加校花校草评选活动，展示你的魅力",
}

export default function RegisterPage() {
  return (
    <div className="container max-w-4xl px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">报名参加校花校草评选</h1>
        <p className="text-muted-foreground mt-2">填写以下表单，成为校花校草评选的一员</p>
      </div>

      <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
        <RegistrationForm />
      </div>
    </div>
  )
}


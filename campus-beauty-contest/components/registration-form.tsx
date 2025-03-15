"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { Upload, Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, { message: "姓名至少需要2个字符" }),
  studentId: z.string().min(5, { message: "请输入有效的学号" }),
  gender: z.enum(["male", "female"], { required_error: "请选择性别" }),
  department: z.string({ required_error: "请选择院系" }),
  grade: z.string({ required_error: "请选择年级" }),
  phone: z.string().min(11, { message: "请输入有效的手机号码" }),
  email: z.string().email({ message: "请输入有效的邮箱地址" }),
  introduction: z
    .string()
    .min(10, { message: "自我介绍至少需要10个字符" })
    .max(500, { message: "自我介绍不能超过500个字符" }),
})

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      studentId: "",
      gender: undefined,
      department: "",
      grade: "",
      phone: "",
      email: "",
      introduction: "",
    },
  })

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "文件过大",
          description: "照片大小不能超过5MB",
          variant: "destructive",
        })
        return
      }

      setPhotoFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setPhotoPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!photoFile) {
      toast({
        title: "请上传照片",
        description: "需要上传一张个人照片才能完成报名",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would upload the photo and submit the form data
      // For this example, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Call the server action (in a real implementation)
      // const formData = new FormData()
      // formData.append('photo', photoFile)
      // Object.entries(values).forEach(([key, value]) => {
      //   formData.append(key, value)
      // })
      // await registerContestant(formData)

      toast({
        title: "报名成功",
        description: "您的报名信息已提交，请等待审核",
      })

      router.push("/register/success")
    } catch (error) {
      toast({
        title: "提交失败",
        description: "请稍后再试或联系管理员",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>姓名</FormLabel>
                <FormControl>
                  <Input placeholder="请输入您的姓名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>学号</FormLabel>
                <FormControl>
                  <Input placeholder="请输入您的学号" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>性别</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">男</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">女</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>院系</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择院系" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="computer">计算机学院</SelectItem>
                    <SelectItem value="literature">文学院</SelectItem>
                    <SelectItem value="science">理学院</SelectItem>
                    <SelectItem value="engineering">工学院</SelectItem>
                    <SelectItem value="economics">经济学院</SelectItem>
                    <SelectItem value="management">管理学院</SelectItem>
                    <SelectItem value="law">法学院</SelectItem>
                    <SelectItem value="art">艺术学院</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>年级</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择年级" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="freshman">大一</SelectItem>
                    <SelectItem value="sophomore">大二</SelectItem>
                    <SelectItem value="junior">大三</SelectItem>
                    <SelectItem value="senior">大四</SelectItem>
                    <SelectItem value="master">研究生</SelectItem>
                    <SelectItem value="phd">博士生</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>手机号码</FormLabel>
                <FormControl>
                  <Input placeholder="请输入您的手机号码" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱</FormLabel>
                <FormControl>
                  <Input placeholder="请输入您的邮箱地址" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="introduction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>自我介绍</FormLabel>
              <FormControl>
                <Textarea placeholder="请简要介绍自己，包括兴趣爱好、特长等" className="min-h-[120px]" {...field} />
              </FormControl>
              <FormDescription>字数限制：500字以内</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>个人照片</FormLabel>
          <div className="flex flex-col items-center space-y-4">
            {photoPreview ? (
              <div className="relative w-48 h-64 overflow-hidden rounded-md border">
                <img src={photoPreview || "/placeholder.svg"} alt="照片预览" className="object-cover w-full h-full" />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setPhotoFile(null)
                    setPhotoPreview(null)
                  }}
                >
                  删除
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-48 h-64 rounded-md border border-dashed border-muted-foreground/50 bg-muted/50">
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground text-center px-4">
                  点击上传照片
                  <br />
                  (JPG, PNG, 最大5MB)
                </p>
              </div>
            )}

            <div className="flex justify-center">
              <label className="cursor-pointer">
                <Input type="file" accept="image/jpeg,image/png" className="hidden" onChange={handlePhotoChange} />
                <Button type="button" variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  {photoPreview ? "更换照片" : "上传照片"}
                </Button>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "提交中..." : "提交报名"}
          </Button>
        </div>
      </form>
    </Form>
  )
}


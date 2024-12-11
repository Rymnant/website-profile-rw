"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { NewsArticle } from "@prisma/client"
import { onSubmitNewsArticle } from "@/components/dashboard/form/handler/handler"

export function NewsArticleForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<NewsArticle>()

  const onSubmit = async (data: NewsArticle) => {
    setIsLoading(true)
    await onSubmitNewsArticle(data, reset, setIsLoading)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
      <Input {...register("title")} placeholder="Title" required />
      <Textarea {...register("description")} placeholder="Description" required />
      <Input {...register("date")} type="date" required />
      <Input type="file" {...register("image")} placeholder="Image" required />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create News Article"}
      </Button>
    </form>
  )
}


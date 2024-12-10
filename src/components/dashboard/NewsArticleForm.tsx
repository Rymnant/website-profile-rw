"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { NewsArticle } from "@prisma/client"

export function NewsArticleForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<NewsArticle>()

  const onSubmit = async (data: NewsArticle) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("date", new Date(data.date).toISOString())
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0])
    }

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        body: formData,
      })
      if (response.ok) {
        toast({ title: "News article created successfully" })
        reset()
      } else {
        throw new Error("Failed to create news article")
      }
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
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


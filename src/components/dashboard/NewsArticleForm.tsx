"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { NewsArticle } from "@prisma/client" // Coba dlu

export function NewsArticleForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<NewsArticle>()

  const onSubmit = async (data: NewsArticle) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      <Input {...register("category")} placeholder="Category" required />
      <Input {...register("author")} placeholder="Author" required />
      <Input {...register("date")} type="date" required />
      <Input {...register("imageUrl")} placeholder="Image URL" />
      <Input {...register("link")} placeholder="Link" required />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create News Article"}
      </Button>
    </form>
  )
}


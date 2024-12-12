"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { NewsArticle } from "@prisma/client"
import { onSubmitNewsArticle } from "@/components/dashboard/Form/Handler/handler"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function NewsArticleForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<NewsArticle>()

  const onSubmit = async (data: NewsArticle) => {
    setIsLoading(true)
    await onSubmitNewsArticle(data, reset, setIsLoading)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create News Article</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} placeholder="Enter article title" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} placeholder="Enter article description" required className="min-h-[100px]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" {...register("date")} type="date" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input id="image" type="file" {...register("image")} required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create News Article"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
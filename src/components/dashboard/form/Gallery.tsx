"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Gallery } from "@prisma/client"
import { onSubmitGallery } from "@/components/dashboard/form/Handler/handler"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function GalleryForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<Gallery>()

  const onSubmit = async (data: Gallery) => {
    setIsLoading(true)
    await onSubmitGallery(data, reset, setIsLoading)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Gallery Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} placeholder="Title" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input id="image" {...register("image")} type="file" accept="image/*" required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Gallery Item"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Gallery } from "@prisma/client"
import { onSubmitGallery } from "@/components/dashboard/form/handler/handler"


export function GalleryForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<Gallery>()

  const onSubmit = async (data: Gallery) => {
    setIsLoading(true)
    await onSubmitGallery(data, reset, setIsLoading)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
      <Input {...register("title")} placeholder="Title" required />
      <Input {...register("image")} type="file" accept="image/*" required />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Gallery Item"}
      </Button>
    </form>
  )
}

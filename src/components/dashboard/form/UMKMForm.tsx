"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UMKMItem, UMKM } from "@prisma/client"
import { onSubmitUMKM, fetchUMKMItems } from "@/components/dashboard/form/handler/handler"

export function UMKMForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [umkmItems, setUmkmItems] = useState<UMKMItem[]>([])
  const { register, handleSubmit, reset, setValue, watch } = useForm<UMKM>()

  useEffect(() => {
    const loadUMKMItems = async () => {
      const items = await fetchUMKMItems()
      setUmkmItems(items)
    }
    loadUMKMItems()
  }, [])

  const onSubmit = async (data: UMKM) => {
    setIsLoading(true)
    await onSubmitUMKM(data, reset, setIsLoading)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
      <Input {...register("label")} placeholder="Label" required />
      <Input {...register("category")} placeholder="Category" required />
      <Textarea {...register("description")} placeholder="Description" required />
      <Input {...register("link")} placeholder="Link" />
      <Input type="file" {...register("image")} placeholder="Image" required />
      <Select 
        onValueChange={(value) => setValue("umkmItemId", value)} 
        value={watch("umkmItemId")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select UMKM Item" />
        </SelectTrigger>
        <SelectContent>
          {umkmItems.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input type="hidden" {...register("umkmItemId")} />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create UMKM"}
      </Button>
    </form>
  )
}


"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UMKMItem, UMKM } from "@prisma/client"
import { onSubmitUMKM, fetchUMKMItems } from "@/components/dashboard/form/Handler/handler"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

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
    <Card>
      <CardHeader>
        <CardTitle>Create UMKM</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input id="label" {...register("label")} placeholder="Label" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" {...register("category")} placeholder="Category" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} placeholder="Description" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="link">Link</Label>
            <Input id="link" {...register("link")} placeholder="Link" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input id="image" type="file" {...register("image")} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="umkmItem">UMKM Item</Label>
            <Select 
              onValueChange={(value) => setValue("umkmItemId", value)} 
              value={watch("umkmItemId")}
            >
              <SelectTrigger id="umkmItem">
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
          </div>
          <input type="hidden" {...register("umkmItemId")} />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create UMKM"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}


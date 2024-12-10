"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { UMKMItem, UMKM } from "@prisma/client"

export function UMKMForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [umkmItems, setUmkmItems] = useState<UMKMItem[]>([])
  const { register, handleSubmit, reset, setValue, watch } = useForm<UMKM>()

  useEffect(() => {
    const fetchUMKMItems = async () => {
      try {
        const response = await fetch("/api/umkmitem")
        if (response.ok) {
          const items = await response.json()
          setUmkmItems(items)
        }
      } catch (error) {
        console.error("Failed to fetch UMKM Items", error)
      }
    }
    fetchUMKMItems()
  }, [])

  const onSubmit = async (data: UMKM) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/umkm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        toast({ title: "UMKM created successfully" })
        reset()
      } else {
        throw new Error("Failed to create UMKM")
      }
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
      <Input {...register("label")} placeholder="Label" required />
      <Input {...register("category")} placeholder="Category" required />
      <Textarea {...register("description")} placeholder="Description" required />
      <Input {...register("link")} placeholder="Link" />
      <Input {...register("image")} placeholder="Image URL" />
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


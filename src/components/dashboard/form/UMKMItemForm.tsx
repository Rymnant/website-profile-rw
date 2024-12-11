"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { UMKMItem } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function UMKMItemForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<UMKMItem>()

  const onSubmit = async (data: UMKMItem) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/umkmitem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        toast({ title: "UMKM Item created successfully" })
        reset()
      } else {
        throw new Error("Failed to create UMKM Item")
      }
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create UMKM Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} placeholder="Title" required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create UMKM Item"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}


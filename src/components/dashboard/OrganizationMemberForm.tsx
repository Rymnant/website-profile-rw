"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { OrganizationMember } from "@prisma/client"

export function OrganizationMemberForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<OrganizationMember>()

  const onSubmit = async (data: OrganizationMember) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/organization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        toast({ title: "Organization member created successfully" })
        reset()
      } else {
        throw new Error("Failed to create organization member")
      }
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
      <Input {...register("name")} placeholder="Name" required />
      <Input {...register("position")} placeholder="Position" required />
      <Input {...register("imageUrl")} placeholder="Image URL" />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Organization Member"}
      </Button>
    </form>
  )
}


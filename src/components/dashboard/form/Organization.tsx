"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OrganizationMember } from "@prisma/client"
import { onSubmitOrganization } from "@/components/dashboard/Form/Handler/handler"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function OrganizationMemberForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<OrganizationMember>()

  const onSubmit = async (data: OrganizationMember) => {
    setIsLoading(true)
    await onSubmitOrganization(data, reset, setIsLoading)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Members</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} placeholder="Name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input id="position" {...register("position")} placeholder="Position" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input id="image" type="file" {...register("image")} />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Organization Member"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
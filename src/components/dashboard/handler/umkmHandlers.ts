import { toast } from "@/hooks/use-toast"
import { UMKM } from "@prisma/client"

export const onSubmitUMKM = async (data: UMKM, reset: () => void, setIsLoading: (isLoading: boolean) => void) => {
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

export const fetchUMKMItems = async () => {
  try {
    const response = await fetch("/api/umkmitem")
    if (response.ok) {
      return await response.json()
    } else {
      throw new Error("Failed to fetch UMKM Items")
    }
  } catch (error) {
    console.error("Failed to fetch UMKM Items", error)
    return []
  }
}
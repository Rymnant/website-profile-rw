"use client"

import { useState, useEffect, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { NewsArticleForm } from "@/components/dashboard/NewsArticleForm"
import { OrganizationMemberForm } from "@/components/dashboard/OrganizationMemberForm"
import { UMKMForm } from "@/components/dashboard/UMKMForm"
import { UMKMItemForm } from "@/components/dashboard/UMKMItemForm"
import { DataTable } from "@/components/dashboard/DataTable"

const AUTO_REFRESH_INTERVAL = 30000 // 30 seconds

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("news")
  const [refreshKey, setRefreshKey] = useState(0)

  const refreshData = useCallback(() => {
    setRefreshKey((prevKey) => prevKey + 1)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(refreshData, AUTO_REFRESH_INTERVAL)
    return () => clearInterval(intervalId)
  }, [refreshData])

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={refreshData}>Refresh Data</Button>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="news">News Articles</TabsTrigger>
          <TabsTrigger value="members">Organization Members</TabsTrigger>
          <TabsTrigger value="umkmItems">UMKM Items</TabsTrigger>
          <TabsTrigger value="umkm">UMKM</TabsTrigger>
        </TabsList>
        <TabsContent value="news">
          <NewsArticleForm />
          <DataTable key={`news-${refreshKey}`} model="News" />
        </TabsContent>
        <TabsContent value="members">
          <OrganizationMemberForm />
          <DataTable key={`members-${refreshKey}`} model="Organization" />
        </TabsContent>
        <TabsContent value="umkmItems">
          <UMKMItemForm />
          <DataTable key={`umkmItems-${refreshKey}`} model="UMKMItem" />
        </TabsContent>
        <TabsContent value="umkm">
          <UMKMForm />
          <DataTable key={`umkm-${refreshKey}`} model="UMKM" />
        </TabsContent>
      </Tabs>
    </div>
  )
}


"use client"

import { useState, useEffect, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { NewsArticleForm } from "@/components/dashboard/form/NewsArticleForm"
import { OrganizationMemberForm } from "@/components/dashboard/form/OrganizationMemberForm"
import { UMKMForm } from "@/components/dashboard/form/UMKMForm"
import { UMKMItemForm } from "@/components/dashboard/form/UMKMItemForm"
import { AdminForm } from "@/components/dashboard/form/AdminForm"
import { GalleryForm } from "@/components/dashboard/form/GalleryForm"
import { DataTable } from "@/components/dashboard/DataTable"

const AUTO_REFRESH_INTERVAL = 30000

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
        <div>
          <Button onClick={refreshData}>Refresh Data</Button>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="admins">Admins</TabsTrigger>
          <TabsTrigger value="news">News Articles</TabsTrigger>
          <TabsTrigger value="members">Organization Members</TabsTrigger>
          <TabsTrigger value="umkmItems">UMKM Items</TabsTrigger>
          <TabsTrigger value="umkm">UMKM</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>
        <TabsContent value="admins">
          <AdminForm />
          <DataTable key={`admins-${refreshKey}`} model="Admin" />
        </TabsContent>
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
        <TabsContent value="gallery">
          <GalleryForm />
          <DataTable key={`gallery-${refreshKey}`} model="Gallery" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
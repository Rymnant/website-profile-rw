"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewsArticleForm } from "@/components/dashboard/form/NewsArticleForm"
import { OrganizationMemberForm } from "@/components/dashboard/form/OrganizationMemberForm"
import { UMKMForm } from "@/components/dashboard/form/UMKMForm"
import { UMKMItemForm } from "@/components/dashboard/form/UMKMItemForm"
import { AdminForm } from "@/components/dashboard/form/AdminForm"
import { GalleryForm } from "@/components/dashboard/form/GalleryForm"
import { DataTable } from "@/components/dashboard/DataTable"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useMediaQuery } from 'react-responsive'

const getModelName = (tab: string) => {
  const modelMap: { [key: string]: string } = {
    admins: "Admin",
    news: "News",
    members: "Organization",
    umkmItems: "UMKMItem",
    umkm: "UMKM",
    gallery: "Gallery"
  };
  return modelMap[tab] || tab;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("admins")
  const isLargeScreen = useMediaQuery({ minWidth: 1024 })
  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 })

  return (
    <Card className="w-full">
      <CardContent className="p-4 sm:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <ScrollArea className="w-full">
            <TabsList className="inline-flex h-auto w-max min-w-full justify-start">
              <TabsTrigger value="admins" className="px-3 py-1.5 text-xs whitespace-nowrap sm:text-sm">Admins</TabsTrigger>
              <TabsTrigger value="news" className="px-3 py-1.5 text-xs whitespace-nowrap sm:text-sm">News</TabsTrigger>
              <TabsTrigger value="members" className="px-3 py-1.5 text-xs whitespace-nowrap sm:text-sm">Members</TabsTrigger>
              <TabsTrigger value="umkmItems" className="px-3 py-1.5 text-xs whitespace-nowrap sm:text-sm">UMKM Items</TabsTrigger>
              <TabsTrigger value="umkm" className="px-3 py-1.5 text-xs whitespace-nowrap sm:text-sm">UMKM</TabsTrigger>
              <TabsTrigger value="gallery" className="px-3 py-1.5 text-xs whitespace-nowrap sm:text-sm">Gallery</TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="mt-4 sm:mt-6">
            {["admins", "news", "members", "umkmItems", "umkm", "gallery"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <div className={`grid gap-4 sm:gap-6 ${isLargeScreen ? 'lg:grid-cols-2' : isMediumScreen ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                  <div className="space-y-4 sm:space-y-6">
                    {tab === "admins" && <AdminForm />}
                    {tab === "news" && <NewsArticleForm />}
                    {tab === "members" && <OrganizationMemberForm />}
                    {tab === "umkmItems" && <UMKMItemForm />}
                    {tab === "umkm" && <UMKMForm />}
                    {tab === "gallery" && <GalleryForm />}
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    <DataTable model={getModelName(tab)} />
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
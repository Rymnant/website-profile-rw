"use client"

import { useEffect, useState, useCallback } from "react"
import { fetchData } from "@/components/dashboard/form/handler/handler"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { RefreshCw, Loader2, FileX } from 'lucide-react'
import { DataTableContent } from "@/components/dashboard/dataTable/DataTableContent"
import { Skeleton } from "@/components/ui/skeleton"

/*eslint-disable*/
type DataTableProps = {
  model: string;
}

export function DataTable({ model }: DataTableProps) {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await fetchData(model)
      setData(result)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [model])

  useEffect(() => {
    loadData()
  }, [loadData, refreshKey])

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1)
  }

  const columns = data && data.length > 0 && data[0] ? Object.keys(data[0]).filter(col => !['id', 'password', 'createdAt', 'updatedAt'].includes(col)) : []

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {model} Data
        </CardTitle>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          {isLoading ? 'Loading...' : 'Refresh'}
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="w-full h-12" />
              ))}
            </div>
          ) : data && data.length > 0 ? (
            <DataTableContent 
              data={data}
              columns={columns}
              isLoading={isLoading}
              model={model}
              onDataChange={(newData) => setData(newData)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <FileX className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No {model} Data Available</h3>
              <p className="text-sm text-muted-foreground mb-4">
                There are currently no records in the {model} table.
              </p>
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                {isLoading ? 'Loading...' : 'Refresh Data'}
              </Button>
            </div>
          )}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
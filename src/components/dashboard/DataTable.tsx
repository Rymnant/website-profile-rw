"use client"

/*eslint-disable*/
import { useEffect, useState, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchData, deleteData } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Trash2, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

type DataTableProps = {
  model: string;
}

type DataItem = Record<string, any>;

const AUTO_REFRESH_INTERVAL = 30000;

export function DataTable({ model }: DataTableProps) {
  const [data, setData] = useState<DataItem[]>([])
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefreshKey(prevKey => prevKey + 1)
    }, AUTO_REFRESH_INTERVAL)

    return () => clearInterval(intervalId)
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await deleteData(model, id)
      setData(prevData => prevData.filter(item => item.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1)
  }

  const columns = data.length > 0 ? Object.keys(data[0]).filter(col => col !== 'id' && col !== 'password') : []

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {model} Data
        </CardTitle>
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column} className="capitalize">{column.replace(/([A-Z])/g, ' $1').trim()}</TableHead>
                  ))}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} className="text-center">
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((row, index) => (
                    <TableRow key={index}>
                      {columns.map((column) => (
                        <TableCell key={column} className="truncate max-w-[150px]">{row[column]}</TableCell>
                      ))}
                      <TableCell>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(row.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
"use client"

/* eslint-disable */
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchData, deleteData } from "@/lib/utils"

type DataTableProps = {
  model: string;
}

type DataItem = Record<string, any>;

export function DataTable({ model }: DataTableProps) {
  const [data, setData] = useState<DataItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const result = await fetchData(model)
        setData(result)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [model])

  const handleDelete = async (id: string) => {
    try {
      await deleteData(model, id)
      setData(data.filter(item => item.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (data.length === 0) {
    return <div>No data available</div>
  }

  const columns = Object.keys(data[0])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={column}>{row[column]}</TableCell>
            ))}
            <TableCell>
              <button onClick={() => handleDelete(row.id)}>Delete</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


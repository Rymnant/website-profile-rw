"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type DataTableProps = {
  model: string;
}

/* eslint-disable */
type DataItem = Record<string, any>;

export function DataTable({ model }: DataTableProps) {
  const [data, setData] = useState<DataItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/${model.toLowerCase()}`)
        if (response.ok) {
          const result = await response.json()
          setData(result)
        } else {
          throw new Error(`Failed to fetch ${model} data`)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [model])

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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


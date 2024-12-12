"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from 'lucide-react'
import { DataTableActions } from "./DataTableActions"

/*eslint-disable*/
type DataTableContentProps = {
  data: any[];
  columns: string[];
  isLoading: boolean;
  model: string;
  onDataChange: (newData: any[]) => void;
}

export function DataTableContent({ data, columns, isLoading, model, onDataChange }: DataTableContentProps) {
  const renderCellContent = (row: any, column: string) => {
    const value = row[column];
    if (typeof value === 'object' && value !== null) {
      if (value instanceof Date) {
        return value.toLocaleString();
      }
      return JSON.stringify(value);
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return value?.toString() || '';
  };

  return (
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
                <Loader2 className="h-6 w-6 animate-spin mx-auto" />
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
              <TableRow key={row.id || index}>
                {columns.map((column) => (
                  <TableCell key={column} className="truncate max-w-[150px]">
                    {renderCellContent(row, column)}
                  </TableCell>
                ))}
                <TableCell>
                  <DataTableActions 
                    row={row}
                    model={model}
                    columns={columns}
                    onDataChange={onDataChange}
                    prevData={data}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
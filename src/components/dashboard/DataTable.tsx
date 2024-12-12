"use client"

import { useEffect, useState, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchData, deleteData, editData } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Trash2, RefreshCw, Edit3, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type DataTableProps = {
  model: string;
}

/*eslint-disable*/
type DataItem = Record<string, any>;

export function DataTable({ model }: DataTableProps) {
  const [data, setData] = useState<DataItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [editingItem, setEditingItem] = useState<DataItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    try {
      await deleteData(model, id)
      setData(prevData => prevData.filter(item => item.id !== id))
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEdit = async (id: string, formData: FormData) => {
    setIsEditing(true);
    try {
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.set('image', fileInput.files[0]);
      } else {
        formData.delete('image');
      }

      const result = await editData(model, id, formData);
      setData(prevData => prevData.map(item => item.id === id ? result.item : item));
      setEditingItem(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1)
  }

  const columns = data.length > 0 && data[0] ? Object.keys(data[0]).filter(col => !['id', 'password', 'createdAt', 'updatedAt'].includes(col)) : []

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
                    <TableRow key={index}>
                      {columns.map((column) => (
                        <TableCell key={column} className="truncate max-w-[150px]">{row[column]}</TableCell>
                      ))}
                      <TableCell>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => {
                              setEditingItem(row)
                              setIsDialogOpen(true)
                            }}>
                              <Edit3 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit {model}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={async (e) => {
                              e.preventDefault();
                              const formData = new FormData(e.currentTarget);
                              await handleEdit(editingItem!.id, formData);
                            }}>
                              {columns.map((column) => (
                                <div key={column} className="grid gap-4 py-4">
                                  <Label htmlFor={column}>{column}</Label>
                                  {column === 'image' ? (
                                    <Input
                                      id={column}
                                      name={column}
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          console.log('File selected:', file.name);
                                        }
                                      }}
                                    />
                                  ) : (
                                    <Input
                                      id={column}
                                      name={column}
                                      defaultValue={editingItem?.[column] || ''}
                                    />
                                  )}
                                </div>
                              ))}
                              <Button type="submit" disabled={isEditing}>
                                {isEditing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                {isEditing ? 'Saving...' : 'Save changes'}
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the {model} data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(row.id)} disabled={isDeleting}>
                                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                {isDeleting ? 'Deleting...' : 'Delete'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
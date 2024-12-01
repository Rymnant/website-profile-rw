"use client"

import Link from "next/link"
import { UMKM_ITEMS } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Store, TrendingUp, Users } from 'lucide-react'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion } from "framer-motion"
import { fadeInUp, staggerChildren } from "@/lib/utils"

export default function Umkm() {
  const totalUMKM = UMKM_ITEMS.reduce((acc, item) => acc + (item.items?.length ?? 0), 0)
  const averagePerRT = Math.round(totalUMKM / UMKM_ITEMS.length)
  const maxUMKM = Math.max(...UMKM_ITEMS.map(item => item.items?.length ?? 0))

  const chartData = UMKM_ITEMS.map(item => ({
    name: item.title,
    total: item.items?.length ?? 0,
  }))

  const sectorData = UMKM_ITEMS.flatMap(rt => rt.items)
    .reduce((acc, item) => {
      if (item && item.category) {
        acc[item.category] = (acc[item.category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

  const pieChartData = Object.entries(sectorData).map(([name, value]) => ({ name, value }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <motion.main
      initial="initial"
      animate="animate"
      className="container mx-auto px-4 py-8 max-w-10xl"
      variants={staggerChildren} // Tambahkan ini
    >
      <motion.div className="mb-12 mt-12 text-left" {...fadeInUp}>
        <motion.div className="mb-8" {...fadeInUp}>
          <h1 className="text-4xl font-bold mb-2">Daftar UMKM</h1>
          <p className="text-muted-foreground">
            Daftar UMKM yang ada di RW6 Rejowinangun
          </p>
        </motion.div>

        {/* Statistics Overview */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" variants={staggerChildren}>
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total UMKM</CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUMKM}</div>
                <p className="text-xs text-muted-foreground">
                  Usaha Mikro Kecil Menengah
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rata-rata per RT</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averagePerRT}</div>
                <p className="text-xs text-muted-foreground">
                  UMKM per rukun tetangga
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">RT Terbanyak</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{maxUMKM}</div>
                <p className="text-xs text-muted-foreground">
                  Jumlah UMKM tertinggi
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total RT</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{UMKM_ITEMS.length}</div>
                <p className="text-xs text-muted-foreground">
                  Rukun tetangga aktif
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* UMKM Charts */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" variants={staggerChildren}>
          {/* Bar Chart */}
          <motion.div className="col-span-1" variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle>Distribusi UMKM per RT</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] sm:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pie Chart */}
          <motion.div className="col-span-1" variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle>Jenis UMKM</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] sm:h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius="80%"
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      {/* <Legend layout="vertical" align="right" verticalAlign="middle" /> */}
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* UMKM Cards Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" variants={staggerChildren}>
          {UMKM_ITEMS.map((umkm) => (
            <Link key={umkm.id} href={`/umkm/${umkm.id}`}>
              <motion.div variants={fadeInUp}>
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                      <span>{umkm.title}</span>
                      <Store className="h-5 w-5 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl sm:text-2xl font-bold mb-2">
                      {umkm.items?.length ?? 0}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{
                            width: `${((umkm.items?.length ?? 0) / maxUMKM) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                      Data UMKM ditemukan
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </motion.main>
  )
}
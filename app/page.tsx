"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import { DashboardCards } from "@/components/dashboard-cards"
import { AlertTriangle, TrendingUp, Users, Package } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Último actualizado: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Alertas importantes */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertTitle className="text-orange-800">Productos con stock bajo</AlertTitle>
        <AlertDescription className="text-orange-700">
          Hay 12 productos que necesitan reposición urgente.
        </AlertDescription>
      </Alert>

      {/* Cards principales */}
      <DashboardCards />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Ventas del Mes</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Ventas Recientes</CardTitle>
            <CardDescription>Últimas transacciones realizadas hoy</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>

      {/* Métricas adicionales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos Más Vendidos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Coca Cola 600ml</span>
                <span className="text-sm font-medium">45 unidades</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Pan Integral</span>
                <span className="text-sm font-medium">38 unidades</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Leche Entera 1L</span>
                <span className="text-sm font-medium">32 unidades</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">María González (Cajera)</span>
                <span className="text-xs text-green-600">En línea</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Carlos Ruiz (Supervisor)</span>
                <span className="text-xs text-green-600">En línea</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Ana López (Reponedora)</span>
                <span className="text-xs text-gray-500">Desconectada</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Crítico</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Arroz 1kg</span>
                <span className="text-sm font-medium text-red-600">2 unidades</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Aceite Girasol</span>
                <span className="text-sm font-medium text-red-600">1 unidad</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Detergente 500ml</span>
                <span className="text-sm font-medium text-orange-600">5 unidades</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turno Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">Mañana</div>
              <p className="text-xs text-muted-foreground">08:00 - 16:00</p>
              <div className="text-sm">
                <span className="font-medium">Cajera:</span> María González
              </div>
              <div className="text-sm">
                <span className="font-medium">Supervisor:</span> Carlos Ruiz
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Search, Plus, Edit, Trash2, AlertTriangle, TrendingDown, TrendingUp, BarChart3 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const productos = [
  {
    id: "1",
    codigo: "7501234567890",
    nombre: "Coca Cola 600ml",
    categoria: "Bebidas",
    marca: "Coca Cola",
    precio: 2.5,
    stock: 45,
    stockMinimo: 10,
    proveedor: "Distribuidora ABC",
    ubicacion: "Góndola A1",
    vencimiento: "2024-12-31",
  },
  {
    id: "2",
    codigo: "7501234567891",
    nombre: "Pan Integral",
    categoria: "Panadería",
    marca: "Bimbo",
    precio: 1.8,
    stock: 8,
    stockMinimo: 15,
    proveedor: "Panadería Central",
    ubicacion: "Góndola B2",
    vencimiento: "2024-06-15",
  },
  {
    id: "3",
    codigo: "7501234567892",
    nombre: "Leche Entera 1L",
    categoria: "Lácteos",
    marca: "Alpura",
    precio: 3.2,
    stock: 32,
    stockMinimo: 20,
    proveedor: "Lácteos del Norte",
    ubicacion: "Refrigerador 1",
    vencimiento: "2024-06-20",
  },
  {
    id: "4",
    codigo: "7501234567893",
    nombre: "Arroz 1kg",
    categoria: "Granos",
    marca: "Verde Valle",
    precio: 4.5,
    stock: 2,
    stockMinimo: 10,
    proveedor: "Granos y Cereales SA",
    ubicacion: "Góndola C3",
    vencimiento: "2025-01-15",
  },
  {
    id: "5",
    codigo: "7501234567894",
    nombre: "Aceite Girasol 1L",
    categoria: "Aceites",
    marca: "Capullo",
    precio: 5.8,
    stock: 1,
    stockMinimo: 5,
    proveedor: "Aceites Industriales",
    ubicacion: "Góndola D1",
    vencimiento: "2024-11-30",
  },
]

export default function InventarioPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts = productos.filter((product) => {
    const matchesSearch =
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || product.codigo.includes(searchTerm)
    const matchesCategory = selectedCategory === "all" || product.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stockCritico = productos.filter((p) => p.stock <= p.stockMinimo)
  const categorias = [...new Set(productos.map((p) => p.categoria))]

  const getStockStatus = (stock: number, stockMinimo: number) => {
    if (stock <= stockMinimo) return "crítico"
    if (stock <= stockMinimo * 1.5) return "bajo"
    return "normal"
  }

  const getStockBadge = (stock: number, stockMinimo: number) => {
    const status = getStockStatus(stock, stockMinimo)
    if (status === "crítico") return <Badge variant="destructive">Crítico</Badge>
    if (status === "bajo") return <Badge variant="secondary">Bajo</Badge>
    return <Badge variant="default">Normal</Badge>
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Inventario</h2>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Producto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                <DialogDescription>
                  Complete la información del producto para agregarlo al inventario.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="codigo" className="text-right">
                    Código
                  </Label>
                  <Input id="codigo" placeholder="7501234567890" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nombre" className="text-right">
                    Nombre
                  </Label>
                  <Input id="nombre" placeholder="Nombre del producto" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="categoria" className="text-right">
                    Categoría
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="precio" className="text-right">
                    Precio
                  </Label>
                  <Input id="precio" type="number" step="0.01" placeholder="0.00" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right">
                    Stock
                  </Label>
                  <Input id="stock" type="number" placeholder="0" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Guardar Producto</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productos.length}</div>
            <p className="text-xs text-muted-foreground">En inventario</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Crítico</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stockCritico.length}</div>
            <p className="text-xs text-muted-foreground">Requieren reposición</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Inventario</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${productos.reduce((sum, p) => sum + p.precio * p.stock, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Valor total en stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorías</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categorias.length}</div>
            <p className="text-xs text-muted-foreground">Diferentes categorías</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="productos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="productos">Productos</TabsTrigger>
          <TabsTrigger value="stock-critico">Stock Crítico</TabsTrigger>
          <TabsTrigger value="movimientos">Movimientos</TabsTrigger>
        </TabsList>

        <TabsContent value="productos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Productos</CardTitle>
              <CardDescription>Gestione todos los productos de su inventario</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categorias.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-mono text-sm">{product.codigo}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.nombre}</div>
                          <div className="text-sm text-muted-foreground">{product.marca}</div>
                        </div>
                      </TableCell>
                      <TableCell>{product.categoria}</TableCell>
                      <TableCell>${product.precio.toFixed(2)}</TableCell>
                      <TableCell>{product.stock} unidades</TableCell>
                      <TableCell>{getStockBadge(product.stock, product.stockMinimo)}</TableCell>
                      <TableCell>{product.ubicacion}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stock-critico" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Productos con Stock Crítico
              </CardTitle>
              <CardDescription>Productos que necesitan reposición urgente</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Stock Actual</TableHead>
                    <TableHead>Stock Mínimo</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockCritico.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.nombre}</div>
                          <div className="text-sm text-muted-foreground">{product.marca}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-red-600 font-medium">{product.stock}</span>
                      </TableCell>
                      <TableCell>{product.stockMinimo}</TableCell>
                      <TableCell>{product.proveedor}</TableCell>
                      <TableCell>
                        <Button size="sm">Crear Orden de Compra</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movimientos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Movimientos de Inventario</CardTitle>
              <CardDescription>Historial de entradas y salidas de productos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Motivo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2024-06-01 14:30</TableCell>
                    <TableCell>Coca Cola 600ml</TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Entrada
                      </Badge>
                    </TableCell>
                    <TableCell>+50</TableCell>
                    <TableCell>Carlos Ruiz</TableCell>
                    <TableCell>Recepción de mercancía</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-06-01 12:15</TableCell>
                    <TableCell>Pan Integral</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        Salida
                      </Badge>
                    </TableCell>
                    <TableCell>-5</TableCell>
                    <TableCell>María González</TableCell>
                    <TableCell>Venta</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-06-01 10:00</TableCell>
                    <TableCell>Leche Entera 1L</TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Entrada
                      </Badge>
                    </TableCell>
                    <TableCell>+30</TableCell>
                    <TableCell>Ana López</TableCell>
                    <TableCell>Reposición</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

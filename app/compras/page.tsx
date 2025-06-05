"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShoppingCart,
  Plus,
  Edit,
  Trash2,
  Eye,
  Building,
  Package,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"

const proveedores = [
  {
    id: "1",
    nombre: "Distribuidora ABC",
    contacto: "Juan Pérez",
    telefono: "+1234567890",
    email: "juan@distribuidoraabc.com",
    direccion: "Av. Principal 123",
    estado: "Activo",
    productos: 45,
    ultimaCompra: "2024-05-28",
  },
  {
    id: "2",
    nombre: "Lácteos del Norte",
    contacto: "María García",
    telefono: "+1234567891",
    email: "maria@lacteosdn.com",
    direccion: "Calle Secundaria 456",
    estado: "Activo",
    productos: 12,
    ultimaCompra: "2024-05-30",
  },
  {
    id: "3",
    nombre: "Panadería Central",
    contacto: "Carlos López",
    telefono: "+1234567892",
    email: "carlos@panaderiacentral.com",
    direccion: "Plaza Mayor 789",
    estado: "Inactivo",
    productos: 8,
    ultimaCompra: "2024-04-15",
  },
]

const ordenesCompra = [
  {
    id: "OC-001",
    proveedor: "Distribuidora ABC",
    fecha: "2024-06-01",
    estado: "Pendiente",
    total: 2500.0,
    productos: 15,
    fechaEntrega: "2024-06-05",
  },
  {
    id: "OC-002",
    proveedor: "Lácteos del Norte",
    fecha: "2024-05-30",
    estado: "Recibida",
    total: 850.0,
    productos: 8,
    fechaEntrega: "2024-06-02",
  },
  {
    id: "OC-003",
    proveedor: "Panadería Central",
    fecha: "2024-05-28",
    estado: "Cancelada",
    total: 320.0,
    productos: 5,
    fechaEntrega: "2024-06-01",
  },
]

const recepcionMercancia = [
  {
    id: "REC-001",
    ordenCompra: "OC-002",
    proveedor: "Lácteos del Norte",
    fecha: "2024-06-02",
    productos: 8,
    estado: "Completa",
    diferencias: 0,
    recibidoPor: "Ana López",
  },
  {
    id: "REC-002",
    ordenCompra: "OC-001",
    proveedor: "Distribuidora ABC",
    fecha: "2024-06-05",
    productos: 15,
    estado: "Parcial",
    diferencias: 2,
    recibidoPor: "Carlos Ruiz",
  },
]

export default function ComprasPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const getEstadoBadge = (estado: string) => {
    const variants = {
      Pendiente: (
        <Badge className="bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          Pendiente
        </Badge>
      ),
      Recibida: (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Recibida
        </Badge>
      ),
      Cancelada: (
        <Badge variant="destructive">
          <AlertCircle className="h-3 w-3 mr-1" />
          Cancelada
        </Badge>
      ),
      Completa: <Badge className="bg-green-100 text-green-800">Completa</Badge>,
      Parcial: <Badge className="bg-orange-100 text-orange-800">Parcial</Badge>,
      Activo: <Badge className="bg-green-100 text-green-800">Activo</Badge>,
      Inactivo: <Badge variant="secondary">Inactivo</Badge>,
    }
    return variants[estado as keyof typeof variants] || <Badge>{estado}</Badge>
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Compras</h2>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Orden de Compra
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Nueva Orden de Compra</DialogTitle>
                <DialogDescription>
                  Cree una nueva orden de compra para solicitar productos a proveedores.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="proveedor" className="text-right">
                    Proveedor
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccionar proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {proveedores
                        .filter((p) => p.estado === "Activo")
                        .map((proveedor) => (
                          <SelectItem key={proveedor.id} value={proveedor.id}>
                            {proveedor.nombre}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fechaEntrega" className="text-right">
                    Fecha Entrega
                  </Label>
                  <Input id="fechaEntrega" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="observaciones" className="text-right">
                    Observaciones
                  </Label>
                  <Textarea id="observaciones" placeholder="Observaciones adicionales..." className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Crear Orden</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Órdenes Pendientes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {ordenesCompra.filter((o) => o.estado === "Pendiente").length}
            </div>
            <p className="text-xs text-muted-foreground">Esperando recepción</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proveedores Activos</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{proveedores.filter((p) => p.estado === "Activo").length}</div>
            <p className="text-xs text-muted-foreground">De {proveedores.length} totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compras del Mes</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${ordenesCompra.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Total invertido</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos Ordenados</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ordenesCompra.reduce((sum, o) => sum + o.productos, 0)}</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ordenes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ordenes">Órdenes de Compra</TabsTrigger>
          <TabsTrigger value="proveedores">Proveedores</TabsTrigger>
          <TabsTrigger value="recepcion">Recepción</TabsTrigger>
          <TabsTrigger value="comparacion">Comparación Precios</TabsTrigger>
        </TabsList>

        <TabsContent value="ordenes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Órdenes de Compra</CardTitle>
              <CardDescription>Gestione todas las órdenes de compra realizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Orden</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Productos</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Entrega</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordenesCompra.map((orden) => (
                    <TableRow key={orden.id}>
                      <TableCell className="font-medium">{orden.id}</TableCell>
                      <TableCell>{orden.proveedor}</TableCell>
                      <TableCell>{orden.fecha}</TableCell>
                      <TableCell>{getEstadoBadge(orden.estado)}</TableCell>
                      <TableCell>{orden.productos} items</TableCell>
                      <TableCell>${orden.total.toFixed(2)}</TableCell>
                      <TableCell>{orden.fechaEntrega}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
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

        <TabsContent value="proveedores" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gestión de Proveedores</CardTitle>
                  <CardDescription>Administre la información de todos sus proveedores</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo Proveedor
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
                      <DialogDescription>
                        Complete la información del proveedor para agregarlo al sistema.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nombre" className="text-right">
                          Nombre
                        </Label>
                        <Input id="nombre" placeholder="Nombre de la empresa" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="contacto" className="text-right">
                          Contacto
                        </Label>
                        <Input id="contacto" placeholder="Nombre del contacto" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="telefono" className="text-right">
                          Teléfono
                        </Label>
                        <Input id="telefono" placeholder="+1234567890" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input id="email" type="email" placeholder="contacto@proveedor.com" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="direccion" className="text-right">
                          Dirección
                        </Label>
                        <Textarea id="direccion" placeholder="Dirección completa" className="col-span-3" />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button>Guardar Proveedor</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Productos</TableHead>
                    <TableHead>Última Compra</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {proveedores.map((proveedor) => (
                    <TableRow key={proveedor.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{proveedor.nombre}</div>
                          <div className="text-sm text-muted-foreground">{proveedor.direccion}</div>
                        </div>
                      </TableCell>
                      <TableCell>{proveedor.contacto}</TableCell>
                      <TableCell>{proveedor.telefono}</TableCell>
                      <TableCell>{proveedor.email}</TableCell>
                      <TableCell>{getEstadoBadge(proveedor.estado)}</TableCell>
                      <TableCell>{proveedor.productos} productos</TableCell>
                      <TableCell>{proveedor.ultimaCompra}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
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

        <TabsContent value="recepcion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recepción de Mercancía</CardTitle>
              <CardDescription>Registre la recepción de productos de las órdenes de compra</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recepción</TableHead>
                    <TableHead>Orden de Compra</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Productos</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Diferencias</TableHead>
                    <TableHead>Recibido Por</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recepcionMercancia.map((recepcion) => (
                    <TableRow key={recepcion.id}>
                      <TableCell className="font-medium">{recepcion.id}</TableCell>
                      <TableCell>{recepcion.ordenCompra}</TableCell>
                      <TableCell>{recepcion.proveedor}</TableCell>
                      <TableCell>{recepcion.fecha}</TableCell>
                      <TableCell>{recepcion.productos} items</TableCell>
                      <TableCell>{getEstadoBadge(recepcion.estado)}</TableCell>
                      <TableCell>
                        {recepcion.diferencias > 0 ? (
                          <Badge variant="destructive">{recepcion.diferencias} diferencias</Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800">Sin diferencias</Badge>
                        )}
                      </TableCell>
                      <TableCell>{recepcion.recibidoPor}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
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

        <TabsContent value="comparacion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparación de Precios</CardTitle>
              <CardDescription>Compare precios entre diferentes proveedores para el mismo producto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input placeholder="Buscar producto..." className="flex-1" />
                  <Button>Buscar</Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Distribuidora ABC</TableHead>
                      <TableHead>Lácteos del Norte</TableHead>
                      <TableHead>Panadería Central</TableHead>
                      <TableHead>Mejor Precio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Coca Cola 600ml</TableCell>
                      <TableCell>$2.20</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Distribuidora ABC</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Leche Entera 1L</TableCell>
                      <TableCell>$2.80</TableCell>
                      <TableCell>$2.65</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Lácteos del Norte</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Pan Integral</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>$1.50</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Panadería Central</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

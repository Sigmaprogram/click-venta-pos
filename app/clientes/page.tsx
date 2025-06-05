"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, UserPlus, CreditCard, Star, Eye, Edit, Trash2, Phone, Mail, Calendar } from "lucide-react"
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
import { Progress } from "@/components/ui/progress"

const clientes = [
  {
    id: "1",
    nombre: "Roberto Martínez",
    email: "roberto.martinez@email.com",
    telefono: "+1234567890",
    direccion: "Av. Principal 123, Apt 4B",
    fechaRegistro: "2024-01-15",
    ultimaCompra: "2024-06-01",
    totalCompras: 1250.5,
    comprasCount: 45,
    credito: 500.0,
    creditoUsado: 150.0,
    puntos: 1250,
    nivel: "Gold",
    estado: "Activo",
    avatar: "RM",
  },
  {
    id: "2",
    nombre: "Ana Rodríguez",
    email: "ana.rodriguez@email.com",
    telefono: "+1234567891",
    direccion: "Calle Secundaria 456",
    fechaRegistro: "2024-02-20",
    ultimaCompra: "2024-05-30",
    totalCompras: 850.25,
    comprasCount: 32,
    credito: 300.0,
    creditoUsado: 75.0,
    puntos: 850,
    nivel: "Silver",
    estado: "Activo",
    avatar: "AR",
  },
  {
    id: "3",
    nombre: "Carlos Fernández",
    email: "carlos.fernandez@email.com",
    telefono: "+1234567892",
    direccion: "Plaza Mayor 789",
    fechaRegistro: "2024-03-10",
    ultimaCompra: "2024-04-15",
    totalCompras: 320.75,
    comprasCount: 12,
    credito: 200.0,
    creditoUsado: 200.0,
    puntos: 320,
    nivel: "Bronze",
    estado: "Suspendido",
    avatar: "CF",
  },
]

const historialCompras = [
  {
    id: "V-001234",
    cliente: "Roberto Martínez",
    fecha: "2024-06-01",
    productos: 8,
    total: 45.5,
    metodoPago: "Crédito",
    puntos: 45,
  },
  {
    id: "V-001235",
    cliente: "Ana Rodríguez",
    fecha: "2024-05-30",
    productos: 5,
    total: 28.75,
    metodoPago: "Efectivo",
    puntos: 28,
  },
  {
    id: "V-001236",
    cliente: "Roberto Martínez",
    fecha: "2024-05-28",
    productos: 12,
    total: 67.2,
    metodoPago: "Tarjeta",
    puntos: 67,
  },
]

const programaFidelizacion = {
  niveles: [
    { nombre: "Bronze", minimo: 0, descuento: 2, color: "bg-orange-100 text-orange-800" },
    { nombre: "Silver", minimo: 500, descuento: 5, color: "bg-gray-100 text-gray-800" },
    { nombre: "Gold", minimo: 1000, descuento: 8, color: "bg-yellow-100 text-yellow-800" },
    { nombre: "Platinum", minimo: 2000, descuento: 12, color: "bg-purple-100 text-purple-800" },
  ],
  puntosXPeso: 1, // 1 punto por cada peso gastado
  pesoXPunto: 0.01, // 1 punto = $0.01
}

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNivel, setSelectedNivel] = useState("all")

  const filteredClients = clientes.filter((client) => {
    const matchesSearch =
      client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.telefono.includes(searchTerm)
    const matchesNivel = selectedNivel === "all" || client.nivel === selectedNivel
    return matchesSearch && matchesNivel
  })

  const getEstadoBadge = (estado: string) => {
    if (estado === "Activo") {
      return <Badge className="bg-green-100 text-green-800">Activo</Badge>
    }
    return <Badge variant="destructive">Suspendido</Badge>
  }

  const getNivelBadge = (nivel: string) => {
    const nivelInfo = programaFidelizacion.niveles.find((n) => n.nombre === nivel)
    return <Badge className={nivelInfo?.color}>{nivel}</Badge>
  }

  const getCreditoProgress = (usado: number, total: number) => {
    return (usado / total) * 100
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Clientes</h2>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Nuevo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Registrar Nuevo Cliente</DialogTitle>
                <DialogDescription>
                  Complete la información del cliente para registrarlo en el sistema.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nombre" className="text-right">
                    Nombre
                  </Label>
                  <Input id="nombre" placeholder="Nombre completo" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="cliente@email.com" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="telefono" className="text-right">
                    Teléfono
                  </Label>
                  <Input id="telefono" placeholder="+1234567890" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="direccion" className="text-right">
                    Dirección
                  </Label>
                  <Input id="direccion" placeholder="Dirección completa" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="credito" className="text-right">
                    Límite Crédito
                  </Label>
                  <Input id="credito" type="number" placeholder="0.00" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Registrar Cliente</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientes.length}</div>
            <p className="text-xs text-muted-foreground">Clientes registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {clientes.filter((c) => c.estado === "Activo").length}
            </div>
            <p className="text-xs text-muted-foreground">Con compras recientes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crédito Otorgado</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${clientes.reduce((sum, c) => sum + c.credito, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Límite total disponible</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntos Acumulados</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {clientes.reduce((sum, c) => sum + c.puntos, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Total en el sistema</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="clientes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="fidelizacion">Fidelización</TabsTrigger>
          <TabsTrigger value="credito">Crédito</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="clientes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Clientes</CardTitle>
              <CardDescription>Gestione todos los clientes registrados en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Input
                    placeholder="Buscar clientes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedNivel} onValueChange={setSelectedNivel}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los niveles</SelectItem>
                    {programaFidelizacion.niveles.map((nivel) => (
                      <SelectItem key={nivel.nombre} value={nivel.nombre}>
                        {nivel.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Nivel</TableHead>
                    <TableHead>Compras</TableHead>
                    <TableHead>Crédito</TableHead>
                    <TableHead>Puntos</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                            <AvatarFallback>{cliente.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{cliente.nombre}</div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Desde {cliente.fechaRegistro}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1" />
                            {cliente.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1" />
                            {cliente.telefono}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getNivelBadge(cliente.nivel)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">${cliente.totalCompras.toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">{cliente.comprasCount} compras</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            ${cliente.creditoUsado.toFixed(2)} / ${cliente.credito.toFixed(2)}
                          </div>
                          <Progress value={getCreditoProgress(cliente.creditoUsado, cliente.credito)} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          {cliente.puntos.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>{getEstadoBadge(cliente.estado)}</TableCell>
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

        <TabsContent value="fidelizacion" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Programa de Fidelización</CardTitle>
                <CardDescription>Configuración de niveles y beneficios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programaFidelizacion.niveles.map((nivel) => (
                    <Card key={nivel.nombre}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Badge className={nivel.color}>{nivel.nombre}</Badge>
                            <div>
                              <div className="font-medium">Desde ${nivel.minimo}</div>
                              <div className="text-sm text-muted-foreground">{nivel.descuento}% descuento</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              {clientes.filter((c) => c.nivel === nivel.nombre).length} clientes
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de Fidelización</CardTitle>
                <CardDescription>Distribución de clientes por nivel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programaFidelizacion.niveles.map((nivel) => {
                    const clientesEnNivel = clientes.filter((c) => c.nivel === nivel.nombre).length
                    const porcentaje = (clientesEnNivel / clientes.length) * 100
                    return (
                      <div key={nivel.nombre} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{nivel.nombre}</span>
                          <span className="text-sm text-muted-foreground">
                            {clientesEnNivel} ({porcentaje.toFixed(1)}%)
                          </span>
                        </div>
                        <Progress value={porcentaje} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Configuración del Programa</CardTitle>
              <CardDescription>Ajuste los parámetros del programa de fidelización</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Puntos por peso gastado</Label>
                  <Input type="number" value={programaFidelizacion.puntosXPeso} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Valor del punto (en pesos)</Label>
                  <Input type="number" step="0.01" value={programaFidelizacion.pesoXPunto} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credito" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Crédito</CardTitle>
              <CardDescription>Administre los créditos otorgados a los clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Límite de Crédito</TableHead>
                    <TableHead>Crédito Usado</TableHead>
                    <TableHead>Disponible</TableHead>
                    <TableHead>Utilización</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientes
                    .filter((c) => c.credito > 0)
                    .map((cliente) => {
                      const disponible = cliente.credito - cliente.creditoUsado
                      const utilizacion = getCreditoProgress(cliente.creditoUsado, cliente.credito)
                      return (
                        <TableRow key={cliente.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                                <AvatarFallback>{cliente.avatar}</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">{cliente.nombre}</div>
                            </div>
                          </TableCell>
                          <TableCell>${cliente.credito.toFixed(2)}</TableCell>
                          <TableCell>${cliente.creditoUsado.toFixed(2)}</TableCell>
                          <TableCell>${disponible.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm">{utilizacion.toFixed(1)}%</div>
                              <Progress value={utilizacion} className="h-1" />
                            </div>
                          </TableCell>
                          <TableCell>
                            {utilizacion >= 100 ? (
                              <Badge variant="destructive">Límite Alcanzado</Badge>
                            ) : utilizacion >= 80 ? (
                              <Badge className="bg-orange-100 text-orange-800">Alto</Badge>
                            ) : (
                              <Badge className="bg-green-100 text-green-800">Normal</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                Ajustar
                              </Button>
                              <Button variant="outline" size="sm">
                                Pagar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Compras</CardTitle>
              <CardDescription>Registro de todas las compras realizadas por los clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Venta</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Productos</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Método Pago</TableHead>
                    <TableHead>Puntos</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historialCompras.map((compra) => (
                    <TableRow key={compra.id}>
                      <TableCell className="font-medium">{compra.id}</TableCell>
                      <TableCell>{compra.cliente}</TableCell>
                      <TableCell>{compra.fecha}</TableCell>
                      <TableCell>{compra.productos} items</TableCell>
                      <TableCell>${compra.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={compra.metodoPago === "Crédito" ? "secondary" : "default"}>
                          {compra.metodoPago}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />+{compra.puntos}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

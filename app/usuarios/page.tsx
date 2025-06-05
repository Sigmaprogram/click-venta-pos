"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, UserPlus, Shield, Clock, Edit, Trash2, Eye, Settings, Activity } from "lucide-react"
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
import { Switch } from "@/components/ui/switch"

const usuarios = [
  {
    id: "1",
    nombre: "María González",
    email: "maria.gonzalez@minisuper.com",
    rol: "Cajera",
    estado: "Activo",
    ultimoAcceso: "2024-06-01 14:30",
    turno: "Mañana",
    permisos: ["ventas", "consultar_inventario"],
    avatar: "MG",
  },
  {
    id: "2",
    nombre: "Carlos Ruiz",
    email: "carlos.ruiz@minisuper.com",
    rol: "Supervisor",
    estado: "Activo",
    ultimoAcceso: "2024-06-01 15:45",
    turno: "Mañana",
    permisos: ["ventas", "inventario", "reportes", "usuarios"],
    avatar: "CR",
  },
  {
    id: "3",
    nombre: "Ana López",
    email: "ana.lopez@minisuper.com",
    rol: "Reponedora",
    estado: "Inactivo",
    ultimoAcceso: "2024-05-31 18:00",
    turno: "Tarde",
    permisos: ["inventario"],
    avatar: "AL",
  },
  {
    id: "4",
    nombre: "José Martínez",
    email: "jose.martinez@minisuper.com",
    rol: "Administrador",
    estado: "Activo",
    ultimoAcceso: "2024-06-01 16:00",
    turno: "Completo",
    permisos: ["ventas", "inventario", "reportes", "usuarios", "configuracion", "auditoria"],
    avatar: "JM",
  },
  {
    id: "5",
    nombre: "Laura Fernández",
    email: "laura.fernandez@minisuper.com",
    rol: "Cajera",
    estado: "Activo",
    ultimoAcceso: "2024-06-01 13:20",
    turno: "Tarde",
    permisos: ["ventas", "consultar_inventario"],
    avatar: "LF",
  },
]

const roles = [
  {
    id: "admin",
    nombre: "Administrador",
    descripcion: "Acceso completo al sistema",
    permisos: ["ventas", "inventario", "reportes", "usuarios", "configuracion", "auditoria"],
  },
  {
    id: "supervisor",
    nombre: "Supervisor",
    descripcion: "Gestión de ventas, inventario y reportes",
    permisos: ["ventas", "inventario", "reportes", "usuarios"],
  },
  {
    id: "cajera",
    nombre: "Cajera",
    descripcion: "Operación de punto de venta",
    permisos: ["ventas", "consultar_inventario"],
  },
  {
    id: "reponedor",
    nombre: "Reponedor",
    descripcion: "Gestión de inventario y stock",
    permisos: ["inventario"],
  },
]

const turnos = [
  { id: "manana", nombre: "Mañana", horario: "08:00 - 16:00" },
  { id: "tarde", nombre: "Tarde", horario: "16:00 - 00:00" },
  { id: "noche", nombre: "Noche", horario: "00:00 - 08:00" },
  { id: "completo", nombre: "Completo", horario: "Flexible" },
]

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")

  const filteredUsers = usuarios.filter((user) => {
    const matchesSearch =
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.rol === selectedRole
    return matchesSearch && matchesRole
  })

  const getStatusBadge = (estado: string) => {
    if (estado === "Activo") {
      return <Badge className="bg-green-100 text-green-800">Activo</Badge>
    }
    return <Badge variant="secondary">Inactivo</Badge>
  }

  const getRoleBadge = (rol: string) => {
    const colors = {
      Administrador: "bg-purple-100 text-purple-800",
      Supervisor: "bg-blue-100 text-blue-800",
      Cajera: "bg-green-100 text-green-800",
      Reponedora: "bg-orange-100 text-orange-800",
    }
    return <Badge className={colors[rol as keyof typeof colors] || ""}>{rol}</Badge>
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h2>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Nuevo Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                <DialogDescription>Complete la información del usuario para crear una nueva cuenta.</DialogDescription>
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
                  <Input id="email" type="email" placeholder="usuario@minisuper.com" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="rol" className="text-right">
                    Rol
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((rol) => (
                        <SelectItem key={rol.id} value={rol.id}>
                          {rol.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="turno" className="text-right">
                    Turno
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccionar turno" />
                    </SelectTrigger>
                    <SelectContent>
                      {turnos.map((turno) => (
                        <SelectItem key={turno.id} value={turno.id}>
                          {turno.nombre} ({turno.horario})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Contraseña
                  </Label>
                  <Input id="password" type="password" placeholder="••••••••" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Crear Usuario</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usuarios.length}</div>
            <p className="text-xs text-muted-foreground">Usuarios registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {usuarios.filter((u) => u.estado === "Activo").length}
            </div>
            <p className="text-xs text-muted-foreground">En línea actualmente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Roles Definidos</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
            <p className="text-xs text-muted-foreground">Diferentes roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turnos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{turnos.length}</div>
            <p className="text-xs text-muted-foreground">Horarios configurados</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="usuarios" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="roles">Roles y Permisos</TabsTrigger>
          <TabsTrigger value="turnos">Turnos</TabsTrigger>
          <TabsTrigger value="auditoria">Auditoría</TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Usuarios</CardTitle>
              <CardDescription>Gestione todos los usuarios del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Input
                    placeholder="Buscar usuarios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los roles</SelectItem>
                    {roles.map((rol) => (
                      <SelectItem key={rol.id} value={rol.nombre}>
                        {rol.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Turno</TableHead>
                    <TableHead>Último Acceso</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                            <AvatarFallback>{user.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.nombre}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.rol)}</TableCell>
                      <TableCell>{getStatusBadge(user.estado)}</TableCell>
                      <TableCell>{user.turno}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.ultimoAcceso}</TableCell>
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

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Roles y Permisos</CardTitle>
              <CardDescription>Configure los roles y sus permisos correspondientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map((rol) => (
                  <Card key={rol.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{rol.nombre}</CardTitle>
                          <CardDescription>{rol.descripcion}</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {["ventas", "inventario", "reportes", "usuarios", "configuracion", "auditoria"].map(
                          (permiso) => (
                            <div key={permiso} className="flex items-center space-x-2">
                              <Switch checked={rol.permisos.includes(permiso)} disabled />
                              <Label className="capitalize">{permiso.replace("_", " ")}</Label>
                            </div>
                          ),
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="turnos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Turnos</CardTitle>
              <CardDescription>Configure los horarios de trabajo del personal</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Turno</TableHead>
                    <TableHead>Horario</TableHead>
                    <TableHead>Usuarios Asignados</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {turnos.map((turno) => {
                    const usuariosEnTurno = usuarios.filter((u) => u.turno === turno.nombre)
                    return (
                      <TableRow key={turno.id}>
                        <TableCell className="font-medium">{turno.nombre}</TableCell>
                        <TableCell>{turno.horario}</TableCell>
                        <TableCell>{usuariosEnTurno.length} usuarios</TableCell>
                        <TableCell>
                          <Badge variant="default">Activo</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
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

        <TabsContent value="auditoria" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Auditoría</CardTitle>
              <CardDescription>Historial de actividades y accesos de usuarios</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha/Hora</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Acción</TableHead>
                    <TableHead>Módulo</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2024-06-01 16:00:15</TableCell>
                    <TableCell>José Martínez</TableCell>
                    <TableCell>Inicio de sesión</TableCell>
                    <TableCell>Sistema</TableCell>
                    <TableCell>192.168.1.100</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Exitoso</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-06-01 15:45:30</TableCell>
                    <TableCell>Carlos Ruiz</TableCell>
                    <TableCell>Modificar producto</TableCell>
                    <TableCell>Inventario</TableCell>
                    <TableCell>192.168.1.101</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Exitoso</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-06-01 14:30:45</TableCell>
                    <TableCell>María González</TableCell>
                    <TableCell>Procesar venta</TableCell>
                    <TableCell>Ventas</TableCell>
                    <TableCell>192.168.1.102</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Exitoso</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-06-01 12:15:20</TableCell>
                    <TableCell>Usuario Desconocido</TableCell>
                    <TableCell>Intento de acceso</TableCell>
                    <TableCell>Sistema</TableCell>
                    <TableCell>192.168.1.200</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Fallido</Badge>
                    </TableCell>
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

"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { User, Save, ArrowLeft, Upload, Eye, EyeOff, Shield, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

const roles = [
  {
    id: "administrador",
    nombre: "Administrador",
    descripcion: "Acceso completo al sistema",
    permisos: [
      "ventas",
      "inventario",
      "reportes",
      "usuarios",
      "configuracion",
      "auditoria",
      "compras",
      "clientes",
      "caja",
    ],
  },
  {
    id: "supervisor",
    nombre: "Supervisor",
    descripcion: "Gestión de ventas, inventario y reportes",
    permisos: ["ventas", "inventario", "reportes", "usuarios_lectura", "compras", "clientes"],
  },
  {
    id: "cajero",
    nombre: "Cajero",
    descripcion: "Operación de punto de venta",
    permisos: ["ventas", "inventario_lectura", "clientes_lectura", "caja_operacion"],
  },
  {
    id: "reponedor",
    nombre: "Reponedor",
    descripcion: "Gestión de inventario y stock",
    permisos: ["inventario", "compras_lectura"],
  },
]

const modulosPermisos = [
  { id: "ventas", nombre: "Ventas", descripcion: "Procesar ventas y devoluciones" },
  { id: "inventario", nombre: "Inventario", descripcion: "Gestión completa de productos" },
  { id: "inventario_lectura", nombre: "Inventario (Solo lectura)", descripcion: "Consultar productos y stock" },
  { id: "reportes", nombre: "Reportes", descripcion: "Generar y ver reportes" },
  { id: "usuarios", nombre: "Usuarios", descripcion: "Gestión completa de usuarios" },
  { id: "usuarios_lectura", nombre: "Usuarios (Solo lectura)", descripcion: "Ver información de usuarios" },
  { id: "configuracion", nombre: "Configuración", descripcion: "Configurar el sistema" },
  { id: "auditoria", nombre: "Auditoría", descripcion: "Ver logs y auditoría" },
  { id: "compras", nombre: "Compras", descripcion: "Gestión de compras y proveedores" },
  { id: "compras_lectura", nombre: "Compras (Solo lectura)", descripcion: "Consultar compras" },
  { id: "clientes", nombre: "Clientes", descripcion: "Gestión completa de clientes" },
  { id: "clientes_lectura", nombre: "Clientes (Solo lectura)", descripcion: "Consultar clientes" },
  { id: "caja", nombre: "Caja", descripcion: "Control completo de caja" },
  { id: "caja_operacion", nombre: "Caja (Operación)", descripcion: "Operaciones básicas de caja" },
]

const turnos = [
  { id: "manana", nombre: "Mañana", horario: "08:00 - 16:00" },
  { id: "tarde", nombre: "Tarde", horario: "16:00 - 00:00" },
  { id: "noche", nombre: "Noche", horario: "00:00 - 08:00" },
  { id: "completo", nombre: "Completo", horario: "Flexible" },
]

export default function CrearUsuarioPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    direccion: "",
    fechaNacimiento: "",
    numeroEmpleado: "",
    password: "",
    confirmPassword: "",
    rol: "",
    turno: "",
    salario: "",
    fechaIngreso: "",
    estado: "activo",
    permisos: [] as string[],
    observaciones: "",
    foto: null as File | null,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleRoleChange = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId)
    if (role) {
      setFormData({
        ...formData,
        rol: roleId,
        permisos: [...role.permisos],
      })
    }
  }

  const handlePermisoChange = (permisoId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        permisos: [...formData.permisos, permisoId],
      })
    } else {
      setFormData({
        ...formData,
        permisos: formData.permisos.filter((p) => p !== permisoId),
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido"
    if (!formData.apellidos.trim()) newErrors.apellidos = "Los apellidos son requeridos"
    if (!formData.email.trim()) newErrors.email = "El email es requerido"
    if (!formData.email.includes("@")) newErrors.email = "Email inválido"
    if (!formData.password) newErrors.password = "La contraseña es requerida"
    if (formData.password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden"
    if (!formData.rol) newErrors.rol = "Debe seleccionar un rol"
    if (!formData.turno) newErrors.turno = "Debe seleccionar un turno"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Usuario creado:", formData)
      // Aquí iría la lógica para crear el usuario
    }
  }

  const selectedRole = roles.find((r) => r.id === formData.rol)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/usuarios">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Crear Nuevo Usuario</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Guardar Usuario
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Información Personal</TabsTrigger>
            <TabsTrigger value="laboral">Información Laboral</TabsTrigger>
            <TabsTrigger value="acceso">Acceso y Seguridad</TabsTrigger>
            <TabsTrigger value="permisos">Permisos</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Datos Personales
                </CardTitle>
                <CardDescription>Información básica del empleado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Foto de perfil */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Label>Foto de perfil</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormData({ ...formData, foto: e.target.files?.[0] || null })}
                        className="w-auto"
                      />
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Subir
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre *</Label>
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className={errors.nombre ? "border-red-500" : ""}
                    />
                    {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellidos">Apellidos *</Label>
                    <Input
                      id="apellidos"
                      value={formData.apellidos}
                      onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                      className={errors.apellidos ? "border-red-500" : ""}
                    />
                    {errors.apellidos && <p className="text-sm text-red-500">{errors.apellidos}</p>}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Textarea
                    id="direccion"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                  <Input
                    id="fechaNacimiento"
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="laboral" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Información Laboral
                </CardTitle>
                <CardDescription>Datos relacionados con el empleo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="numeroEmpleado">Número de Empleado</Label>
                    <Input
                      id="numeroEmpleado"
                      value={formData.numeroEmpleado}
                      onChange={(e) => setFormData({ ...formData, numeroEmpleado: e.target.value })}
                      placeholder="EMP-001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fechaIngreso">Fecha de Ingreso</Label>
                    <Input
                      id="fechaIngreso"
                      type="date"
                      value={formData.fechaIngreso}
                      onChange={(e) => setFormData({ ...formData, fechaIngreso: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="rol">Rol *</Label>
                    <Select value={formData.rol} onValueChange={handleRoleChange}>
                      <SelectTrigger className={errors.rol ? "border-red-500" : ""}>
                        <SelectValue placeholder="Seleccionar rol" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((rol) => (
                          <SelectItem key={rol.id} value={rol.id}>
                            <div>
                              <div className="font-medium">{rol.nombre}</div>
                              <div className="text-sm text-muted-foreground">{rol.descripcion}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.rol && <p className="text-sm text-red-500">{errors.rol}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="turno">Turno *</Label>
                    <Select
                      value={formData.turno}
                      onValueChange={(value) => setFormData({ ...formData, turno: value })}
                    >
                      <SelectTrigger className={errors.turno ? "border-red-500" : ""}>
                        <SelectValue placeholder="Seleccionar turno" />
                      </SelectTrigger>
                      <SelectContent>
                        {turnos.map((turno) => (
                          <SelectItem key={turno.id} value={turno.id}>
                            <div>
                              <div className="font-medium">{turno.nombre}</div>
                              <div className="text-sm text-muted-foreground">{turno.horario}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.turno && <p className="text-sm text-red-500">{errors.turno}</p>}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="salario">Salario</Label>
                    <Input
                      id="salario"
                      type="number"
                      step="0.01"
                      value={formData.salario}
                      onChange={(e) => setFormData({ ...formData, salario: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Select
                      value={formData.estado}
                      onValueChange={(value) => setFormData({ ...formData, estado: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="activo">Activo</SelectItem>
                        <SelectItem value="inactivo">Inactivo</SelectItem>
                        <SelectItem value="suspendido">Suspendido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observaciones">Observaciones</Label>
                  <Textarea
                    id="observaciones"
                    value={formData.observaciones}
                    onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                    rows={3}
                    placeholder="Notas adicionales sobre el empleado..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="acceso" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Acceso y Seguridad
                </CardTitle>
                <CardDescription>Configuración de acceso al sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={errors.password ? "border-red-500" : ""}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className={errors.confirmPassword ? "border-red-500" : ""}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Configuración de Seguridad</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Forzar cambio de contraseña en primer acceso</Label>
                        <p className="text-sm text-muted-foreground">
                          El usuario deberá cambiar su contraseña al iniciar sesión por primera vez
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Autenticación de doble factor</Label>
                        <p className="text-sm text-muted-foreground">Requerir código adicional para iniciar sesión</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notificar accesos por email</Label>
                        <p className="text-sm text-muted-foreground">
                          Enviar notificación cuando el usuario inicie sesión
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permisos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Permisos del Sistema
                </CardTitle>
                <CardDescription>Configure los permisos específicos para este usuario</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedRole && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-100 text-blue-800">{selectedRole.nombre}</Badge>
                      <span className="text-sm text-muted-foreground">{selectedRole.descripcion}</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Los permisos se han configurado automáticamente según el rol seleccionado. Puede modificarlos
                      individualmente si es necesario.
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <h4 className="font-medium">Permisos por Módulo</h4>
                  <div className="grid gap-3">
                    {modulosPermisos.map((modulo) => (
                      <div key={modulo.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          id={modulo.id}
                          checked={formData.permisos.includes(modulo.id)}
                          onCheckedChange={(checked) => handlePermisoChange(modulo.id, checked as boolean)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={modulo.id} className="font-medium cursor-pointer">
                            {modulo.nombre}
                          </Label>
                          <p className="text-sm text-muted-foreground">{modulo.descripcion}</p>
                        </div>
                        {formData.permisos.includes(modulo.id) && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Importante</h4>
                      <p className="text-sm text-yellow-700">
                        Los permisos otorgados determinarán qué módulos y funciones puede acceder el usuario. Asegúrese
                        de otorgar solo los permisos necesarios para las tareas del empleado.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}

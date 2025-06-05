"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Save, Search, Users, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

const usuarios = [
  {
    id: "1",
    nombre: "María González",
    email: "maria.gonzalez@minisuper.com",
    rol: "Cajera",
    estado: "Activo",
    ultimoAcceso: "2024-06-01 14:30",
    avatar: "MG",
    permisos: ["ventas", "inventario_lectura", "clientes_lectura", "caja_operacion"],
  },
  {
    id: "2",
    nombre: "Carlos Ruiz",
    email: "carlos.ruiz@minisuper.com",
    rol: "Supervisor",
    estado: "Activo",
    ultimoAcceso: "2024-06-01 15:45",
    avatar: "CR",
    permisos: ["ventas", "inventario", "reportes", "usuarios_lectura", "compras", "clientes"],
  },
  {
    id: "3",
    nombre: "Ana López",
    email: "ana.lopez@minisuper.com",
    rol: "Reponedora",
    estado: "Inactivo",
    ultimoAcceso: "2024-05-31 18:00",
    avatar: "AL",
    permisos: ["inventario", "compras_lectura"],
  },
  {
    id: "4",
    nombre: "José Martínez",
    email: "jose.martinez@minisuper.com",
    rol: "Administrador",
    estado: "Activo",
    ultimoAcceso: "2024-06-01 16:00",
    avatar: "JM",
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
]

const modulosPermisos = [
  {
    id: "ventas",
    nombre: "Ventas",
    descripcion: "Procesar ventas y devoluciones",
    categoria: "Operaciones",
    subpermisos: [
      { id: "ventas_crear", nombre: "Crear ventas", descripcion: "Procesar nuevas ventas" },
      { id: "ventas_devolver", nombre: "Procesar devoluciones", descripcion: "Gestionar devoluciones de productos" },
      { id: "ventas_descuentos", nombre: "Aplicar descuentos", descripcion: "Aplicar descuentos en ventas" },
      { id: "ventas_cancelar", nombre: "Cancelar ventas", descripcion: "Cancelar transacciones de venta" },
    ],
  },
  {
    id: "inventario",
    nombre: "Inventario",
    descripcion: "Gestión completa de productos",
    categoria: "Gestión",
    subpermisos: [
      { id: "inventario_crear", nombre: "Crear productos", descripcion: "Agregar nuevos productos" },
      { id: "inventario_editar", nombre: "Editar productos", descripcion: "Modificar información de productos" },
      { id: "inventario_eliminar", nombre: "Eliminar productos", descripcion: "Eliminar productos del sistema" },
      { id: "inventario_movimientos", nombre: "Movimientos de stock", descripcion: "Registrar entradas y salidas" },
    ],
  },
  {
    id: "inventario_lectura",
    nombre: "Inventario (Solo lectura)",
    descripcion: "Consultar productos y stock",
    categoria: "Consultas",
    subpermisos: [
      { id: "inventario_ver", nombre: "Ver productos", descripcion: "Consultar información de productos" },
      { id: "inventario_stock", nombre: "Ver stock", descripcion: "Consultar niveles de inventario" },
    ],
  },
  {
    id: "reportes",
    nombre: "Reportes",
    descripcion: "Generar y ver reportes",
    categoria: "Análisis",
    subpermisos: [
      { id: "reportes_ventas", nombre: "Reportes de ventas", descripcion: "Generar reportes de ventas" },
      { id: "reportes_inventario", nombre: "Reportes de inventario", descripcion: "Generar reportes de stock" },
      { id: "reportes_financieros", nombre: "Reportes financieros", descripcion: "Acceder a reportes financieros" },
      { id: "reportes_exportar", nombre: "Exportar reportes", descripcion: "Exportar reportes en diferentes formatos" },
    ],
  },
  {
    id: "usuarios",
    nombre: "Usuarios",
    descripcion: "Gestión completa de usuarios",
    categoria: "Administración",
    subpermisos: [
      { id: "usuarios_crear", nombre: "Crear usuarios", descripcion: "Agregar nuevos usuarios" },
      { id: "usuarios_editar", nombre: "Editar usuarios", descripcion: "Modificar información de usuarios" },
      { id: "usuarios_eliminar", nombre: "Eliminar usuarios", descripcion: "Eliminar usuarios del sistema" },
      { id: "usuarios_permisos", nombre: "Gestionar permisos", descripcion: "Asignar y modificar permisos" },
    ],
  },
  {
    id: "configuracion",
    nombre: "Configuración",
    descripcion: "Configurar el sistema",
    categoria: "Administración",
    subpermisos: [
      { id: "config_empresa", nombre: "Configuración empresa", descripcion: "Modificar datos de la empresa" },
      { id: "config_sistema", nombre: "Configuración sistema", descripcion: "Ajustar parámetros del sistema" },
      { id: "config_pos", nombre: "Configuración POS", descripcion: "Configurar punto de venta" },
      { id: "config_seguridad", nombre: "Configuración seguridad", descripcion: "Gestionar políticas de seguridad" },
    ],
  },
  {
    id: "caja",
    nombre: "Caja",
    descripcion: "Control completo de caja",
    categoria: "Operaciones",
    subpermisos: [
      { id: "caja_abrir", nombre: "Abrir caja", descripcion: "Iniciar turno de caja" },
      { id: "caja_cerrar", nombre: "Cerrar caja", descripcion: "Finalizar turno de caja" },
      { id: "caja_arqueo", nombre: "Realizar arqueo", descripcion: "Contar dinero en caja" },
      { id: "caja_movimientos", nombre: "Movimientos de caja", descripcion: "Registrar ingresos y egresos" },
    ],
  },
]

export default function PermisosPage() {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(usuarios[0])
  const [busqueda, setBusqueda] = useState("")
  const [permisosModificados, setPermisosModificados] = useState<string[]>(usuarioSeleccionado.permisos)
  const [cambiosGuardados, setCambiosGuardados] = useState(true)

  const usuariosFiltrados = usuarios.filter(
    (usuario) =>
      usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.rol.toLowerCase().includes(busqueda.toLowerCase()),
  )

  const seleccionarUsuario = (usuario: any) => {
    if (!cambiosGuardados) {
      if (confirm("Hay cambios sin guardar. ¿Desea continuar sin guardar?")) {
        setUsuarioSeleccionado(usuario)
        setPermisosModificados(usuario.permisos)
        setCambiosGuardados(true)
      }
    } else {
      setUsuarioSeleccionado(usuario)
      setPermisosModificados(usuario.permisos)
    }
  }

  const togglePermiso = (permisoId: string) => {
    const nuevosPermisos = permisosModificados.includes(permisoId)
      ? permisosModificados.filter((p) => p !== permisoId)
      : [...permisosModificados, permisoId]

    setPermisosModificados(nuevosPermisos)
    setCambiosGuardados(false)
  }

  const toggleSubpermiso = (subpermisoId: string) => {
    const nuevosPermisos = permisosModificados.includes(subpermisoId)
      ? permisosModificados.filter((p) => p !== subpermisoId)
      : [...permisosModificados, subpermisoId]

    setPermisosModificados(nuevosPermisos)
    setCambiosGuardados(false)
  }

  const guardarCambios = () => {
    // Aquí iría la lógica para guardar los cambios
    console.log("Guardando permisos para usuario:", usuarioSeleccionado.id, permisosModificados)
    setCambiosGuardados(true)
  }

  const descartarCambios = () => {
    setPermisosModificados(usuarioSeleccionado.permisos)
    setCambiosGuardados(true)
  }

  const getEstadoBadge = (estado: string) => {
    return estado === "Activo" ? (
      <Badge className="bg-green-100 text-green-800">Activo</Badge>
    ) : (
      <Badge variant="secondary">Inactivo</Badge>
    )
  }

  const getRolBadge = (rol: string) => {
    const colors = {
      Administrador: "bg-purple-100 text-purple-800",
      Supervisor: "bg-blue-100 text-blue-800",
      Cajera: "bg-green-100 text-green-800",
      Reponedora: "bg-orange-100 text-orange-800",
    }
    return <Badge className={colors[rol as keyof typeof colors] || ""}>{rol}</Badge>
  }

  const categorias = [...new Set(modulosPermisos.map((m) => m.categoria))]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Permisos</h2>
        <div className="flex items-center space-x-2">
          {!cambiosGuardados && (
            <>
              <Button variant="outline" onClick={descartarCambios}>
                Descartar
              </Button>
              <Button onClick={guardarCambios}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </Button>
            </>
          )}
        </div>
      </div>

      {!cambiosGuardados && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <p className="text-yellow-800 font-medium">
              Hay cambios sin guardar en los permisos de {usuarioSeleccionado.nombre}
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-4">
        {/* Lista de usuarios */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Usuarios
            </CardTitle>
            <CardDescription>Seleccione un usuario para gestionar sus permisos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuarios..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-8"
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {usuariosFiltrados.map((usuario) => (
                <div
                  key={usuario.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    usuarioSeleccionado.id === usuario.id
                      ? "bg-blue-50 border-2 border-blue-200"
                      : "hover:bg-gray-50 border-2 border-transparent"
                  }`}
                  onClick={() => seleccionarUsuario(usuario)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-xs">{usuario.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{usuario.nombre}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getRolBadge(usuario.rol)}
                        {getEstadoBadge(usuario.estado)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Panel de permisos */}
        <div className="lg:col-span-3 space-y-4">
          {/* Información del usuario seleccionado */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Permisos de {usuarioSeleccionado.nombre}
              </CardTitle>
              <CardDescription>Configure los permisos específicos para este usuario</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{usuarioSeleccionado.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium">{usuarioSeleccionado.nombre}</h3>
                  <p className="text-sm text-muted-foreground">{usuarioSeleccionado.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getRolBadge(usuarioSeleccionado.rol)}
                    {getEstadoBadge(usuarioSeleccionado.estado)}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Último acceso</p>
                  <p className="text-sm font-medium">{usuarioSeleccionado.ultimoAcceso}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuración de permisos */}
          <Tabs defaultValue="modulos" className="space-y-4">
            <TabsList>
              <TabsTrigger value="modulos">Por Módulos</TabsTrigger>
              <TabsTrigger value="categorias">Por Categorías</TabsTrigger>
              <TabsTrigger value="resumen">Resumen</TabsTrigger>
            </TabsList>

            <TabsContent value="modulos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Permisos por Módulo</CardTitle>
                  <CardDescription>Configure los permisos específicos para cada módulo del sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {modulosPermisos.map((modulo) => (
                      <div key={modulo.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id={modulo.id}
                              checked={permisosModificados.includes(modulo.id)}
                              onCheckedChange={() => togglePermiso(modulo.id)}
                            />
                            <div>
                              <Label htmlFor={modulo.id} className="font-medium cursor-pointer">
                                {modulo.nombre}
                              </Label>
                              <p className="text-sm text-muted-foreground">{modulo.descripcion}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{modulo.categoria}</Badge>
                            {permisosModificados.includes(modulo.id) ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>

                        {modulo.subpermisos && modulo.subpermisos.length > 0 && (
                          <div className="ml-6 space-y-2 border-l-2 border-gray-200 pl-4">
                            <p className="text-sm font-medium text-gray-700">Permisos específicos:</p>
                            {modulo.subpermisos.map((subpermiso) => (
                              <div key={subpermiso.id} className="flex items-center space-x-3">
                                <Checkbox
                                  id={subpermiso.id}
                                  checked={permisosModificados.includes(subpermiso.id)}
                                  onCheckedChange={() => toggleSubpermiso(subpermiso.id)}
                                  disabled={!permisosModificados.includes(modulo.id)}
                                />
                                <div className="flex-1">
                                  <Label
                                    htmlFor={subpermiso.id}
                                    className={`text-sm cursor-pointer ${
                                      !permisosModificados.includes(modulo.id) ? "text-gray-400" : ""
                                    }`}
                                  >
                                    {subpermiso.nombre}
                                  </Label>
                                  <p
                                    className={`text-xs ${
                                      !permisosModificados.includes(modulo.id)
                                        ? "text-gray-300"
                                        : "text-muted-foreground"
                                    }`}
                                  >
                                    {subpermiso.descripcion}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categorias" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Permisos por Categoría</CardTitle>
                  <CardDescription>Vista organizada por categorías de funcionalidad</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {categorias.map((categoria) => (
                      <div key={categoria} className="space-y-3">
                        <h3 className="font-medium text-lg border-b pb-2">{categoria}</h3>
                        <div className="grid gap-3 md:grid-cols-2">
                          {modulosPermisos
                            .filter((m) => m.categoria === categoria)
                            .map((modulo) => (
                              <div key={modulo.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                                <Checkbox
                                  id={`cat-${modulo.id}`}
                                  checked={permisosModificados.includes(modulo.id)}
                                  onCheckedChange={() => togglePermiso(modulo.id)}
                                />
                                <div className="flex-1">
                                  <Label htmlFor={`cat-${modulo.id}`} className="font-medium cursor-pointer">
                                    {modulo.nombre}
                                  </Label>
                                  <p className="text-sm text-muted-foreground">{modulo.descripcion}</p>
                                </div>
                                {permisosModificados.includes(modulo.id) && (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resumen" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Resumen de Permisos</CardTitle>
                  <CardDescription>Vista general de todos los permisos asignados al usuario</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800">Total de Módulos</h4>
                        <p className="text-2xl font-bold text-blue-600">
                          {permisosModificados.filter((p) => modulosPermisos.some((m) => m.id === p)).length}
                        </p>
                        <p className="text-sm text-blue-600">de {modulosPermisos.length} disponibles</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-800">Permisos Activos</h4>
                        <p className="text-2xl font-bold text-green-600">{permisosModificados.length}</p>
                        <p className="text-sm text-green-600">permisos asignados</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-800">Nivel de Acceso</h4>
                        <p className="text-2xl font-bold text-purple-600">
                          {Math.round((permisosModificados.length / (modulosPermisos.length * 2)) * 100)}%
                        </p>
                        <p className="text-sm text-purple-600">del sistema</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Módulos con Acceso:</h4>
                      <div className="flex flex-wrap gap-2">
                        {modulosPermisos
                          .filter((m) => permisosModificados.includes(m.id))
                          .map((modulo) => (
                            <Badge key={modulo.id} className="bg-green-100 text-green-800">
                              {modulo.nombre}
                            </Badge>
                          ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Módulos sin Acceso:</h4>
                      <div className="flex flex-wrap gap-2">
                        {modulosPermisos
                          .filter((m) => !permisosModificados.includes(m.id))
                          .map((modulo) => (
                            <Badge key={modulo.id} variant="secondary">
                              {modulo.nombre}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

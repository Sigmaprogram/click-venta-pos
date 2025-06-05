"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Building, Printer, Database, Shield, Bell, Save, RefreshCw, Download, Upload } from "lucide-react"

export default function ConfiguracionPage() {
  const [configuracion, setConfiguracion] = useState({
    empresa: {
      nombre: "MiniSuper La Esquina",
      rfc: "MESL123456789",
      direccion: "Av. Principal 123, Col. Centro",
      telefono: "+52 55 1234 5678",
      email: "contacto@minisuper.com",
      logo: "",
    },
    sistema: {
      moneda: "MXN",
      idioma: "es",
      zona_horaria: "America/Mexico_City",
      formato_fecha: "DD/MM/YYYY",
      decimales: 2,
      iva_defecto: 16,
    },
    pos: {
      impresora_termica: true,
      cajon_dinero: true,
      escaner_barras: true,
      balanza_electronica: false,
      pantalla_cliente: false,
      impresion_automatica: true,
      sonido_ventas: true,
    },
    inventario: {
      stock_minimo_global: 5,
      alertas_vencimiento: 30,
      control_lotes: true,
      ubicaciones_gondola: true,
      codigo_barras_automatico: true,
    },
    seguridad: {
      sesion_timeout: 30,
      intentos_login: 3,
      backup_automatico: true,
      frecuencia_backup: "diario",
      doble_factor: false,
      logs_auditoria: true,
    },
    notificaciones: {
      stock_bajo: true,
      productos_vencidos: true,
      ventas_diarias: true,
      errores_sistema: true,
      email_reportes: true,
      sms_alertas: false,
    },
  })

  const handleSave = () => {
    // Aquí iría la lógica para guardar la configuración
    console.log("Configuración guardada:", configuracion)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Configuración del Sistema</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Restaurar
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      <Tabs defaultValue="empresa" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="empresa">Empresa</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
          <TabsTrigger value="pos">POS</TabsTrigger>
          <TabsTrigger value="inventario">Inventario</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="empresa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Información de la Empresa
              </CardTitle>
              <CardDescription>
                Configure los datos básicos de su empresa que aparecerán en facturas y reportes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre de la Empresa</Label>
                  <Input
                    id="nombre"
                    value={configuracion.empresa.nombre}
                    onChange={(e) =>
                      setConfiguracion({
                        ...configuracion,
                        empresa: { ...configuracion.empresa, nombre: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rfc">RFC</Label>
                  <Input
                    id="rfc"
                    value={configuracion.empresa.rfc}
                    onChange={(e) =>
                      setConfiguracion({
                        ...configuracion,
                        empresa: { ...configuracion.empresa, rfc: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Textarea
                  id="direccion"
                  value={configuracion.empresa.direccion}
                  onChange={(e) =>
                    setConfiguracion({
                      ...configuracion,
                      empresa: { ...configuracion.empresa, direccion: e.target.value },
                    })
                  }
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={configuracion.empresa.telefono}
                    onChange={(e) =>
                      setConfiguracion({
                        ...configuracion,
                        empresa: { ...configuracion.empresa, telefono: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={configuracion.empresa.email}
                    onChange={(e) =>
                      setConfiguracion({
                        ...configuracion,
                        empresa: { ...configuracion.empresa, email: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo de la Empresa</Label>
                <div className="flex items-center space-x-2">
                  <Input id="logo" type="file" accept="image/*" />
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Subir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sistema" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuración del Sistema
              </CardTitle>
              <CardDescription>Ajuste los parámetros generales del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="moneda">Moneda</Label>
                  <Select value={configuracion.sistema.moneda}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MXN">Peso Mexicano (MXN)</SelectItem>
                      <SelectItem value="USD">Dólar Americano (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idioma">Idioma</Label>
                  <Select value={configuracion.sistema.idioma}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="zona_horaria">Zona Horaria</Label>
                  <Select value={configuracion.sistema.zona_horaria}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Mexico_City">Ciudad de México</SelectItem>
                      <SelectItem value="America/Cancun">Cancún</SelectItem>
                      <SelectItem value="America/Tijuana">Tijuana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="formato_fecha">Formato de Fecha</Label>
                  <Select value={configuracion.sistema.formato_fecha}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="decimales">Decimales en Precios</Label>
                  <Input id="decimales" type="number" min="0" max="4" value={configuracion.sistema.decimales} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="iva">IVA por Defecto (%)</Label>
                  <Input id="iva" type="number" min="0" max="100" value={configuracion.sistema.iva_defecto} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Printer className="h-5 w-5" />
                Configuración del Punto de Venta
              </CardTitle>
              <CardDescription>Configure los dispositivos y comportamiento del POS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Dispositivos Conectados</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Impresora Térmica</Label>
                      <p className="text-sm text-muted-foreground">Para tickets de venta</p>
                    </div>
                    <Switch checked={configuracion.pos.impresora_termica} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Cajón de Dinero</Label>
                      <p className="text-sm text-muted-foreground">Apertura automática</p>
                    </div>
                    <Switch checked={configuracion.pos.cajon_dinero} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Escáner de Códigos</Label>
                      <p className="text-sm text-muted-foreground">Lectura de códigos de barras</p>
                    </div>
                    <Switch checked={configuracion.pos.escaner_barras} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Balanza Electrónica</Label>
                      <p className="text-sm text-muted-foreground">Para productos por peso</p>
                    </div>
                    <Switch checked={configuracion.pos.balanza_electronica} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Pantalla Cliente</Label>
                      <p className="text-sm text-muted-foreground">Display para el cliente</p>
                    </div>
                    <Switch checked={configuracion.pos.pantalla_cliente} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Comportamiento</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Impresión Automática</Label>
                      <p className="text-sm text-muted-foreground">Imprimir ticket al finalizar venta</p>
                    </div>
                    <Switch checked={configuracion.pos.impresion_automatica} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sonidos de Venta</Label>
                      <p className="text-sm text-muted-foreground">Efectos de sonido en transacciones</p>
                    </div>
                    <Switch checked={configuracion.pos.sonido_ventas} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventario" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Configuración de Inventario
              </CardTitle>
              <CardDescription>Ajuste los parámetros de control de inventario</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="stock_minimo">Stock Mínimo Global</Label>
                  <Input id="stock_minimo" type="number" min="0" value={configuracion.inventario.stock_minimo_global} />
                  <p className="text-sm text-muted-foreground">Cantidad mínima por defecto para nuevos productos</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alertas_vencimiento">Alertas de Vencimiento (días)</Label>
                  <Input
                    id="alertas_vencimiento"
                    type="number"
                    min="1"
                    value={configuracion.inventario.alertas_vencimiento}
                  />
                  <p className="text-sm text-muted-foreground">Días antes del vencimiento para mostrar alerta</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Funciones Avanzadas</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Control de Lotes</Label>
                      <p className="text-sm text-muted-foreground">Seguimiento por lotes de productos</p>
                    </div>
                    <Switch checked={configuracion.inventario.control_lotes} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Ubicaciones en Góndola</Label>
                      <p className="text-sm text-muted-foreground">Control de ubicación física</p>
                    </div>
                    <Switch checked={configuracion.inventario.ubicaciones_gondola} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Códigos de Barras Automáticos</Label>
                      <p className="text-sm text-muted-foreground">Generar códigos automáticamente</p>
                    </div>
                    <Switch checked={configuracion.inventario.codigo_barras_automatico} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configuración de Seguridad
              </CardTitle>
              <CardDescription>Configure las políticas de seguridad del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timeout">Tiempo de Sesión (minutos)</Label>
                  <Input id="timeout" type="number" min="5" value={configuracion.seguridad.sesion_timeout} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="intentos">Intentos de Login</Label>
                  <Input id="intentos" type="number" min="1" max="10" value={configuracion.seguridad.intentos_login} />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Respaldos y Auditoría</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Respaldo Automático</Label>
                      <p className="text-sm text-muted-foreground">Backup automático de datos</p>
                    </div>
                    <Switch checked={configuracion.seguridad.backup_automatico} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frecuencia">Frecuencia de Respaldo</Label>
                    <Select value={configuracion.seguridad.frecuencia_backup}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diario">Diario</SelectItem>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="mensual">Mensual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Autenticación de Doble Factor</Label>
                      <p className="text-sm text-muted-foreground">2FA para usuarios administradores</p>
                    </div>
                    <Switch checked={configuracion.seguridad.doble_factor} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Logs de Auditoría</Label>
                      <p className="text-sm text-muted-foreground">Registro detallado de actividades</p>
                    </div>
                    <Switch checked={configuracion.seguridad.logs_auditoria} />
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Backup
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Restaurar Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificaciones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configuración de Notificaciones
              </CardTitle>
              <CardDescription>Configure qué notificaciones desea recibir y cómo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Alertas del Sistema</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Stock Bajo</Label>
                      <p className="text-sm text-muted-foreground">Productos con inventario crítico</p>
                    </div>
                    <Switch checked={configuracion.notificaciones.stock_bajo} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Productos Vencidos</Label>
                      <p className="text-sm text-muted-foreground">Productos próximos a vencer</p>
                    </div>
                    <Switch checked={configuracion.notificaciones.productos_vencidos} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Resumen de Ventas Diarias</Label>
                      <p className="text-sm text-muted-foreground">Reporte automático al final del día</p>
                    </div>
                    <Switch checked={configuracion.notificaciones.ventas_diarias} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Errores del Sistema</Label>
                      <p className="text-sm text-muted-foreground">Notificaciones de errores críticos</p>
                    </div>
                    <Switch checked={configuracion.notificaciones.errores_sistema} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Métodos de Notificación</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email de Reportes</Label>
                      <p className="text-sm text-muted-foreground">Envío de reportes por correo</p>
                    </div>
                    <Switch checked={configuracion.notificaciones.email_reportes} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS de Alertas</Label>
                      <p className="text-sm text-muted-foreground">Alertas críticas por SMS</p>
                    </div>
                    <Switch checked={configuracion.notificaciones.sms_alertas} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email_notif">Email para Notificaciones</Label>
                <Input
                  id="email_notif"
                  type="email"
                  placeholder="admin@minisuper.com"
                  value={configuracion.empresa.email}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

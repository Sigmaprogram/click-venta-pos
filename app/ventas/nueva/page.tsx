"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ShoppingCart,
  ArrowLeft,
  Scan,
  Plus,
  Minus,
  Trash2,
  Calculator,
  CreditCard,
  DollarSign,
  Percent,
  User,
  Search,
  Receipt,
} from "lucide-react"
import Link from "next/link"

interface ProductoVenta {
  id: string
  nombre: string
  precio: number
  cantidad: number
  descuento: number
  subtotal: number
}

interface Cliente {
  id: string
  nombre: string
  email: string
  telefono: string
  credito: number
  creditoUsado: number
  puntos: number
}

const productos = [
  { id: "1", nombre: "Coca Cola 600ml", precio: 2.5, stock: 45, codigo: "7501234567890" },
  { id: "2", nombre: "Pan Integral", precio: 1.8, stock: 8, codigo: "7501234567891" },
  { id: "3", nombre: "Leche Entera 1L", precio: 3.2, stock: 32, codigo: "7501234567892" },
  { id: "4", nombre: "Arroz 1kg", precio: 4.5, stock: 2, codigo: "7501234567893" },
  { id: "5", nombre: "Aceite Girasol 1L", precio: 5.8, stock: 1, codigo: "7501234567894" },
]

const clientes: Cliente[] = [
  {
    id: "1",
    nombre: "Roberto Martínez",
    email: "roberto@email.com",
    telefono: "+1234567890",
    credito: 500,
    creditoUsado: 150,
    puntos: 1250,
  },
  {
    id: "2",
    nombre: "Ana Rodríguez",
    email: "ana@email.com",
    telefono: "+1234567891",
    credito: 300,
    creditoUsado: 75,
    puntos: 850,
  },
]

export default function NuevaVentaPage() {
  const [carrito, setCarrito] = useState<ProductoVenta[]>([])
  const [codigoBarras, setCodigoBarras] = useState("")
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null)
  const [busquedaCliente, setBusquedaCliente] = useState("")
  const [metodoPago, setMetodoPago] = useState("efectivo")
  const [descuentoGeneral, setDescuentoGeneral] = useState(0)
  const [montoRecibido, setMontoRecibido] = useState("")
  const [observaciones, setObservaciones] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const agregarProducto = (producto: any) => {
    const productoExistente = carrito.find((item) => item.id === producto.id)
    if (productoExistente) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
                subtotal: (item.cantidad + 1) * item.precio * (1 - item.descuento / 100),
              }
            : item,
        ),
      )
    } else {
      const nuevoProducto: ProductoVenta = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
        descuento: 0,
        subtotal: producto.precio,
      }
      setCarrito([...carrito, nuevoProducto])
    }
  }

  const actualizarCantidad = (id: string, cantidad: number) => {
    if (cantidad <= 0) {
      eliminarProducto(id)
    } else {
      setCarrito(
        carrito.map((item) =>
          item.id === id ? { ...item, cantidad, subtotal: cantidad * item.precio * (1 - item.descuento / 100) } : item,
        ),
      )
    }
  }

  const actualizarDescuento = (id: string, descuento: number) => {
    setCarrito(
      carrito.map((item) =>
        item.id === id ? { ...item, descuento, subtotal: item.cantidad * item.precio * (1 - descuento / 100) } : item,
      ),
    )
  }

  const eliminarProducto = (id: string) => {
    setCarrito(carrito.filter((item) => item.id !== id))
  }

  const buscarProductoPorCodigo = (codigo: string) => {
    const producto = productos.find((p) => p.codigo === codigo)
    if (producto) {
      agregarProducto(producto)
      setCodigoBarras("")
    }
  }

  const subtotal = carrito.reduce((sum, item) => sum + item.subtotal, 0)
  const descuentoTotal = subtotal * (descuentoGeneral / 100)
  const total = subtotal - descuentoTotal
  const cambio = Number.parseFloat(montoRecibido) - total

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(busquedaCliente.toLowerCase()) ||
      cliente.telefono.includes(busquedaCliente),
  )

  const validarVenta = () => {
    const newErrors: Record<string, string> = {}

    if (carrito.length === 0) newErrors.carrito = "Debe agregar al menos un producto"
    if (metodoPago === "efectivo" && !montoRecibido) newErrors.montoRecibido = "Debe ingresar el monto recibido"
    if (metodoPago === "efectivo" && Number.parseFloat(montoRecibido) < total) {
      newErrors.montoRecibido = "El monto recibido debe ser mayor o igual al total"
    }
    if (metodoPago === "credito" && !clienteSeleccionado) {
      newErrors.cliente = "Debe seleccionar un cliente para venta a crédito"
    }
    if (
      metodoPago === "credito" &&
      clienteSeleccionado &&
      clienteSeleccionado.creditoUsado + total > clienteSeleccionado.credito
    ) {
      newErrors.credito = "El cliente no tiene suficiente crédito disponible"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const procesarVenta = () => {
    if (validarVenta()) {
      console.log("Venta procesada:", {
        carrito,
        cliente: clienteSeleccionado,
        metodoPago,
        total,
        montoRecibido,
        cambio,
        observaciones,
      })
      // Aquí iría la lógica para procesar la venta
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/ventas">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Nueva Venta</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Caja 1</Badge>
          <Badge variant="outline">María González</Badge>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Panel izquierdo - Productos y escáner */}
        <div className="lg:col-span-2 space-y-4">
          {/* Escáner de código de barras */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5" />
                Escáner de Código de Barras
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Escanee o ingrese código de barras"
                  value={codigoBarras}
                  onChange={(e) => setCodigoBarras(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      buscarProductoPorCodigo(codigoBarras)
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={() => buscarProductoPorCodigo(codigoBarras)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Búsqueda de cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Cliente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Buscar cliente por nombre o teléfono"
                    value={busquedaCliente}
                    onChange={(e) => setBusquedaCliente(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                {clienteSeleccionado ? (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{clienteSeleccionado.nombre}</p>
                        <p className="text-sm text-muted-foreground">{clienteSeleccionado.telefono}</p>
                        <div className="flex gap-4 text-sm mt-1">
                          <span>
                            Crédito: ${(clienteSeleccionado.credito - clienteSeleccionado.creditoUsado).toFixed(2)}
                          </span>
                          <span>Puntos: {clienteSeleccionado.puntos}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setClienteSeleccionado(null)}>
                        Quitar
                      </Button>
                    </div>
                  </div>
                ) : (
                  busquedaCliente && (
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {clientesFiltrados.map((cliente) => (
                        <div
                          key={cliente.id}
                          className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                          onClick={() => {
                            setClienteSeleccionado(cliente)
                            setBusquedaCliente("")
                          }}
                        >
                          <p className="font-medium">{cliente.nombre}</p>
                          <p className="text-sm text-muted-foreground">{cliente.telefono}</p>
                        </div>
                      ))}
                    </div>
                  )
                )}
                {errors.cliente && <p className="text-sm text-red-500">{errors.cliente}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Productos disponibles */}
          <Card>
            <CardHeader>
              <CardTitle>Productos Disponibles</CardTitle>
              <CardDescription>Haga clic en un producto para agregarlo al carrito</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2">
                {productos.map((producto) => (
                  <div
                    key={producto.id}
                    className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted"
                    onClick={() => agregarProducto(producto)}
                  >
                    <div>
                      <p className="font-medium">{producto.nombre}</p>
                      <p className="text-sm text-muted-foreground">${producto.precio.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">Stock: {producto.stock}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel derecho - Carrito y pago */}
        <div className="space-y-4">
          {/* Carrito de compras */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Carrito de Compras
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {carrito.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">El carrito está vacío</p>
              ) : (
                <div className="space-y-3">
                  {carrito.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{item.nombre}</p>
                        <Button size="sm" variant="destructive" onClick={() => eliminarProducto(item.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">${item.precio.toFixed(2)} c/u</span>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.cantidad}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Label className="text-xs">Desc %:</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={item.descuento}
                          onChange={(e) => actualizarDescuento(item.id, Number.parseFloat(e.target.value) || 0)}
                          className="h-6 text-xs w-16"
                        />
                        <span className="text-sm font-medium ml-auto">${item.subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {errors.carrito && <p className="text-sm text-red-500">{errors.carrito}</p>}

              <Separator />

              {/* Descuento general */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Descuento General (%)</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={descuentoGeneral}
                    onChange={(e) => setDescuentoGeneral(Number.parseFloat(e.target.value) || 0)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Percent className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Totales */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {descuentoGeneral > 0 && (
                  <div className="flex justify-between text-sm text-red-600">
                    <span>Descuento ({descuentoGeneral}%):</span>
                    <span>-${descuentoTotal.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              {/* Método de pago */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Método de Pago</Label>
                <Select value={metodoPago} onValueChange={setMetodoPago}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="efectivo">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Efectivo
                      </div>
                    </SelectItem>
                    <SelectItem value="tarjeta">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Tarjeta
                      </div>
                    </SelectItem>
                    <SelectItem value="transferencia">Transferencia</SelectItem>
                    <SelectItem value="credito">Crédito</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Monto recibido (solo para efectivo) */}
              {metodoPago === "efectivo" && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Monto Recibido</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={montoRecibido}
                    onChange={(e) => setMontoRecibido(e.target.value)}
                    placeholder="0.00"
                    className={errors.montoRecibido ? "border-red-500" : ""}
                  />
                  {errors.montoRecibido && <p className="text-sm text-red-500">{errors.montoRecibido}</p>}
                  {montoRecibido && Number.parseFloat(montoRecibido) >= total && (
                    <div className="p-2 bg-green-50 rounded text-sm">
                      <span className="font-medium text-green-800">Cambio: ${cambio.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Validación de crédito */}
              {metodoPago === "credito" && clienteSeleccionado && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm">
                    <p>
                      Crédito disponible: ${(clienteSeleccionado.credito - clienteSeleccionado.creditoUsado).toFixed(2)}
                    </p>
                    <p>Total de la venta: ${total.toFixed(2)}</p>
                    {clienteSeleccionado.creditoUsado + total > clienteSeleccionado.credito && (
                      <p className="text-red-600 font-medium">Crédito insuficiente</p>
                    )}
                  </div>
                </div>
              )}
              {errors.credito && <p className="text-sm text-red-500">{errors.credito}</p>}

              {/* Observaciones */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Observaciones</Label>
                <Textarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Notas adicionales..."
                  rows={2}
                />
              </div>

              {/* Botones de acción */}
              <div className="space-y-2">
                <Button className="w-full" size="lg" onClick={procesarVenta} disabled={carrito.length === 0}>
                  <Calculator className="h-4 w-4 mr-2" />
                  Procesar Venta
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={() => setCarrito([])}>
                    Limpiar
                  </Button>
                  <Button variant="outline">
                    <Receipt className="h-4 w-4 mr-2" />
                    Cotizar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

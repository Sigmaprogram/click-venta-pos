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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Save, ArrowLeft, Upload, Barcode, DollarSign, Scale, AlertTriangle } from "lucide-react"
import Link from "next/link"

const categorias = [
  { id: "bebidas", nombre: "Bebidas" },
  { id: "lacteos", nombre: "Lácteos" },
  { id: "panaderia", nombre: "Panadería" },
  { id: "granos", nombre: "Granos y Cereales" },
  { id: "aceites", nombre: "Aceites y Vinagres" },
  { id: "carnes", nombre: "Carnes y Embutidos" },
  { id: "frutas", nombre: "Frutas y Verduras" },
  { id: "limpieza", nombre: "Productos de Limpieza" },
  { id: "higiene", nombre: "Higiene Personal" },
  { id: "otros", nombre: "Otros" },
]

const marcas = [
  { id: "coca-cola", nombre: "Coca Cola" },
  { id: "bimbo", nombre: "Bimbo" },
  { id: "alpura", nombre: "Alpura" },
  { id: "verde-valle", nombre: "Verde Valle" },
  { id: "capullo", nombre: "Capullo" },
  { id: "lala", nombre: "Lala" },
  { id: "sabritas", nombre: "Sabritas" },
  { id: "nestle", nombre: "Nestlé" },
  { id: "unilever", nombre: "Unilever" },
  { id: "generico", nombre: "Genérico" },
]

const proveedores = [
  { id: "1", nombre: "Distribuidora ABC" },
  { id: "2", nombre: "Lácteos del Norte" },
  { id: "3", nombre: "Panadería Central" },
  { id: "4", nombre: "Frutas y Verduras SA" },
  { id: "5", nombre: "Productos de Limpieza XYZ" },
]

const unidadesMedida = [
  { id: "pieza", nombre: "Pieza" },
  { id: "kilogramo", nombre: "Kilogramo" },
  { id: "gramo", nombre: "Gramo" },
  { id: "litro", nombre: "Litro" },
  { id: "mililitro", nombre: "Mililitro" },
  { id: "paquete", nombre: "Paquete" },
  { id: "caja", nombre: "Caja" },
  { id: "bolsa", nombre: "Bolsa" },
]

export default function CrearProductoPage() {
  const [formData, setFormData] = useState({
    // Información básica
    nombre: "",
    descripcion: "",
    codigoBarras: "",
    codigoInterno: "",
    categoria: "",
    marca: "",
    proveedor: "",

    // Precios y costos
    precioCompra: "",
    precioVenta: "",
    margenGanancia: "",
    iva: "16",
    descuentoMaximo: "",

    // Inventario
    stock: "",
    stockMinimo: "",
    stockMaximo: "",
    unidadMedida: "",
    ubicacion: "",

    // Características
    peso: "",
    dimensiones: "",
    fechaVencimiento: "",
    lote: "",
    requiereRefrigeracion: false,
    esPerecible: false,
    ventaPorPeso: false,

    // Imágenes
    imagenes: [] as File[],

    // Estado
    activo: true,
    observaciones: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const generateBarcode = () => {
    const timestamp = Date.now().toString()
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    const barcode = `750${timestamp.slice(-7)}${random}`
    setFormData({ ...formData, codigoBarras: barcode })
  }

  const calculateMargin = () => {
    const compra = Number.parseFloat(formData.precioCompra) || 0
    const venta = Number.parseFloat(formData.precioVenta) || 0
    if (compra > 0 && venta > 0) {
      const margen = (((venta - compra) / compra) * 100).toFixed(2)
      setFormData({ ...formData, margenGanancia: margen })
    }
  }

  const calculateSalePrice = () => {
    const compra = Number.parseFloat(formData.precioCompra) || 0
    const margen = Number.parseFloat(formData.margenGanancia) || 0
    if (compra > 0 && margen > 0) {
      const venta = (compra * (1 + margen / 100)).toFixed(2)
      setFormData({ ...formData, precioVenta: venta })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido"
    if (!formData.codigoBarras.trim()) newErrors.codigoBarras = "El código de barras es requerido"
    if (!formData.categoria) newErrors.categoria = "La categoría es requerida"
    if (!formData.precioCompra) newErrors.precioCompra = "El precio de compra es requerido"
    if (!formData.precioVenta) newErrors.precioVenta = "El precio de venta es requerido"
    if (!formData.stock) newErrors.stock = "El stock inicial es requerido"
    if (!formData.stockMinimo) newErrors.stockMinimo = "El stock mínimo es requerido"
    if (!formData.unidadMedida) newErrors.unidadMedida = "La unidad de medida es requerida"

    const precioCompra = Number.parseFloat(formData.precioCompra) || 0
    const precioVenta = Number.parseFloat(formData.precioVenta) || 0
    if (precioVenta <= precioCompra) {
      newErrors.precioVenta = "El precio de venta debe ser mayor al precio de compra"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Producto creado:", formData)
      // Aquí iría la lógica para crear el producto
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/inventario">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Crear Nuevo Producto</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Guardar Producto
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="basico" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basico">Información Básica</TabsTrigger>
            <TabsTrigger value="precios">Precios y Costos</TabsTrigger>
            <TabsTrigger value="inventario">Inventario</TabsTrigger>
            <TabsTrigger value="caracteristicas">Características</TabsTrigger>
            <TabsTrigger value="imagenes">Imágenes</TabsTrigger>
          </TabsList>

          <TabsContent value="basico" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Información Básica del Producto
                </CardTitle>
                <CardDescription>Datos principales del producto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre del Producto *</Label>
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className={errors.nombre ? "border-red-500" : ""}
                      placeholder="Ej: Coca Cola 600ml"
                    />
                    {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="codigoInterno">Código Interno</Label>
                    <Input
                      id="codigoInterno"
                      value={formData.codigoInterno}
                      onChange={(e) => setFormData({ ...formData, codigoInterno: e.target.value })}
                      placeholder="PROD-001"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    rows={3}
                    placeholder="Descripción detallada del producto..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="codigoBarras">Código de Barras *</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="codigoBarras"
                      value={formData.codigoBarras}
                      onChange={(e) => setFormData({ ...formData, codigoBarras: e.target.value })}
                      className={errors.codigoBarras ? "border-red-500" : ""}
                      placeholder="7501234567890"
                    />
                    <Button type="button" variant="outline" onClick={generateBarcode}>
                      <Barcode className="h-4 w-4 mr-2" />
                      Generar
                    </Button>
                  </div>
                  {errors.codigoBarras && <p className="text-sm text-red-500">{errors.codigoBarras}</p>}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoría *</Label>
                    <Select
                      value={formData.categoria}
                      onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                    >
                      <SelectTrigger className={errors.categoria ? "border-red-500" : ""}>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((categoria) => (
                          <SelectItem key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.categoria && <p className="text-sm text-red-500">{errors.categoria}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marca">Marca</Label>
                    <Select
                      value={formData.marca}
                      onValueChange={(value) => setFormData({ ...formData, marca: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar marca" />
                      </SelectTrigger>
                      <SelectContent>
                        {marcas.map((marca) => (
                          <SelectItem key={marca.id} value={marca.id}>
                            {marca.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proveedor">Proveedor Principal</Label>
                    <Select
                      value={formData.proveedor}
                      onValueChange={(value) => setFormData({ ...formData, proveedor: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar proveedor" />
                      </SelectTrigger>
                      <SelectContent>
                        {proveedores.map((proveedor) => (
                          <SelectItem key={proveedor.id} value={proveedor.id}>
                            {proveedor.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="precios" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Precios y Costos
                </CardTitle>
                <CardDescription>Configuración de precios y márgenes de ganancia</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="precioCompra">Precio de Compra *</Label>
                    <Input
                      id="precioCompra"
                      type="number"
                      step="0.01"
                      value={formData.precioCompra}
                      onChange={(e) => {
                        setFormData({ ...formData, precioCompra: e.target.value })
                        setTimeout(calculateMargin, 100)
                      }}
                      className={errors.precioCompra ? "border-red-500" : ""}
                      placeholder="0.00"
                    />
                    {errors.precioCompra && <p className="text-sm text-red-500">{errors.precioCompra}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="precioVenta">Precio de Venta *</Label>
                    <Input
                      id="precioVenta"
                      type="number"
                      step="0.01"
                      value={formData.precioVenta}
                      onChange={(e) => {
                        setFormData({ ...formData, precioVenta: e.target.value })
                        setTimeout(calculateMargin, 100)
                      }}
                      className={errors.precioVenta ? "border-red-500" : ""}
                      placeholder="0.00"
                    />
                    {errors.precioVenta && <p className="text-sm text-red-500">{errors.precioVenta}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="margenGanancia">Margen de Ganancia (%)</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="margenGanancia"
                        type="number"
                        step="0.01"
                        value={formData.margenGanancia}
                        onChange={(e) => {
                          setFormData({ ...formData, margenGanancia: e.target.value })
                          setTimeout(calculateSalePrice, 100)
                        }}
                        placeholder="0.00"
                      />
                      <Button type="button" variant="outline" onClick={calculateMargin}>
                        Calcular
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="iva">IVA (%)</Label>
                    <Select value={formData.iva} onValueChange={(value) => setFormData({ ...formData, iva: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0% - Exento</SelectItem>
                        <SelectItem value="8">8% - Tasa reducida</SelectItem>
                        <SelectItem value="16">16% - Tasa general</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="descuentoMaximo">Descuento Máximo (%)</Label>
                    <Input
                      id="descuentoMaximo"
                      type="number"
                      step="0.01"
                      max="100"
                      value={formData.descuentoMaximo}
                      onChange={(e) => setFormData({ ...formData, descuentoMaximo: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {formData.precioCompra && formData.precioVenta && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Resumen de Precios</h4>
                    <div className="grid gap-2 md:grid-cols-3 text-sm">
                      <div>
                        <span className="text-green-700">Precio de Compra:</span>
                        <span className="font-medium ml-2">${Number.parseFloat(formData.precioCompra).toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-green-700">Precio de Venta:</span>
                        <span className="font-medium ml-2">${Number.parseFloat(formData.precioVenta).toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-green-700">Ganancia:</span>
                        <span className="font-medium ml-2">
                          $
                          {(Number.parseFloat(formData.precioVenta) - Number.parseFloat(formData.precioCompra)).toFixed(
                            2,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventario" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Control de Inventario
                </CardTitle>
                <CardDescription>Configuración de stock y ubicación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Inicial *</Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className={errors.stock ? "border-red-500" : ""}
                      placeholder="0"
                    />
                    {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stockMinimo">Stock Mínimo *</Label>
                    <Input
                      id="stockMinimo"
                      type="number"
                      min="0"
                      value={formData.stockMinimo}
                      onChange={(e) => setFormData({ ...formData, stockMinimo: e.target.value })}
                      className={errors.stockMinimo ? "border-red-500" : ""}
                      placeholder="0"
                    />
                    {errors.stockMinimo && <p className="text-sm text-red-500">{errors.stockMinimo}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stockMaximo">Stock Máximo</Label>
                    <Input
                      id="stockMaximo"
                      type="number"
                      min="0"
                      value={formData.stockMaximo}
                      onChange={(e) => setFormData({ ...formData, stockMaximo: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unidadMedida">Unidad de Medida *</Label>
                    <Select
                      value={formData.unidadMedida}
                      onValueChange={(value) => setFormData({ ...formData, unidadMedida: value })}
                    >
                      <SelectTrigger className={errors.unidadMedida ? "border-red-500" : ""}>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {unidadesMedida.map((unidad) => (
                          <SelectItem key={unidad.id} value={unidad.id}>
                            {unidad.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.unidadMedida && <p className="text-sm text-red-500">{errors.unidadMedida}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ubicacion">Ubicación en Tienda</Label>
                  <Input
                    id="ubicacion"
                    value={formData.ubicacion}
                    onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                    placeholder="Ej: Góndola A1, Refrigerador 2, Estante B3"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Configuración de Inventario</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Venta por Peso</Label>
                        <p className="text-sm text-muted-foreground">
                          El producto se vende por peso (requiere balanza)
                        </p>
                      </div>
                      <Switch
                        checked={formData.ventaPorPeso}
                        onCheckedChange={(checked) => setFormData({ ...formData, ventaPorPeso: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Producto Perecible</Label>
                        <p className="text-sm text-muted-foreground">El producto tiene fecha de vencimiento</p>
                      </div>
                      <Switch
                        checked={formData.esPerecible}
                        onCheckedChange={(checked) => setFormData({ ...formData, esPerecible: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Requiere Refrigeración</Label>
                        <p className="text-sm text-muted-foreground">El producto debe mantenerse refrigerado</p>
                      </div>
                      <Switch
                        checked={formData.requiereRefrigeracion}
                        onCheckedChange={(checked) => setFormData({ ...formData, requiereRefrigeracion: checked })}
                      />
                    </div>
                  </div>
                </div>

                {Number.parseInt(formData.stock) <= Number.parseInt(formData.stockMinimo) &&
                  formData.stock &&
                  formData.stockMinimo && (
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800">Stock Bajo</h4>
                          <p className="text-sm text-yellow-700">
                            El stock inicial está por debajo o igual al stock mínimo. Considere aumentar el stock
                            inicial o ajustar el stock mínimo.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="caracteristicas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Características del Producto
                </CardTitle>
                <CardDescription>Información adicional y características físicas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="peso">Peso (gramos)</Label>
                    <Input
                      id="peso"
                      type="number"
                      step="0.01"
                      value={formData.peso}
                      onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensiones">Dimensiones (cm)</Label>
                    <Input
                      id="dimensiones"
                      value={formData.dimensiones}
                      onChange={(e) => setFormData({ ...formData, dimensiones: e.target.value })}
                      placeholder="Largo x Ancho x Alto"
                    />
                  </div>
                </div>

                {formData.esPerecible && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fechaVencimiento">Fecha de Vencimiento</Label>
                      <Input
                        id="fechaVencimiento"
                        type="date"
                        value={formData.fechaVencimiento}
                        onChange={(e) => setFormData({ ...formData, fechaVencimiento: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lote">Número de Lote</Label>
                      <Input
                        id="lote"
                        value={formData.lote}
                        onChange={(e) => setFormData({ ...formData, lote: e.target.value })}
                        placeholder="LOTE-001"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="observaciones">Observaciones</Label>
                  <Textarea
                    id="observaciones"
                    value={formData.observaciones}
                    onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                    rows={3}
                    placeholder="Notas adicionales sobre el producto..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Producto Activo</Label>
                    <p className="text-sm text-muted-foreground">El producto estará disponible para la venta</p>
                  </div>
                  <Switch
                    checked={formData.activo}
                    onCheckedChange={(checked) => setFormData({ ...formData, activo: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="imagenes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Imágenes del Producto
                </CardTitle>
                <CardDescription>Suba imágenes del producto para facilitar su identificación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Imágenes del Producto</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Arrastra y suelta las imágenes aquí, o haz clic para seleccionar
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || [])
                        setFormData({ ...formData, imagenes: files })
                      }}
                      className="hidden"
                      id="imagenes"
                    />
                    <Label htmlFor="imagenes">
                      <Button type="button" variant="outline" className="cursor-pointer">
                        Seleccionar Imágenes
                      </Button>
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Formatos soportados: JPG, PNG, GIF. Tamaño máximo: 5MB por imagen.
                  </p>
                </div>

                {formData.imagenes.length > 0 && (
                  <div className="space-y-2">
                    <Label>Imágenes Seleccionadas</Label>
                    <div className="grid gap-4 md:grid-cols-3">
                      {formData.imagenes.map((imagen, index) => (
                        <div key={index} className="relative">
                          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                            <Package className="h-8 w-8 text-gray-400" />
                          </div>
                          <p className="text-xs text-center mt-1 truncate">{imagen.name}</p>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => {
                              const newImages = formData.imagenes.filter((_, i) => i !== index)
                              setFormData({ ...formData, imagenes: newImages })
                            }}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}

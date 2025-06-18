"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Wallet,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calculator,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Importing mock data
import { cajas, movimientosCaja, arqueosDiarios } from "@/lib/data";

export default function CajaPage() {
  const [selectedCaja, setSelectedCaja] = useState("1");

  const getEstadoBadge = (estado: string) => {
    const variants = {
      Abierta: (
        <Badge className="bg-green-100 text-green-800">
          <Unlock className="h-3 w-3 mr-1" />
          Abierta
        </Badge>
      ),
      Cerrada: (
        <Badge variant="secondary">
          <Lock className="h-3 w-3 mr-1" />
          Cerrada
        </Badge>
      ),
      Cuadrada: (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Cuadrada
        </Badge>
      ),
      Diferencia: (
        <Badge variant="destructive">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Diferencia
        </Badge>
      ),
    };
    return variants[estado as keyof typeof variants] || <Badge>{estado}</Badge>;
  };

  const getTipoIcon = (tipo: string) => {
    return tipo === "Entrada" ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    );
  };

  const totalVentas = cajas.reduce(
    (sum, caja) =>
      sum + caja.ventasEfectivo + caja.ventasTarjeta + caja.ventasTransferencia,
    0
  );

  const totalEfectivo = cajas.reduce(
    (sum, caja) => sum + caja.ventasEfectivo,
    0
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Control de Caja</h2>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Calculator className="h-4 w-4 mr-2" />
                Arqueo de Caja
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Realizar Arqueo de Caja</DialogTitle>
                <DialogDescription>
                  Registre el conteo físico del dinero en caja para verificar
                  diferencias.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="caja" className="text-right">
                    Caja
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccionar caja" />
                    </SelectTrigger>
                    <SelectContent>
                      {cajas
                        .filter((c) => c.estado === "Abierta")
                        .map((caja) => (
                          <SelectItem key={caja.id} value={caja.id}>
                            {caja.nombre} - {caja.usuario}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="montoSistema" className="text-right">
                    Monto Sistema
                  </Label>
                  <Input
                    id="montoSistema"
                    value="$1,705.50"
                    readOnly
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="montoFisico" className="text-right">
                    Monto Físico
                  </Label>
                  <Input
                    id="montoFisico"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="observaciones" className="text-right">
                    Observaciones
                  </Label>
                  <Textarea
                    id="observaciones"
                    placeholder="Observaciones del arqueo..."
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Realizar Arqueo</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Ventas Hoy
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${totalVentas.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Todas las cajas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Efectivo en Cajas
            </CardTitle>
            <Wallet className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${totalEfectivo.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Solo efectivo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Cajas Abiertas
            </CardTitle>
            <Unlock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {cajas.filter((c) => c.estado === "Abierta").length}
            </div>
            <p className="text-xs text-muted-foreground">
              De {cajas.length} totales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Diferencias</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              $
              {Math.abs(
                cajas.reduce((sum, c) => sum + (c.diferencia || 0), 0)
              ).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Total diferencias</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="estado" className="space-y-4">
        <TabsList>
          <TabsTrigger value="estado">Estado de Cajas</TabsTrigger>
          <TabsTrigger value="movimientos">Movimientos</TabsTrigger>
          <TabsTrigger value="arqueos">Arqueos</TabsTrigger>
          <TabsTrigger value="cierre">Cierre Diario</TabsTrigger>
        </TabsList>

        <TabsContent value="estado" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estado Actual de las Cajas</CardTitle>
              <CardDescription>
                Monitoreo en tiempo real del estado de todas las cajas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Caja</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Apertura</TableHead>
                    <TableHead>Monto Inicial</TableHead>
                    <TableHead>Ventas Efectivo</TableHead>
                    <TableHead>Ventas Tarjeta</TableHead>
                    <TableHead>Monto Actual</TableHead>
                    <TableHead>Diferencia</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cajas.map((caja) => (
                    <TableRow key={caja.id}>
                      <TableCell className="font-medium">
                        {caja.nombre}
                      </TableCell>
                      <TableCell>{caja.usuario}</TableCell>
                      <TableCell>{getEstadoBadge(caja.estado)}</TableCell>
                      <TableCell>{caja.apertura}</TableCell>
                      <TableCell>${caja.montoApertura.toFixed(2)}</TableCell>
                      <TableCell>${caja.ventasEfectivo.toFixed(2)}</TableCell>
                      <TableCell>${caja.ventasTarjeta.toFixed(2)}</TableCell>
                      <TableCell>${caja.montoActual.toFixed(2)}</TableCell>
                      <TableCell>
                        {caja.diferencia === 0 ? (
                          <Badge className="bg-green-100 text-green-800">
                            $0.00
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            ${caja.diferencia.toFixed(2)}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {caja.estado === "Abierta" ? (
                            <Button variant="outline" size="sm">
                              <Lock className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Unlock className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Calculator className="h-4 w-4" />
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

        <TabsContent value="movimientos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Movimientos de Caja</CardTitle>
              <CardDescription>
                Registro detallado de todas las transacciones del día
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Select value={selectedCaja} onValueChange={setSelectedCaja}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filtrar por caja" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las cajas</SelectItem>
                    {cajas.map((caja) => (
                      <SelectItem key={caja.id} value={caja.id}>
                        {caja.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Nuevo Ingreso
                </Button>
                <Button variant="outline">
                  <TrendingDown className="h-4 w-4 mr-2" />
                  Nuevo Egreso
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Concepto</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Caja</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movimientosCaja.map((movimiento) => (
                    <TableRow key={movimiento.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getTipoIcon(movimiento.tipo)}
                          <span
                            className={
                              movimiento.tipo === "Entrada"
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {movimiento.tipo}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{movimiento.concepto}</TableCell>
                      <TableCell>
                        <span
                          className={
                            movimiento.tipo === "Entrada"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {movimiento.tipo === "Entrada" ? "+" : "-"}$
                          {movimiento.monto.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            movimiento.metodoPago === "Efectivo"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {movimiento.metodoPago}
                        </Badge>
                      </TableCell>
                      <TableCell>{movimiento.hora}</TableCell>
                      <TableCell>{movimiento.usuario}</TableCell>
                      <TableCell>{movimiento.caja}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="arqueos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Arqueos</CardTitle>
              <CardDescription>
                Registro de todos los arqueos realizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Caja</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Monto Sistema</TableHead>
                    <TableHead>Monto Físico</TableHead>
                    <TableHead>Diferencia</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Observaciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {arqueosDiarios.map((arqueo, index) => (
                    <TableRow key={index}>
                      <TableCell>{arqueo.fecha}</TableCell>
                      <TableCell>{arqueo.caja}</TableCell>
                      <TableCell>{arqueo.usuario}</TableCell>
                      <TableCell>${arqueo.montoSistema.toFixed(2)}</TableCell>
                      <TableCell>${arqueo.montoFisico.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={
                            arqueo.diferencia === 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          ${arqueo.diferencia.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>{getEstadoBadge(arqueo.estado)}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {arqueo.observaciones || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cierre" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cierre Diario de Cajas</CardTitle>
              <CardDescription>
                Resumen consolidado del día y cierre de operaciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Resumen del Día</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Ventas Efectivo:</span>
                        <span className="font-medium">
                          ${totalEfectivo.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Ventas Tarjeta:</span>
                        <span className="font-medium">
                          $
                          {cajas
                            .reduce((sum, c) => sum + c.ventasTarjeta, 0)
                            .toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Transferencias:</span>
                        <span className="font-medium">
                          $
                          {cajas
                            .reduce((sum, c) => sum + c.ventasTransferencia, 0)
                            .toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Gastos:</span>
                        <span className="font-medium text-red-600">
                          -$
                          {cajas
                            .reduce((sum, c) => sum + c.gastos, 0)
                            .toFixed(2)}
                        </span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total General:</span>
                        <span className="text-green-600">
                          ${totalVentas.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Acciones de Cierre
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full" variant="outline">
                        <Calculator className="h-4 w-4 mr-2" />
                        Arqueo General
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Lock className="h-4 w-4 mr-2" />
                        Cerrar Todas las Cajas
                      </Button>
                      <Button className="w-full" variant="outline">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Generar Reporte Diario
                      </Button>
                      <Button className="w-full">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Finalizar Día
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

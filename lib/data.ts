// Caja Management System Data

export const cajas = [{
    id: "1",
    nombre: "Caja Principal",
    usuario: "María González",
    estado: "Abierta",
    apertura: "08:00",
    montoApertura: 500.0,
    ventasEfectivo: 1250.5,
    ventasTarjeta: 850.75,
    ventasTransferencia: 320.25,
    gastos: 45.0,
    montoActual: 1705.5,
    diferencia: 0.0,
  },
]

export const movimientosCaja = [
  {
    id: "1",
    tipo: "Entrada",
    concepto: "Venta #001234",
    monto: 45.5,
    metodoPago: "Efectivo",
    hora: "14:30",
    usuario: "María González",
    caja: "Caja Principal",
  },
]

export const arqueosDiarios = [
  {
    fecha: "2024-06-01",
    caja: "Caja Principal",
    usuario: "María González",
    montoSistema: 1705.5,
    montoFisico: 1705.5,
    diferencia: 0.0,
    estado: "Cuadrada",
    observaciones: "",
  },
]

// Clientes
export const clientes = [
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

export const historialCompras = [
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

export const programaFidelizacion = {
  niveles: [
    { nombre: "Bronze", minimo: 0, descuento: 2, color: "bg-orange-100 text-orange-800" },
    { nombre: "Silver", minimo: 500, descuento: 5, color: "bg-gray-100 text-gray-800" },
    { nombre: "Gold", minimo: 1000, descuento: 8, color: "bg-yellow-100 text-yellow-800" },
    { nombre: "Platinum", minimo: 2000, descuento: 12, color: "bg-purple-100 text-purple-800" },
  ],
  puntosXPeso: 1, // 1 punto por cada peso gastado
  pesoXPunto: 0.01, // 1 punto = $0.01
}
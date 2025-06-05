"use client"

import type * as React from "react"
import {
  BarChart3,
  Building2,
  ChevronUp,
  CreditCard,
  Home,
  Package,
  Settings,
  ShoppingCart,
  User2,
  Users,
  Wallet,
  FileText,
  Shield,
  Clock,
  Smartphone,
  Scale,
  MapPin,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import Link from "next/link"

// Datos del menú
const data = {
  user: {
    name: "Admin Principal",
    email: "admin@minisuper.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Ventas",
      url: "/ventas",
      icon: CreditCard,
      items: [
        {
          title: "Punto de Venta",
          url: "/ventas/pos",
        },
        {
          title: "Historial de Ventas",
          url: "/ventas/historial",
        },
        {
          title: "Devoluciones",
          url: "/ventas/devoluciones",
        },
        {
          title: "Promociones",
          url: "/ventas/promociones",
        },
      ],
    },
    {
      title: "Inventario",
      url: "/inventario",
      icon: Package,
      items: [
        {
          title: "Productos",
          url: "/inventario/productos",
        },
        {
          title: "Categorías",
          url: "/inventario/categorias",
        },
        {
          title: "Stock",
          url: "/inventario/stock",
        },
        {
          title: "Movimientos",
          url: "/inventario/movimientos",
        },
      ],
    },
    {
      title: "Compras",
      url: "/compras",
      icon: ShoppingCart,
      items: [
        {
          title: "Órdenes de Compra",
          url: "/compras/ordenes",
        },
        {
          title: "Proveedores",
          url: "/compras/proveedores",
        },
        {
          title: "Recepción",
          url: "/compras/recepcion",
        },
      ],
    },
    {
      title: "Usuarios",
      url: "/usuarios",
      icon: Users,
      items: [
        {
          title: "Gestión de Usuarios",
          url: "/usuarios/gestion",
        },
        {
          title: "Roles y Permisos",
          url: "/usuarios/roles",
        },
        {
          title: "Turnos",
          url: "/usuarios/turnos",
        },
      ],
    },
    {
      title: "Reportes",
      url: "/reportes",
      icon: BarChart3,
      items: [
        {
          title: "Ventas",
          url: "/reportes/ventas",
        },
        {
          title: "Inventario",
          url: "/reportes/inventario",
        },
        {
          title: "Financiero",
          url: "/reportes/financiero",
        },
        {
          title: "Usuarios",
          url: "/reportes/usuarios",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Clientes",
      url: "/clientes",
      icon: User2,
    },
    {
      title: "Caja",
      url: "/caja",
      icon: Wallet,
    },
    {
      title: "Configuración",
      url: "/configuracion",
      icon: Settings,
    },
  ],
  navAdditional: [
    {
      title: "Módulos Adicionales",
      items: [
        {
          title: "Seguridad",
          url: "/seguridad",
          icon: Shield,
        },
        {
          title: "Auditoría",
          url: "/auditoria",
          icon: FileText,
        },
        {
          title: "Horarios",
          url: "/horarios",
          icon: Clock,
        },
        {
          title: "App Móvil",
          url: "/movil",
          icon: Smartphone,
        },
        {
          title: "Balanzas",
          url: "/balanzas",
          icon: Scale,
        },
        {
          title: "Delivery",
          url: "/delivery",
          icon: MapPin,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Building2 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">MiniSuper POS</span>
                  <span className="truncate text-xs">Sistema Integral</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Módulos Principales</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <Collapsible key={item.title} asChild defaultOpen={item.title === "Dashboard"}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Gestión</SidebarGroupLabel>
          <SidebarMenu>
            {data.navSecondary.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Funciones Avanzadas</SidebarGroupLabel>
          <SidebarMenu>
            {data.navAdditional[0].items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{data.user.name}</span>
                    <span className="truncate text-xs">{data.user.email}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <span>Mi Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

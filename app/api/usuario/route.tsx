import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([]);
}

// import { NextRequest, NextResponse } from "next/server";

// // Simulación de base de datos en memoria
// let usuarios: { id: number; nombre: string; email: string }[] = [];
// let nextId = 1;
// type Usuario = {
//   id: number;
//   nombrecompleto: string;
//   nombreusuario: string;
//   rol: string;
//   turno: string;
//   contraseña: string;
// };

// // GET: Obtener todos los usuarios
// export async function GET() {
//   return NextResponse.json(usuarios);
// }

// // POST: Crear un nuevo usuario
// export async function POST(request: NextRequest) {
//   const data = await request.json();
//   const nuevoUsuario = { id: nextId++, ...data };
//   usuarios.push(nuevoUsuario);
//   return NextResponse.json(nuevoUsuario, { status: 201 });
// }

// // PUT: Actualizar un usuario existente
// export async function PUT(request: NextRequest) {
//   const data = await request.json();
//   const index = usuarios.findIndex((u) => u.id === data.id);
//   if (index === -1) {
//     return NextResponse.json(
//       { error: "Usuario no encontrado" },
//       { status: 404 }
//     );
//   }
//   usuarios[index] = { ...usuarios[index], ...data };
//   return NextResponse.json(usuarios[index]);
// }

// // DELETE: Eliminar un usuario por id (enviado en el body)
// export async function DELETE(request: NextRequest) {
//   const data = await request.json();
//   const index = usuarios.findIndex((u) => u.id === data.id);
//   if (index === -1) {
//     return NextResponse.json(
//       { error: "Usuario no encontrado" },
//       { status: 404 }
//     );
//   }
//   const eliminado = usuarios.splice(index, 1)[0];
//   return NextResponse.json(eliminado);
// }

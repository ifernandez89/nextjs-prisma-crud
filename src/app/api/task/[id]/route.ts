import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(req: NextRequest) {//export async function GET(request: Request, { params }: { params: { id: string } }) {
  const url = req.nextUrl; // Extrae el objeto URL
  const id = url.pathname.split('/').pop(); // Obtiene el valor de 'id' desde la ruta
  try {
    // Convert the 'id' from string to number
    const taskId = Number(id);

    if (isNaN(taskId)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const task = await prisma.task.findFirst({
      where: {
        id: taskId, // Use the converted number
      },
    });

    if (!task) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(task); // Return the task data
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {//export async function PUT(request: Request, { params } : { params: { id: string } }) {
  const url = req.nextUrl; // Extrae el objeto URL
  const id = url.pathname.split('/').pop(); // Obtiene el valor de 'id' desde la ruta
  const data = await req.json();
  const taskUpdated = await prisma.task.update({
    where: {
      id: Number(id),
    },
    data: data,
  });
  return NextResponse.json(taskUpdated);
}

export async function DELETE(req: NextRequest) {//export async function DELETE(request: Request, { params } : { params: { id: string } }) {
  const url = req.nextUrl; // Extrae el objeto URL
  const id = url.pathname.split('/').pop(); // Obtiene el valor de 'id' desde la ruta
  const task = await prisma.task.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(task);
}

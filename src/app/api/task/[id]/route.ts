import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Convert the 'id' from string to number
    const taskId = Number(params.id);

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

export async function PUT(request: Request, { params } : { params: { id: string } }) {
  const data = await request.json();
  const taskUpdated = await prisma.task.update({
    where: {
      id: Number(params.id),
    },
    data: data,
  });
  return NextResponse.json(taskUpdated);
}

export async function DELETE(request: Request, { params } : { params: { id: string } }) {
  const task = await prisma.task.delete({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json(task);
}

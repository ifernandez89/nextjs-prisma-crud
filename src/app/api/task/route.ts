import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma'

export async function GET(request: Request, { params }: { params: { id: number } }) {
    try {
      const task = await prisma.task.findUnique({
        where: { id: params.id },
      });
  
      if (!task) {
        return NextResponse.json({ message: 'Task not found' }, { status: 404 });
      }
  
      return NextResponse.json(task);
    } catch (error) {
        console.error("Error fetching task:", error); // Log the error for debugging
      return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
  }
  export async function POST(request: Request) {
    try {
      const data = await request.json(); // Assuming you're sending JSON data
  
      // Insert the new task into the database
      const newTask = await prisma.task.create({
        data: {
          title: data.title,
          description: data.description,
        },
      });
  
      return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        console.error("Error creating task:", error); // Log the error for debugging
      return NextResponse.json({ message: 'Error creating task' }, { status: 500 });
    }
}
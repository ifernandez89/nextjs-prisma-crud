import { NextResponse, NextRequest } from "next/server";
import {prisma} from '@/libs/prisma'

export async function GET(req: NextRequest) {//export async function GET(request: Request, { params }: { params: { id: string } }){
  const url = req.nextUrl; // Extrae el objeto URL
  const id = url.pathname.split('/').pop(); // Obtiene el valor de 'id' desde la ruta  
  try {
        // Convert the id to a number before passing it to Prisma
        const taskId = Number(id); // Convert string to number
    
        if (isNaN(taskId)) {
          return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
        }
    
        const task = await prisma.task.findUnique({
          where: { id: taskId }, // Use the converted number
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
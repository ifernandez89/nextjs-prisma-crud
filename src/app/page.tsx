//import axios from 'axios'
import TaskCard from "@/components/TaskCard";
import { prisma } from "@/libs/prisma";

async function loadTasks() {
  //peticion http al backend
  //query database
  //load from local storage
  //axios o prisma para el fetch

  //const tasks = await prisma.task.findMany(); //query database
  //return tasks;
  return await prisma.task.findMany();
}

async function HomePage() {
  const tasks = await loadTasks();
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 ">
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} /> //necesita el key para iterar y una task={task}para enviarsela a mi componente
      ))}
    </div>
  );
}

export default HomePage;

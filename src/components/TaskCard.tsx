"use client"
import {Task} from '@prisma/client'
import {useRouter} from 'next/navigation'

interface Props {  
  task: Task;//prisma ya tiene lo tipos de datos en su esquema, y los convierte en su equivalente en typescript...ya los tengo como tipo objeto
}

function TaskCard({ task }: Props) {
    const router=useRouter()//necesito el "use client"
  return (
    <div className="bg-gray-900 p-3 mt-5 hover:bg-gray-800 cursor-pointer" 
    onClick={()=>{
        router.push(`/tasks/edit/${task.id}`)
    }}
    >
      <h3 className="font-bold text-xl ">{task.title }</h3>
      <p className="text-slate-400">{task.description}</p>
    </div>
  );
}

export default TaskCard;

"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation"; //redireccionar a otras paginas
import { useEffect, useState } from "react";

interface Task {
  id: number;   // O el tipo adecuado según tu base de datos
  title: string;
  description?: string; // Opcional, si es necesario
}

function NewPage({ params }: { params: Promise<{ id: string }> }) {
  //items-center: alinear de forma vertical - justify-center: alinear de forma horizontal - block:se posisionan uno sobre el otro - w-full: ocupa todo el ancho(input/textarea)
  //mb-2: margin bottom 2(separacion entre el input y textarea)
  const { handleSubmit, register, setValue } = useForm(); //usar el setValue para el edit REACTHOOKFORM
  const router = useRouter();
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Task[]>([]); // Estado para almacenar los datos de las tareas

  // Resolve the promise and set the unwrapped params
  useEffect(() => {
    params.then((resolvedParams) => setUnwrappedParams(resolvedParams));
  }, [params]);

  useEffect(() => {
    if (unwrappedParams?.id) {
      console.log("obteniendo datos!!!");
      axios.get(`/api/task/${unwrappedParams.id}`).then((res) => {
        setValue("title", res.data.title);
        setValue("description", res.data.description);
      });
    }
  }, [unwrappedParams, setValue]);

  // Cargar los datos de tareas
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/task");
      setData(res.data); // Actualiza el estado con los datos de las tareas
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  // Llamar a fetchData para obtener los datos cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true); // Activa el estado de carga
    try {
      if (unwrappedParams?.id) {
        // PUT para editar
        await axios.put(`/api/task/${unwrappedParams.id}`, data);
      } else {
        // POST para crear
        await axios.post("/api/task", data);
      }
      // Actualizar los datos después de la operación
      await fetchData(); // Aquí puedes llamar a una función que refresque los datos.

      // Navega a la página de inicio después de la operación
      router.push("/");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Ocurrió un error. Por favor, inténtalo de nuevo."); // Manejo básico del error
    } finally {
      setLoading(false); // Finaliza el estado de carga
      router.refresh(); // Actualiza la página
    }
  });

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      try {
        await axios.delete(`/api/task/${unwrappedParams?.id}`);
        router.push("/"); // Redirige a la página principal después de la eliminación
        router.refresh(); // Actualiza la página
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        alert("No se pudo eliminar la tarea. Por favor, intenta nuevamente.");
      }
    }
  };

  return (
    <div>
      <section className="h-[calc(100vh-7rem)] flex items-center justify-center">
        <form onSubmit={onSubmit} className="w-1/4">
          <h1 className="text-3xl font-bold">
            {unwrappedParams?.id ? "Editar" : "Crear"} Tarea
          </h1>
          <label htmlFor="title" className="font-bold text-sm">
            Write your Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Write a Title"
            className="border-spacing-x-3 py-1 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-black block mb-2 w-full"
            {...register("title")}
          />
          <label htmlFor="description" className="font-bold text-sm">
            Write your Description
          </label>
          <textarea
            className="border-spacing-x-3 py-1 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-black block w-full"
            id="description"
            placeholder="Write a Description"
            {...register("description")}
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-sky-500 px-3 py-1 rounded-md text-white mt-2"
              disabled={loading} // Deshabilita el botón durante la carga
            >
              {loading
                ? "Cargando..."
                : unwrappedParams?.id
                ? "Editar"
                : "Crear"}
            </button>

            {unwrappedParams?.id && (
              <button
                type="button"
                className="bg-red-500 px-3 py-1 rounded-md text-white mt-2"
                onClick={handleDelete}
                disabled={loading} // Deshabilita el botón durante la carga
              >
                Eliminar
              </button>
            )}
          </div>
        </form>
      </section>

      <div>
      <h2></h2>
      <ul>
        {data.map((task) => (
          <li key={task.id}>{task.title}</li> // Muestra las tareas en una lista
        ))}
      </ul>
    </div>
    </div>
  );
}

export default NewPage;

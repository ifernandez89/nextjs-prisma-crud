"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation"; //redireccionar a otras paginas
import { useEffect,useState } from "react";

function NewPage({ params }: { params: { id: string } }) {
  //items-center: alinear de forma vertical - justify-center: alinear de forma horizontal - block:se posisionan uno sobre el otro - w-full: ocupa todo el ancho(input/textarea)
  //mb-2: margin bottom 2(separacion entre el input y textarea)
  const { handleSubmit, register, setValue } = useForm(); //usar el setValue para el edit REACTHOOKFORM
  const router = useRouter();
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(null);

  // Unwrap the params using React.use()
  useEffect(() => {
    if (params) {
      const fetchParams = async () => {
        const unwrapped = await params;
        setUnwrappedParams(unwrapped); // Set unwrapped params to state
      };
      fetchParams();
    }
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

  const onSubmit = handleSubmit(async (data) => {
    if (unwrappedParams?.id) {
      await axios.put(`/api/task/${unwrappedParams.id}`, data); // PUT to edit
    } else {
      await axios.post("/api/task", data); // POST to create
    }
    router.push("/"); // Redirect to the home route
    router.refresh();
  });

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
            <button type="submit" className="bg-sky-500 px-3 py-1 rounded-md text-white mt-2">
              {unwrappedParams?.id ? "Editar" : "Crear"}
            </button>

            <button
              type="button"
              className="bg-red-500 px-3 py-1 rounded-md text-white mt-2"
              onClick={async () => {
                if (confirm("Estas seguro que quieres eliminar esta tarea?")) {
                  await axios.delete(`/api/task/${unwrappedParams?.id}`);
                  router.push("/");
                  router.refresh();
                }
              }}
            >
              Eliminar
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default NewPage;
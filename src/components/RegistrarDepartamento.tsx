
import { crearDepartamento } from '../api/departamentoApi';
import { departamentoSchema, type formDepartamento } from '../schemas/departamento';
import { useMutation } from '@tanstack/react-query'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type props={
  onSucess?:()=>void
}

function RegistrarDepartamento({onSucess}:props) {
  //inicializacion de react hook form 

  const {
    register, 
    handleSubmit, 
    formState:{errors, isSubmitting},
     reset,
    }=useForm<formDepartamento>({resolver: zodResolver(departamentoSchema),});

    const registroMutation= useMutation({
      mutationFn: crearDepartamento,

      onSuccess:(data)=>{
        alert("Departamento registrado");
        reset();

        if(onSucess){
          onSucess();
        }
      },
      onError:(error)=>{
        console.error("Error al registrar el departamento", error)
        alert("Error al registrar el departamento. Intenta de nuevo.")
      }
    })

    const onsubmit = (data:formDepartamento)=>{
      console.log("Datos a enviar :", data);
      registroMutation.mutate(data)
    }
  

  return (
    <div className='flex flex-col items-center' >
      <h1 className=' text-3xl mb-8 font-semibold'>REGISTRO DE DEPARTAMENTOS</h1>

      <form onSubmit={handleSubmit(onsubmit)}>
        <div className=' flex flex-col items-center'>
            <label htmlFor="nombreDepartamento" className='font-semibold'>Nombre del departamento:</label><br />
            <input 
            {...register('nombre')}
            type="text"
            id='nombreDepartamento'
            placeholder=' Ej: Huila'
            className={`border-2 border-gray-500 focus:border-pink-600 rounded-md mb-10 ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}

             />
             {errors.nombre && <p className='text-red-500 text-xs mt-1'> {errors.nombre.message}</p>}

          <div>
          {registroMutation.isPending && (
            <p>Registrando...</p>
          )}
          <button 
          type='submit'
          disabled={isSubmitting || registroMutation.isPending}  
          className="text-white bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-full cursor-pointer">Registrar</button>
        </div>
        </div>
        
        
      </form>
    </div>
  )
}

export default RegistrarDepartamento

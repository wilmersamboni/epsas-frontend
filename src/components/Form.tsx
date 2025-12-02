import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../schemas/user';
import { validarCredencial } from '../api/credencialesApi'; // Tu fetcher de Axios
import { useMutation } from '@tanstack/react-query'; // 🚨 IMPORTANTE: Importar useMutation
import { z } from 'zod';

// 1.  Definir el tipo de datos inferido del esquema Zod
// Este tipo debe coincidir con lo que esperas en el formulario y lo que envías al backend
type FormDataType = z.infer<typeof userSchema>; 

type FormProps = {
    onLoginSuccess: () => void;
};

// -----------------------------------------------------------

function Form({ onLoginSuccess }: FormProps) {
    
    // 2. Usar el tipo de datos real del formulario (FormDataType)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }, // <-- Añadimos isSubmitting
        reset, // <-- Útil para limpiar el formulario
    } = useForm<FormDataType>({ 
        resolver: zodResolver(userSchema),
    });

    // 3. Configuración de useMutation
    const loginMutation = useMutation({
        // La función Axios que se ejecutará al llamar a mutate()
        mutationFn: validarCredencial, 
        
        onSuccess: (data) => {
            // Manejo de la respuesta exitosa (data es lo que devuelve Axios)
            const token = data.token; // Asumimos que el servidor devuelve un objeto con la propiedad 'token'
            if (token) {
                localStorage.setItem('authToken', token);
                console.log('✅ Login exitoso. Token almacenado.');
                onLoginSuccess(); // Llama a la función de prop para redirigir/cambiar estado
            } else {
                console.warn('⚠️ Login exitoso, pero no se recibió un token.');
                // Manejar este caso según la lógica de tu backend
            }
            reset(); // Opcional: limpiar el formulario
        },
        
        onError: (error) => {
            // Manejo de errores (ej. 401 Unauthorized)
            console.error("❌ Error de autenticación:", error);
            alert('Error al iniciar sesión. Verifica tus credenciales.');
        },
    });

    // 4. Función de manejo del envío
    const onSubmit = (data: FormDataType) => {
        console.log("Datos a enviar:", data);
        // Llama a la función de mutación con los datos validados
        loginMutation.mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center space-y-6 bg-white p-10 rounded-lg shadow-2xl w-full max-w-md"
        >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Iniciar Sesión</h2>
            
            {/* Campo Name */}
            <div className="flex flex-col w-full">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                </label>
                <input
                    {...register('login')} 
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.login ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.login && <p className="text-red-500 text-xs mt-1">{errors.login.message}</p>}
            </div>

            {/* Campo LastName */}
            <div className="flex flex-col w-full">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                </label>
                <input
                    {...register('password')} 
                    id="lastName"
                    type="text" // Asumo que son cadenas, pero deberías usar 'password' si es una credencial real
                    placeholder="Tu apellido"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            
            {/* Mostrar estado de carga de la mutación */}
            {loginMutation.isPending && (
                <p className="text-blue-500">Iniciando sesión...</p>
            )}

            {/* Botón de Enviar */}
            <button
                type="submit"
                // Deshabilitar si el formulario está en proceso de envío o si la mutación está pendiente
                disabled={isSubmitting || loginMutation.isPending} 
                className="w-full text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 transition-colors disabled:opacity-50"
            >
                {loginMutation.isPending ? 'Conectando...' : 'Acceder'}
            </button>
        </form>
    );
}

export default Form;
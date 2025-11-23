import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { User, Briefcase, Plus, CheckCircle2 } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000';

export default function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      role: '',
      isActive: true,
    },
  });

  // Cargar empleados al montar el componente
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/employees`);
      setEmployees(response.data);
    } catch (error) {
      toast.error('Error al cargar empleados');
      console.error('Error fetching employees:', error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      await axios.post(`${API_BASE_URL}/employees`, data);
      toast.success('Empleado registrado exitosamente');
      reset();
      await fetchEmployees();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Error al guardar el empleado';
      toast.error(errorMessage);
      console.error('Error creating employee:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">
              Directorio de Empleados
            </h1>
          </div>
          <p className="text-slate-600 ml-11">
            Agrega a tus empleados 
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-8 sticky top-8 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                Nuevo Empleado
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Campo Nombre Completo */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Juan Pérez López"
                    {...register('fullName', {
                      required: 'El nombre completo es requerido',
                      minLength: {
                        value: 3,
                        message: 'Mínimo 3 caracteres',
                      },
                      maxLength: {
                        value: 100,
                        message: 'Máximo 100 caracteres',
                      },
                    })}
                    className={`w-full px-4 py-2.5 border rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                      errors.fullName
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-300 bg-white focus:border-transparent'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                      <span className="inline-block">!</span>
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Campo Cargo */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    Cargo
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Senior Developer"
                    {...register('role', {
                      required: 'El cargo es requerido',
                      minLength: {
                        value: 3,
                        message: 'Mínimo 3 caracteres',
                      },
                      maxLength: {
                        value: 50,
                        message: 'Máximo 50 caracteres',
                      },
                    })}
                    className={`w-full px-4 py-2.5 border rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                      errors.role
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-300 bg-white focus:border-transparent'
                    }`}
                  />
                  {errors.role && (
                    <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                      <span className="inline-block">!</span>
                      {errors.role.message}
                    </p>
                  )}
                </div>

                {/* Checkbox Activo */}
                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      {...register('isActive')}
                      className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition">
                      Empleado Activo
                    </span>
                  </label>
                </div>

                {/* Botón Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-2.5 rounded-lg transition duration-200 flex items-center justify-center gap-2 mt-6 shadow-sm hover:shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  {submitting ? 'Registrando...' : 'Agregar Empleado'}
                </button>
              </form>
            </div>
          </div>

          {/* Lista de Empleados */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8 border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Equipo{' '}
                  <span className="text-blue-600 font-semibold">
                    ({employees.length})
                  </span>
                </h2>
                {!loading && employees.length > 0 && (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                )}
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="relative w-12 h-12 mb-4">
                    <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 border-r-blue-600 rounded-full animate-spin"></div>
                  </div>
                  <p className="text-slate-600 font-medium">Cargando empleados...</p>
                </div>
              ) : employees.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <User className="w-12 h-12 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-700 mb-2">
                    No hay empleados registrados
                  </h3>
                  <p className="text-slate-600 text-center max-w-sm leading-relaxed">
                    Comienza a construir tu equipo agregando el primer empleado
                    usando el formulario.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {employees.map((employee) => (
                    <div
                      key={employee.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-md transition duration-200 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition">
                          <User className="w-6 h-6 text-white" strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition">
                            {employee.fullName}
                          </h3>
                          <p className="text-sm text-slate-600 flex items-center gap-1.5 mt-0.5">
                            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                            {employee.role}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                          employee.isActive
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-slate-200 text-slate-700 border border-slate-300'
                        }`}
                      >
                        {employee.isActive ? '✓ Activo' : 'Inactivo'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

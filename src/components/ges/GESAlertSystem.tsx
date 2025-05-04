// src/components/ges/GESAlertSystem.tsx
import React, { useState } from 'react';

interface Patient {
  id: string;
  name: string;
  rut: string;
  age: number;
  diagnosis: string;
  diagnosisDate: string;
  gesStatus: 'eligible' | 'active' | 'completed' | 'not_applicable';
  gesDeadline?: string;
  gesProgress?: number;
}

const GESAlertSystem: React.FC = () => {
  // Estado para los filtros
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('');
  
  // Datos de ejemplo para pacientes con GES
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'María González',
      rut: '12.345.678-9',
      age: 35,
      diagnosis: 'Depresión',
      diagnosisDate: '2025-01-15',
      gesStatus: 'eligible',
      gesDeadline: '2025-05-15',
      gesProgress: 0
    },
    {
      id: '2',
      name: 'Juan Pérez',
      rut: '14.567.890-1',
      age: 42,
      diagnosis: 'Esquizofrenia',
      diagnosisDate: '2025-02-20',
      gesStatus: 'active',
      gesDeadline: '2025-05-20',
      gesProgress: 30
    },
    {
      id: '3',
      name: 'Ana Martínez',
      rut: '16.789.012-3',
      age: 28,
      diagnosis: 'TDAH',
      diagnosisDate: '2024-11-05',
      gesStatus: 'not_applicable'
    },
    {
      id: '4',
      name: 'Carlos Rodríguez',
      rut: '18.901.234-5',
      age: 50,
      diagnosis: 'Depresión',
      diagnosisDate: '2025-03-10',
      gesStatus: 'active',
      gesDeadline: '2025-06-10',
      gesProgress: 60
    },
    {
      id: '5',
      name: 'Sofía López',
      rut: '20.123.456-7',
      age: 31,
      diagnosis: 'Trastorno Bipolar',
      diagnosisDate: '2024-12-12',
      gesStatus: 'completed',
      gesDeadline: '2025-03-12',
      gesProgress: 100
    }
  ]);
  
  // Calcular días restantes hasta la fecha límite GES
  const calculateDaysRemaining = (deadline: string): number => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // Determinar la urgencia basada en días restantes
  const getUrgencyLevel = (daysRemaining: number): 'high' | 'medium' | 'low' => {
    if (daysRemaining <= 7) return 'high';
    if (daysRemaining <= 15) return 'medium';
    return 'low';
  };
  
  // Filtrar pacientes según los criterios seleccionados
  const filteredPatients = patients.filter(patient => {
    // Filtro por estado GES
    if (statusFilter) {
      if (statusFilter === 'eligible' && patient.gesStatus !== 'eligible') return false;
      if (statusFilter === 'active' && patient.gesStatus !== 'active') return false;
      if (statusFilter === 'completed' && patient.gesStatus !== 'completed') return false;
      if (statusFilter === 'not_applicable' && patient.gesStatus !== 'not_applicable') return false;
    }
    
    // Filtro por urgencia (solo aplicable a pacientes con fecha límite)
    if (urgencyFilter && patient.gesDeadline) {
      const daysRemaining = calculateDaysRemaining(patient.gesDeadline);
      const urgency = getUrgencyLevel(daysRemaining);
      
      if (urgencyFilter === 'high' && urgency !== 'high') return false;
      if (urgencyFilter === 'medium' && urgency !== 'medium') return false;
      if (urgencyFilter === 'low' && urgency !== 'low') return false;
    } else if (urgencyFilter && !patient.gesDeadline) {
      return false; // Si no tiene fecha límite, no aplica el filtro de urgencia
    }
    
    return true;
  });
  
  // Calcular estadísticas
  const gesStatusCounts = {
    eligible: patients.filter(p => p.gesStatus === 'eligible').length,
    active: patients.filter(p => p.gesStatus === 'active').length,
    completed: patients.filter(p => p.gesStatus === 'completed').length,
    not_applicable: patients.filter(p => p.gesStatus === 'not_applicable').length
  };
  
  // Calcular pacientes con urgencia alta
  const highUrgencyCount = patients.filter(p => 
    p.gesDeadline && getUrgencyLevel(calculateDaysRemaining(p.gesDeadline)) === 'high'
  ).length;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Sistema de Alertas GES</h1>
      
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="font-bold text-lg mb-2">Elegibles GES</h3>
          <p className="text-3xl font-bold text-yellow-700">{gesStatusCounts.eligible}</p>
          <p className="text-sm text-gray-600">Pendientes de activación</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-bold text-lg mb-2">GES Activos</h3>
          <p className="text-3xl font-bold text-blue-700">{gesStatusCounts.active}</p>
          <p className="text-sm text-gray-600">En seguimiento</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-bold text-lg mb-2">GES Completados</h3>
          <p className="text-3xl font-bold text-green-700">{gesStatusCounts.completed}</p>
          <p className="text-sm text-gray-600">Garantías cumplidas</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h3 className="font-bold text-lg mb-2">Urgencia Alta</h3>
          <p className="text-3xl font-bold text-red-700">{highUrgencyCount}</p>
          <p className="text-sm text-gray-600">Menos de 7 días</p>
        </div>
      </div>
      
      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Estado GES</label>
          <select 
            id="status-filter" 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="eligible">Elegible</option>
            <option value="active">Activo</option>
            <option value="completed">Completado</option>
            <option value="not_applicable">No Aplica</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="urgency-filter" className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Urgencia</label>
          <select 
            id="urgency-filter" 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
          >
            <option value="">Todas las urgencias</option>
            <option value="high">Alta (≤ 7 días)</option>
            <option value="medium">Media (8-15 días)</option>
            <option value="low">Baja ({'>'}15 días)</option>
          </select>
        </div>
      </div>
      
      {/* Tabla de pacientes */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paciente
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Diagnóstico
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado GES
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Límite
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progreso
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map((patient) => {
              // Calcular días restantes y urgencia solo si hay fecha límite
              const daysRemaining = patient.gesDeadline ? calculateDaysRemaining(patient.gesDeadline) : null;
              const urgency = daysRemaining !== null ? getUrgencyLevel(daysRemaining) : null;
              
              return (
                <tr key={patient.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-800 font-medium">{patient.name.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.rut} • {patient.age} años</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${patient.diagnosis === 'Depresión' ? 'bg-blue-100 text-blue-800' : 
                        patient.diagnosis === 'Esquizofrenia' ? 'bg-purple-100 text-purple-800' : 
                        patient.diagnosis === 'TDAH' ? 'bg-green-100 text-green-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {patient.diagnosis}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${patient.gesStatus === 'eligible' ? 'bg-yellow-100 text-yellow-800' : 
                        patient.gesStatus === 'active' ? 'bg-blue-100 text-blue-800' : 
                        patient.gesStatus === 'completed' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {patient.gesStatus === 'eligible' ? 'Elegible' : 
                       patient.gesStatus === 'active' ? 'Activo' : 
                       patient.gesStatus === 'completed' ? 'Completado' : 'No Aplica'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patient.gesDeadline ? (
                      <div>
                        <div className="text-sm text-gray-900">
                          {new Date(patient.gesDeadline).toLocaleDateString()}
                        </div>
                        {daysRemaining !== null && (
                          <div className={`text-xs font-medium 
                            ${urgency === 'high' ? 'text-red-600' : 
                              urgency === 'medium' ? 'text-yellow-600' : 
                              'text-green-600'}`}>
                            {daysRemaining > 0 ? `${daysRemaining} días restantes` : 'Vencido'}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No aplica</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patient.gesProgress !== undefined ? (
                      <div>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className={`h-2.5 rounded-full ${
                                patient.gesProgress < 30 ? 'bg-red-600' : 
                                patient.gesProgress < 70 ? 'bg-yellow-600' : 
                                'bg-green-600'
                              }`}
                              style={{ width: `${patient.gesProgress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{patient.gesProgress}%</span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No aplica</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {patient.gesStatus === 'eligible' && (
                      <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-xs">
                        Activar GES
                      </button>
                    )}
                    {patient.gesStatus === 'active' && (
                      <button className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-xs">
                        Actualizar
                      </button>
                    )}
                    <a href="#" className="text-blue-600 hover:text-blue-900 ml-2 text-xs">Detalles</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {filteredPatients.length === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500">No se encontraron pacientes con los filtros seleccionados.</p>
        </div>
      )}
      
      {/* Información sobre GES */}
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-6">
        <h3 className="font-semibold text-blue-800 mb-2">Acerca de las Garantías Explícitas en Salud (GES)</h3>
        <p className="text-sm text-blue-700 mb-2">
          El GES (anteriormente AUGE) es un conjunto de beneficios garantizados por ley para las personas afiliadas a FONASA e ISAPRES.
          Establece garantías explícitas en cuanto a acceso, calidad, protección financiera y oportunidad para un conjunto de enfermedades y condiciones de salud.
        </p>
        <p className="text-sm text-blue-700">
          Este sistema de alertas te ayuda a identificar pacientes que cumplen criterios GES y realizar un seguimiento para asegurar el cumplimiento de las garantías.
        </p>
      </div>
    </div>
  );
};

export default GESAlertSystem;

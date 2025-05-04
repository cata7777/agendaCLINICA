// src/components/classification/DiagnosisClassification.tsx
import React, { useState } from 'react';

interface Patient {
  id: string;
  name: string;
  rut: string;
  age: number;
  diagnosis: string;
  diagnosisDate: string;
  lastVisit: string;
  status: 'active' | 'inactive' | 'pending';
}

const DiagnosisClassification: React.FC = () => {
  // Estado para los filtros
  const [diagnosisFilter, setDiagnosisFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateRangeFilter, setDateRangeFilter] = useState<string>('');
  
  // Datos de ejemplo para pacientes
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'María González',
      rut: '12.345.678-9',
      age: 35,
      diagnosis: 'Depresión',
      diagnosisDate: '2025-01-15',
      lastVisit: '2025-04-10',
      status: 'active'
    },
    {
      id: '2',
      name: 'Juan Pérez',
      rut: '14.567.890-1',
      age: 42,
      diagnosis: 'Trastorno de Ansiedad',
      diagnosisDate: '2025-02-20',
      lastVisit: '2025-04-15',
      status: 'active'
    },
    {
      id: '3',
      name: 'Ana Martínez',
      rut: '16.789.012-3',
      age: 28,
      diagnosis: 'TDAH',
      diagnosisDate: '2024-11-05',
      lastVisit: '2025-03-22',
      status: 'inactive'
    },
    {
      id: '4',
      name: 'Carlos Rodríguez',
      rut: '18.901.234-5',
      age: 50,
      diagnosis: 'Depresión',
      diagnosisDate: '2025-03-10',
      lastVisit: '2025-04-18',
      status: 'active'
    },
    {
      id: '5',
      name: 'Sofía López',
      rut: '20.123.456-7',
      age: 31,
      diagnosis: 'Trastorno Bipolar',
      diagnosisDate: '2024-12-12',
      lastVisit: '2025-04-05',
      status: 'pending'
    }
  ]);
  
  // Filtrar pacientes según los criterios seleccionados
  const filteredPatients = patients.filter(patient => {
    // Filtro por diagnóstico
    if (diagnosisFilter && patient.diagnosis !== diagnosisFilter) {
      return false;
    }
    
    // Filtro por estado
    if (statusFilter) {
      if (statusFilter === 'active' && patient.status !== 'active') return false;
      if (statusFilter === 'inactive' && patient.status !== 'inactive') return false;
      if (statusFilter === 'pending' && patient.status !== 'pending') return false;
    }
    
    // Filtro por rango de fecha (simplificado para el ejemplo)
    if (dateRangeFilter) {
      const today = new Date();
      const lastVisitDate = new Date(patient.lastVisit);
      const diffTime = Math.abs(today.getTime() - lastVisitDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (dateRangeFilter === 'last30' && diffDays > 30) return false;
      if (dateRangeFilter === 'last90' && diffDays > 90) return false;
      if (dateRangeFilter === 'last180' && diffDays > 180) return false;
    }
    
    return true;
  });
  
  // Calcular estadísticas
  const diagnosisCounts: Record<string, number> = {};
  patients.forEach(patient => {
    diagnosisCounts[patient.diagnosis] = (diagnosisCounts[patient.diagnosis] || 0) + 1;
  });
  
  const statusCounts = {
    active: patients.filter(p => p.status === 'active').length,
    inactive: patients.filter(p => p.status === 'inactive').length,
    pending: patients.filter(p => p.status === 'pending').length
  };
  
  // Lista única de diagnósticos para el filtro
  const uniqueDiagnoses = Array.from(new Set(patients.map(p => p.diagnosis)));
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Clasificación por Diagnóstico</h1>
      
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-bold text-lg mb-2">Total Pacientes</h3>
          <p className="text-3xl font-bold text-blue-700">{patients.length}</p>
          <p className="text-sm text-gray-600">Clasificados por diagnóstico</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-bold text-lg mb-2">Pacientes Activos</h3>
          <p className="text-3xl font-bold text-green-700">{statusCounts.active}</p>
          <p className="text-sm text-gray-600">En tratamiento actual</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="font-bold text-lg mb-2">Diagnósticos Únicos</h3>
          <p className="text-3xl font-bold text-yellow-700">{uniqueDiagnoses.length}</p>
          <p className="text-sm text-gray-600">Categorías de diagnóstico</p>
        </div>
      </div>
      
      {/* Distribución de diagnósticos */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Distribución por Diagnóstico</h2>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="space-y-3">
            {Object.entries(diagnosisCounts).map(([diagnosis, count]) => (
              <div key={diagnosis} className="flex flex-col">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{diagnosis}</span>
                  <span className="text-sm font-medium">{count} pacientes ({Math.round(count / patients.length * 100)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(count / patients.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="diagnosis-filter" className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Diagnóstico</label>
          <select 
            id="diagnosis-filter" 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={diagnosisFilter}
            onChange={(e) => setDiagnosisFilter(e.target.value)}
          >
            <option value="">Todos los diagnósticos</option>
            {uniqueDiagnoses.map(diagnosis => (
              <option key={diagnosis} value={diagnosis}>{diagnosis}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Estado</label>
          <select 
            id="status-filter" 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
            <option value="pending">Pendiente</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="date-range-filter" className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Última Visita</label>
          <select 
            id="date-range-filter" 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={dateRangeFilter}
            onChange={(e) => setDateRangeFilter(e.target.value)}
          >
            <option value="">Cualquier fecha</option>
            <option value="last30">Últimos 30 días</option>
            <option value="last90">Últimos 90 días</option>
            <option value="last180">Últimos 180 días</option>
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
                Fecha Diagnóstico
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Última Visita
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
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
                      patient.diagnosis === 'Trastorno de Ansiedad' ? 'bg-green-100 text-green-800' : 
                      patient.diagnosis === 'TDAH' ? 'bg-purple-100 text-purple-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {patient.diagnosis}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(patient.diagnosisDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(patient.lastVisit).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${patient.status === 'active' ? 'bg-green-100 text-green-800' : 
                      patient.status === 'inactive' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {patient.status === 'active' ? 'Activo' : 
                     patient.status === 'inactive' ? 'Inactivo' : 'Pendiente'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Ver detalle</a>
                  <a href="#" className="text-green-600 hover:text-green-900">Editar</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredPatients.length === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500">No se encontraron pacientes con los filtros seleccionados.</p>
        </div>
      )}
    </div>
  );
};

export default DiagnosisClassification;

// src/components/tests/DigitalTestLibrary.tsx
import React, { useState } from 'react';

interface PsychologicalTest {
  id: string;
  name: string;
  category: 'depression' | 'anxiety' | 'adhd' | 'personality' | 'cognitive' | 'other';
  description: string;
  targetAge: 'child' | 'adolescent' | 'adult' | 'all';
  estimatedTime: number; // en minutos
  questionCount: number;
}

interface TestAssignment {
  testId: string;
  patientId: string;
  patientName: string;
  assignedDate: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'expired';
  completedDate?: string;
  score?: number;
}

const DigitalTestLibrary: React.FC = () => {
  // Estado para filtros
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [ageFilter, setAgeFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Estado para asignaciones
  const [selectedTestId, setSelectedTestId] = useState<string>('');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  
  // Datos de ejemplo para tests psicológicos
  const [tests] = useState<PsychologicalTest[]>([
    {
      id: '1',
      name: 'Inventario de Depresión de Beck (BDI-II)',
      category: 'depression',
      description: 'Evalúa la presencia y gravedad de síntomas depresivos según criterios DSM-IV.',
      targetAge: 'adult',
      estimatedTime: 10,
      questionCount: 21
    },
    {
      id: '2',
      name: 'Escala de Ansiedad de Hamilton (HAM-A)',
      category: 'anxiety',
      description: 'Evalúa la gravedad de los síntomas de ansiedad.',
      targetAge: 'adult',
      estimatedTime: 15,
      questionCount: 14
    },
    {
      id: '3',
      name: 'Escala de Conners para TDAH (Versión Padres)',
      category: 'adhd',
      description: 'Evalúa síntomas de TDAH en niños y adolescentes según la observación de los padres.',
      targetAge: 'child',
      estimatedTime: 20,
      questionCount: 27
    },
    {
      id: '4',
      name: 'Escala de Conners para TDAH (Versión Profesores)',
      category: 'adhd',
      description: 'Evalúa síntomas de TDAH en niños y adolescentes según la observación de los profesores.',
      targetAge: 'child',
      estimatedTime: 20,
      questionCount: 28
    },
    {
      id: '5',
      name: 'Inventario de Ansiedad Estado-Rasgo (STAI)',
      category: 'anxiety',
      description: 'Evalúa la ansiedad como estado temporal y como rasgo relativamente estable.',
      targetAge: 'adult',
      estimatedTime: 15,
      questionCount: 40
    },
    {
      id: '6',
      name: 'Test de Personalidad de 16 Factores (16PF)',
      category: 'personality',
      description: 'Evalúa 16 rasgos de personalidad y 5 dimensiones globales.',
      targetAge: 'adult',
      estimatedTime: 45,
      questionCount: 185
    },
    {
      id: '7',
      name: 'Test de Matrices Progresivas de Raven',
      category: 'cognitive',
      description: 'Evalúa la capacidad intelectual y el razonamiento no verbal.',
      targetAge: 'all',
      estimatedTime: 45,
      questionCount: 60
    },
    {
      id: '8',
      name: 'Escala de Depresión Infantil (CDI)',
      category: 'depression',
      description: 'Evalúa síntomas depresivos en niños y adolescentes.',
      targetAge: 'child',
      estimatedTime: 15,
      questionCount: 27
    }
  ]);
  
  // Datos de ejemplo para pacientes
  const [patients] = useState([
    { id: '1', name: 'María González', age: 35 },
    { id: '2', name: 'Juan Pérez', age: 42 },
    { id: '3', name: 'Ana Martínez', age: 28 },
    { id: '4', name: 'Carlos Rodríguez', age: 50 },
    { id: '5', name: 'Sofía López', age: 31 },
    { id: '6', name: 'Pedro Sánchez', age: 12 },
    { id: '7', name: 'Laura Torres', age: 16 }
  ]);
  
  // Datos de ejemplo para asignaciones de tests
  const [assignments, setAssignments] = useState<TestAssignment[]>([
    {
      testId: '1',
      patientId: '3',
      patientName: 'Ana Martínez',
      assignedDate: '2025-04-20',
      dueDate: '2025-04-27',
      status: 'pending'
    },
    {
      testId: '5',
      patientId: '1',
      patientName: 'María González',
      assignedDate: '2025-04-18',
      dueDate: '2025-04-25',
      status: 'completed',
      completedDate: '2025-04-23',
      score: 42
    },
    {
      testId: '3',
      patientId: '6',
      patientName: 'Pedro Sánchez',
      assignedDate: '2025-04-15',
      dueDate: '2025-04-22',
      status: 'expired'
    }
  ]);
  
  // Filtrar tests según los criterios seleccionados
  const filteredTests = tests.filter(test => {
    // Filtro por categoría
    if (categoryFilter && test.category !== categoryFilter) {
      return false;
    }
    
    // Filtro por edad objetivo
    if (ageFilter && test.targetAge !== ageFilter && test.targetAge !== 'all') {
      return false;
    }
    
    // Filtro por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        test.name.toLowerCase().includes(query) ||
        test.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Función para asignar un test a un paciente
  const assignTest = () => {
    if (!selectedTestId || !selectedPatientId || !dueDate) {
      alert('Por favor, selecciona un test, un paciente y una fecha de vencimiento.');
      return;
    }
    
    const test = tests.find(t => t.id === selectedTestId);
    const patient = patients.find(p => p.id === selectedPatientId);
    
    if (!test || !patient) return;
    
    const newAssignment: TestAssignment = {
      testId: selectedTestId,
      patientId: selectedPatientId,
      patientName: patient.name,
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate,
      status: 'pending'
    };
    
    setAssignments([...assignments, newAssignment]);
    
    // Limpiar selección
    setSelectedTestId('');
    setSelectedPatientId('');
    setDueDate('');
    
    alert(`Test "${test.name}" asignado a ${patient.name} con éxito.`);
  };
  
  // Función para ver resultados de un test
  const viewTestResults = (assignment: TestAssignment) => {
    const test = tests.find(t => t.id === assignment.testId);
    if (!test) return;
    
    if (assignment.status !== 'completed') {
      alert(`Este test aún no ha sido completado por el paciente.`);
      return;
    }
    
    // En una implementación real, aquí se mostrarían los resultados detallados
    alert(`Resultados del test "${test.name}" para ${assignment.patientName}:\nPuntuación: ${assignment.score}/100\nCompletado el: ${assignment.completedDate}`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Biblioteca de Tests Psicológicos Digitales</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Filtros de tests */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Buscar Tests</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="search-query" className="block text-sm font-medium text-gray-700 mb-1">Buscar por nombre o descripción</label>
              <input
                type="text"
                id="search-query"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ej: depresión, ansiedad, TDAH..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select
                  id="category-filter"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Todas las categorías</option>
                  <option value="depression">Depresión</option>
                  <option value="anxiety">Ansiedad</option>
                  <option value="adhd">TDAH</option>
                  <option value="personality">Personalidad</option>
                  <option value="cognitive">Cognitivo</option>
                  <option value="other">Otros</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="age-filter" className="block text-sm font-medium text-gray-700 mb-1">Edad objetivo</label>
                <select
                  id="age-filter"
                  value={ageFilter}
                  onChange={(e) => setAgeFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Todas las edades</option>
                  <option value="child">Niños</option>
                  <option value="adolescent">Adolescentes</option>
                  <option value="adult">Adultos</option>
                  <option value="all">Universal</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Asignación de tests */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Asignar Test a Paciente</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="test-select" className="block text-sm font-medium text-gray-700 mb-1">Seleccionar Test</label>
              <select
                id="test-select"
                value={selectedTestId}
                onChange={(e) => setSelectedTestId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Selecciona un test</option>
                {tests.map(test => (
                  <option key={test.id} value={test.id}>{test.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="patient-select" className="block text-sm font-medium text-gray-700 mb-1">Seleccionar Paciente</label>
              <select
                id="patient-select"
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Selecciona un paciente</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.name} ({patient.age} años)</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="due-date" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Vencimiento</label>
              <input
                type="date"
                id="due-date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <button
                onClick={assignTest}
                disabled={!selectedTestId || !selectedPatientId || !dueDate}
                className={`w-full py-2 rounded-md text-white font-medium ${
                  selectedTestId && selectedPatientId && dueDate
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Asignar Test
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lista de tests */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Tests Disponibles ({filteredTests.length})</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTests.map(test => (
            <div key={test.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg mb-1">{test.name}</h3>
              
              <div className="flex space-x-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  test.category === 'depression' ? 'bg-blue-100 text-blue-800' :
                  test.category === 'anxiety' ? 'bg-green-100 text-green-800' :
                  test.category === 'adhd' ? 'bg-purple-100 text-purple-800' :
                  test.category === 'personality' ? 'bg-yellow-100 text-yellow-800' :
                  test.category === 'cognitive' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {test.category === 'depression' ? 'Depresión' :
                   test.category === 'anxiety' ? 'Ansiedad' :
                   test.category === 'adhd' ? 'TDAH' :
                   test.category === 'personality' ? 'Personalidad' :
                   test.category === 'cognitive' ? 'Cognitivo' : 'Otro'}
                </span>
                
                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                  {test.targetAge === 'child' ? 'Niños' :
                   test.targetAge === 'adolescent' ? 'Adolescentes' :
                   test.targetAge === 'adult' ? 'Adultos' : 'Todas las edades'}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{test.description}</p>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>{test.questionCount} preguntas</span>
                <span>~{test.estimatedTime} minutos</span>
              </div>
              
              <button
                onClick={() => setSelectedTestId(test.id)}
                className="mt-3 w-full py-1 bg-blue-50 text-blue-600 rounded border border-blue-200 hover:bg-blue-100 text-sm"
              >
                Seleccionar
              </button>
            </div>
          ))}
        </div>
        
        {filteredTests.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No se encontraron tests que coincidan con los filtros seleccionados.
          </div>
        )}
      </div>
      
      {/* Tests asignados */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Tests Asignados</h2>
        
        {assignments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Test
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Asignación
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Vencimiento
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
                {assignments.map((assignment, index) => {
                  const test = tests.find(t => t.id === assignment.testId);
                  if (!test) return null;
                  
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {assignment.patientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {test.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(assignment.assignedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          assignment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {assignment.status === 'completed' ? 'Completado' :
                           assignment.status === 'pending' ? 'Pendiente' : 'Vencido'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => viewTestResults(assignment)}
                          className={`text-blue-600 hover:text-blue-900 ${
                            assignment.status !== 'completed' ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          disabled={assignment.status !== 'completed'}
                        >
                          Ver resultados
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No hay tests asignados actualmente.
          </div>
        )}
      </div>
      
      <div className="mt-8 bg-blue-50 p-4 rounded-md border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">Acerca de los Tests Psicológicos Digitales</h3>
        <p className="text-sm text-blue-700 mb-2">
          Esta funcionalidad te permite asignar tests psicológicos digitales a tus pacientes para que los completen
          desde casa. Los resultados se procesan automáticamente y se integran con la ficha clínica.
        </p>
        <p className="text-sm text-blue-700">
          Beneficios: ahorro de papel, mayor comodidad para pacientes, procesamiento automático de resultados,
          y seguimiento más eficiente del progreso terapéutico.
        </p>
      </div>
    </div>
  );
};

export default DigitalTestLibrary;

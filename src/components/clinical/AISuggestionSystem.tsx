// src/components/clinical/AISuggestionSystem.tsx
import React, { useState } from 'react';

interface Patient {
  id: string;
  name: string;
  rut: string;
  age: number;
  diagnosis: string;
  symptoms: string[];
  history: string;
}

interface TherapeuticGoal {
  id: string;
  description: string;
  category: 'short_term' | 'medium_term' | 'long_term';
  relevance: number; // 1-10
}

interface TreatmentSuggestion {
  id: string;
  type: 'therapeutic' | 'pharmacological';
  description: string;
  evidence: string;
  contraindications?: string;
}

const AISuggestionSystem: React.FC = () => {
  // Estado para el paciente seleccionado
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  
  // Estado para el tipo de sugerencia
  const [suggestionType, setSuggestionType] = useState<'goals' | 'treatment' | 'medication'>('goals');
  
  // Estado para las sugerencias generadas
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedGoals, setGeneratedGoals] = useState<TherapeuticGoal[]>([]);
  const [generatedTreatments, setGeneratedTreatments] = useState<TreatmentSuggestion[]>([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  
  // Datos de ejemplo para pacientes
  const patients: Patient[] = [
    {
      id: '1',
      name: 'María González',
      rut: '12.345.678-9',
      age: 35,
      diagnosis: 'Trastorno de Ansiedad Generalizada',
      symptoms: ['Preocupación excesiva', 'Dificultad para concentrarse', 'Tensión muscular', 'Problemas de sueño'],
      history: 'Paciente con historial de ansiedad desde hace 5 años. Ha probado terapia cognitivo-conductual con resultados parciales. No presenta comorbilidades significativas.'
    },
    {
      id: '2',
      name: 'Juan Pérez',
      rut: '14.567.890-1',
      age: 42,
      diagnosis: 'Depresión Mayor',
      symptoms: ['Estado de ánimo deprimido', 'Pérdida de interés', 'Fatiga', 'Pensamientos de muerte'],
      history: 'Segundo episodio depresivo. El primero fue hace 3 años y respondió bien a tratamiento con ISRS. Actualmente sin medicación desde hace 6 meses.'
    },
    {
      id: '3',
      name: 'Ana Martínez',
      rut: '16.789.012-3',
      age: 28,
      diagnosis: 'TDAH',
      symptoms: ['Dificultad para mantener la atención', 'Hiperactividad', 'Impulsividad', 'Desorganización'],
      history: 'Diagnóstico reciente de TDAH en la adultez. Sin tratamiento previo. Reporta dificultades académicas desde la infancia.'
    }
  ];
  
  // Función para generar sugerencias basadas en IA
  const generateSuggestions = () => {
    if (!selectedPatientId) {
      alert('Por favor, selecciona un paciente.');
      return;
    }
    
    setIsGenerating(true);
    
    // Simulación de tiempo de procesamiento de IA
    setTimeout(() => {
      const patient = patients.find(p => p.id === selectedPatientId);
      
      if (!patient) {
        setIsGenerating(false);
        return;
      }
      
      if (suggestionType === 'goals') {
        // Simulación de objetivos terapéuticos generados por IA
        const simulatedGoals: TherapeuticGoal[] = [
          {
            id: '1',
            description: 'Reducir la intensidad y frecuencia de los síntomas de ansiedad mediante técnicas de respiración y mindfulness',
            category: 'short_term',
            relevance: 9
          },
          {
            id: '2',
            description: 'Identificar y modificar pensamientos automáticos negativos relacionados con preocupaciones futuras',
            category: 'medium_term',
            relevance: 8
          },
          {
            id: '3',
            description: 'Desarrollar estrategias de afrontamiento para situaciones de alta ansiedad en contextos sociales y laborales',
            category: 'medium_term',
            relevance: 7
          },
          {
            id: '4',
            description: 'Mejorar la calidad del sueño mediante rutinas de higiene del sueño y técnicas de relajación',
            category: 'short_term',
            relevance: 8
          },
          {
            id: '5',
            description: 'Establecer un sistema de apoyo social que facilite la gestión de la ansiedad a largo plazo',
            category: 'long_term',
            relevance: 6
          }
        ];
        
        setGeneratedGoals(simulatedGoals);
        setGeneratedTreatments([]);
      } else if (suggestionType === 'treatment') {
        // Simulación de tratamientos terapéuticos generados por IA
        const simulatedTreatments: TreatmentSuggestion[] = [
          {
            id: '1',
            type: 'therapeutic',
            description: 'Terapia Cognitivo-Conductual (TCC) con enfoque en reestructuración cognitiva y exposición gradual',
            evidence: 'Múltiples estudios controlados demuestran la eficacia de la TCC para el Trastorno de Ansiedad Generalizada con tamaños de efecto moderados a grandes.'
          },
          {
            id: '2',
            type: 'therapeutic',
            description: 'Entrenamiento en Mindfulness basado en la reducción del estrés (MBSR)',
            evidence: 'Evidencia creciente sugiere que el MBSR es efectivo para reducir síntomas de ansiedad y mejorar la calidad de vida.'
          },
          {
            id: '3',
            type: 'therapeutic',
            description: 'Terapia de Aceptación y Compromiso (ACT)',
            evidence: 'La ACT ha mostrado resultados prometedores para el tratamiento de la ansiedad, especialmente en casos resistentes a TCC tradicional.'
          }
        ];
        
        setGeneratedTreatments(simulatedTreatments);
        setGeneratedGoals([]);
      } else if (suggestionType === 'medication') {
        // Simulación de tratamientos farmacológicos generados por IA
        const simulatedMedications: TreatmentSuggestion[] = [
          {
            id: '1',
            type: 'pharmacological',
            description: 'Sertralina 50mg/día, con aumento gradual hasta 100-200mg/día según respuesta y tolerancia',
            evidence: 'ISRS de primera línea para TAG con perfil favorable de efectos secundarios y eficacia demostrada.',
            contraindications: 'Precaución en pacientes con historial de sangrado o uso concomitante de anticoagulantes.'
          },
          {
            id: '2',
            type: 'pharmacological',
            description: 'Venlafaxina XR 75mg/día, con aumento gradual hasta 150-225mg/día según respuesta y tolerancia',
            evidence: 'IRSN con evidencia sólida para TAG, especialmente en casos con síntomas depresivos comórbidos.',
            contraindications: 'Monitorizar presión arterial. Precaución en pacientes con hipertensión no controlada.'
          },
          {
            id: '3',
            type: 'pharmacological',
            description: 'Pregabalina 75mg dos veces al día, con aumento gradual hasta 300-450mg/día dividido en 2-3 dosis',
            evidence: 'Aprobada para TAG con inicio de acción más rápido que los antidepresivos.',
            contraindications: 'Precaución en pacientes con historial de abuso de sustancias. Ajustar dosis en insuficiencia renal.'
          }
        ];
        
        setGeneratedTreatments(simulatedMedications);
        setGeneratedGoals([]);
      }
      
      setIsGenerating(false);
    }, 2000);
  };
  
  // Función para seleccionar/deseleccionar una sugerencia
  const toggleSuggestion = (id: string) => {
    setSelectedSuggestions(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };
  
  // Función para aplicar las sugerencias seleccionadas
  const applySuggestions = () => {
    if (selectedSuggestions.length === 0) {
      alert('Por favor, selecciona al menos una sugerencia para aplicar.');
      return;
    }
    
    // En una implementación real, aquí se guardarían las sugerencias seleccionadas
    // en la ficha del paciente o se generarían documentos basados en ellas
    
    alert(`${selectedSuggestions.length} sugerencias aplicadas con éxito a la ficha del paciente.`);
    
    // Limpiar selección
    setSelectedSuggestions([]);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Sistema de IA para Sugerencias Clínicas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Selección de paciente */}
        <div>
          <h2 className="text-xl font-semibold mb-4">1. Seleccionar Paciente</h2>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="mb-4">
              <label htmlFor="patient-select" className="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
              <select 
                id="patient-select" 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
              >
                <option value="">Selecciona un paciente</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.diagnosis}
                  </option>
                ))}
              </select>
            </div>
            
            {selectedPatientId && (
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-2">Información del Paciente</h3>
                {(() => {
                  const patient = patients.find(p => p.id === selectedPatientId);
                  if (!patient) return null;
                  
                  return (
                    <div className="text-sm">
                      <p><span className="font-medium">Nombre:</span> {patient.name}</p>
                      <p><span className="font-medium">RUT:</span> {patient.rut}</p>
                      <p><span className="font-medium">Edad:</span> {patient.age} años</p>
                      <p><span className="font-medium">Diagnóstico:</span> {patient.diagnosis}</p>
                      <div className="mt-2">
                        <p className="font-medium">Síntomas:</p>
                        <ul className="list-disc pl-5">
                          {patient.symptoms.map((symptom, index) => (
                            <li key={index}>{symptom}</li>
                          ))}
                        </ul>
                      </div>
                      <p className="mt-2"><span className="font-medium">Historia:</span> {patient.history}</p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
        
        {/* Selección de tipo de sugerencia */}
        <div>
          <h2 className="text-xl font-semibold mb-4">2. Tipo de Sugerencia</h2>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="goals-radio"
                  type="radio"
                  name="suggestion-type"
                  value="goals"
                  checked={suggestionType === 'goals'}
                  onChange={() => setSuggestionType('goals')}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="goals-radio" className="ml-2 block text-sm text-gray-700">
                  Objetivos Terapéuticos
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="treatment-radio"
                  type="radio"
                  name="suggestion-type"
                  value="treatment"
                  checked={suggestionType === 'treatment'}
                  onChange={() => setSuggestionType('treatment')}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="treatment-radio" className="ml-2 block text-sm text-gray-700">
                  Tratamientos Terapéuticos
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="medication-radio"
                  type="radio"
                  name="suggestion-type"
                  value="medication"
                  checked={suggestionType === 'medication'}
                  onChange={() => setSuggestionType('medication')}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="medication-radio" className="ml-2 block text-sm text-gray-700">
                  Tratamientos Farmacológicos
                </label>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={generateSuggestions}
                disabled={!selectedPatientId || isGenerating}
                className={`w-full py-2 rounded-md text-white font-medium ${
                  selectedPatientId && !isGenerating
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {isGenerating ? 'Generando sugerencias...' : 'Generar Sugerencias'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sugerencias generadas */}
      {(generatedGoals.length > 0 || generatedTreatments.length > 0) && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Sugerencias Generadas por IA</h2>
          
          {generatedGoals.length > 0 && (
            <div className="bg-white p-4 rounded-lg border border-gray-300 mb-4">
              <h3 className="font-bold text-lg mb-3">Objetivos Terapéuticos Sugeridos</h3>
              
              <div className="space-y-3">
                {generatedGoals.map(goal => (
                  <div key={goal.id} className="flex items-start p-3 border rounded-md hover:bg-blue-50">
                    <input
                      type="checkbox"
                      id={`goal-${goal.id}`}
                      checked={selectedSuggestions.includes(goal.id)}
                      onChange={() => toggleSuggestion(goal.id)}
                      className="h-5 w-5 text-blue-600 border-gray-300 rounded mt-0.5"
                    />
                    <div className="ml-3">
                      <label htmlFor={`goal-${goal.id}`} className="block font-medium text-gray-900">
                        {goal.description}
                      </label>
                      <div className="flex items-center mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          goal.category === 'short_term' ? 'bg-green-100 text-green-800' :
                          goal.category === 'medium_term' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {goal.category === 'short_term' ? 'Corto plazo' :
                           goal.category === 'medium_term' ? 'Mediano plazo' : 'Largo plazo'}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          Relevancia: {goal.relevance}/10
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {generatedTreatments.length > 0 && (
            <div className="bg-white p-4 rounded-lg border border-gray-300">
              <h3 className="font-bold text-lg mb-3">
                {suggestionType === 'medication' ? 'Tratamientos Farmacológicos Sugeridos' : 'Tratamientos Terapéuticos Sugeridos'}
              </h3>
              
              <div className="space-y-4">
                {generatedTreatments.map(treatment => (
                  <div key={treatment.id} className="flex items-start p-3 border rounded-md hover:bg-blue-50">
                    <input
                      type="checkbox"
                      id={`treatment-${treatment.id}`}
                      checked={selectedSuggestions.includes(treatment.id)}
                      onChange={() => toggleSuggestion(treatment.id)}
                      className="h-5 w-5 text-blue-600 border-gray-300 rounded mt-0.5"
                    />
                    <div className="ml-3">
                      <label htmlFor={`treatment-${treatment.id}`} className="block font-medium text-gray-900">
                        {treatment.description}
                      </label>
                      <p className="mt-1 text-sm text-gray-600">
                        <span className="font-medium">Evidencia:</span> {treatment.evidence}
                      </p>
                      {treatment.contraindications && (
                        <p className="mt-1 text-sm text-red-600">
                          <span className="font-medium">Contraindicaciones:</span> {treatment.contraindications}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={applySuggestions}
              disabled={selectedSuggestions.length === 0}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                selectedSuggestions.length > 0
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Aplicar {selectedSuggestions.length} Sugerencias Seleccionadas
            </button>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">Acerca del Sistema de IA para Sugerencias Clínicas</h3>
        <p className="text-sm text-blue-700 mb-2">
          Este sistema utiliza inteligencia artificial para analizar la información del paciente y generar sugerencias
          personalizadas de objetivos terapéuticos, tratamientos y medicación basados en evidencia científica actualizada.
        </p>
        <p className="text-sm text-blue-700">
          Las sugerencias son solo recomendaciones y siempre deben ser evaluadas por el profesional de la salud,
          considerando las particularidades de cada paciente y su contexto específico.
        </p>
      </div>
    </div>
  );
};

export default AISuggestionSystem;

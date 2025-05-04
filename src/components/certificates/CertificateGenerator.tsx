// src/components/certificates/CertificateGenerator.tsx
import React, { useState } from 'react';

interface Patient {
  id: string;
  name: string;
  rut: string;
  age: number;
  diagnosis: string;
  diagnosisDate: string;
}

interface CertificateTemplate {
  id: string;
  name: string;
  type: 'disability' | 'mental_health' | 'medical_leave' | 'treatment';
  description: string;
}

const CertificateGenerator: React.FC = () => {
  // Estado para el paciente seleccionado
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  
  // Estado para la plantilla seleccionada
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  
  // Estado para el certificado generado
  const [generatedCertificate, setGeneratedCertificate] = useState<string | null>(null);
  
  // Datos de ejemplo para pacientes
  const patients: Patient[] = [
    {
      id: '1',
      name: 'María González',
      rut: '12.345.678-9',
      age: 35,
      diagnosis: 'Depresión',
      diagnosisDate: '2025-01-15'
    },
    {
      id: '2',
      name: 'Juan Pérez',
      rut: '14.567.890-1',
      age: 42,
      diagnosis: 'Trastorno de Ansiedad',
      diagnosisDate: '2025-02-20'
    },
    {
      id: '3',
      name: 'Ana Martínez',
      rut: '16.789.012-3',
      age: 28,
      diagnosis: 'TDAH',
      diagnosisDate: '2024-11-05'
    },
    {
      id: '4',
      name: 'Carlos Rodríguez',
      rut: '18.901.234-5',
      age: 50,
      diagnosis: 'Depresión',
      diagnosisDate: '2025-03-10'
    },
    {
      id: '5',
      name: 'Sofía López',
      rut: '20.123.456-7',
      age: 31,
      diagnosis: 'Trastorno Bipolar',
      diagnosisDate: '2024-12-12'
    }
  ];
  
  // Datos de ejemplo para plantillas de certificados
  const certificateTemplates: CertificateTemplate[] = [
    {
      id: '1',
      name: 'Credencial de Discapacidad',
      type: 'disability',
      description: 'Certificado oficial para tramitar la credencial de discapacidad según normativa vigente.'
    },
    {
      id: '2',
      name: 'Certificado de Salud Mental',
      type: 'mental_health',
      description: 'Certificado que acredita el estado de salud mental del paciente para fines legales o administrativos.'
    },
    {
      id: '3',
      name: 'Licencia Médica',
      type: 'medical_leave',
      description: 'Certificado para justificar ausencia laboral por motivos de salud mental.'
    },
    {
      id: '4',
      name: 'Certificado de Tratamiento',
      type: 'treatment',
      description: 'Certificado que acredita que el paciente se encuentra en tratamiento activo.'
    }
  ];
  
  // Función para generar el certificado
  const generateCertificate = () => {
    if (!selectedPatientId || !selectedTemplateId) {
      alert('Por favor, selecciona un paciente y una plantilla de certificado.');
      return;
    }
    
    const patient = patients.find(p => p.id === selectedPatientId);
    const template = certificateTemplates.find(t => t.id === selectedTemplateId);
    
    if (!patient || !template) return;
    
    // En una implementación real, aquí se generaría el certificado con datos reales
    // y posiblemente se enviaría a un servicio de backend para su procesamiento
    
    const currentDate = new Date().toLocaleDateString('es-CL');
    
    let certificateText = '';
    
    switch (template.type) {
      case 'disability':
        certificateText = `
          CERTIFICADO DE DISCAPACIDAD
          
          Fecha: ${currentDate}
          
          Por medio del presente documento, certifico que el/la paciente ${patient.name}, RUT ${patient.rut}, 
          de ${patient.age} años de edad, presenta diagnóstico de ${patient.diagnosis} desde el ${new Date(patient.diagnosisDate).toLocaleDateString('es-CL')}.
          
          De acuerdo a la evaluación clínica realizada y según lo establecido en la Ley 20.422, 
          el/la paciente presenta una condición de salud que puede ser calificada como discapacidad 
          de origen psíquico, que afecta su participación plena y efectiva en la sociedad.
          
          Este certificado se extiende a solicitud del interesado para ser presentado ante el Servicio 
          de Registro Civil e Identificación para el trámite de Credencial de Discapacidad.
          
          ______________________
          Dr./Dra. [Nombre del Profesional]
          Especialista en Salud Mental
          Registro: [Número de Registro]
        `;
        break;
        
      case 'mental_health':
        certificateText = `
          CERTIFICADO DE SALUD MENTAL
          
          Fecha: ${currentDate}
          
          Certifico que el/la paciente ${patient.name}, RUT ${patient.rut}, de ${patient.age} años de edad, 
          ha sido evaluado/a en consulta de salud mental, presentando diagnóstico de ${patient.diagnosis} 
          desde el ${new Date(patient.diagnosisDate).toLocaleDateString('es-CL')}.
          
          Actualmente se encuentra en tratamiento y seguimiento regular en nuestro centro clínico.
          
          Este certificado se extiende a solicitud del interesado para los fines que estime convenientes.
          
          ______________________
          Dr./Dra. [Nombre del Profesional]
          Especialista en Salud Mental
          Registro: [Número de Registro]
        `;
        break;
        
      case 'medical_leave':
        certificateText = `
          CERTIFICADO DE LICENCIA MÉDICA
          
          Fecha: ${currentDate}
          
          Certifico que el/la paciente ${patient.name}, RUT ${patient.rut}, de ${patient.age} años de edad, 
          requiere reposo laboral por un período de [NÚMERO] días a partir de la fecha, 
          debido a su condición de salud mental diagnosticada como ${patient.diagnosis}.
          
          Diagnóstico CIE-10: [CÓDIGO CIE-10]
          
          Este certificado tiene validez para ser presentado ante su empleador y/o entidad de salud correspondiente.
          
          ______________________
          Dr./Dra. [Nombre del Profesional]
          Especialista en Salud Mental
          Registro: [Número de Registro]
        `;
        break;
        
      case 'treatment':
        certificateText = `
          CERTIFICADO DE TRATAMIENTO
          
          Fecha: ${currentDate}
          
          Por medio del presente documento, certifico que el/la paciente ${patient.name}, RUT ${patient.rut}, 
          de ${patient.age} años de edad, se encuentra actualmente en tratamiento en nuestro centro clínico 
          por diagnóstico de ${patient.diagnosis} desde el ${new Date(patient.diagnosisDate).toLocaleDateString('es-CL')}.
          
          El tratamiento consiste en [DESCRIPCIÓN DEL TRATAMIENTO] con una frecuencia de [FRECUENCIA] 
          y una duración estimada de [DURACIÓN].
          
          Este certificado se extiende a solicitud del interesado para los fines que estime convenientes.
          
          ______________________
          Dr./Dra. [Nombre del Profesional]
          Especialista en Salud Mental
          Registro: [Número de Registro]
        `;
        break;
    }
    
    setGeneratedCertificate(certificateText);
  };
  
  // Función para descargar el certificado
  const downloadCertificate = () => {
    if (!generatedCertificate) return;
    
    // En una implementación real, aquí se generaría un PDF y se descargaría
    alert('Funcionalidad de descarga en desarrollo. En una implementación completa, aquí se generaría un PDF con firma digital.');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Generación Automática de Certificados</h1>
      
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
                    {patient.name} - {patient.rut}
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
                      <p><span className="font-medium">Fecha de diagnóstico:</span> {new Date(patient.diagnosisDate).toLocaleDateString()}</p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
        
        {/* Selección de plantilla */}
        <div>
          <h2 className="text-xl font-semibold mb-4">2. Seleccionar Tipo de Certificado</h2>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="mb-4">
              <label htmlFor="template-select" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Certificado</label>
              <select 
                id="template-select" 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
              >
                <option value="">Selecciona un tipo de certificado</option>
                {certificateTemplates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
            
            {selectedTemplateId && (
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-2">Detalles del Certificado</h3>
                {(() => {
                  const template = certificateTemplates.find(t => t.id === selectedTemplateId);
                  if (!template) return null;
                  
                  return (
                    <div className="text-sm">
                      <p><span className="font-medium">Nombre:</span> {template.name}</p>
                      <p><span className="font-medium">Descripción:</span> {template.description}</p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Botón de generación */}
      <div className="flex justify-center mb-8">
        <button 
          onClick={generateCertificate}
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700"
          disabled={!selectedPatientId || !selectedTemplateId}
        >
          Generar Certificado
        </button>
      </div>
      
      {/* Certificado generado */}
      {generatedCertificate && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">3. Certificado Generado</h2>
          <div className="bg-white p-6 rounded-lg border border-gray-300 font-mono text-sm whitespace-pre-line">
            {generatedCertificate}
          </div>
          <div className="flex justify-end mt-4">
            <button 
              onClick={downloadCertificate}
              className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700"
            >
              Descargar como PDF
            </button>
          </div>
        </div>
      )}
      
      {/* Información sobre certificados */}
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">Acerca de la Generación Automática de Certificados</h3>
        <p className="text-sm text-blue-700 mb-2">
          Este sistema permite generar automáticamente certificados oficiales utilizando los datos clínicos del paciente.
          Los certificados generados cumplen con la normativa vigente y pueden ser utilizados para trámites legales y administrativos.
        </p>
        <p className="text-sm text-blue-700">
          En una implementación completa, los certificados incluirían firma digital del profesional y códigos de verificación
          para validar su autenticidad en plataformas gubernamentales.
        </p>
      </div>
    </div>
  );
};

export default CertificateGenerator;

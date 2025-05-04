// src/app/page.tsx
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">Agenda Clínica</h1>
              <p className="text-xl mb-6">
                La plataforma integral que revoluciona la gestión de centros de salud, 
                mejorando la experiencia de pacientes, terapeutas y administradores.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/portabilidad" className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium text-center">
                  Explorar Funcionalidades
                </Link>
                <button className="border border-white text-white px-6 py-3 rounded-md font-medium">
                  Solicitar Demo
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-blue-500 p-6 rounded-lg shadow-lg">
                <div className="bg-white rounded-md p-4 mb-4">
                  <div className="h-8 bg-blue-100 rounded-md mb-2"></div>
                  <div className="h-24 bg-blue-50 rounded-md"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-md p-3">
                    <div className="h-4 bg-blue-100 rounded-md mb-2"></div>
                    <div className="h-12 bg-blue-50 rounded-md"></div>
                  </div>
                  <div className="bg-white rounded-md p-3">
                    <div className="h-4 bg-blue-100 rounded-md mb-2"></div>
                    <div className="h-12 bg-blue-50 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Características Principales</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Agenda Clínica ofrece soluciones innovadoras para superar las limitaciones 
              de los sistemas actuales como RAYEN, Reservo y AgendaPro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Portabilidad de Datos Clínicos</h3>
              <p className="text-gray-600">
                Los pacientes son dueños de su información médica y pueden compartirla 
                mediante códigos QR con nuevos terapeutas al cambiar de centro.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Clasificación por Diagnóstico</h3>
              <p className="text-gray-600">
                Herramientas avanzadas para clasificar y agrupar pacientes según diagnósticos 
                o síntomas, facilitando estudios clínicos y planificación de recursos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Alertas GES</h3>
              <p className="text-gray-600">
                Sistema de alertas para identificar pacientes que cumplen criterios GES y 
                seguimiento automatizado para asegurar el cumplimiento de garantías.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Certificados Automáticos</h3>
              <p className="text-gray-600">
                Generación automática de credenciales de discapacidad y certificados de 
                salud mental, utilizando datos clínicos y el RUT del paciente.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">IA para Sugerencias Clínicas</h3>
              <p className="text-gray-600">
                Sistema de inteligencia artificial que sugiere objetivos terapéuticos, 
                planes de acción y tratamientos farmacológicos basados en evidencia.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestión Contable Integrada</h3>
              <p className="text-gray-600">
                Sistema completo de gestión financiera y administrativa para centros clínicos, 
                con seguimiento de pagos, emisión de boletas y generación de informes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir Agenda Clínica?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comparación con los sistemas actuales del mercado
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-3 px-4 text-left">Características</th>
                  <th className="py-3 px-4 text-center">Agenda Clínica</th>
                  <th className="py-3 px-4 text-center">RAYEN</th>
                  <th className="py-3 px-4 text-center">Reservo</th>
                  <th className="py-3 px-4 text-center">AgendaPro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 font-medium">Portabilidad de datos clínicos</td>
                  <td className="py-3 px-4 text-center text-green-600">✓</td>
                  <td className="py-3 px-4 text-center text-red-600">✗</td>
                  <td className="py-3 px-4 text-center text-red-600">✗</td>
                  <td className="py-3 px-4 text-center text-red-600">✗</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Clasificación por diagnóstico</td>
                  <td className="py-3 px-4 text-center text-green-600">✓</td>
                  <td className="py-3 px-4 text-center text-red-600">✗</td>
                  <td className="py-3 px-4 text-center text-red-600">✗</td>
                  <td className="py-3 px-4 text-center text-red-600">✗</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Alertas GES</td>
                  <td className="py-3 px-4 text-center text-green-600">✓</td>
                  <td className="py-3 px-4 text-center text-yellow-600">Parcial</td>
                  <td className="py-3 px-4 text-center text-red-600">✗</td>
                  <td className="py-3 px-4 text-center text-red-600">✗</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Certificados automáticos</td>
                  <td className="py-3 px-4 text-center text-green-600">✓</td>
                  <td className="py-3 px-4 text-center text-red-600">✗</td>
                  <td className="py-3 px-4 text-center text-red-600">✗</td>
                  <td className="py-3 px-4 text-center text-red-600">✗</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">IA para sugerencias clínicas</td>
                  <td className="py-3 px-4 text-center text-green-600">✓</td>
                  <td className="py-3 px-4 text-center text-red-600">✗</td>
                  <td className="py-3 px-4 text-center text-red-600">✗</td>
                  <td className="py-3 px-4 text-center text-red-600">✗</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Recetas electrónicas</td>
                  <td className="py-3 px-4 text-center text-green-600">✓</td>
                  <td className="py-3 px-4 text-center text-yellow-600">Parcial</td>
                  <td className="py-3 px-4 text-center text-red-600">✗</td>
                  <td className="py-3 px-4 text-center text-yellow-600">Parcial</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Gestión contable integrada</td>
                  <td className="py-3 px-4 text-center text-green-600">✓</td>
                  <td className="py-3 px-4 text-center text-red-600">✗</td>
                  <td className="py-3 px-4 text-center text-yellow-600">Parcial</td>
                  <td className="py-3 px-4 text-center text-yellow-600">Parcial</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Interfaz amigable</td>
                  <td className="py-3 px-4 text-center text-green-600">✓</td>
                  <td className="py-3 px-4 text-center text-red-600">✗</td>
                  <td className="py-3 px-4 text-center text-yellow-600">Parcial</td>
                  <td className="py-3 px-4 text-center text-green-600">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para revolucionar tu centro de salud?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Agenda Clínica es la solución integral que estabas buscando para mejorar la experiencia 
            de tus pacientes y optimizar la gestión de tu centro.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium">
              Solicitar Demo
            </button>
            <Link href="/portabilidad" className="border border-white text-white px-6 py-3 rounded-md font-medium">
              Explorar Funcionalidades
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '../components/layout/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agenda Clínica - Sistema Integral de Gestión para Centros de Salud',
  description: 'Plataforma innovadora para la gestión de centros de salud con portabilidad de datos clínicos, clasificación por diagnóstico, alertas GES y más.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <footer className="bg-blue-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Agenda Clínica</h3>
                <p className="text-blue-200 text-sm">
                  Plataforma innovadora para la gestión integral de centros de salud, 
                  diseñada para mejorar la experiencia de pacientes, terapeutas y administradores.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                <p className="text-blue-200 text-sm">
                  contacto@agendaclinica.cl<br />
                  +56 9 1234 5678<br />
                  Santiago, Chile
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
                <ul className="text-blue-200 text-sm space-y-2">
                  <li><a href="#" className="hover:text-white">Términos y Condiciones</a></li>
                  <li><a href="#" className="hover:text-white">Política de Privacidad</a></li>
                  <li><a href="#" className="hover:text-white">Preguntas Frecuentes</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-blue-700 text-center text-blue-200 text-sm">
              © {new Date().getFullYear()} Agenda Clínica. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

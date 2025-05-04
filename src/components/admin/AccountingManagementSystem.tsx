// src/components/admin/AccountingManagementSystem.tsx
import React, { useState } from 'react';

interface Patient {
  id: string;
  name: string;
  rut: string;
  email: string;
  phone: string;
}

interface Professional {
  id: string;
  name: string;
  rut: string;
  specialty: string;
  commission: number; // Porcentaje de comisión
}

interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  amount: number;
}

interface Invoice {
  id: string;
  appointmentId: string;
  patientId: string;
  professionalId: string;
  date: string;
  amount: number;
  tax: number;
  total: number;
  status: 'draft' | 'issued' | 'paid' | 'cancelled';
}

interface FinancialSummary {
  totalRevenue: number;
  pendingPayments: number;
  professionalCommissions: Record<string, number>;
  appointmentsByStatus: Record<string, number>;
  revenueByMonth: Record<string, number>;
}

const AccountingManagementSystem: React.FC = () => {
  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState<'appointments' | 'invoices' | 'reports'>('appointments');
  
  // Estado para filtros
  const [dateFilter, setDateFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [professionalFilter, setProfessionalFilter] = useState<string>('');
  
  // Datos de ejemplo para pacientes
  const patients: Patient[] = [
    {
      id: '1',
      name: 'María González',
      rut: '12.345.678-9',
      email: 'maria.gonzalez@ejemplo.com',
      phone: '+56 9 1234 5678'
    },
    {
      id: '2',
      name: 'Juan Pérez',
      rut: '14.567.890-1',
      email: 'juan.perez@ejemplo.com',
      phone: '+56 9 8765 4321'
    },
    {
      id: '3',
      name: 'Ana Martínez',
      rut: '16.789.012-3',
      email: 'ana.martinez@ejemplo.com',
      phone: '+56 9 2345 6789'
    }
  ];
  
  // Datos de ejemplo para profesionales
  const professionals: Professional[] = [
    {
      id: '1',
      name: 'Dr. Carlos Rodríguez',
      rut: '10.111.222-3',
      specialty: 'Psiquiatría',
      commission: 70
    },
    {
      id: '2',
      name: 'Dra. Sofía López',
      rut: '11.222.333-4',
      specialty: 'Psicología',
      commission: 65
    },
    {
      id: '3',
      name: 'Dr. Pedro Sánchez',
      rut: '12.333.444-5',
      specialty: 'Neurología',
      commission: 75
    }
  ];
  
  // Datos de ejemplo para citas
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientId: '1',
      professionalId: '2',
      date: '2025-04-20',
      time: '10:00',
      status: 'completed',
      paymentStatus: 'paid',
      amount: 45000
    },
    {
      id: '2',
      patientId: '2',
      professionalId: '1',
      date: '2025-04-22',
      time: '15:30',
      status: 'completed',
      paymentStatus: 'paid',
      amount: 60000
    },
    {
      id: '3',
      patientId: '3',
      professionalId: '2',
      date: '2025-04-23',
      time: '11:00',
      status: 'cancelled',
      paymentStatus: 'refunded',
      amount: 45000
    },
    {
      id: '4',
      patientId: '1',
      professionalId: '3',
      date: '2025-04-25',
      time: '16:00',
      status: 'scheduled',
      paymentStatus: 'pending',
      amount: 55000
    },
    {
      id: '5',
      patientId: '2',
      professionalId: '1',
      date: '2025-04-27',
      time: '09:30',
      status: 'scheduled',
      paymentStatus: 'pending',
      amount: 60000
    }
  ]);
  
  // Datos de ejemplo para facturas/boletas
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1001',
      appointmentId: '1',
      patientId: '1',
      professionalId: '2',
      date: '2025-04-20',
      amount: 37815,
      tax: 7185,
      total: 45000,
      status: 'paid'
    },
    {
      id: '1002',
      appointmentId: '2',
      patientId: '2',
      professionalId: '1',
      date: '2025-04-22',
      amount: 50420,
      tax: 9580,
      total: 60000,
      status: 'paid'
    }
  ]);
  
  // Calcular resumen financiero
  const calculateFinancialSummary = (): FinancialSummary => {
    const totalRevenue = appointments
      .filter(a => a.paymentStatus === 'paid')
      .reduce((sum, a) => sum + a.amount, 0);
    
    const pendingPayments = appointments
      .filter(a => a.paymentStatus === 'pending')
      .reduce((sum, a) => sum + a.amount, 0);
    
    const professionalCommissions: Record<string, number> = {};
    professionals.forEach(prof => {
      const profAppointments = appointments.filter(
        a => a.professionalId === prof.id && a.paymentStatus === 'paid'
      );
      const totalAmount = profAppointments.reduce((sum, a) => sum + a.amount, 0);
      professionalCommissions[prof.id] = totalAmount * (prof.commission / 100);
    });
    
    const appointmentsByStatus: Record<string, number> = {
      scheduled: appointments.filter(a => a.status === 'scheduled').length,
      completed: appointments.filter(a => a.status === 'completed').length,
      cancelled: appointments.filter(a => a.status === 'cancelled').length,
      no_show: appointments.filter(a => a.status === 'no_show').length
    };
    
    const revenueByMonth: Record<string, number> = {};
    appointments
      .filter(a => a.paymentStatus === 'paid')
      .forEach(a => {
        const month = a.date.substring(0, 7); // YYYY-MM
        revenueByMonth[month] = (revenueByMonth[month] || 0) + a.amount;
      });
    
    return {
      totalRevenue,
      pendingPayments,
      professionalCommissions,
      appointmentsByStatus,
      revenueByMonth
    };
  };
  
  const financialSummary = calculateFinancialSummary();
  
  // Filtrar citas según los criterios seleccionados
  const filteredAppointments = appointments.filter(appointment => {
    // Filtro por fecha
    if (dateFilter && appointment.date !== dateFilter) {
      return false;
    }
    
    // Filtro por estado
    if (statusFilter) {
      if (statusFilter === 'scheduled' && appointment.status !== 'scheduled') return false;
      if (statusFilter === 'completed' && appointment.status !== 'completed') return false;
      if (statusFilter === 'cancelled' && appointment.status !== 'cancelled') return false;
      if (statusFilter === 'no_show' && appointment.status !== 'no_show') return false;
    }
    
    // Filtro por profesional
    if (professionalFilter && appointment.professionalId !== professionalFilter) {
      return false;
    }
    
    return true;
  });
  
  // Filtrar facturas según los criterios seleccionados
  const filteredInvoices = invoices.filter(invoice => {
    // Filtro por fecha
    if (dateFilter && invoice.date !== dateFilter) {
      return false;
    }
    
    // Filtro por estado
    if (statusFilter) {
      if (statusFilter === 'draft' && invoice.status !== 'draft') return false;
      if (statusFilter === 'issued' && invoice.status !== 'issued') return false;
      if (statusFilter === 'paid' && invoice.status !== 'paid') return false;
      if (statusFilter === 'cancelled' && invoice.status !== 'cancelled') return false;
    }
    
    // Filtro por profesional
    if (professionalFilter && invoice.professionalId !== professionalFilter) {
      return false;
    }
    
    return true;
  });
  
  // Función para generar una factura/boleta
  const generateInvoice = (appointmentId: string) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    if (!appointment) return;
    
    // Verificar si ya existe una factura para esta cita
    const existingInvoice = invoices.find(inv => inv.appointmentId === appointmentId);
    if (existingInvoice) {
      alert('Ya existe una boleta para esta cita.');
      return;
    }
    
    // Calcular impuestos (19% IVA)
    const amount = Math.round(appointment.amount / 1.19);
    const tax = appointment.amount - amount;
    
    const newInvoice: Invoice = {
      id: `10${invoices.length + 1}`,
      appointmentId,
      patientId: appointment.patientId,
      professionalId: appointment.professionalId,
      date: new Date().toISOString().split('T')[0],
      amount,
      tax,
      total: appointment.amount,
      status: 'issued'
    };
    
    setInvoices([...invoices, newInvoice]);
    
    // Actualizar el estado de pago de la cita
    setAppointments(appointments.map(a => 
      a.id === appointmentId 
        ? { ...a, paymentStatus: 'paid' } 
        : a
    ));
    
    alert(`Boleta ${newInvoice.id} generada con éxito.`);
  };
  
  // Función para marcar una factura como pagada
  const markInvoiceAsPaid = (invoiceId: string) => {
    setInvoices(invoices.map(inv => 
      inv.id === invoiceId 
        ? { ...inv, status: 'paid' } 
        : inv
    ));
    
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (invoice) {
      setAppointments(appointments.map(a => 
        a.id === invoice.appointmentId 
          ? { ...a, paymentStatus: 'paid' } 
          : a
      ));
    }
    
    alert(`Boleta ${invoiceId} marcada como pagada.`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Sistema de Gestión Contable y Administrativa</h1>
      
      {/* Resumen financiero */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-bold text-lg mb-2">Ingresos Totales</h3>
          <p className="text-3xl font-bold text-blue-700">${financialSummary.totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Pagos recibidos</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="font-bold text-lg mb-2">Pagos Pendientes</h3>
          <p className="text-3xl font-bold text-yellow-700">${financialSummary.pendingPayments.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Por cobrar</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-bold text-lg mb-2">Citas Completadas</h3>
          <p className="text-3xl font-bold text-green-700">{financialSummary.appointmentsByStatus.completed}</p>
          <p className="text-sm text-gray-600">De {appointments.length} totales</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 className="font-bold text-lg mb-2">Boletas Emitidas</h3>
          <p className="text-3xl font-bold text-purple-700">{invoices.length}</p>
          <p className="text-sm text-gray-600">Documentos tributarios</p>
        </div>
      </div>
      
      {/* Pestañas */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'appointments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Citas y Pagos
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'invoices'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Boletas y Facturas
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Informes Financieros
            </button>
          </nav>
        </div>
      </div>
      
      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Fecha</label>
          <input
            type="date"
            id="date-filter"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filtrar por Estado
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Todos los estados</option>
            {activeTab === 'appointments' ? (
              <>
                <option value="scheduled">Agendada</option>
                <option value="completed">Completada</option>
                <option value="cancelled">Cancelada</option>
                <option value="no_show">No asistió</option>
              </>
            ) : (
              <>
                <option value="draft">Borrador</option>
                <option value="issued">Emitida</option>
                <option value="paid">Pagada</option>
                <option value="cancelled">Anulada</option>
              </>
            )}
          </select>
        </div>
        
        <div>
          <label htmlFor="professional-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filtrar por Profesional
          </label>
          <select
            id="professional-filter"
            value={professionalFilter}
            onChange={(e) => setProfessionalFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Todos los profesionales</option>
            {professionals.map(professional => (
              <option key={professional.id} value={professional.id}>
                {professional.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Contenido de pestañas */}
      {activeTab === 'appointments' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Gestión de Citas y Pagos</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profesional
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha y Hora
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pago
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map(appointment => {
                  const patient = patients.find(p => p.id === appointment.patientId);
                  const professional = professionals.find(p => p.id === appointment.professionalId);
                  
                  return (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {patient?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {professional?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(appointment.date).toLocaleDateString()} {appointment.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status === 'scheduled' ? 'Agendada' :
                           appointment.status === 'completed' ? 'Completada' :
                           appointment.status === 'cancelled' ? 'Cancelada' : 'No asistió'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${appointment.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                          appointment.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {appointment.paymentStatus === 'paid' ? 'Pagado' :
                           appointment.paymentStatus === 'pending' ? 'Pendiente' : 'Reembolsado'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {appointment.status === 'completed' && appointment.paymentStatus === 'pending' && (
                          <button
                            onClick={() => generateInvoice(appointment.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Generar Boleta
                          </button>
                        )}
                        {appointment.paymentStatus === 'paid' && (
                          <span className="text-green-600">Boleta emitida</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredAppointments.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No se encontraron citas que coincidan con los filtros seleccionados.
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'invoices' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Gestión de Boletas y Facturas</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    N° Documento
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profesional
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Neto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IVA
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
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
                {filteredInvoices.map(invoice => {
                  const patient = patients.find(p => p.id === invoice.patientId);
                  const professional = professionals.find(p => p.id === invoice.professionalId);
                  
                  return (
                    <tr key={invoice.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {invoice.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {professional?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(invoice.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${invoice.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${invoice.tax.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${invoice.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          invoice.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                          invoice.status === 'issued' ? 'bg-blue-100 text-blue-800' :
                          invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {invoice.status === 'draft' ? 'Borrador' :
                           invoice.status === 'issued' ? 'Emitida' :
                           invoice.status === 'paid' ? 'Pagada' : 'Anulada'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {invoice.status === 'issued' && (
                          <button
                            onClick={() => markInvoiceAsPaid(invoice.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Marcar como Pagada
                          </button>
                        )}
                        {invoice.status === 'paid' && (
                          <button
                            onClick={() => alert('Boleta enviada por correo al paciente.')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Enviar por Email
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredInvoices.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No se encontraron documentos que coincidan con los filtros seleccionados.
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'reports' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Informes Financieros</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Comisiones por profesional */}
            <div className="bg-white p-4 rounded-lg border border-gray-300">
              <h3 className="font-bold text-lg mb-3">Comisiones por Profesional</h3>
              
              <div className="space-y-4">
                {professionals.map(professional => {
                  const commission = financialSummary.professionalCommissions[professional.id] || 0;
                  const totalAppointments = appointments.filter(
                    a => a.professionalId === professional.id && a.paymentStatus === 'paid'
                  ).length;
                  
                  return (
                    <div key={professional.id} className="border-b pb-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{professional.name}</span>
                        <span>${commission.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{totalAppointments} citas pagadas</span>
                        <span>{professional.commission}% comisión</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Distribución de citas por estado */}
            <div className="bg-white p-4 rounded-lg border border-gray-300">
              <h3 className="font-bold text-lg mb-3">Distribución de Citas por Estado</h3>
              
              <div className="space-y-3">
                <div className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Agendadas</span>
                    <span className="text-sm font-medium">{financialSummary.appointmentsByStatus.scheduled} citas</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${(financialSummary.appointmentsByStatus.scheduled / appointments.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Completadas</span>
                    <span className="text-sm font-medium">{financialSummary.appointmentsByStatus.completed} citas</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${(financialSummary.appointmentsByStatus.completed / appointments.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Canceladas</span>
                    <span className="text-sm font-medium">{financialSummary.appointmentsByStatus.cancelled} citas</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-red-600 h-2.5 rounded-full" 
                      style={{ width: `${(financialSummary.appointmentsByStatus.cancelled / appointments.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">No asistieron</span>
                    <span className="text-sm font-medium">{financialSummary.appointmentsByStatus.no_show} citas</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-yellow-600 h-2.5 rounded-full" 
                      style={{ width: `${(financialSummary.appointmentsByStatus.no_show / appointments.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ingresos por mes */}
          <div className="bg-white p-4 rounded-lg border border-gray-300 mb-6">
            <h3 className="font-bold text-lg mb-3">Ingresos por Mes</h3>
            
            <div className="h-64 flex items-end space-x-2">
              {Object.entries(financialSummary.revenueByMonth).map(([month, revenue]) => {
                const maxRevenue = Math.max(...Object.values(financialSummary.revenueByMonth));
                const height = (revenue / maxRevenue) * 100;
                const monthName = new Date(`${month}-01`).toLocaleDateString('es-ES', { month: 'short' });
                
                return (
                  <div key={month} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="text-xs mt-1">{monthName}</div>
                    <div className="text-xs font-medium">${(revenue / 1000).toFixed(0)}K</div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Botones de exportación */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => alert('Informe financiero exportado a Excel.')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Exportar a Excel
            </button>
            <button
              onClick={() => alert('Informe financiero exportado a PDF.')}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Exportar a PDF
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-8 bg-blue-50 p-4 rounded-md border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">Acerca del Sistema de Gestión Contable y Administrativa</h3>
        <p className="text-sm text-blue-700 mb-2">
          Este sistema te permite gestionar los aspectos financieros y administrativos de tu centro clínico,
          incluyendo el seguimiento de pagos, la emisión de boletas y facturas, y la generación de informes financieros.
        </p>
        <p className="text-sm text-blue-700">
          Todas las transacciones se sincronizan automáticamente con el sistema de agendamiento y la ficha clínica,
          proporcionando una visión integral de la operación de tu centro.
        </p>
      </div>
    </div>
  );
};

export default AccountingManagementSystem;

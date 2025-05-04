// src/components/payments/WebpayIntegration.tsx
import React, { useState } from 'react';

interface PaymentDetails {
  id: string;
  patientId: string;
  patientName: string;
  professionalId: string;
  professionalName: string;
  appointmentId: string;
  appointmentDate: string;
  appointmentTime: string;
  amount: number;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

const WebpayIntegration: React.FC = () => {
  // Estado para el monto a pagar
  const [amount, setAmount] = useState<string>('');
  
  // Estado para la descripción del pago
  const [description, setDescription] = useState<string>('');
  
  // Estado para el paciente seleccionado
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  
  // Estado para la cita seleccionada
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>('');
  
  // Estado para el proceso de pago
  const [paymentStep, setPaymentStep] = useState<'details' | 'confirmation' | 'processing' | 'result'>('details');
  
  // Estado para el resultado del pago
  const [paymentResult, setPaymentResult] = useState<'success' | 'failure' | null>(null);
  
  // Estado para el ID de transacción
  const [transactionId, setTransactionId] = useState<string>('');
  
  // Estado para el historial de pagos
  const [paymentHistory, setPaymentHistory] = useState<PaymentDetails[]>([
    {
      id: '1001',
      patientId: '1',
      patientName: 'María González',
      professionalId: '2',
      professionalName: 'Dra. Sofía López',
      appointmentId: '1',
      appointmentDate: '2025-04-20',
      appointmentTime: '10:00',
      amount: 45000,
      description: 'Consulta psicológica',
      status: 'completed',
      createdAt: '2025-04-20T10:45:00Z',
      updatedAt: '2025-04-20T10:48:30Z'
    },
    {
      id: '1002',
      patientId: '2',
      patientName: 'Juan Pérez',
      professionalId: '1',
      professionalName: 'Dr. Carlos Rodríguez',
      appointmentId: '2',
      appointmentDate: '2025-04-22',
      appointmentTime: '15:30',
      amount: 60000,
      description: 'Consulta psiquiátrica',
      status: 'completed',
      createdAt: '2025-04-22T16:15:00Z',
      updatedAt: '2025-04-22T16:18:45Z'
    },
    {
      id: '1003',
      patientId: '3',
      patientName: 'Ana Martínez',
      professionalId: '3',
      professionalName: 'Dr. Pedro Sánchez',
      appointmentId: '4',
      appointmentDate: '2025-04-25',
      appointmentTime: '16:00',
      amount: 55000,
      description: 'Evaluación neurológica',
      status: 'pending',
      createdAt: '2025-04-23T09:30:00Z',
      updatedAt: '2025-04-23T09:30:00Z'
    }
  ]);
  
  // Datos de ejemplo para pacientes
  const patients = [
    { id: '1', name: 'María González', rut: '12.345.678-9' },
    { id: '2', name: 'Juan Pérez', rut: '14.567.890-1' },
    { id: '3', name: 'Ana Martínez', rut: '16.789.012-3' }
  ];
  
  // Datos de ejemplo para citas
  const appointments = [
    { id: '3', patientId: '1', date: '2025-04-27', time: '09:00', professional: 'Dra. Sofía López', service: 'Consulta psicológica', amount: 45000 },
    { id: '4', patientId: '3', date: '2025-04-25', time: '16:00', professional: 'Dr. Pedro Sánchez', service: 'Evaluación neurológica', amount: 55000 },
    { id: '5', patientId: '2', date: '2025-04-27', time: '09:30', professional: 'Dr. Carlos Rodríguez', service: 'Consulta psiquiátrica', amount: 60000 }
  ];
  
  // Filtrar citas por paciente seleccionado
  const filteredAppointments = appointments.filter(
    appointment => !selectedPatientId || appointment.patientId === selectedPatientId
  );
  
  // Obtener detalles de la cita seleccionada
  const selectedAppointment = appointments.find(a => a.id === selectedAppointmentId);
  
  // Función para iniciar el proceso de pago
  const initiatePayment = () => {
    if (!selectedAppointmentId && (!amount || !description)) {
      alert('Por favor, selecciona una cita o ingresa los detalles del pago manualmente.');
      return;
    }
    
    setPaymentStep('confirmation');
  };
  
  // Función para confirmar y procesar el pago
  const processPayment = () => {
    setPaymentStep('processing');
    
    // Simulación de procesamiento de pago con WebPay
    setTimeout(() => {
      // Simulamos un resultado exitoso la mayoría de las veces
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        setPaymentResult('success');
        setTransactionId(`WP${Date.now().toString().substring(6)}`);
        
        // Agregar el pago al historial
        const newPayment: PaymentDetails = {
          id: `100${paymentHistory.length + 1}`,
          patientId: selectedPatientId,
          patientName: patients.find(p => p.id === selectedPatientId)?.name || 'Cliente',
          professionalId: '1', // Valor por defecto
          professionalName: selectedAppointment?.professional || 'Profesional',
          appointmentId: selectedAppointmentId || 'manual',
          appointmentDate: selectedAppointment?.date || new Date().toISOString().split('T')[0],
          appointmentTime: selectedAppointment?.time || '',
          amount: selectedAppointment ? selectedAppointment.amount : Number(amount),
          description: selectedAppointment ? selectedAppointment.service : description,
          status: 'completed',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        setPaymentHistory([...paymentHistory, newPayment]);
      } else {
        setPaymentResult('failure');
      }
      
      setPaymentStep('result');
    }, 3000);
  };
  
  // Función para reiniciar el proceso de pago
  const resetPayment = () => {
    setAmount('');
    setDescription('');
    setSelectedPatientId('');
    setSelectedAppointmentId('');
    setPaymentStep('details');
    setPaymentResult(null);
    setTransactionId('');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Sistema de Pagos - Integración WebPay</h1>
      
      {/* Pestañas */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setPaymentStep('details')}
              className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                paymentStep === 'details' || paymentStep === 'confirmation'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Nuevo Pago
            </button>
            <button
              onClick={() => {
                setPaymentStep('details');
                setPaymentResult(null);
              }}
              className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                paymentStep === 'processing' || paymentStep === 'result'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Estado de Pago
            </button>
            <button
              onClick={() => {
                setPaymentStep('details');
                setPaymentResult(null);
              }}
              className="py-2 px-4 text-center border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm"
            >
              Historial de Pagos
            </button>
          </nav>
        </div>
      </div>
      
      {/* Formulario de detalles de pago */}
      {paymentStep === 'details' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Detalles del Pago</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
              <div className="mb-4">
                <label htmlFor="patient-select" className="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
                <select 
                  id="patient-select" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedPatientId}
                  onChange={(e) => {
                    setSelectedPatientId(e.target.value);
                    setSelectedAppointmentId('');
                  }}
                >
                  <option value="">Selecciona un paciente</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} - {patient.rut}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="appointment-select" className="block text-sm font-medium text-gray-700 mb-1">Cita</label>
                <select 
                  id="appointment-select" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedAppointmentId}
                  onChange={(e) => {
                    setSelectedAppointmentId(e.target.value);
                    
                    // Actualizar automáticamente el monto y la descripción
                    const appointment = appointments.find(a => a.id === e.target.value);
                    if (appointment) {
                      setAmount(appointment.amount.toString());
                      setDescription(appointment.service);
                    }
                  }}
                  disabled={!selectedPatientId}
                >
                  <option value="">Selecciona una cita o ingresa detalles manualmente</option>
                  {filteredAppointments.map(appointment => (
                    <option key={appointment.id} value={appointment.id}>
                      {new Date(appointment.date).toLocaleDateString()} {appointment.time} - {appointment.service}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="amount-input" className="block text-sm font-medium text-gray-700 mb-1">Monto (CLP) *</label>
                <input
                  type="number"
                  id="amount-input"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Ej: 45000"
                  disabled={!!selectedAppointmentId}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description-input" className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
                <input
                  type="text"
                  id="description-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Ej: Consulta psicológica"
                  disabled={!!selectedAppointmentId}
                />
              </div>
              
              <div className="flex justify-end mt-4">
                <button
                  onClick={initiatePayment}
                  disabled={(!selectedAppointmentId && (!amount || !description))}
                  className={`px-4 py-2 rounded-md text-white font-medium ${
                    (selectedAppointmentId || (amount && description))
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continuar al Pago
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Próximas Citas Pendientes de Pago</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              {appointments.filter(a => {
                const payment = paymentHistory.find(p => p.appointmentId === a.id);
                return !payment || payment.status === 'pending';
              }).length > 0 ? (
                <div className="space-y-3">
                  {appointments.filter(a => {
                    const payment = paymentHistory.find(p => p.appointmentId === a.id);
                    return !payment || payment.status === 'pending';
                  }).map(appointment => {
                    const patient = patients.find(p => p.id === appointment.patientId);
                    
                    return (
                      <div key={appointment.id} className="bg-white p-3 rounded-md border border-gray-200 hover:border-blue-300 cursor-pointer"
                        onClick={() => {
                          setSelectedPatientId(appointment.patientId);
                          setSelectedAppointmentId(appointment.id);
                          setAmount(appointment.amount.toString());
                          setDescription(appointment.service);
                        }}
                      >
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{patient?.name}</p>
                            <p className="text-sm text-gray-600">{new Date(appointment.date).toLocaleDateString()} {appointment.time}</p>
                            <p className="text-sm text-gray-600">{appointment.service}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${appointment.amount.toLocaleString()}</p>
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pendiente
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No hay citas pendientes de pago.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Confirmación de pago */}
      {paymentStep === 'confirmation' && (
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Confirmar Pago</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <div className="mb-4 border-b pb-4">
              <p className="text-sm text-gray-600">Paciente</p>
              <p className="font-medium">
                {selectedPatientId 
                  ? patients.find(p => p.id === selectedPatientId)?.name 
                  : 'Cliente sin registrar'}
              </p>
            </div>
            
            {selectedAppointment && (
              <div className="mb-4 border-b pb-4">
                <p className="text-sm text-gray-600">Cita</p>
                <p className="font-medium">
                  {new Date(selectedAppointment.date).toLocaleDateString()} {selectedAppointment.time}
                </p>
                <p className="text-sm">
                  {selectedAppointment.professional} - {selectedAppointment.service}
                </p>
              </div>
            )}
            
            <div className="mb-4 border-b pb-4">
              <p className="text-sm text-gray-600">Descripción</p>
              <p className="font-medium">{selectedAppointment ? selectedAppointment.service : description}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">Monto a Pagar</p>
              <p className="text-2xl font-bold text-blue-700">
                ${(selectedAppointment ? selectedAppointment.amount : Number(amount)).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Información de Pago</h3>
            <p className="text-sm text-blue-700 mb-2">
              Al hacer clic en "Pagar con WebPay", serás redirigido a la plataforma segura de Transbank
              para completar tu pago con tarjeta de crédito, débito o prepago.
            </p>
            <p className="text-sm text-blue-700">
              Una vez completado el pago, recibirás un comprobante por correo electrónico.
            </p>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={() => setPaymentStep('details')}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Volver
            </button>
            
            <button
              onClick={processPayment}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Pagar con WebPay
            </button>
          </div>
        </div>
      )}
      
      {/* Procesamiento de pago */}
      {paymentStep === 'processing' && (
        <div className="max-w-md mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Procesando tu pago</h2>
          <p className="text-gray-600 mb-8">
            Por favor, espera mientras procesamos tu pago con WebPay...
          </p>
          
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <p className="text-sm text-blue-700">
              No cierres esta ventana hasta que el proceso haya finalizado.
            </p>
          </div>
        </div>
      )}
      
      {/* Resultado del pago */}
      {paymentStep === 'result' && (
        <div className="max-w-md mx-auto">
          {paymentResult === 'success' ? (
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">¡Pago Exitoso!</h2>
              <p className="text-gray-600 mb-4">
                Tu pago ha sido procesado correctamente.
              </p>
            </div>
          ) : (
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Pago Fallido</h2>
              <p className="text-gray-600 mb-4">
                Lo sentimos, no pudimos procesar tu pago. Por favor, intenta nuevamente.
              </p>
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            {paymentResult === 'success' && (
              <>
                <div className="mb-4 border-b pb-4">
                  <p className="text-sm text-gray-600">ID de Transacción</p>
                  <p className="font-medium">{transactionId}</p>
                </div>
                
                <div className="mb-4 border-b pb-4">
                  <p className="text-sm text-gray-600">Fecha y Hora</p>
                  <p className="font-medium">{new Date().toLocaleString()}</p>
                </div>
              </>
            )}
            
            <div className="mb-4 border-b pb-4">
              <p className="text-sm text-gray-600">Paciente</p>
              <p className="font-medium">
                {selectedPatientId 
                  ? patients.find(p => p.id === selectedPatientId)?.name 
                  : 'Cliente sin registrar'}
              </p>
            </div>
            
            <div className="mb-4 border-b pb-4">
              <p className="text-sm text-gray-600">Descripción</p>
              <p className="font-medium">{selectedAppointment ? selectedAppointment.service : description}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">Monto</p>
              <p className="text-xl font-bold">
                ${(selectedAppointment ? selectedAppointment.amount : Number(amount)).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={resetPayment}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Volver al Inicio
            </button>
            
            {paymentResult === 'success' && (
              <button
                onClick={() => alert('Comprobante enviado por correo electrónico.')}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Enviar Comprobante
              </button>
            )}
            
            {paymentResult === 'failure' && (
              <button
                onClick={() => setPaymentStep('confirmation')}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Intentar Nuevamente
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Historial de pagos */}
      {paymentStep === 'details' && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Historial de Pagos Recientes</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
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
                {paymentHistory.map(payment => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.patientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${payment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        payment.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        payment.status === 'refunded' ? 'bg-purple-100 text-purple-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {payment.status === 'completed' ? 'Completado' :
                         payment.status === 'pending' ? 'Pendiente' :
                         payment.status === 'processing' ? 'Procesando' :
                         payment.status === 'refunded' ? 'Reembolsado' : 'Fallido'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => alert('Comprobante enviado por correo electrónico.')}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Comprobante
                      </button>
                      {payment.status === 'completed' && (
                        <button
                          onClick={() => alert('Solicitud de reembolso iniciada.')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reembolsar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="mt-8 bg-blue-50 p-4 rounded-md border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">Acerca de la Integración con WebPay</h3>
        <p className="text-sm text-blue-700 mb-2">
          WebPay es la plataforma de pago en línea de Transbank, que permite a tus pacientes
          pagar con tarjetas de crédito, débito y prepago de forma segura y confiable.
        </p>
        <p className="text-sm text-blue-700">
          Todos los pagos se procesan en un entorno seguro y cumplen con los estándares PCI DSS
          para la protección de datos de tarjetas.
        </p>
      </div>
    </div>
  );
};

export default WebpayIntegration;

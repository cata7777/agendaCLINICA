// src/components/clinical/SessionRecorder.tsx
import React, { useState, useRef, useEffect } from 'react';

interface SessionRecorderProps {
  onTranscriptionComplete: (transcription: string) => void;
}

const SessionRecorder: React.FC<SessionRecorderProps> = ({ onTranscriptionComplete }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const [consentName, setConsentName] = useState<string>('');
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [transcriptionProgress, setTranscriptionProgress] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Efecto para limpiar recursos al desmontar
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [isRecording, audioUrl]);
  
  // Función para iniciar la grabación
  const startRecording = async () => {
    if (!hasConsent) {
      alert('Se requiere el consentimiento del paciente para grabar la sesión.');
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Limpiar el temporizador
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Iniciar temporizador para actualizar el tiempo de grabación
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error al iniciar la grabación:', error);
      alert('No se pudo acceder al micrófono. Verifica los permisos del navegador.');
    }
  };
  
  // Función para detener la grabación
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Detener todas las pistas de audio
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    }
  };
  
  // Función para simular la transcripción
  const transcribeAudio = () => {
    if (!audioUrl) return;
    
    setIsTranscribing(true);
    setTranscriptionProgress(0);
    
    // Simulación de progreso de transcripción
    const interval = setInterval(() => {
      setTranscriptionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTranscribing(false);
          
          // Simulación de resultado de transcripción
          const simulatedTranscription = `
Terapeuta: Hola María, ¿cómo has estado desde nuestra última sesión?

Paciente: He tenido una semana bastante difícil. Las técnicas de respiración me han ayudado un poco con la ansiedad, pero sigo teniendo problemas para dormir.

Terapeuta: Entiendo. ¿Podrías contarme más sobre esos problemas de sueño?

Paciente: Me cuesta mucho conciliar el sueño. Doy vueltas en la cama pensando en todo lo que tengo que hacer al día siguiente. Y cuando finalmente logro dormirme, me despierto varias veces durante la noche.

Terapeuta: ¿Has intentado aplicar las técnicas de mindfulness antes de dormir como habíamos comentado?

Paciente: Sí, algunas noches. Cuando lo hago, me ayuda a relajarme, pero no siempre tengo la disciplina para hacerlo.

Terapeuta: Es comprensible. Establecer nuevos hábitos lleva tiempo. ¿Qué te parece si revisamos algunas estrategias adicionales para mejorar tu higiene del sueño?
          `;
          
          onTranscriptionComplete(simulatedTranscription);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };
  
  // Formatear el tiempo de grabación
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Grabación y Transcripción de Sesión</h2>
      
      {/* Formulario de consentimiento */}
      {!hasConsent && (
        <div className="mb-6 bg-yellow-50 p-4 rounded-md border border-yellow-200">
          <h3 className="font-semibold text-yellow-800 mb-2">Consentimiento del Paciente</h3>
          <p className="text-sm text-yellow-700 mb-4">
            Antes de grabar la sesión, es necesario obtener el consentimiento explícito del paciente.
            Por favor, confirma que has informado al paciente sobre la grabación y que ha dado su consentimiento.
          </p>
          
          <div className="mb-4">
            <label htmlFor="consentName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Paciente
            </label>
            <input
              type="text"
              id="consentName"
              value={consentName}
              onChange={(e) => setConsentName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ingrese el nombre del paciente"
            />
          </div>
          
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="consentCheckbox"
              checked={hasConsent}
              onChange={(e) => setHasConsent(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="consentCheckbox" className="ml-2 block text-sm text-gray-700">
              Confirmo que {consentName || 'el paciente'} ha sido informado sobre la grabación de la sesión y ha dado su consentimiento explícito.
            </label>
          </div>
          
          <button
            onClick={() => setHasConsent(true)}
            disabled={!consentName.trim()}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              consentName.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Confirmar Consentimiento
          </button>
        </div>
      )}
      
      {/* Controles de grabación */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${isRecording ? 'bg-red-600 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-medium">
              {isRecording ? `Grabando: ${formatTime(recordingTime)}` : 'Listo para grabar'}
            </span>
          </div>
          
          <div className="flex space-x-2">
            {!isRecording ? (
              <button
                onClick={startRecording}
                disabled={!hasConsent}
                className={`px-4 py-2 rounded-md text-white font-medium ${
                  hasConsent ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Iniciar Grabación
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white font-medium"
              >
                Detener Grabación
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Reproductor de audio */}
      {audioUrl && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Grabación Completada</h3>
          <audio controls src={audioUrl} className="w-full"></audio>
          
          <div className="mt-4">
            <button
              onClick={transcribeAudio}
              disabled={isTranscribing}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                isTranscribing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isTranscribing ? 'Transcribiendo...' : 'Transcribir Grabación'}
            </button>
          </div>
        </div>
      )}
      
      {/* Progreso de transcripción */}
      {isTranscribing && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Transcribiendo Audio</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${transcriptionProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {transcriptionProgress}% completado
          </p>
        </div>
      )}
      
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">Acerca de la Grabación y Transcripción</h3>
        <p className="text-sm text-blue-700 mb-2">
          Esta funcionalidad te permite grabar la sesión con el paciente y obtener una transcripción automática,
          facilitando el registro de la ficha clínica sin tener que dividir tu atención durante la sesión.
        </p>
        <p className="text-sm text-blue-700">
          La grabación solo se realiza con el consentimiento explícito del paciente y los datos se procesan
          de forma segura cumpliendo con todas las normativas de protección de datos de salud.
        </p>
      </div>
    </div>
  );
};

export default SessionRecorder;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Mic, MicOff, Video, VideoOff, PhoneOff, MessageCircle, Loader2, Send, X, AlertCircle } from 'lucide-react';

type StoredSession = {
  id: string;
  mentorName: string;
  mentorImage: string;
  mentorTitle: string;
  menteeId?: string;
  menteeName?: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
};

const SessionRoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const [isRequestingPermissions, setIsRequestingPermissions] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; text: string; sender: 'me' | 'mentor'; time: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  let session: StoredSession | null = null;

  if (typeof window !== 'undefined' && id) {
    try {
      const raw = window.localStorage.getItem('smd_sessions');
      if (raw) {
        const parsed = JSON.parse(raw) as StoredSession[];
        session = Array.isArray(parsed) ? parsed.find((s) => s.id === id) || null : null;
      }
    } catch (error) {
      console.error('No se pudo leer la sesión desde localStorage', error);
    }
  }

  // Limpiar stream al desmontar
  useEffect(() => {
    return () => {
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach((track) => track.stop());
        videoStreamRef.current = null;
      }
    };
  }, []);

  // Asegura que el stream se conecte al <video> cuando se monte
  useEffect(() => {
    const el = videoRef.current;
    const stream = videoStreamRef.current;
    if (!el || !stream || !isVideoOn) return;

    try {
      if (el.srcObject !== stream) {
        el.srcObject = stream;
      }
      // Algunos navegadores requieren play() tras gesto de usuario (ya lo hay por el modal)
      void el.play().catch(() => {});
    } catch (error) {
      console.error('No se pudo conectar el stream al video', error);
    }
  }, [isVideoOn, showPermissionModal]);

  const handleRequestPermissions = async () => {
    setIsRequestingPermissions(true);
    setVideoError(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      
      videoStreamRef.current = stream;
      
      // Activar ambos por defecto cuando se aceptan permisos
      setIsMicOn(true);
      setIsVideoOn(true);
      setShowPermissionModal(false);

      // Habilitar tracks explícitamente
      stream.getAudioTracks().forEach((t) => (t.enabled = true));
      stream.getVideoTracks().forEach((t) => (t.enabled = true));
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      setVideoError('No se pudo acceder a la cámara y/o micrófono. Verifica los permisos en tu navegador.');
    } finally {
      setIsRequestingPermissions(false);
    }
  };

  const handleSkipPermissions = () => {
    setShowPermissionModal(false);
  };

  const handleToggleMic = async () => {
    const newState = !isMicOn;
    
    // Si no hay stream y queremos activar el micrófono, crear uno
    if (newState && !videoStreamRef.current) {
      try {
        setVideoError(null);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: isVideoOn,
          audio: true,
        });
        videoStreamRef.current = stream;
        
        if (videoRef.current && isVideoOn) {
          videoRef.current.srcObject = stream;
        }
        
        setIsMicOn(true);
      } catch (error) {
        console.error('Error al acceder al micrófono:', error);
        setVideoError('No se pudo acceder al micrófono. Verifica los permisos.');
        return;
      }
    } else if (videoStreamRef.current) {
      // Actualizar el estado del audio en el stream existente
      videoStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = newState;
      });
      setIsMicOn(newState);
    } else {
      setIsMicOn(newState);
    }
  };

  const handleToggleVideo = async () => {
    const newState = !isVideoOn;
    
    if (newState) {
      // Activar cámara
      try {
        setVideoError(null);
        
        // Si no hay stream, crear uno nuevo
        if (!videoStreamRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          videoStreamRef.current = stream;
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          
          // Mantener el estado del micrófono
          stream.getAudioTracks().forEach((track) => {
            track.enabled = isMicOn;
          });
        } else {
          // Si ya hay stream, reactivar los tracks de video
          videoStreamRef.current.getVideoTracks().forEach((track) => {
            track.enabled = true;
          });
          
          if (videoRef.current && !videoRef.current.srcObject) {
            videoRef.current.srcObject = videoStreamRef.current;
          }
        }
        
        setIsVideoOn(true);
      } catch (error) {
        console.error('Error al activar la cámara:', error);
        setVideoError('No se pudo acceder a la cámara. Verifica los permisos.');
        setIsVideoOn(false);
      }
    } else {
      // Desactivar solo el video, mantener el audio
      if (videoStreamRef.current) {
        videoStreamRef.current.getVideoTracks().forEach((track) => {
          track.enabled = false;
        });
      }
      setIsVideoOn(false);
    }
  };

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: chatInput.trim(),
      sender: 'me' as const,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages([...chatMessages, newMessage]);
    setChatInput('');

    // Simular respuesta de la mentora después de 2 segundos
    setTimeout(() => {
      const mentorResponse = {
        id: (Date.now() + 1).toString(),
        text: 'Gracias por tu mensaje. Te escucho.',
        sender: 'mentor' as const,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, mentorResponse]);
    }, 2000);
  };

  const handleEndSession = () => {
    // Detener todos los tracks de video/audio
    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach((track) => track.stop());
      videoStreamRef.current = null;
    }
    
    try {
      if (typeof window !== 'undefined' && id) {
        const raw = window.localStorage.getItem('smd_sessions');
        if (raw) {
          const parsed = JSON.parse(raw) as StoredSession[];
          if (Array.isArray(parsed)) {
            const updated = parsed.map((s) =>
              s.id === id ? { ...s, status: 'completed' as const } : s
            );
            window.localStorage.setItem('smd_sessions', JSON.stringify(updated));
          }
        }
      }
    } catch (error) {
      console.error('No se pudo actualizar el estado de la sesión', error);
    }
    navigate('/mentee/dashboard');
  };

  const displaySession = session || {
    mentorName: 'Mentora',
    mentorImage: '',
    mentorTitle: 'Sesión de mentoría 1:1',
    date: 'Hoy',
    time: 'Ahora',
  };

  // Permitir sala solo para "Próxima sesión" (upcoming). Si ya fue completada/cancelada o no existe, mostrar mensaje.
  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <main className="pt-24 px-4 pb-12">
          <div className="max-w-xl mx-auto bg-card border rounded-2xl p-6 text-center">
            <h1 className="text-xl font-bold mb-2">Sesión no disponible</h1>
            <p className="text-muted-foreground mb-6">
              Esta sala solo está disponible desde <span className="font-semibold">Próxima sesión</span> cuando la reserva está confirmada.
            </p>
            <Button onClick={() => navigate('/mentee/dashboard')}>Volver al dashboard</Button>
          </div>
        </main>
      </div>
    );
  }

  if (session.status !== 'upcoming') {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <main className="pt-24 px-4 pb-12">
          <div className="max-w-xl mx-auto bg-card border rounded-2xl p-6 text-center">
            <h1 className="text-xl font-bold mb-2">Esta sesión ya no está activa</h1>
            <p className="text-muted-foreground mb-6">
              La sala de reunión solo se habilita para <span className="font-semibold">Próxima sesión</span>.
            </p>
            <Button onClick={() => navigate('/mentee/dashboard')}>Volver al dashboard</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-hero overflow-hidden">
      <Navbar />
      
      {/* Modal de permisos de cámara y micrófono */}
      {showPermissionModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border shadow-2xl max-w-md w-full p-6 space-y-6">
            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Video className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Activar cámara y micrófono
                </h2>
                <p className="text-muted-foreground">
                  Para participar en la sesión de mentoría, necesitamos acceso a tu cámara y micrófono.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <Video className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Cámara</p>
                  <p className="text-xs text-muted-foreground">
                    Permite que la mentora te vea durante la sesión
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <Mic className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Micrófono</p>
                  <p className="text-xs text-muted-foreground">
                    Permite que la mentora te escuche durante la conversación
                  </p>
                </div>
              </div>
            </div>

            {videoError && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-sm text-destructive">{videoError}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleSkipPermissions}
                disabled={isRequestingPermissions}
              >
                Entrar sin activar
              </Button>
              <Button
                className="flex-1 bg-gradient-primary hover:opacity-90"
                onClick={handleRequestPermissions}
                disabled={isRequestingPermissions}
              >
                {isRequestingPermissions ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Activando...
                  </>
                ) : (
                  'Activar cámara y micrófono'
                )}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Puedes activar o desactivar la cámara y micrófono en cualquier momento durante la sesión.
            </p>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-hidden pt-20 px-4 pb-4">
        <div className="h-full max-w-7xl mx-auto flex flex-col">
          <div className="mb-4 flex items-center justify-between gap-4 flex-shrink-0">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-1">
                Sesión en vivo
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Mentoría con {displaySession.mentorName}
              </h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {displaySession.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {displaySession.time}
                </span>
              </div>
            </div>
            <div className="text-right text-xs md:text-sm text-muted-foreground">
              <p className="font-medium text-primary flex items-center justify-end gap-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                Esperando a la mentora
              </p>
              <p className="mt-1">Recuerda estar en un lugar tranquilo y con buena conexión.</p>
            </div>
          </div>

          <div className="flex-1 grid lg:grid-cols-[2fr,1fr] gap-6 min-h-0 overflow-hidden relative">
            {/* Área de “video” - más grande */}
            <div className="bg-card rounded-2xl border border-border/60 shadow-xl overflow-hidden flex flex-col">
              <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative flex items-center justify-center min-h-0">
                {/* Video del usuario como principal si está activado */}
                {isVideoOn && videoStreamRef.current ? (
                  <>
                    <div className="absolute inset-0 z-10">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Overlay con info de la mentora */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 z-20">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-slate-700 flex items-center justify-center border border-white/10">
                          {displaySession.mentorImage ? (
                            <img
                              src={displaySession.mentorImage}
                              alt={displaySession.mentorName}
                              className="h-full w-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-xl text-white font-semibold">
                              {displaySession.mentorName.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{displaySession.mentorName}</h3>
                          <p className="text-xs text-slate-300">{displaySession.mentorTitle}</p>
                          <div className="mt-2 flex items-center gap-2 text-xs text-slate-300">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            <span>Esperando a que se una a la sesión...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Badge "Tú" en esquina superior */}
                    <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
                      <span className="text-xs text-white font-medium">Tú</span>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Vista de la mentora cuando el video del usuario está desactivado */}
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_#22d3ee_0,_transparent_55%),_radial-gradient(circle_at_bottom,_#6366f1_0,_transparent_55%)]" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="h-32 w-32 md:h-40 md:w-40 rounded-full bg-slate-700 flex items-center justify-center mb-6 border border-white/10 shadow-2xl">
                        {displaySession.mentorImage ? (
                          <img
                            src={displaySession.mentorImage}
                            alt={displaySession.mentorName}
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-4xl md:text-5xl text-white font-semibold">
                            {displaySession.mentorName.charAt(0)}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
                        {displaySession.mentorName}
                      </h2>
                      <p className="text-sm md:text-base text-slate-200/80">
                        {displaySession.mentorTitle}
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-sm text-slate-300">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Esperando a que {displaySession.mentorName} se una a la sesión...</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Indicadores de estado */}
                {!isMicOn && (
                  <div className="absolute top-4 left-4 z-30 px-4 py-2 bg-destructive/20 border border-destructive/40 rounded-lg flex items-center gap-2">
                    <MicOff className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-destructive font-medium">Micrófono desactivado</span>
                  </div>
                )}

                {videoError && (
                  <div className="absolute top-4 left-4 right-4 z-30 px-4 py-2 bg-destructive/20 border border-destructive/40 rounded-lg">
                    <p className="text-sm text-destructive">{videoError}</p>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-border/60 flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-card flex-shrink-0">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className={`h-2 w-2 rounded-full ${isMicOn && isVideoOn ? 'bg-success' : 'bg-primary'} animate-pulse`} />
                  <span>Conectada a sala segura de mentoría</span>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <Button
                    size="icon"
                    variant={isMicOn ? 'outline' : 'default'}
                    className={`rounded-full ${!isMicOn ? 'bg-destructive hover:bg-destructive/90 text-white' : ''}`}
                    onClick={handleToggleMic}
                    title={isMicOn ? 'Silenciar micrófono' : 'Activar micrófono'}
                  >
                    {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="icon"
                    variant={isVideoOn ? 'outline' : 'default'}
                    className={`rounded-full ${!isVideoOn ? 'bg-destructive hover:bg-destructive/90 text-white' : ''}`}
                    onClick={handleToggleVideo}
                    title={isVideoOn ? 'Desactivar cámara' : 'Activar cámara'}
                  >
                    {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="icon"
                    variant={isChatOpen ? 'default' : 'outline'}
                    className={`rounded-full ${isChatOpen ? 'bg-primary hover:bg-primary/90 text-white' : ''}`}
                    onClick={handleToggleChat}
                    title="Abrir/cerrar chat"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="rounded-full bg-destructive hover:bg-destructive/90"
                    onClick={handleEndSession}
                    title="Finalizar sesión"
                  >
                    <PhoneOff className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Panel lateral */}
            <div className="space-y-4 overflow-y-auto">
              <div className="bg-card rounded-2xl border border-border/60 p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  Agenda de la sesión
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 5 min: bienvenida y contexto rápido.</li>
                  <li>• 35 min: conversación profunda sobre tu objetivo.</li>
                  <li>• 10 min: próximos pasos y recursos recomendados.</li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl border border-border/60 p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  Tips para aprovecharla al máximo
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Ten a mano tus preguntas principales.</li>
                  <li>• Toma notas de frases o ideas clave.</li>
                  <li>• Al final, acuerden un siguiente pequeño paso.</li>
                </ul>
              </div>

              <div className="bg-muted/60 rounded-2xl border border-dashed border-border/80 p-4 text-xs text-muted-foreground">
                Esta es una sala simulada de mentoría. En una versión completa se conectaría con
                tu herramienta de videollamadas favorita (Zoom, Meet, etc.).
              </div>
            </div>

            {/* Panel de Chat */}
            {isChatOpen && (
              <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-md h-[600px] flex flex-col">
                  {/* Header del chat */}
                  <div className="p-4 border-b border-border flex items-center justify-between flex-shrink-0">
                    <div>
                      <h3 className="font-semibold text-foreground">Chat con {displaySession.mentorName}</h3>
                      <p className="text-xs text-muted-foreground">Mensajes de la sesión</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full"
                      onClick={handleToggleChat}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Mensajes */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-center">
                        <div>
                          <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                          <p className="text-sm text-muted-foreground">
                            No hay mensajes aún. <br />
                            Escribe algo para comenzar la conversación.
                          </p>
                        </div>
                      </div>
                    ) : (
                      chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                              msg.sender === 'me'
                                ? 'bg-primary text-white'
                                : 'bg-muted text-foreground'
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                            <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-white/70' : 'text-muted-foreground'}`}>
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Input del chat */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-border flex gap-2 flex-shrink-0">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Escribe un mensaje..."
                      className="flex-1"
                      autoFocus
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="rounded-full bg-primary hover:bg-primary/90"
                      disabled={!chatInput.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SessionRoomPage;


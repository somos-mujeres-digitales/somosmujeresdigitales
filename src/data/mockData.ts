import mentora1 from '@/assets/mentora-real-1.png';
import mentora2 from '@/assets/mentora-real-2.png';
import mentora3 from '@/assets/mentora-real-3.png';
import mentora4 from '@/assets/mentora-real-4.png';
import mentora5 from '@/assets/mentora-real-5.png';
import mentora6 from '@/assets/mentora-real-6.png';

export interface Mentora {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  country: string;
  imageUrl: string;
  bio: string;
  skills: string[];
  specialties: string[];
  rating: number;
  reviewCount: number;
  sessionsCompleted: number;
  yearsExperience: number;
  languages: string[];
  availability: string[];
  pricePerSession: number;
  matchScore?: number;
  isVerified: boolean;
}

export interface Mentee {
  id: string;
  name: string;
  email: string;
  age: number;
  location: string;
  stage: 'escolar' | 'preuniversitaria' | 'universitaria' | 'laboral';
  stemInterest: string;
  objective: string;
  level: 'principiante' | 'intermedio' | 'avanzado';
  clarityBefore: number;
  clarityAfter: number;
}

export interface Session {
  id: string;
  mentorId: string;
  menteeId: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingLink?: string;
  rating?: number;
  feedback?: string;
  actionPlan?: string[];
}

export const mentoras: Mentora[] = [
  {
    id: '1',
    name: 'María García',
    title: 'Ingeniera de Software Senior',
    company: 'Google',
    location: 'Lima',
    country: 'Perú',
    imageUrl: mentora1,
    bio: 'Apasionada por ayudar a mujeres a iniciar su carrera en tecnología. 10 años de experiencia en desarrollo de software y liderazgo de equipos.',
    skills: ['Desarrollo de carrera', 'Liderazgo', 'Entrevistas técnicas', 'Mentoría'],
    specialties: ['Backend', 'Cloud', 'DevOps'],
    rating: 4.9,
    reviewCount: 127,
    sessionsCompleted: 245,
    yearsExperience: 10,
    languages: ['Español', 'Inglés'],
    availability: ['Lunes', 'Miércoles', 'Viernes'],
    pricePerSession: 29,
    matchScore: 92,
    isVerified: true,
  },
  {
    id: '2',
    name: 'Ana Rodríguez',
    title: 'Product Manager Senior',
    company: 'Yape BCP',
    location: 'Lima',
    country: 'Perú',
    imageUrl: mentora2,
    bio: 'Ingeniera con pasión por la tecnología financiera y productos digitales. Mentora de mujeres en tech por más de 5 años.',
    skills: ['Product Management', 'Fintech', 'Transición a STEM', 'Liderazgo'],
    specialties: ['Productos digitales', 'UX', 'Estrategia'],
    rating: 4.8,
    reviewCount: 89,
    sessionsCompleted: 156,
    yearsExperience: 8,
    languages: ['Español', 'Inglés', 'Portugués'],
    availability: ['Martes', 'Jueves', 'Sábado'],
    pricePerSession: 29,
    matchScore: 88,
    isVerified: true,
  },
  {
    id: '3',
    name: 'Lucía Mendoza',
    title: 'Data Scientist Lead',
    company: 'Microsoft',
    location: 'Lima',
    country: 'Perú',
    imageUrl: mentora3,
    bio: 'Científica de datos especializada en machine learning. Comprometida con cerrar la brecha de género en tecnología.',
    skills: ['Data Science', 'Machine Learning', 'Orientación vocacional', 'Python'],
    specialties: ['ML', 'Analytics', 'Big Data'],
    rating: 4.9,
    reviewCount: 203,
    sessionsCompleted: 312,
    yearsExperience: 12,
    languages: ['Español', 'Inglés'],
    availability: ['Lunes', 'Miércoles', 'Viernes', 'Sábado'],
    pricePerSession: 29,
    matchScore: 95,
    isVerified: true,
  },
  {
    id: '4',
    name: 'Carmen Torres',
    title: 'Gerente de Tecnología',
    company: 'Interbank',
    location: 'Lima',
    country: 'Perú',
    imageUrl: mentora4,
    bio: 'Líder en transformación digital en el sector bancario. Ayudo a jóvenes a alcanzar sus sueños en tecnología financiera.',
    skills: ['Transformación Digital', 'Liderazgo', 'Banca Digital', 'Innovación'],
    specialties: ['Fintech', 'Arquitectura', 'Gestión'],
    rating: 5.0,
    reviewCount: 67,
    sessionsCompleted: 98,
    yearsExperience: 15,
    languages: ['Español', 'Inglés'],
    availability: ['Sábado', 'Domingo'],
    pricePerSession: 29,
    matchScore: 84,
    isVerified: true,
  },
  {
    id: '5',
    name: 'Isabella Vargas',
    title: 'Especialista en Ciberseguridad',
    company: 'Globant',
    location: 'Lima',
    country: 'Perú',
    imageUrl: mentora5,
    bio: 'Experta en seguridad informática con experiencia en empresas multinacionales. Mentora activa en comunidades de mujeres en tech.',
    skills: ['Ciberseguridad', 'Desarrollo de carrera', 'Certificaciones', 'Networking'],
    specialties: ['Security', 'Pentesting', 'Compliance'],
    rating: 4.7,
    reviewCount: 145,
    sessionsCompleted: 189,
    yearsExperience: 9,
    languages: ['Español', 'Inglés'],
    availability: ['Martes', 'Jueves'],
    pricePerSession: 29,
    matchScore: 79,
    isVerified: true,
  },
  {
    id: '6',
    name: 'Valentina Ruiz',
    title: 'Data Engineer Senior',
    company: 'Rappi',
    location: 'Lima',
    country: 'Perú',
    imageUrl: mentora6,
    bio: 'Ingeniera de datos enfocada en soluciones escalables. Apasionada por inspirar a más mujeres en ciencias de datos.',
    skills: ['Data Engineering', 'Cloud', 'Transición a STEM', 'Python'],
    specialties: ['Big Data', 'AWS', 'ETL'],
    rating: 4.8,
    reviewCount: 92,
    sessionsCompleted: 134,
    yearsExperience: 7,
    languages: ['Español', 'Inglés'],
    availability: ['Lunes', 'Miércoles', 'Viernes'],
    pricePerSession: 29,
    matchScore: 86,
    isVerified: true,
  },
];

export const testimonials = [
  {
    id: '1',
    name: 'Sofía Quispe',
    age: 17,
    location: 'Cusco, Perú',
    quote: 'Conocí a Mujeres Digitales gracias al programa de adolescentes STEAM Cusco. Mi mentora me ayudó a entender que sí puedo estudiar ingeniería de sistemas.',
    rating: 5,
    mentorName: 'María García',
  },
  {
    id: '2',
    name: 'Camila Huamán',
    age: 19,
    location: 'Arequipa, Perú',
    quote: 'Estaba indecisa entre enfermería y tecnología. Gracias a las sesiones con mi mentora, descubrí mi pasión por la ciencia de datos y ahora estudio en la UNSA.',
    rating: 5,
    mentorName: 'Lucía Mendoza',
  },
  {
    id: '3',
    name: 'Diana Mamani',
    age: 22,
    location: 'Lima, Perú',
    quote: 'Vengo de Puno y pensé que la tecnología no era para mí. Mi mentora de Yape me demostró lo contrario. Ahora hago prácticas en una fintech.',
    rating: 5,
    mentorName: 'Ana Rodríguez',
  },
];

export const platformStats = {
  mentorsActive: 20,
  sessionsCompleted: 100,
  countriesReached: 3,
  satisfactionRate: 98,
};

export const adminStats = {
  totalUsers: 3247,
  activeUsers: 1823,
  activeMentors: 847,
  sessionsThisMonth: 456,
  averageSatisfaction: 4.8,
  totalRevenue: 34520,
  platformRevenue: 13808,
};

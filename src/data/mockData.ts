import mentora1 from '@/assets/mentora-1.png';
import mentora2 from '@/assets/mentora-2.png';
import mentora3 from '@/assets/mentora-3.png';
import mentora4 from '@/assets/mentora-4.png';
import mentora5 from '@/assets/mentora-5.png';
import mentora6 from '@/assets/mentora-6.png';
import mentora7 from '@/assets/mentora-7.png';
import mentora8 from '@/assets/mentora-8.png';
import mentora9 from '@/assets/mentora-9.png';
import mentora10 from '@/assets/mentora-10.png';
import mentora11 from '@/assets/mentora-11.png';
import mentora12 from '@/assets/mentora-12.png';
import mentor1 from '@/assets/mentor-1.png';


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
    name: 'Rocio',
    title: 'Product Design & UX Research',
    company: 'IT Rochester New York',
    location: 'Rochester',
    country: 'Estados Unidos',
    imageUrl: mentora1,
    bio: 'Product Designer y UX Researcher con experiencia en desarrollo de software y liderazgo de equipos.',
    skills: ['UX Design', 'Product Design', 'UX Research', 'Mentoría'],
    specialties: ['UX Design', 'Product Design', 'UX Research'],
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
    name: 'Camila',
    title: 'Ingeniera de Telecomunicaciones',
    company: 'Huawei Perú',
    location: 'Lima',
    country: 'Perú',
    imageUrl: mentora2,
    bio: 'Ingeniera de Telecomunicaciones con experiencia en desarrollo de software y liderazgo de equipos.',
    skills: ['Telecomunicaciones', 'Automatización', 'Transición a STEM', 'Becas'],
    specialties: ['Telecomunicaciones', 'Automatización', 'Transición a STEM'],
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
    name: 'Ingrid',
    title: 'Ingeniera Mecatrónica',
    company: 'IT Rochester New York',
    location: 'Rochester',
    country: 'Estados Unidos',
    imageUrl: mentora3,
    bio: 'Ingeniera Mecatrónica con experiencia en desarrollo de software y liderazgo de equipos.',
    skills: ['Mecatrónica', 'Automatización', 'Transición a STEM', 'Becas'],
    specialties: ['Mecatrónica', 'Automatización', 'Transición a STEM'],
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
    name: 'Fiorella',
    title: 'Innovación, Emprendimiento Tecnológico e Investigación',
    company: 'Hult Prize 2023',
    location: 'Houston',
    country: 'Estados Unidos',
    imageUrl: mentora4,
    bio: 'Latina en mi equipo de la NASA. Ayudo a jóvenes a alcanzar sus sueños en ciencia e ingeniería.',
    skills: ['Innovación', 'Emprendimiento', 'Investigación', 'Investigación'],
    specialties: ['Innovación', 'Emprendimiento', 'Investigación'],
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
    name: 'Brenda',
    title: 'Análisis de datos',
    company: 'Lecturer y Teacher Assistant',
    location: 'Lima',
    country: 'Perú',
    imageUrl: mentora5,
    bio: 'Experta en análisis de datos con experiencia en empresas Fortune 500. Mentora activa en comunidades de mujeres en tech.',
    skills: ['Análisis de datos', 'Desarrollo de carrera', 'Certificaciones', 'Networking'],
    specialties: ['Análisis de datos', 'Desarrollo de carrera', 'Certificaciones'],
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
    name: 'Elia',
    title: 'Gobierno de datos, Data & Analytics, SCRUM',
    company: 'Lider en Data&Camp',
    location: 'Bogotá',
    country: 'Colombia',
    imageUrl: mentora6,
    bio: 'Mentora en Data&Camp. Apasionada por inspirar a más mujeres en ciencias de la salud.',
    skills: ['Bioingeniería', 'Investigación', 'Transición a STEM', 'Innovación', 'Data & Analytics', 'SCRUM'],
    specialties: ['Data & Analytics', 'SCRUM'],
    rating: 4.8,
    reviewCount: 92,
    sessionsCompleted: 134,
    yearsExperience: 7,
    languages: ['Español', 'Inglés'],
    availability: ['Lunes', 'Miércoles', 'Viernes'],
    pricePerSession: 29,
    matchScore: 86,
    isVerified: true,
  },{
    id: '7',
    name: 'Layley',
    title: 'Ingeniera Civil, Química y Física',
    company: 'CRAISE - Fundadora',
    location: 'Cusco',
    country: 'Perú',
    imageUrl: mentora7,
    bio: 'Fundadora de CRAISE. Apasionada por inspirar a más mujeres en ciencias de la salud.',
    skills: ['Bioingeniería', 'Investigación', 'Transición a STEM', 'Innovación', 'Data & Analytics', 'SCRUM', 'Innovación', 'Data & Analytics', 'SCRUM'],
    specialties: ['Bioingeniería', 'Investigación', 'Transición a STEM', 'Innovación', 'Data & Analytics', 'SCRUM'],
    rating: 4.8,
    reviewCount: 92,
    sessionsCompleted: 134,
    yearsExperience: 7,
    languages: ['Español', 'Inglés'],
    availability: ['Lunes', 'Miércoles', 'Viernes'],
    pricePerSession: 29,
    matchScore: 86,
    isVerified: true,
  },{
    id: '8',
    name: 'Antonella',
    title: 'Ingeniera Electronica',
    company: 'Huawei Cloud Perú',
    location: 'Lima',
    country: 'Perú',
    imageUrl: mentora8,
    bio: 'Parte de Huawei Cloud Perú. Apasionada por inspirar a seguir el camino de la eletrónica.',
    skills: ['Electronica', 'Investigación', 'Transición a STEM', 'Innovación', 'Data & Analytics', 'SCRUM', 'Innovación', 'Data & Analytics', 'SCRUM'],
    specialties: ['Electronica', 'Investigación', 'Transición a STEM', 'Innovación'],
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
  {
    id: '9',
    name: 'Carol',
    title: 'Analista de datos y finanzas',
    company: 'UNSAAC',
    location: 'Cusco',
    country: 'Perú',
    imageUrl: mentora9,
    bio: 'Investigadora de datos y finanzas en UNSAAC. Apasionada por inspirar a más mujeres en tecnología y finanzas.',
    skills: ['Analista de datos', 'Investigación', 'Transición a STEM', 'Innovación', 'Data & Analytics', 'SCRUM', 'Innovación', 'Data & Analytics', 'SCRUM'],
    specialties: ['Analista de datos', 'Investigación', 'Transición a STEM', 'Innovación'],
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
  {
    id: '10',
    name: 'Flor',
    title: 'Business Intelligence Data Analyst',
    company: 'DHL Express',
    location: 'Lima',
    country: 'Perú',
    imageUrl: mentora10,
    bio: 'Business Intelligence Data Analyst en DHL Express. Apasionada por inspirar a más mujeres en tecnología y finanzas.',
    skills: ['Business Intelligence', 'Data Analytics', 'Data Visualization', 'Data Analysis', 'Data Management', 'Data Modeling', 'Data Warehousing', 'Data Mining', 'Data Science'],
    specialties: ['Business Intelligence', 'Data Analytics', 'Data Visualization', 'Data Analysis', 'Data Management', 'Data Modeling', 'Data Warehousing', 'Data Mining', 'Data Science'],
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
  {
    id: '11',
    name: 'Ale',
    title: 'Comunicadora Social',
    company: 'Guatemala Noticias',
    location: 'Guatemala',
    country: 'Guatemala',
    imageUrl: mentora11,
    bio: 'Comunicadora Social con experiencia en marketing digital.',
    skills: ['Marketing Digital', 'Investigación', 'Transición a STEM', 'Innovación', 'Data & Analytics', 'SCRUM', 'Innovación', 'Data & Analytics', 'SCRUM'],
    specialties: ['Marketing Digital', 'Investigación', 'Transición a STEM', 'Innovación'],
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
  {
    id: '12',
    name: 'Carla',
    title: 'Desarrolladora Frontend - Vibe Coding Creativo',
    company: 'ENEISOFT',
    location: 'Cusco',
    country: 'Perú',
    imageUrl: mentora12,
    bio: 'Desarrolladora Frontend con experiencia en React y Next.js.',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Git', 'GitHub', 'SCRUM'],
    specialties: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Git', 'GitHub'],
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
  {
    id: '13',
    name: 'Siwar',
    title: 'Biólogo - Tecnología Ambiental y Soluciones Basadas en la Naturaleza (NbS)',
    company: 'U.S. Forest Service, USAID, MINAM',
    location: 'Cusco',
    country: 'Perú',
    imageUrl: mentor1,
    bio: 'Biólogo con experiencia en Tecnología Ambiental y Soluciones Basadas en la Naturaleza (NbS).',
    skills: ['Biólogo', 'Investigación', 'Transición a STEM', 'Innovación'],
    specialties: ['Biólogo', 'Investigación', 'Transición a STEM', 'Innovación'],
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
  satisfactionRate: 95,
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

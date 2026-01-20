import mentora1 from '@/assets/mentora-1.jpg';
import mentora2 from '@/assets/mentora-2.jpg';
import mentora3 from '@/assets/mentora-3.jpg';
import mentora4 from '@/assets/mentora-4.jpg';
import mentora5 from '@/assets/mentora-5.jpg';
import mentora6 from '@/assets/mentora-6.jpg';

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
    location: 'Ciudad de México',
    country: 'México',
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
    title: 'Ingeniera de Robótica Senior',
    company: 'Boston Dynamics',
    location: 'Boston',
    country: 'Estados Unidos',
    imageUrl: mentora2,
    bio: 'Ingeniera mecatrónica con pasión por la robótica y la automatización. Mentora de mujeres en ingeniería por más de 5 años.',
    skills: ['Robótica', 'Automatización', 'Transición a STEM', 'Becas'],
    specialties: ['Mecatrónica', 'Control', 'IA aplicada'],
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
    title: 'Ingeniera Aeroespacial',
    company: 'NASA',
    location: 'Houston',
    country: 'Estados Unidos',
    imageUrl: mentora4,
    bio: 'Primera ingeniera latina en mi equipo de la NASA. Ayudo a jóvenes a alcanzar sus sueños en ciencia e ingeniería.',
    skills: ['Ingeniería', 'Becas internacionales', 'Liderazgo', 'Investigación'],
    specialties: ['Aeroespacial', 'Propulsión', 'Sistemas'],
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
    company: 'IBM',
    location: 'Londres',
    country: 'Reino Unido',
    imageUrl: mentora5,
    bio: 'Experta en seguridad informática con experiencia en empresas Fortune 500. Mentora activa en comunidades de mujeres en tech.',
    skills: ['Ciberseguridad', 'Desarrollo de carrera', 'Certificaciones', 'Networking'],
    specialties: ['Security', 'Pentesting', 'Compliance'],
    rating: 4.7,
    reviewCount: 145,
    sessionsCompleted: 189,
    yearsExperience: 9,
    languages: ['Español', 'Inglés', 'Francés'],
    availability: ['Martes', 'Jueves'],
    pricePerSession: 29,
    matchScore: 79,
    isVerified: true,
  },
  {
    id: '6',
    name: 'Valentina Ruiz',
    title: 'Ingeniera Biomédica',
    company: 'Johnson & Johnson',
    location: 'Bogotá',
    country: 'Colombia',
    imageUrl: mentora6,
    bio: 'Ingeniera biomédica enfocada en dispositivos médicos. Apasionada por inspirar a más mujeres en ciencias de la salud.',
    skills: ['Bioingeniería', 'Investigación', 'Transición a STEM', 'Innovación'],
    specialties: ['Dispositivos médicos', 'Biomateriales', 'Regulatorio'],
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
    name: 'Sofía Martínez',
    age: 22,
    location: 'Argentina',
    quote: 'Gracias a mi mentora, pasé de dudar de mi carrera a conseguir mi primer trabajo en una startup tech. ¡El matching fue perfecto!',
    rating: 5,
    mentorName: 'María García',
  },
  {
    id: '2',
    name: 'Camila Herrera',
    age: 19,
    location: 'Chile',
    quote: 'Estaba perdida sobre qué estudiar. Mi mentora me ayudó a descubrir mi pasión por la ciencia de datos en solo 3 sesiones.',
    rating: 5,
    mentorName: 'Lucía Mendoza',
  },
  {
    id: '3',
    name: 'Diana Pérez',
    age: 26,
    location: 'México',
    quote: 'Hice la transición de marketing a ingeniería de software. Mi mentora me guió paso a paso. Ahora trabajo en lo que amo.',
    rating: 5,
    mentorName: 'Ana Rodríguez',
  },
];

export const platformStats = {
  mentorsActive: 20,
  sessionsCompleted: 100,
  countriesReached: 23,
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

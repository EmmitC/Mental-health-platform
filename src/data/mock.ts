export interface Counselor {
  id: string;
  name: string;
  credentials: string;
  title: string;
  specializations: string[];
  languages: string[];
  sessionTypes: ("Video" | "Audio" | "In Person")[];
  nextAvailable: string;
  rating: number;
  reviewCount: number;
  experience: number;
  priceUGX: number;
  bio: string;
  approach: string;
  photo: string;
  location: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  counselor: Counselor;
  service: string;
  date: string;
  time: string;
  duration: number;
  sessionType: "Video" | "Audio" | "In Person";
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed" | "In Progress";
  paymentStatus: "Paid" | "Pending" | "Refunded";
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  format: "Article" | "Video" | "Audio" | "Guide" | "Exercise";
  readTime: string;
  description: string;
  tags: string[];
  saved: boolean;
  image: string;
}

export interface Message {
  id: string;
  counselor: Counselor;
  lastMessage: string;
  time: string;
  unread: number;
  messages: { id: string; from: "me" | "counselor"; text: string; time: string }[];
}

export const counselors: Counselor[] = [
  {
    id: "c1",
    name: "Dr. Grace Nakamya",
    credentials: "PhD, Clinical Psychology",
    title: "Clinical Psychologist",
    specializations: ["Anxiety", "Stress", "Relationships", "Trauma"],
    languages: ["English", "Luganda"],
    sessionTypes: ["Video", "Audio", "In Person"],
    nextAvailable: "Tomorrow, 10:00 AM",
    rating: 4.9,
    reviewCount: 127,
    experience: 12,
    priceUGX: 120000,
    bio: "Dr. Grace Nakamya is a compassionate clinical psychologist with over 12 years of experience helping individuals navigate anxiety, stress, and relationship challenges. She believes that healing begins with feeling truly heard and understood.",
    approach: "I use an integrative approach drawing from Cognitive Behavioural Therapy, Acceptance and Commitment Therapy, and mindfulness-based practices. My goal is to help you build the inner resources to face life with more ease and clarity.",
    photo: "/images/avatars/counselor-grace.jpg",
    location: "Kampala, Uganda",
    available: true,
  },
  {
    id: "c2",
    name: "Mr. Samuel Ochieng",
    credentials: "MSc, Counselling Psychology",
    title: "Counselling Psychologist",
    specializations: ["Depression", "Grief", "Men's Wellbeing", "Life Transitions"],
    languages: ["English", "Swahili", "Luo"],
    sessionTypes: ["Video", "Audio"],
    nextAvailable: "Today, 3:00 PM",
    rating: 4.8,
    reviewCount: 89,
    experience: 8,
    priceUGX: 95000,
    bio: "Samuel Ochieng specialises in supporting men through depression, grief, and major life transitions. He creates a non-judgmental space where difficult emotions can be explored safely.",
    approach: "I combine person-centred therapy with solution-focused techniques, meeting you where you are and helping you move toward where you want to be.",
    photo: "/images/avatars/samuel-ochieng.svg",
    location: "Kampala, Uganda",
    available: true,
  },
  {
    id: "c3",
    name: "Dr. Amina Hassan",
    credentials: "PhD, Family Therapy",
    title: "Family & Couples Therapist",
    specializations: ["Couples Counseling", "Family Therapy", "Youth", "Communication"],
    languages: ["English", "Arabic", "Swahili"],
    sessionTypes: ["Video", "In Person"],
    nextAvailable: "Thursday, 9:00 AM",
    rating: 4.9,
    reviewCount: 204,
    experience: 15,
    priceUGX: 140000,
    bio: "Dr. Amina Hassan has dedicated her career to strengthening families and relationships. With 15 years of experience, she brings warmth and clinical expertise to every session.",
    approach: "I use Emotionally Focused Therapy and Systemic approaches to help families and couples understand each other at a deeper level and build more secure connections.",
    photo: "/images/avatars/counselor-amina.jpg",
    location: "Kampala, Uganda",
    available: true,
  },
  {
    id: "c4",
    name: "Ms. Ruth Atuhaire",
    credentials: "MSc, Organisational Psychology",
    title: "Counsellor & Coach",
    specializations: ["Work Stress", "Burnout", "Career", "Self-Esteem"],
    languages: ["English", "Runyankore"],
    sessionTypes: ["Video", "Audio", "In Person"],
    nextAvailable: "Wednesday, 11:00 AM",
    rating: 4.7,
    reviewCount: 63,
    experience: 6,
    priceUGX: 85000,
    bio: "Ruth Atuhaire helps professionals navigate the pressures of modern work life, recover from burnout, and reconnect with their sense of purpose and self-worth.",
    approach: "I blend CBT, coaching, and mindfulness to help you understand the patterns keeping you stuck and develop practical strategies for sustainable wellbeing.",
    photo: "/images/avatars/counselor-ruth.jpg",
    location: "Entebbe, Uganda",
    available: true,
  },
  {
    id: "c5",
    name: "Dr. David Ssekandi",
    credentials: "MD, Psychiatry",
    title: "Psychiatrist & Therapist",
    specializations: ["Anxiety Disorders", "PTSD", "Sleep Issues", "Mood Disorders"],
    languages: ["English", "Luganda"],
    sessionTypes: ["Video", "In Person"],
    nextAvailable: "Friday, 2:00 PM",
    rating: 4.8,
    reviewCount: 156,
    experience: 18,
    priceUGX: 180000,
    bio: "Dr. David Ssekandi brings a holistic psychiatric perspective to mental health, integrating medical understanding with therapeutic support for complex conditions.",
    approach: "I use evidence-based approaches including EMDR for trauma, CBT for anxiety, and Interpersonal Therapy, always tailored to your unique needs and circumstances.",
    photo: "/images/avatars/david-ssekandi.svg",
    location: "Kampala, Uganda",
    available: false,
  },
  {
    id: "c6",
    name: "Ms. Priscilla Nabwire",
    credentials: "MSc, Child & Adolescent Psychology",
    title: "Youth Counsellor",
    specializations: ["Teen Counseling", "School Stress", "Family Conflict", "Identity"],
    languages: ["English", "Swahili", "Luganda"],
    sessionTypes: ["Video", "Audio", "In Person"],
    nextAvailable: "Tomorrow, 1:00 PM",
    rating: 4.9,
    reviewCount: 78,
    experience: 9,
    priceUGX: 90000,
    bio: "Priscilla Nabwire is passionate about supporting young people through the challenges of adolescence, academic pressure, and family dynamics with empathy and skill.",
    approach: "I use a young-person-centred approach that honours each individual's voice. I draw on narrative therapy, creative expression, and CBT adapted for adolescents.",
    photo: "/images/avatars/counselor-priscilla.jpg",
    location: "Kampala, Uganda",
    available: true,
  },
];

export const appointments: Appointment[] = [
  {
    id: "a1",
    counselor: counselors[0],
    service: "Individual Counseling",
    date: "Wednesday, August 26",
    time: "2:00 PM",
    duration: 60,
    sessionType: "Video",
    status: "Confirmed",
    paymentStatus: "Paid",
  },
  {
    id: "a2",
    counselor: counselors[2],
    service: "Couples Counseling",
    date: "Friday, August 28",
    time: "10:00 AM",
    duration: 90,
    sessionType: "Video",
    status: "Confirmed",
    paymentStatus: "Paid",
  },
  {
    id: "a3",
    counselor: counselors[0],
    service: "Individual Counseling",
    date: "Monday, August 11",
    time: "3:00 PM",
    duration: 60,
    sessionType: "Video",
    status: "Completed",
    paymentStatus: "Paid",
  },
  {
    id: "a4",
    counselor: counselors[1],
    service: "Individual Counseling",
    date: "Tuesday, August 5",
    time: "11:00 AM",
    duration: 60,
    sessionType: "Audio",
    status: "Completed",
    paymentStatus: "Paid",
  },
  {
    id: "a5",
    counselor: counselors[3],
    service: "Initial Consultation",
    date: "Thursday, July 31",
    time: "4:00 PM",
    duration: 30,
    sessionType: "Video",
    status: "Cancelled",
    paymentStatus: "Refunded",
  },
];

export const resources: Resource[] = [
  {
    id: "r1",
    title: "Understanding Anxiety: What It Is and How It Affects You",
    category: "Anxiety",
    format: "Article",
    readTime: "5 min read",
    description: "A gentle introduction to anxiety — its causes, how it shows up in daily life, and what you can do to feel more in control.",
    tags: ["anxiety", "mental health", "self-care"],
    saved: true,
    image: "/images/mask.jpg",
  },
  {
    id: "r2",
    title: "5 Evidence-Based Techniques for Managing Stress",
    category: "Stress",
    format: "Guide",
    readTime: "8 min read",
    description: "Practical, research-backed strategies you can use today to reduce stress and restore a sense of calm.",
    tags: ["stress", "coping", "wellness"],
    saved: false,
    image: "/images/stress-laptop.jpg",
  },
  {
    id: "r3",
    title: "Building Better Sleep: A Compassionate Guide",
    category: "Sleep",
    format: "Guide",
    readTime: "6 min read",
    description: "Simple, sustainable habits to improve your sleep quality without pressure or perfectionism.",
    tags: ["sleep", "rest", "health"],
    saved: false,
    image: "/images/window-light.jpg",
  },
  {
    id: "r4",
    title: "Understanding Burnout: Signs, Causes, and Recovery",
    category: "Work",
    format: "Article",
    readTime: "7 min read",
    description: "How to recognise when you're experiencing burnout, and the first steps toward genuine recovery.",
    tags: ["burnout", "work", "recovery"],
    saved: true,
    image: "/images/stress-desk.jpg",
  },
  {
    id: "r5",
    title: "A Mindful Breathing Exercise for Moments of Overwhelm",
    category: "Mindfulness",
    format: "Exercise",
    readTime: "3 min",
    description: "A short, guided breathing practice you can use anywhere when anxiety or stress rises quickly.",
    tags: ["mindfulness", "breathing", "anxiety"],
    saved: false,
    image: "/images/window-rest.jpg",
  },
  {
    id: "r6",
    title: "Healthy Relationships: What They Look Like and How to Build Them",
    category: "Relationships",
    format: "Article",
    readTime: "9 min read",
    description: "Exploring the foundations of healthy connection — communication, boundaries, and mutual respect.",
    tags: ["relationships", "communication", "boundaries"],
    saved: false,
    image: "/images/session-couch.jpg",
  },
];

export const messages: Message[] = [
  {
    id: "m1",
    counselor: counselors[0],
    lastMessage: "See you at our Wednesday session. Take care until then.",
    time: "2:30 PM",
    unread: 1,
    messages: [
      { id: "msg1", from: "counselor", text: "Hello! Just checking in after our last session. How have you been feeling?", time: "Mon 10:00 AM" },
      { id: "msg2", from: "me", text: "A bit better, thank you. I've been trying the breathing exercises you recommended.", time: "Mon 11:30 AM" },
      { id: "msg3", from: "counselor", text: "That's wonderful to hear. How are they feeling for you?", time: "Mon 12:00 PM" },
      { id: "msg4", from: "me", text: "They help in the moment, though it's still hard to remember to use them when I'm really anxious.", time: "Mon 2:00 PM" },
      { id: "msg5", from: "counselor", text: "That's very normal. We can talk more about building that habit on Wednesday. See you at our Wednesday session. Take care until then.", time: "Today 2:30 PM" },
    ],
  },
];

export const wellnessGoals = [
  { id: "g1", title: "Improve Sleep", target: "7 hours/night", progress: 70, streak: 5, color: "sage" },
  { id: "g2", title: "Daily Mindfulness", target: "10 minutes/day", progress: 45, streak: 3, color: "terra" },
  { id: "g3", title: "Exercise More", target: "3 times/week", progress: 60, streak: 2, color: "sage" },
];

export const moodHistory = [
  { day: "Mon", score: 3 },
  { day: "Tue", score: 4 },
  { day: "Wed", score: 2 },
  { day: "Thu", score: 4 },
  { day: "Fri", score: 5 },
  { day: "Sat", score: 4 },
  { day: "Sun", score: 3 },
];

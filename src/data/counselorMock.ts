// Counselor portal mock data

export interface PendingRequest {
  id: string;
  clientName: string;
  clientPhoto: string;
  service: string;
  requestedDate: string;
  requestedTime: string;
  sessionType: "Video" | "Audio" | "In Person";
  note: string;
  requestedAt: string;
}

export interface ScheduledSession {
  id: string;
  clientName: string;
  clientPhoto: string;
  service: string;
  time: string;
  duration: string;
  sessionType: "Video" | "Audio" | "In Person";
  status: "Upcoming" | "In Progress" | "Completed" | "Cancelled";
}

export interface CounselorClient {
  id: string;
  name: string;
  photo: string;
  age: number;
  preferredLanguage: string;
  totalSessions: number;
  lastSession: string;
  nextSession: string | null;
  concerns: string[];
}

export interface SessionNote {
  id: string;
  clientName: string;
  date: string;
  sessionType: string;
  status: "Draft" | "Finalized";
  preview: string;
}

export const counselorStats = {
  todaySessions: 3,
  pendingRequests: 2,
  unreadMessages: 4,
  weekSessions: 12,
  monthSessions: 47,
  rating: 4.9,
  totalClients: 23,
};

export const pendingRequests: PendingRequest[] = [
  {
    id: "pr1",
    clientName: "James Mutesasira",
    clientPhoto: "/images/avatars/james-mutesasira.svg",
    service: "Individual Counseling",
    requestedDate: "Thursday, 22 Aug",
    requestedTime: "2:00 PM",
    sessionType: "Video",
    note: "I have been dealing with work-related stress for the past few months and would like to talk with someone.",
    requestedAt: "2 hours ago",
  },
  {
    id: "pr2",
    clientName: "Fatuma Nakato",
    clientPhoto: "/images/avatars/fatuma-nakato.svg",
    service: "Initial Consultation",
    requestedDate: "Friday, 23 Aug",
    requestedTime: "10:00 AM",
    sessionType: "Audio",
    note: "Looking for support with anxiety and sleep issues.",
    requestedAt: "5 hours ago",
  },
];

export const todaySchedule: ScheduledSession[] = [
  {
    id: "s1",
    clientName: "Sarah Namukasa",
    clientPhoto: "/images/avatars/client-sarah.jpg",
    service: "Individual Counseling",
    time: "10:00 AM",
    duration: "50 min",
    sessionType: "Video",
    status: "Completed",
  },
  {
    id: "s2",
    clientName: "Daniel Kato",
    clientPhoto: "/images/avatars/daniel-kato.svg",
    service: "Follow-up Session",
    time: "2:00 PM",
    duration: "50 min",
    sessionType: "Video",
    status: "Upcoming",
  },
  {
    id: "s3",
    clientName: "Grace Apio",
    clientPhoto: "/images/avatars/client-grace.jpg",
    service: "Individual Counseling",
    time: "4:00 PM",
    duration: "50 min",
    sessionType: "Audio",
    status: "Upcoming",
  },
];

export const counselorClients: CounselorClient[] = [
  {
    id: "cl1",
    name: "Sarah Namukasa",
    photo: "/images/avatars/client-sarah.jpg",
    age: 28,
    preferredLanguage: "English",
    totalSessions: 8,
    lastSession: "Today, 10:00 AM",
    nextSession: null,
    concerns: ["Anxiety", "Work stress"],
  },
  {
    id: "cl2",
    name: "Daniel Kato",
    photo: "/images/avatars/daniel-kato.svg",
    age: 34,
    preferredLanguage: "English, Luganda",
    totalSessions: 5,
    lastSession: "Aug 15",
    nextSession: "Today, 2:00 PM",
    concerns: ["Relationships", "Self-esteem"],
  },
  {
    id: "cl3",
    name: "Grace Apio",
    photo: "/images/avatars/client-grace.jpg",
    age: 24,
    preferredLanguage: "English",
    totalSessions: 3,
    lastSession: "Aug 12",
    nextSession: "Today, 4:00 PM",
    concerns: ["Low mood", "Sleep"],
  },
  {
    id: "cl4",
    name: "Robert Ssali",
    photo: "/images/avatars/robert-ssali.svg",
    age: 41,
    preferredLanguage: "English, Luganda",
    totalSessions: 12,
    lastSession: "Aug 18",
    nextSession: null,
    concerns: ["Grief", "Life transitions"],
  },
  {
    id: "cl5",
    name: "Amira Osman",
    photo: "/images/avatars/client-amira.jpg",
    age: 31,
    preferredLanguage: "English, Swahili",
    totalSessions: 6,
    lastSession: "Aug 10",
    nextSession: "Thu, 22 Aug 3:00 PM",
    concerns: ["Stress", "Boundaries"],
  },
];

export const sessionNotes: SessionNote[] = [
  {
    id: "n1",
    clientName: "Sarah Namukasa",
    date: "Today, 10:00 AM",
    sessionType: "Video",
    status: "Draft",
    preview: "Client reported reduced anxiety compared to last session. Discussed breathing techniques...",
  },
  {
    id: "n2",
    clientName: "Daniel Kato",
    date: "Aug 15, 2:00 PM",
    sessionType: "Video",
    status: "Finalized",
    preview: "Session focused on communication patterns in the relationship. Client identified two key triggers...",
  },
  {
    id: "n3",
    clientName: "Grace Apio",
    date: "Aug 12, 4:00 PM",
    sessionType: "Audio",
    status: "Finalized",
    preview: "Third session. Mood has improved slightly according to client self-report. Sleep still disrupted...",
  },
  {
    id: "n4",
    clientName: "Robert Ssali",
    date: "Aug 18, 11:00 AM",
    sessionType: "Video",
    status: "Finalized",
    preview: "Explored how the grief is manifesting in daily life. Client beginning to re-engage with family...",
  },
];

// Admin mock data

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  totalSessions: number;
  status: "Active" | "Inactive" | "Suspended";
}

export interface AdminCounselorRecord {
  id: string;
  name: string;
  credentials: string;
  specializations: string[];
  status: "Active" | "Inactive" | "Suspended";
  verification: "Verified" | "Pending" | "Rejected";
  totalSessions: number;
  joinedDate: string;
  photo: string;
}

export const adminStats = {
  totalUsers: 847,
  activeUsers: 312,
  totalCounselors: 52,
  pendingVerifications: 4,
  totalSessions: 3241,
  completedSessions: 2987,
  cancelledSessions: 189,
  revenue: "UGX 287,450,000",
  growthUsers: "+12%",
  growthSessions: "+8%",
};

export const adminUsers: AdminUser[] = [
  { id: "u1", name: "Sarah Namukasa", email: "sarah.namukasa@email.com", joinedDate: "Jan 15, 2026", totalSessions: 8, status: "Active" },
  { id: "u2", name: "Daniel Kato", email: "daniel.kato@email.com", joinedDate: "Feb 3, 2026", totalSessions: 5, status: "Active" },
  { id: "u3", name: "Grace Apio", email: "grace.apio@email.com", joinedDate: "Mar 22, 2026", totalSessions: 3, status: "Active" },
  { id: "u4", name: "Robert Ssali", email: "robert.ssali@email.com", joinedDate: "Nov 10, 2025", totalSessions: 12, status: "Active" },
  { id: "u5", name: "Amira Osman", email: "amira.osman@email.com", joinedDate: "Apr 5, 2026", totalSessions: 6, status: "Active" },
  { id: "u6", name: "James Mutesasira", email: "james.m@email.com", joinedDate: "May 18, 2026", totalSessions: 0, status: "Active" },
  { id: "u7", name: "Fatuma Nakato", email: "fatuma.nakato@email.com", joinedDate: "Jun 2, 2026", totalSessions: 2, status: "Inactive" },
  { id: "u8", name: "Peter Omondi", email: "peter.omondi@email.com", joinedDate: "Dec 1, 2025", totalSessions: 15, status: "Suspended" },
];

export const adminCounselors: AdminCounselorRecord[] = [
  {
    id: "ac1",
    name: "Dr. Grace Nakamya",
    credentials: "PhD, Clinical Psychology",
    specializations: ["Anxiety", "Stress", "Relationships"],
    status: "Active",
    verification: "Verified",
    totalSessions: 342,
    joinedDate: "Jan 2024",
    photo: "/images/avatars/counselor-grace.jpg",
  },
  {
    id: "ac2",
    name: "Mr. Samuel Ochieng",
    credentials: "MSc, Counselling Psychology",
    specializations: ["Depression", "Grief"],
    status: "Active",
    verification: "Verified",
    totalSessions: 218,
    joinedDate: "Mar 2024",
    photo: "/images/avatars/samuel-ochieng.svg",
  },
  {
    id: "ac3",
    name: "Dr. Amina Hassan",
    credentials: "PhD, Family Therapy",
    specializations: ["Couples", "Family"],
    status: "Active",
    verification: "Verified",
    totalSessions: 156,
    joinedDate: "Jun 2024",
    photo: "/images/avatars/counselor-amina.jpg",
  },
  {
    id: "ac4",
    name: "Ms. Joyce Achieng",
    credentials: "MSc, Clinical Psychology",
    specializations: ["Youth", "School stress"],
    status: "Active",
    verification: "Pending",
    totalSessions: 0,
    joinedDate: "Aug 2026",
    photo: "/images/avatars/joyce-achieng.svg",
  },
  {
    id: "ac5",
    name: "Dr. Kenneth Otieno",
    credentials: "PhD, Trauma Therapy",
    specializations: ["Trauma", "PTSD"],
    status: "Active",
    verification: "Pending",
    totalSessions: 0,
    joinedDate: "Aug 2026",
    photo: "/images/avatars/kenneth-otieno.svg",
  },
];

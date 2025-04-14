
import { subDays, format, addDays } from "date-fns";

// User profile mock data
export const userProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "",
  recoveryStartDate: "2023-05-15",
  sobrietyDays: 371,
};

// Recovery progress mock data
export const weeklyProgressData = [
  { day: "Mon", mood: 7, cravings: 3, sleep: 6 },
  { day: "Tue", mood: 6, cravings: 4, sleep: 7 },
  { day: "Wed", mood: 8, cravings: 2, sleep: 8 },
  { day: "Thu", mood: 7, cravings: 2, sleep: 6 },
  { day: "Fri", mood: 9, cravings: 1, sleep: 9 },
  { day: "Sat", mood: 8, cravings: 2, sleep: 7 },
  { day: "Sun", mood: 8, cravings: 1, sleep: 8 },
];

export const monthlyProgressData = Array.from({ length: 30 }, (_, i) => ({
  date: format(subDays(new Date(), 30 - i), "MMM dd"),
  cravings: Math.floor(Math.random() * 5),
  mood: Math.floor(Math.random() * 5) + 5,
}));

// Journal entries mock data
export const journalEntries = [
  {
    id: "journal-1",
    date: format(subDays(new Date(), 1), "yyyy-MM-dd"),
    title: "Feeling Stronger Today",
    content:
      "I woke up feeling more positive today. The morning meditation really helped set my intention for the day. Had a moment of weakness in the afternoon but called my sponsor who talked me through it.",
    mood: 8,
    gratitude: "My support group, sunshine, and my dog's unconditional love.",
  },
  {
    id: "journal-2",
    date: format(subDays(new Date(), 2), "yyyy-MM-dd"),
    title: "Challenging Day",
    content:
      "Today was tough. Ran into an old friend who didn't know about my recovery journey. They asked me to go for drinks. Proud that I was able to say no and suggest coffee instead.",
    mood: 6,
    gratitude: "My strength to say no, my new clarity of mind.",
  },
  {
    id: "journal-3",
    date: format(subDays(new Date(), 3), "yyyy-MM-dd"),
    title: "Group Session Insights",
    content:
      "The group session today was powerful. Hearing others' stories reminded me I'm not alone. One person shared about rebuilding trust with family which gave me hope.",
    mood: 7,
    gratitude: "The recovery community, second chances, my therapist.",
  },
];

// Appointments mock data
export const appointments = [
  {
    id: "apt-1",
    title: "Therapy Session",
    date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    time: "10:00 AM",
    location: "Dr. Smith's Office",
    notes: "Bring journal to discuss weekly progress",
  },
  {
    id: "apt-2",
    title: "Support Group",
    date: format(addDays(new Date(), 3), "yyyy-MM-dd"),
    time: "6:30 PM",
    location: "Community Center, Room 204",
    notes: "Weekly check-in, my turn to bring snacks",
  },
  {
    id: "apt-3",
    title: "Medication Checkup",
    date: format(addDays(new Date(), 7), "yyyy-MM-dd"),
    time: "9:15 AM",
    location: "City Health Clinic",
    notes: "Remember to refill prescription",
  },
];

// Resources mock data
export const resources = [
  {
    id: "res-1",
    title: "Crisis Hotline",
    description: "24/7 support for immediate assistance",
    contact: "1-800-662-HELP",
    category: "emergency",
  },
  {
    id: "res-2",
    title: "Online Support Community",
    description: "Connect with peers on your recovery journey",
    url: "https://www.recoveryforums.org",
    category: "community",
  },
  {
    id: "res-3",
    title: "Mindfulness Meditation Guide",
    description: "Audio guides and practices for stress management",
    url: "https://www.recoverymindfulness.org",
    category: "self-help",
  },
  {
    id: "res-4",
    title: "Local Recovery Centers",
    description: "Find treatment centers in your area",
    url: "https://findtreatment.samhsa.gov",
    category: "treatment",
  },
];

// Daily tasks mock data
export const dailyTasks = [
  {
    id: "task-1",
    title: "Morning Meditation",
    completed: true,
    category: "wellness",
  },
  {
    id: "task-2",
    title: "Journal Entry",
    completed: false,
    category: "reflection",
  },
  {
    id: "task-3",
    title: "Call Sponsor",
    completed: false,
    category: "support",
  },
  {
    id: "task-4",
    title: "Take Medication",
    completed: true,
    category: "health",
  },
  {
    id: "task-5",
    title: "Evening Reflection",
    completed: false,
    category: "reflection",
  },
];

// Achievements mock data
export const achievements = [
  {
    id: "achv-1",
    title: "30 Days Sober",
    date: "2023-06-14",
    description: "Completed your first month of sobriety",
    icon: "award",
  },
  {
    id: "achv-2",
    title: "Journal Streak",
    date: "2023-09-22",
    description: "Completed 7 consecutive days of journaling",
    icon: "book",
  },
  {
    id: "achv-3",
    title: "Meeting Milestone",
    date: "2023-12-05",
    description: "Attended 25 support group meetings",
    icon: "users",
  },
];

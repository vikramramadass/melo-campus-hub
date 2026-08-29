/**
 * Mock academic data for the MCA Student Portal.
 * Shapes mirror a future database schema so real data / auth can replace
 * these exports without touching UI components.
 */

export type Semester = 1 | 2 | 3 | 4;

export interface Student {
  id: string;
  regNo: string;
  name: string;
  email: string;
  phone: string;
  semester: Semester;
  section: "A" | "B";
  batch: string;
  cgpa: number;
  attendance: number;
  status: "active" | "detained" | "alumni";
  bloodGroup: string;
  guardian: string;
  address: string;
}

export interface Course {
  code: string;
  title: string;
  credits: number;
  faculty: string;
}

export interface AttendanceRecord {
  code: string;
  course: string;
  held: number;
  attended: number;
}

export interface TimetableSlot {
  day: string;
  slots: { time: string; code: string; title: string; room: string; faculty: string }[];
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  code: string;
  due: string;
  status: "submitted" | "pending" | "graded" | "late";
  marks?: number;
  total: number;
  submissions: number;
  classSize: number;
}

export interface Material {
  id: string;
  title: string;
  course: string;
  code: string;
  type: "PDF" | "Slides" | "Notes" | "Video" | "Code";
  size: string;
  uploaded: string;
  by: string;
  downloads: number;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  category: "Exam" | "Event" | "Placement" | "Academic" | "General";
  audience: "All MCA" | "Semester 1" | "Semester 2" | "Semester 3" | "Faculty";
  date: string;
  author: string;
  pinned: boolean;
}

export interface ResultRow {
  code: string;
  course: string;
  credits: number;
  internal: number;
  external: number;
  grade: string;
  points: number;
}

export interface SemesterResult {
  semester: Semester;
  gpa: number;
  published: string;
  rows: ResultRow[];
}

export interface Notification {
  id: string;
  title: string;
  detail: string;
  time: string;
  kind: "assignment" | "attendance" | "result" | "announcement" | "system";
  read: boolean;
}

export const college = {
  name: "Mailam Engineering College",
  department: "Department of Computer Applications (MCA)",
  address: "Mailam, Villupuram District, Tamil Nadu 604 304",
  phone: "+91 4147 265 214",
  email: "mca@mailamengg.ac.in",
  affiliation: "Affiliated to Anna University · Approved by AICTE",
};

export const currentStudent: Student = {
  id: "stu-001",
  regNo: "MCA24CS017",
  name: "Vikram Raghunathan",
  email: "vikram.r@mailamengg.ac.in",
  phone: "+91 98421 55703",
  semester: 3,
  section: "A",
  batch: "2024 – 2026",
  cgpa: 8.62,
  attendance: 91,
  status: "active",
  bloodGroup: "O+",
  guardian: "R. Raghunathan",
  address: "12/4 Kamaraj Street, Tindivanam, Tamil Nadu 604 001",
};

export const courses: Course[] = [
  { code: "MC4301", title: "Machine Learning", credits: 4, faculty: "Dr. S. Anitha" },
  { code: "MC4302", title: "Cloud Computing Technologies", credits: 3, faculty: "Prof. K. Manikandan" },
  { code: "MC4303", title: "Full Stack Web Development", credits: 4, faculty: "Prof. R. Deepa" },
  { code: "MC4304", title: "Cryptography & Cyber Security", credits: 3, faculty: "Dr. M. Balaji" },
  { code: "MC4311", title: "Data Analytics Laboratory", credits: 2, faculty: "Prof. R. Deepa" },
  { code: "MC4312", title: "Mini Project & Seminar", credits: 2, faculty: "Dr. S. Anitha" },
];

export const attendance: AttendanceRecord[] = [
  { code: "MC4301", course: "Machine Learning", held: 48, attended: 45 },
  { code: "MC4302", course: "Cloud Computing Technologies", held: 42, attended: 37 },
  { code: "MC4303", course: "Full Stack Web Development", held: 50, attended: 47 },
  { code: "MC4304", course: "Cryptography & Cyber Security", held: 40, attended: 33 },
  { code: "MC4311", course: "Data Analytics Laboratory", held: 24, attended: 23 },
  { code: "MC4312", course: "Mini Project & Seminar", held: 18, attended: 17 },
];

export const attendanceTrend = [
  { month: "Apr", percent: 88 },
  { month: "May", percent: 92 },
  { month: "Jun", percent: 86 },
  { month: "Jul", percent: 94 },
  { month: "Aug", percent: 90 },
  { month: "Sep", percent: 93 },
];

export const timetable: TimetableSlot[] = [
  {
    day: "Monday",
    slots: [
      { time: "09:00 – 10:30", code: "MC4301", title: "Machine Learning", room: "PG Block 204", faculty: "Dr. S. Anitha" },
      { time: "10:45 – 12:15", code: "MC4303", title: "Full Stack Web Development", room: "PG Block 204", faculty: "Prof. R. Deepa" },
      { time: "01:15 – 03:15", code: "MC4311", title: "Data Analytics Lab", room: "Lab 3", faculty: "Prof. R. Deepa" },
    ],
  },
  {
    day: "Tuesday",
    slots: [
      { time: "09:00 – 10:30", code: "MC4302", title: "Cloud Computing", room: "PG Block 206", faculty: "Prof. K. Manikandan" },
      { time: "10:45 – 12:15", code: "MC4304", title: "Cyber Security", room: "PG Block 206", faculty: "Dr. M. Balaji" },
      { time: "01:15 – 02:45", code: "MC4301", title: "Machine Learning", room: "PG Block 204", faculty: "Dr. S. Anitha" },
    ],
  },
  {
    day: "Wednesday",
    slots: [
      { time: "09:00 – 10:30", code: "MC4303", title: "Full Stack Web Development", room: "PG Block 204", faculty: "Prof. R. Deepa" },
      { time: "10:45 – 12:15", code: "MC4301", title: "Machine Learning", room: "PG Block 204", faculty: "Dr. S. Anitha" },
      { time: "01:15 – 03:15", code: "MC4312", title: "Mini Project Review", room: "Seminar Hall", faculty: "Dr. S. Anitha" },
    ],
  },
  {
    day: "Thursday",
    slots: [
      { time: "09:00 – 10:30", code: "MC4304", title: "Cyber Security", room: "PG Block 206", faculty: "Dr. M. Balaji" },
      { time: "10:45 – 12:15", code: "MC4302", title: "Cloud Computing", room: "PG Block 206", faculty: "Prof. K. Manikandan" },
      { time: "01:15 – 03:15", code: "MC4311", title: "Data Analytics Lab", room: "Lab 3", faculty: "Prof. R. Deepa" },
    ],
  },
  {
    day: "Friday",
    slots: [
      { time: "09:00 – 10:30", code: "MC4301", title: "Machine Learning", room: "PG Block 204", faculty: "Dr. S. Anitha" },
      { time: "10:45 – 12:15", code: "MC4303", title: "Full Stack Web Development", room: "PG Block 204", faculty: "Prof. R. Deepa" },
      { time: "01:15 – 02:45", code: "MC4302", title: "Cloud Computing", room: "PG Block 206", faculty: "Prof. K. Manikandan" },
    ],
  },
];

export const assignments: Assignment[] = [
  { id: "as-01", title: "Regression models on housing dataset", course: "Machine Learning", code: "MC4301", due: "2026-09-04", status: "pending", total: 20, submissions: 31, classSize: 58 },
  { id: "as-02", title: "Kubernetes deployment case study", course: "Cloud Computing", code: "MC4302", due: "2026-09-01", status: "submitted", total: 20, submissions: 52, classSize: 58 },
  { id: "as-03", title: "REST API with authentication", course: "Full Stack Web Development", code: "MC4303", due: "2026-08-24", status: "graded", marks: 18, total: 20, submissions: 58, classSize: 58 },
  { id: "as-04", title: "AES implementation report", course: "Cyber Security", code: "MC4304", due: "2026-08-20", status: "graded", marks: 15, total: 20, submissions: 55, classSize: 58 },
  { id: "as-05", title: "Exploratory data analysis notebook", course: "Data Analytics Lab", code: "MC4311", due: "2026-08-18", status: "late", marks: 12, total: 20, submissions: 57, classSize: 58 },
  { id: "as-06", title: "Mini project literature survey", course: "Mini Project & Seminar", code: "MC4312", due: "2026-09-09", status: "pending", total: 30, submissions: 12, classSize: 58 },
];

export const materials: Material[] = [
  { id: "mt-01", title: "Unit III – Support Vector Machines", course: "Machine Learning", code: "MC4301", type: "PDF", size: "3.4 MB", uploaded: "2026-08-26", by: "Dr. S. Anitha", downloads: 142 },
  { id: "mt-02", title: "Containers & Orchestration deck", course: "Cloud Computing", code: "MC4302", type: "Slides", size: "8.1 MB", uploaded: "2026-08-24", by: "Prof. K. Manikandan", downloads: 118 },
  { id: "mt-03", title: "React + TanStack starter repo", course: "Full Stack Web Development", code: "MC4303", type: "Code", size: "1.2 MB", uploaded: "2026-08-22", by: "Prof. R. Deepa", downloads: 205 },
  { id: "mt-04", title: "Number theory refresher notes", course: "Cyber Security", code: "MC4304", type: "Notes", size: "780 KB", uploaded: "2026-08-19", by: "Dr. M. Balaji", downloads: 96 },
  { id: "mt-05", title: "Pandas walkthrough recording", course: "Data Analytics Lab", code: "MC4311", type: "Video", size: "212 MB", uploaded: "2026-08-14", by: "Prof. R. Deepa", downloads: 88 },
  { id: "mt-06", title: "Anna University model question bank", course: "Machine Learning", code: "MC4301", type: "PDF", size: "2.0 MB", uploaded: "2026-08-11", by: "Dr. S. Anitha", downloads: 260 },
];

export const announcements: Announcement[] = [
  { id: "an-01", title: "Semester III model exam timetable released", body: "Model examinations begin on 14 September 2026. Hall tickets can be downloaded from the portal after 8 September. Students with attendance below 75% must obtain condonation approval from the HOD.", category: "Exam", audience: "Semester 3", date: "2026-08-28", author: "Examination Cell", pinned: true },
  { id: "an-02", title: "Zoho campus recruitment drive", body: "Zoho Corporation will conduct an on-campus drive for the 2026 passing-out batch on 6 September. Eligibility: CGPA 7.5 and above with no standing arrears. Register through the placement cell before 2 September.", category: "Placement", audience: "All MCA", date: "2026-08-27", author: "Placement Cell", pinned: true },
  { id: "an-03", title: "Guest lecture: MLOps in production", body: "Mr. Arun Prakash, Senior Data Engineer at Freshworks, will deliver a guest lecture in the PG Seminar Hall at 10:30 AM on 2 September. Attendance is mandatory for Semester III.", category: "Event", audience: "Semester 3", date: "2026-08-25", author: "Dr. S. Anitha", pinned: false },
  { id: "an-04", title: "Library book return reminder", body: "All borrowed reference volumes must be returned before 5 September for the annual stock verification. Late returns attract a fine of Rs. 5 per day.", category: "General", audience: "All MCA", date: "2026-08-21", author: "Central Library", pinned: false },
  { id: "an-05", title: "Elective registration for Semester IV", body: "Elective preference forms for Semester IV are open in the portal. Choose three electives in order of preference before 10 September.", category: "Academic", audience: "Semester 3", date: "2026-08-18", author: "Academic Office", pinned: false },
];

export const results: SemesterResult[] = [
  {
    semester: 3,
    gpa: 8.71,
    published: "Awaiting publication",
    rows: [
      { code: "MC4301", course: "Machine Learning", credits: 4, internal: 22, external: 0, grade: "—", points: 0 },
      { code: "MC4302", course: "Cloud Computing Technologies", credits: 3, internal: 21, external: 0, grade: "—", points: 0 },
      { code: "MC4303", course: "Full Stack Web Development", credits: 4, internal: 24, external: 0, grade: "—", points: 0 },
      { code: "MC4304", course: "Cryptography & Cyber Security", credits: 3, internal: 19, external: 0, grade: "—", points: 0 },
    ],
  },
  {
    semester: 2,
    gpa: 8.74,
    published: "2026-03-12",
    rows: [
      { code: "MC4201", course: "Advanced Database Technologies", credits: 4, internal: 23, external: 61, grade: "A", points: 9 },
      { code: "MC4202", course: "Software Project Management", credits: 3, internal: 21, external: 54, grade: "B+", points: 8 },
      { code: "MC4203", course: "Mobile Application Development", credits: 4, internal: 24, external: 66, grade: "A+", points: 10 },
      { code: "MC4204", course: "Computer Networks", credits: 3, internal: 20, external: 51, grade: "B+", points: 8 },
      { code: "MC4211", course: "Mobile App Laboratory", credits: 2, internal: 25, external: 68, grade: "A+", points: 10 },
    ],
  },
  {
    semester: 1,
    gpa: 8.42,
    published: "2025-08-30",
    rows: [
      { code: "MC4101", course: "Python Programming", credits: 4, internal: 22, external: 63, grade: "A", points: 9 },
      { code: "MC4102", course: "Data Structures & Algorithms", credits: 4, internal: 21, external: 57, grade: "B+", points: 8 },
      { code: "MC4103", course: "Operating Systems", credits: 3, internal: 20, external: 55, grade: "B+", points: 8 },
      { code: "MC4104", course: "Discrete Mathematics", credits: 3, internal: 23, external: 60, grade: "A", points: 9 },
      { code: "MC4111", course: "Programming Laboratory", credits: 2, internal: 24, external: 66, grade: "A+", points: 10 },
    ],
  },
];

export const gpaTrend = [
  { label: "Sem 1", gpa: 8.42 },
  { label: "Sem 2", gpa: 8.74 },
  { label: "Sem 3*", gpa: 8.71 },
];

export const notifications: Notification[] = [
  { id: "nt-01", title: "New assignment posted", detail: "Machine Learning · Regression models on housing dataset, due 4 September.", time: "12 min ago", kind: "assignment", read: false },
  { id: "nt-02", title: "Attendance alert", detail: "Cyber Security attendance is at 82.5% — two more absences will drop you below 75%.", time: "2 hours ago", kind: "attendance", read: false },
  { id: "nt-03", title: "Announcement pinned", detail: "Semester III model exam timetable released by the Examination Cell.", time: "Yesterday", kind: "announcement", read: false },
  { id: "nt-04", title: "Assignment graded", detail: "REST API with authentication — 18 / 20 by Prof. R. Deepa.", time: "3 days ago", kind: "result", read: true },
  { id: "nt-05", title: "Material uploaded", detail: "Unit III – Support Vector Machines added to Machine Learning.", time: "4 days ago", kind: "system", read: true },
];

export const students: Student[] = [
  currentStudent,
  { id: "stu-002", regNo: "MCA24CS002", name: "Aarthi Selvaraj", email: "aarthi.s@mailamengg.ac.in", phone: "+91 90031 44821", semester: 3, section: "A", batch: "2024 – 2026", cgpa: 9.12, attendance: 96, status: "active", bloodGroup: "B+", guardian: "S. Selvaraj", address: "Villupuram" },
  { id: "stu-003", regNo: "MCA24CS008", name: "Mohammed Irfan", email: "irfan.m@mailamengg.ac.in", phone: "+91 89253 77410", semester: 3, section: "B", batch: "2024 – 2026", cgpa: 7.86, attendance: 78, status: "active", bloodGroup: "A+", guardian: "M. Basheer", address: "Tindivanam" },
  { id: "stu-004", regNo: "MCA24CS011", name: "Divya Bharathi", email: "divya.b@mailamengg.ac.in", phone: "+91 94446 20198", semester: 3, section: "A", batch: "2024 – 2026", cgpa: 8.94, attendance: 93, status: "active", bloodGroup: "O-", guardian: "K. Bharathi", address: "Pondicherry" },
  { id: "stu-005", regNo: "MCA24CS023", name: "Sanjay Kumar", email: "sanjay.k@mailamengg.ac.in", phone: "+91 90876 31245", semester: 3, section: "B", batch: "2024 – 2026", cgpa: 6.94, attendance: 68, status: "detained", bloodGroup: "AB+", guardian: "R. Kumar", address: "Cuddalore" },
  { id: "stu-006", regNo: "MCA25CS004", name: "Priyadharshini M", email: "priya.m@mailamengg.ac.in", phone: "+91 98404 11256", semester: 1, section: "A", batch: "2025 – 2027", cgpa: 8.2, attendance: 89, status: "active", bloodGroup: "B-", guardian: "M. Murugan", address: "Chengalpattu" },
  { id: "stu-007", regNo: "MCA25CS019", name: "Hariharan V", email: "hari.v@mailamengg.ac.in", phone: "+91 93450 88712", semester: 1, section: "B", batch: "2025 – 2027", cgpa: 7.55, attendance: 84, status: "active", bloodGroup: "O+", guardian: "V. Venkatesan", address: "Kallakurichi" },
  { id: "stu-008", regNo: "MCA23CS015", name: "Nithya Sri", email: "nithya.s@mailamengg.ac.in", phone: "+91 97890 45612", semester: 4, section: "A", batch: "2023 – 2025", cgpa: 9.3, attendance: 97, status: "alumni", bloodGroup: "A-", guardian: "S. Ramesh", address: "Chennai" },
];

export const facultyRoster = [
  { name: "Dr. S. Anitha", role: "Head of Department", subjects: 2, email: "anitha.s@mailamengg.ac.in" },
  { name: "Prof. R. Deepa", role: "Assistant Professor", subjects: 2, email: "deepa.r@mailamengg.ac.in" },
  { name: "Prof. K. Manikandan", role: "Assistant Professor", subjects: 1, email: "mani.k@mailamengg.ac.in" },
  { name: "Dr. M. Balaji", role: "Associate Professor", subjects: 1, email: "balaji.m@mailamengg.ac.in" },
];

export const semesterAttendanceSummary = [
  { semester: "Semester 1", present: 89, defaulters: 4, strength: 62 },
  { semester: "Semester 2", present: 91, defaulters: 3, strength: 60 },
  { semester: "Semester 3", present: 88, defaulters: 6, strength: 58 },
  { semester: "Semester 4", present: 93, defaulters: 2, strength: 55 },
];

export const gradeDistribution = [
  { grade: "O", count: 38 },
  { grade: "A+", count: 61 },
  { grade: "A", count: 74 },
  { grade: "B+", count: 45 },
  { grade: "B", count: 22 },
  { grade: "RA", count: 7 },
];

export function attendancePercent(record: AttendanceRecord) {
  return Math.round((record.attended / record.held) * 1000) / 10;
}

export const overallAttendance = Math.round(
  (attendance.reduce((s, r) => s + r.attended, 0) / attendance.reduce((s, r) => s + r.held, 0)) * 1000,
) / 10;

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookMarked,
  CalendarClock,
  ClipboardList,
  FileBarChart2,
  GraduationCap,
  Megaphone,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { PageHeader, QuickLink, SectionCard, StatCard, MeterBar } from "@/components/portal/primitives";
import { StatusBadge, statusTone } from "@/components/portal/StatusBadge";
import {
  announcements,
  assignments,
  attendance,
  attendancePercent,
  attendanceTrend,
  currentStudent,
  overallAttendance,
  timetable,
} from "@/lib/mock-data";

export const Route = createFileRoute("/student/")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — MCA Student Portal" },
      { name: "description", content: "Attendance, upcoming deadlines, today's classes and department announcements at a glance." },
      { property: "og:title", content: "Student Dashboard — MCA Student Portal" },
      { property: "og:description", content: "Your semester at a glance: attendance, deadlines and announcements." },
    ],
  }),
  component: StudentDashboard,
});

function StudentDashboard() {
  const pending = assignments.filter((a) => a.status === "pending");
  const today = timetable[2];
  const lowest = [...attendance].sort((a, b) => attendancePercent(a) - attendancePercent(b))[0];

  return (
    <>
      <PageHeader
        eyebrow={`${currentStudent.batch} · Semester ${currentStudent.semester}${currentStudent.section}`}
        title={`Good evening, ${currentStudent.name.split(" ")[0]}`}
        description="Semester III is 62% complete. Two assignments need attention this week."
        actions={
          <Button asChild variant="outline" size="sm">
            <Link to="/student/timetable">
              Full timetable <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Attendance" value={`${overallAttendance}%`} hint="Condonation limit is 75%" icon={ClipboardList} tone="success" />
        <StatCard label="CGPA" value={currentStudent.cgpa.toFixed(2)} hint="After Semester II results" icon={GraduationCap} />
        <StatCard label="Pending work" value={String(pending.length)} hint="Due within 10 days" icon={BookMarked} tone="warning" />
        <StatCard label="Credits earned" value="42 / 88" hint="Regulation 2021 curriculum" icon={TrendingUp} tone="accent" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <SectionCard title="Attendance trend" description="Monthly aggregate across all Semester III courses" icon={TrendingUp}>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrend} margin={{ left: -18, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="att" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
                <YAxis domain={[70, 100]} tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                    fontSize: 12,
                  }}
                  formatter={(v) => [`${v}%`, "Attendance"]}
                />
                <Area type="monotone" dataKey="percent" stroke="var(--color-primary)" strokeWidth={2} fill="url(#att)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Today's classes" description="Wednesday schedule" icon={CalendarClock} padded={false}>
          <ul className="divide-y divide-border">
            {today.slots.map((s) => (
              <li key={s.time} className="flex items-start gap-4 px-5 py-4">
                <span className="w-24 shrink-0 text-xs font-medium tabular-nums text-muted-foreground">{s.time}</span>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold">{s.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.code} · {s.room} · {s.faculty}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <SectionCard
          title="Upcoming submissions"
          description="Sorted by due date"
          icon={BookMarked}
          actions={
            <Button asChild variant="ghost" size="sm">
              <Link to="/student/assignments">View all</Link>
            </Button>
          }
          padded={false}
        >
          <ul className="divide-y divide-border">
            {assignments.slice(0, 4).map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold">{a.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.code} · due {new Date(a.due).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                </div>
                <StatusBadge tone={statusTone(a.status)}>{a.status}</StatusBadge>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Attendance watchlist" description="Courses closest to the 75% floor" icon={ClipboardList}>
          <div className="space-y-4">
            {[...attendance]
              .sort((a, b) => attendancePercent(a) - attendancePercent(b))
              .slice(0, 4)
              .map((r) => {
                const p = attendancePercent(r);
                return (
                  <div key={r.code} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{r.course}</span>
                      <span className="tabular-nums text-muted-foreground">{p}%</span>
                    </div>
                    <MeterBar percent={p} />
                  </div>
                );
              })}
            <p className="rounded-lg bg-surface p-3 text-xs text-muted-foreground">
              {lowest.course} is your lowest at {attendancePercent(lowest)}%. Missing two more hours drops you below the
              condonation threshold.
            </p>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Department announcements"
        description="Latest circulars from the exam and placement cells"
        icon={Megaphone}
        actions={
          <Button asChild variant="ghost" size="sm">
            <Link to="/student/announcements">All announcements</Link>
          </Button>
        }
        padded={false}
      >
        <ul className="divide-y divide-border">
          {announcements.slice(0, 3).map((a) => (
            <li key={a.id} className="space-y-1.5 px-5 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge tone="accent">{a.category}</StatusBadge>
                <span className="text-xs text-muted-foreground">
                  {a.author} · {new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}
                </span>
              </div>
              <p className="text-sm font-semibold">{a.title}</p>
              <p className="line-clamp-2 text-xs text-muted-foreground">{a.body}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <QuickLink to="/student/materials" label="Study materials" description="Unit notes and lab code" icon={FileBarChart2} />
        <QuickLink to="/student/results" label="Results" description="Grade sheets and GPA" icon={GraduationCap} />
        <QuickLink to="/student/attendance" label="Attendance register" description="Hour-wise history" icon={ClipboardList} />
        <QuickLink to="/student/profile" label="Profile" description="Personal and academic record" icon={BookMarked} />
      </div>
    </>
  );
}

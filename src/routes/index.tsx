import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  BookMarked,
  CalendarDays,
  ClipboardList,
  FileBarChart2,
  GraduationCap,
  Megaphone,
  ShieldCheck,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { announcements, college } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MCA Student Portal — Mailam Engineering College" },
      {
        name: "description",
        content:
          "One place for MCA attendance, timetable, assignments, study materials, results and department announcements at Mailam Engineering College.",
      },
      { property: "og:title", content: "MCA Student Portal — Mailam Engineering College" },
      {
        property: "og:description",
        content: "Attendance, timetable, assignments, results and announcements for the MCA department.",
      },
    ],
  }),
  component: Home,
});

const modules = [
  { icon: ClipboardList, title: "Attendance", copy: "Subject-wise percentages, condonation alerts and hour-by-hour history." },
  { icon: CalendarDays, title: "Timetable", copy: "Live weekly schedule with room, faculty and lab allocations." },
  { icon: BookMarked, title: "Assignments", copy: "Deadlines, submission state and internal marks in one queue." },
  { icon: FileBarChart2, title: "Study materials", copy: "Unit notes, decks, lab code and recorded sessions by course." },
  { icon: Megaphone, title: "Announcements", copy: "Exam cell, placement and department circulars, pinned when urgent." },
  { icon: GraduationCap, title: "Results", copy: "Semester grade sheets, GPA history and arrear tracking." },
];

function Home() {
  const pinned = announcements.filter((a) => a.pinned);

  return (
    <PublicLayout>
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-backdrop absolute inset-0 opacity-40" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div className="animate-rise space-y-7">
            <StatusBadge tone="primary">
              <ShieldCheck className="size-3.5" aria-hidden />
              {college.affiliation}
            </StatusBadge>
            <h1 className="text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
              The academic record of the MCA department, in one place.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              Students track attendance, deadlines and grade sheets. Faculty publish materials, mark hours and release
              results. Built for the {college.department}.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to="/login">
                  Student login <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/admin">Faculty workspace</Link>
              </Button>
            </div>
            <dl className="grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                ["235", "Students enrolled"],
                ["4", "Semesters tracked"],
                ["18", "Faculty members"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-2xl font-semibold tabular-nums">{value}</dt>
                  <dd className="text-xs text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-rise space-y-4">
            <Card className="glass-panel gap-0 py-0 shadow-lift">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Today at the department
                  </p>
                  <Bell className="size-4 text-muted-foreground" aria-hidden />
                </div>
                <div className="space-y-3">
                  {pinned.map((a) => (
                    <div key={a.id} className="rounded-xl border border-border/70 bg-card p-4">
                      <div className="flex items-center justify-between gap-3">
                        <StatusBadge tone="accent">{a.category}</StatusBadge>
                        <span className="text-[11px] text-muted-foreground">{a.audience}</span>
                      </div>
                      <p className="mt-2 text-sm font-semibold leading-snug">{a.title}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{a.body}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-surface p-4">
                  <p className="text-xs text-muted-foreground">Next class</p>
                  <p className="mt-1 text-sm font-semibold">MC4301 · Machine Learning — PG Block 204</p>
                  <p className="text-xs text-muted-foreground">09:00 – 10:30 · Dr. S. Anitha</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Modules</p>
          <h2 className="text-3xl font-semibold">Everything the semester needs</h2>
          <p className="text-sm text-muted-foreground">
            Each module maps to how the department already works — no parallel spreadsheets, no WhatsApp circulars.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <Card key={m.title} className="group gap-0 border-border/80 py-0 shadow-panel transition-all hover:-translate-y-1 hover:shadow-lift">
              <CardContent className="space-y-3 p-6">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <m.icon className="size-5" aria-hidden />
                </span>
                <h3 className="text-base font-semibold">{m.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{m.copy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">New to the portal?</h2>
            <p className="max-w-xl text-sm text-muted-foreground">
              First-year students can register with their Anna University register number and department email to activate
              portal access.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/register">
              Create student account <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}

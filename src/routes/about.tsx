import { createFileRoute } from "@tanstack/react-router";
import { Award, BookOpen, Building2, Target, Users } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { college, courses, facultyRoster } from "@/lib/mock-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the MCA Department — Mailam Engineering College" },
      {
        name: "description",
        content:
          "The Department of Computer Applications at Mailam Engineering College: curriculum, faculty, labs and the purpose of the MCA student portal.",
      },
      { property: "og:title", content: "About the MCA Department — Mailam Engineering College" },
      {
        property: "og:description",
        content: "Curriculum, faculty and infrastructure of the MCA department at Mailam Engineering College.",
      },
    ],
  }),
  component: About,
});

const milestones = [
  { year: "2002", text: "Department of Computer Applications established with an intake of 30." },
  { year: "2012", text: "Intake raised to 60; dedicated PG block and three computing labs commissioned." },
  { year: "2021", text: "Curriculum revised to Anna University Regulation 2021 with data science electives." },
  { year: "2026", text: "MCA Student Portal rolled out to digitise attendance, materials and results." },
];

function About() {
  return (
    <PublicLayout>
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-16 sm:px-6 lg:py-20">
          <StatusBadge tone="primary">{college.department}</StatusBadge>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight">
            A postgraduate department built around applied computing
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            The MCA programme at {college.name} prepares graduates for software engineering, data and cloud roles through a
            two-year curriculum combining core computer science, laboratory practice and an industry-guided project.
          </p>
          <div className="grid gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, label: "Students", value: "235" },
              { icon: BookOpen, label: "Courses per semester", value: "6" },
              { icon: Building2, label: "Computing labs", value: "3" },
              { icon: Award, label: "Placement rate", value: "92%" },
            ].map((s) => (
              <Card key={s.label} className="gap-0 border-border/80 py-0 shadow-panel">
                <CardContent className="flex items-center gap-3 p-5">
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <s.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-xl font-semibold tabular-nums">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Vision</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            To be recognised as a centre of excellence in computer applications, producing postgraduates who can design,
            build and maintain dependable software systems for industry and society.
          </p>
          <h2 className="pt-4 text-2xl font-semibold">Mission</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {[
              "Deliver a rigorous curriculum aligned with current industry practice and Anna University regulations.",
              "Sustain laboratory-first teaching so every theory unit is paired with implementation work.",
              "Mentor students through internships, mini projects and placement preparation from the first semester.",
              "Encourage research publication and open-source contribution among faculty and students.",
            ].map((m) => (
              <li key={m} className="flex gap-3">
                <Target className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                {m}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Milestones</h2>
          <ol className="relative space-y-6 border-l border-border pl-6">
            {milestones.map((m) => (
              <li key={m.year} className="relative">
                <span className="absolute -left-[1.72rem] top-1 size-3 rounded-full border-2 border-background bg-primary" />
                <p className="font-display text-sm font-semibold">{m.year}</p>
                <p className="text-sm text-muted-foreground">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-surface/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold">Faculty</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facultyRoster.map((f) => (
              <Card key={f.name} className="gap-0 border-border/80 py-0 shadow-panel">
                <CardContent className="space-y-1.5 p-5">
                  <p className="text-sm font-semibold">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.role}</p>
                  <p className="text-xs text-muted-foreground">{f.email}</p>
                  <StatusBadge tone="neutral" className="mt-2">
                    {f.subjects} course{f.subjects > 1 ? "s" : ""} this semester
                  </StatusBadge>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-semibold">Semester III curriculum</h2>
          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-surface/70 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold">Code</th>
                  <th className="px-5 py-3 text-left font-semibold">Course</th>
                  <th className="px-5 py-3 text-left font-semibold">Credits</th>
                  <th className="px-5 py-3 text-left font-semibold">Faculty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {courses.map((c) => (
                  <tr key={c.code} className="hover:bg-surface/50">
                    <td className="px-5 py-3 font-mono text-xs">{c.code}</td>
                    <td className="px-5 py-3 font-medium">{c.title}</td>
                    <td className="px-5 py-3 tabular-nums">{c.credits}</td>
                    <td className="px-5 py-3 text-muted-foreground">{c.faculty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

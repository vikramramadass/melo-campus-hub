import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, BookOpen, GraduationCap, Mail, MapPin, Phone, Pencil, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PageHeader, SectionCard } from "@/components/portal/primitives";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { courses, currentStudent, results } from "@/lib/mock-data";

export const Route = createFileRoute("/student/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — MCA Student Portal" },
      { name: "description", content: "Personal, academic and guardian details on record with the MCA department office." },
      { property: "og:title", content: "My Profile — MCA Student Portal" },
      { property: "og:description", content: "Your student record as held by the department office." },
    ],
  }),
  component: Profile,
});

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
}

function Profile() {
  const s = currentStudent;

  return (
    <>
      <PageHeader
        eyebrow="Student record"
        title="My profile"
        description="Details verified against the department admission register. Contact the office to correct locked fields."
        actions={
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Pencil className="size-4" aria-hidden /> Request correction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request a record correction</DialogTitle>
                <DialogDescription>
                  Editable contact details update instantly. Name, register number and semester changes need office approval.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="p-phone">Mobile number</Label>
                  <Input id="p-phone" defaultValue={s.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p-address">Address</Label>
                  <Input id="p-address" defaultValue={s.address} />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={() => toast.success("Correction request sent to the department office")}>
                    Submit request
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <Card className="gap-0 border-border/80 py-0 shadow-panel">
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          <Avatar className="size-20">
            <AvatarFallback className="bg-primary/10 font-display text-xl font-semibold text-primary">VR</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-xl font-semibold">{s.name}</h2>
              <StatusBadge tone="success">
                <BadgeCheck className="size-3.5" aria-hidden /> Active
              </StatusBadge>
            </div>
            <p className="text-sm text-muted-foreground">
              {s.regNo} · MCA Semester {s.semester}{s.section} · Batch {s.batch}
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Mail className="size-3.5" aria-hidden /> {s.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="size-3.5" aria-hidden /> {s.phone}</span>
              <span className="flex items-center gap-1.5"><MapPin className="size-3.5" aria-hidden /> {s.address}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 sm:text-right">
            <div>
              <p className="font-display text-2xl font-semibold tabular-nums">{s.cgpa.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">CGPA</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold tabular-nums">{s.attendance}%</p>
              <p className="text-xs text-muted-foreground">Attendance</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="Personal details" icon={ShieldAlert}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" value={s.name} />
            <Field label="Register number" value={s.regNo} />
            <Field label="Blood group" value={s.bloodGroup} />
            <Field label="Guardian" value={s.guardian} />
            <Field label="Mobile" value={s.phone} />
            <Field label="College email" value={s.email} />
            <div className="sm:col-span-2">
              <Field label="Permanent address" value={s.address} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Academic record" icon={GraduationCap}>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Programme" value="Master of Computer Applications" />
            <Field label="Regulation" value="Anna University R2021" />
            <Field label="Current semester" value={`Semester ${s.semester}, Section ${s.section}`} />
            <Field label="Batch" value={s.batch} />
            <Field label="Credits completed" value="42 of 88" />
            <Field label="Standing arrears" value="None" />
          </div>
          <div className="mt-5 space-y-2 border-t border-border pt-5">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Semester GPA history</p>
            <div className="flex flex-wrap gap-2">
              {results.map((r) => (
                <StatusBadge key={r.semester} tone={r.published === "Awaiting publication" ? "warning" : "primary"}>
                  Sem {r.semester} · {r.gpa.toFixed(2)}
                </StatusBadge>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Registered courses" description={`Semester ${s.semester} · ${courses.length} courses`} icon={BookOpen} padded={false}>
        <div className="overflow-x-auto">
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
      </SectionCard>
    </>
  );
}

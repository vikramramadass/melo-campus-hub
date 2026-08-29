import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/portal/StatusBadge";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Student Registration — MCA Student Portal" },
      {
        name: "description",
        content:
          "Register for MCA Student Portal access at Mailam Engineering College using your Anna University register number and department email.",
      },
      { property: "og:title", content: "Student Registration — MCA Student Portal" },
      { property: "og:description", content: "Activate portal access for the MCA programme in three steps." },
    ],
  }),
  component: RegisterPage,
});

const steps = ["Identity", "Academic", "Credentials"];

function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-surface/50">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="size-5" aria-hidden />
            </span>
            <span className="font-display text-sm font-semibold">MCA Student Portal</span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Already registered?</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
        <div className="space-y-3">
          <StatusBadge tone="primary">Admission year 2026 – 2028</StatusBadge>
          <h1 className="text-3xl font-semibold">Create your student account</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Details are verified against the department admission register before your account is activated. Use the email
            issued by the college.
          </p>
        </div>

        <ol className="mt-8 flex flex-wrap items-center gap-3" aria-label="Registration progress">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span
                className={
                  "flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 ring-inset " +
                  (i <= step ? "bg-primary/10 text-primary ring-primary/25" : "bg-card text-muted-foreground ring-border")
                }
              >
                {i < step ? <CheckCircle2 className="size-3.5" aria-hidden /> : <span className="tabular-nums">{i + 1}</span>}
                {s}
              </span>
              {i < steps.length - 1 ? <span className="h-px w-6 bg-border sm:w-10" aria-hidden /> : null}
            </li>
          ))}
        </ol>

        <Card className="mt-7 gap-0 border-border/80 py-0 shadow-panel">
          <CardContent className="p-6 sm:p-8">
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                if (step < steps.length - 1) {
                  setStep(step + 1);
                  return;
                }
                toast.success("Registration submitted", {
                  description: "The department office will activate your account within one working day.",
                });
                navigate({ to: "/login" });
              }}
            >
              {step === 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="fullname">Full name (as in mark sheet)</Label>
                    <Input id="fullname" required placeholder="Priyadharshini Murugan" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of birth</Label>
                    <Input id="dob" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select defaultValue="female">
                      <SelectTrigger id="gender" className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="other">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile number</Label>
                    <Input id="phone" required placeholder="+91 ..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardian">Guardian name</Label>
                    <Input id="guardian" required placeholder="M. Murugan" />
                  </div>
                </div>
              ) : null}

              {step === 1 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="regno">Register number</Label>
                    <Input id="regno" required placeholder="MCA26CS0__" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Select defaultValue="1">
                      <SelectTrigger id="semester" className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4].map((n) => (
                          <SelectItem key={n} value={String(n)}>Semester {n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="section">Section</Label>
                    <Select defaultValue="A">
                      <SelectTrigger id="section" className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Section A</SelectItem>
                        <SelectItem value="B">Section B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ug">Undergraduate degree</Label>
                    <Input id="ug" required placeholder="B.Sc. Computer Science" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="college">Previous institution</Label>
                    <Input id="college" required placeholder="Government Arts College, Tindivanam" />
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="cemail">College email</Label>
                    <Input id="cemail" type="email" required placeholder="name@mailamengg.ac.in" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pw">Password</Label>
                    <Input id="pw" type="password" required autoComplete="new-password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pw2">Confirm password</Label>
                    <Input id="pw2" type="password" required autoComplete="new-password" />
                  </div>
                  <div className="flex items-start gap-2 sm:col-span-2">
                    <Checkbox id="terms" required className="mt-0.5" />
                    <Label htmlFor="terms" className="text-sm font-normal leading-relaxed text-muted-foreground">
                      I confirm the details above match my admission record and agree to the department's IT usage policy.
                    </Label>
                  </div>
                </div>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                <Button type="button" variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>
                  Back
                </Button>
                <Button type="submit">{step === steps.length - 1 ? "Submit registration" : "Continue"}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

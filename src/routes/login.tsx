import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { college } from "@/lib/mock-data";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Student Login — MCA Student Portal" },
      {
        name: "description",
        content: "Sign in to the MCA Student Portal of Mailam Engineering College with your register number or faculty ID.",
      },
      { property: "og:title", content: "Student Login — MCA Student Portal" },
      { property: "og:description", content: "Secure portal sign-in for MCA students and faculty." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"student" | "faculty">("student");
  const [busy, setBusy] = useState(false);

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-sidebar p-12 text-sidebar-foreground lg:flex">
        <div className="grid-backdrop absolute inset-0 opacity-10" aria-hidden />
        <Link to="/" className="relative flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
            <GraduationCap className="size-5" aria-hidden />
          </span>
          <span className="font-display text-sm font-semibold text-sidebar-accent-foreground">MCA Student Portal</span>
        </Link>
        <div className="relative max-w-md space-y-5">
          <h2 className="font-display text-3xl font-semibold leading-tight text-sidebar-accent-foreground">
            Attendance, deadlines and grade sheets — updated by the department, not by rumour.
          </h2>
          <p className="text-sm text-sidebar-foreground/75">
            {college.department}, {college.name}.
          </p>
        </div>
        <p className="relative flex items-center gap-2 text-xs text-sidebar-foreground/60">
          <ShieldCheck className="size-4" aria-hidden />
          Portal accounts are issued by the department office.
        </p>
      </aside>

      <main className="flex items-center justify-center px-4 py-14 sm:px-8">
        <Card className="w-full max-w-md gap-0 border-border/80 py-0 shadow-lift">
          <CardContent className="space-y-6 p-7 sm:p-9">
            <div className="space-y-1.5">
              <h1 className="text-2xl font-semibold">Sign in</h1>
              <p className="text-sm text-muted-foreground">Use the credentials issued with your register number.</p>
            </div>

            <Tabs value={role} onValueChange={(v) => setRole(v as "student" | "faculty")}>
              <TabsList className="w-full">
                <TabsTrigger value="student" className="flex-1">Student</TabsTrigger>
                <TabsTrigger value="faculty" className="flex-1">Faculty</TabsTrigger>
              </TabsList>
            </Tabs>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setBusy(true);
                setTimeout(() => {
                  toast.success(role === "student" ? "Welcome back, Vikram" : "Signed in as Dr. S. Anitha");
                  navigate({ to: role === "student" ? "/student" : "/admin" });
                }, 600);
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="userid">{role === "student" ? "Register number" : "Faculty ID"}</Label>
                <Input
                  id="userid"
                  required
                  defaultValue={role === "student" ? "MCA24CS017" : "MEC-MCA-004"}
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button type="button" className="text-xs font-medium text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
                <Input id="password" type="password" required defaultValue="demo1234" autoComplete="current-password" />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="remember" defaultChecked />
                <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                  Keep me signed in on this device
                </Label>
              </div>
              <Button type="submit" className="w-full" disabled={busy}>
                {busy ? "Signing in…" : (
                  <>
                    <Lock className="size-4" aria-hidden /> Sign in
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              First-year student?{" "}
              <Link to="/register" className="font-medium text-primary hover:underline">
                Register for access
              </Link>
            </p>
            <p className="rounded-lg bg-surface p-3 text-center text-xs text-muted-foreground">
              Demo build — any credentials open the selected workspace.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

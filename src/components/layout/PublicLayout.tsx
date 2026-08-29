import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { GraduationCap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { college } from "@/lib/mock-data";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function PublicLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="glass-panel sticky top-0 z-40 border-x-0 border-t-0">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3.5 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="size-5" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-semibold">MCA Student Portal</span>
              <span className="block text-[11px] text-muted-foreground">Mailam Engineering College</span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "bg-surface text-foreground" }}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-2 md:ml-0 md:flex">
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Student login</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/register">Register</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="ml-auto md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </Button>
        </div>

        {open ? (
          <div className="border-t border-border bg-card px-4 py-3 md:hidden">
            <nav className="flex flex-col" aria-label="Mobile">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-surface hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            </nav>
          </div>
        ) : null}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-surface/60">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="size-4" aria-hidden />
              </span>
              <span className="font-display text-sm font-semibold">MCA Student Portal</span>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              {college.department}, {college.name}. {college.affiliation}
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Portal</p>
            <Link to="/login" className="block text-muted-foreground hover:text-foreground">Student login</Link>
            <Link to="/register" className="block text-muted-foreground hover:text-foreground">Registration</Link>
            <Link to="/admin" className="block text-muted-foreground hover:text-foreground">Faculty workspace</Link>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Reach us</p>
            <p className="text-muted-foreground">{college.address}</p>
            <p className="text-muted-foreground">{college.phone}</p>
            <p className="text-muted-foreground">{college.email}</p>
          </div>
        </div>
        <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} {college.name}. Department of Computer Applications.
        </div>
      </footer>
    </div>
  );
}

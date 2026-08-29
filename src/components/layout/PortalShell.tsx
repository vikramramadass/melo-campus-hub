import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  BookMarked,
  CalendarDays,
  ClipboardList,
  FileBarChart2,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { currentStudent, notifications } from "@/lib/mock-data";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

const studentNav: NavItem[] = [
  { to: "/student", label: "Dashboard", icon: LayoutDashboard },
  { to: "/student/profile", label: "Profile", icon: UserRound },
  { to: "/student/attendance", label: "Attendance", icon: ClipboardList },
  { to: "/student/timetable", label: "Timetable", icon: CalendarDays },
  { to: "/student/assignments", label: "Assignments", icon: BookMarked },
  { to: "/student/materials", label: "Study Materials", icon: FileBarChart2 },
  { to: "/student/announcements", label: "Announcements", icon: Megaphone },
  { to: "/student/results", label: "Results", icon: GraduationCap },
  { to: "/student/notifications", label: "Notifications", icon: Bell },
  { to: "/student/settings", label: "Settings", icon: Settings },
];

const adminNav: NavItem[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/students", label: "Students", icon: Users },
  { to: "/admin/attendance", label: "Attendance", icon: ClipboardList },
  { to: "/admin/assignments", label: "Assignments", icon: BookMarked },
  { to: "/admin/materials", label: "Study Materials", icon: FileBarChart2 },
  { to: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { to: "/admin/results", label: "Results", icon: GraduationCap },
];

export function PortalShell({ role, children }: { role: "student" | "admin"; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const nav = role === "student" ? studentNav : adminNav;
  const unread = notifications.filter((n) => !n.read).length;

  const identity =
    role === "student"
      ? { name: currentStudent.name, meta: `${currentStudent.regNo} · Sem ${currentStudent.semester}`, initials: "VR" }
      : { name: "Dr. S. Anitha", meta: "Head of Department · MCA", initials: "SA" };

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[268px_1fr]">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[268px] flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-2 px-5 py-5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
              <GraduationCap className="size-5" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-semibold text-sidebar-accent-foreground">MCA Portal</span>
              <span className="block text-[11px] text-sidebar-foreground/70">Mailam Engg. College</span>
            </span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-1.5 text-sidebar-foreground/70 hover:bg-sidebar-accent lg:hidden"
            aria-label="Close navigation"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4" aria-label="Portal navigation">
          <p className="px-3 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/50">
            {role === "student" ? "Academics" : "Administration"}
          </p>
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="size-4 shrink-0" aria-hidden />
                {item.label}
                {item.label === "Notifications" && unread > 0 ? (
                  <span className="ml-auto rounded-full bg-sidebar-primary px-1.5 py-0.5 text-[10px] font-semibold text-sidebar-primary-foreground">
                    {unread}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <Link
            to={role === "student" ? "/admin" : "/student"}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
          >
            <ShieldCheck className="size-4" aria-hidden />
            {role === "student" ? "Faculty workspace" : "Student view"}
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
          >
            <LogOut className="size-4" aria-hidden />
            Sign out
          </Link>
        </div>
      </aside>

      {open ? (
        <div
          className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      ) : null}

      {/* Main */}
      <div className="flex min-h-screen flex-col">
        <header className="glass-panel sticky top-0 z-30 flex items-center gap-3 border-x-0 border-t-0 px-4 py-3 sm:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation">
            <Menu className="size-5" aria-hidden />
          </Button>

          <div className="relative hidden max-w-sm flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input placeholder="Search courses, materials, students…" className="h-9 bg-card pl-9" aria-label="Search portal" />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/student/notifications"
              className="relative grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              aria-label={`Notifications, ${unread} unread`}
            >
              <Bell className="size-4.5" aria-hidden />
              {unread > 0 ? (
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive ring-2 ring-card" />
              ) : null}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-surface">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                      {identity.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-left leading-tight sm:block">
                    <span className="block text-xs font-semibold">{identity.name}</span>
                    <span className="block text-[11px] text-muted-foreground">{identity.meta}</span>
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">{identity.meta}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/student/profile">My profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/student/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login">Sign out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

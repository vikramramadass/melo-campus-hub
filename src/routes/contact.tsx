import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { college } from "@/lib/mock-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact the MCA Department — Mailam Engineering College" },
      {
        name: "description",
        content:
          "Reach the Department of Computer Applications at Mailam Engineering College for admissions, portal support and academic queries.",
      },
      { property: "og:title", content: "Contact the MCA Department — Mailam Engineering College" },
      { property: "og:description", content: "Department address, phone, email and office hours plus an enquiry form." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sending, setSending] = useState(false);

  return (
    <PublicLayout>
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-16 sm:px-6">
          <h1 className="text-4xl font-semibold">Contact the department</h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Admission enquiries, portal access issues and academic queries are handled by the department office. Responses
            usually arrive within one working day.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="space-y-4">
          {[
            { icon: MapPin, label: "Department office", value: `${college.department}, ${college.address}` },
            { icon: Phone, label: "Phone", value: college.phone },
            { icon: Mail, label: "Email", value: college.email },
            { icon: Clock, label: "Office hours", value: "Monday – Saturday, 09:00 – 16:30 IST" },
          ].map((item) => (
            <Card key={item.label} className="gap-0 border-border/80 py-0 shadow-panel">
              <CardContent className="flex gap-4 p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="size-5" aria-hidden />
                </span>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{item.label}</p>
                  <p className="text-sm">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="gap-0 border-border/80 py-0 shadow-panel">
            <CardContent className="space-y-2 p-5">
              <p className="text-sm font-semibold">Portal support</p>
              <p className="text-sm text-muted-foreground">
                For login failures or incorrect attendance entries, contact your class advisor first. Unresolved issues are
                escalated to the department portal administrator.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="gap-0 border-border/80 py-0 shadow-panel">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Send an enquiry</h2>
            <p className="mt-1 text-sm text-muted-foreground">All fields are required.</p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSending(true);
                setTimeout(() => {
                  setSending(false);
                  toast.success("Enquiry received", {
                    description: "The department office will respond to your email within one working day.",
                  });
                  (e.target as HTMLFormElement).reset();
                }, 700);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required placeholder="Aarthi Selvaraj" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required placeholder="you@example.com" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" required placeholder="+91 ..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Select defaultValue="admission">
                    <SelectTrigger id="topic" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admission">Admission enquiry</SelectItem>
                      <SelectItem value="portal">Portal / login support</SelectItem>
                      <SelectItem value="academic">Academic query</SelectItem>
                      <SelectItem value="placement">Placement cell</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" required rows={5} placeholder="Describe your query in a few lines…" />
              </div>
              <Button type="submit" disabled={sending} className="w-full sm:w-auto">
                {sending ? "Sending…" : (
                  <>
                    Send enquiry <Send className="size-4" aria-hidden />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </PublicLayout>
  );
}

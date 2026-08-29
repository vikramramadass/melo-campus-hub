import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PortalShell } from "@/components/layout/PortalShell";

export const Route = createFileRoute("/student")({
  component: () => (
    <PortalShell role="student">
      <Outlet />
    </PortalShell>
  ),
});

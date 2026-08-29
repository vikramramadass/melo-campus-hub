import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PortalShell } from "@/components/layout/PortalShell";

export const Route = createFileRoute("/admin")({
  component: () => (
    <PortalShell role="admin">
      <Outlet />
    </PortalShell>
  ),
});

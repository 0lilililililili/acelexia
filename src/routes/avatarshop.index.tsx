import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/avatarshop/")({
  beforeLoad: () => {
    throw redirect({ to: "/avatarshop/$category", params: { category: "weapon" } });
  },
});

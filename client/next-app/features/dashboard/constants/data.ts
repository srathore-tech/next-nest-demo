import { FolderKanban, LayoutDashboard, Users } from "lucide-react";
import NavKey from "../types/nav.types";

// ---------------------------------------------------------------------------
export const pageTitles: Record<NavKey, string> = {
  dashboard: "Dashboard",
  teams: "Manage Teams",
  projects: "Projects",
};


export const navItems: { key: NavKey; label: string; icon: typeof LayoutDashboard; href?: string }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "teams", label: "Manage Teams", icon: Users ,href: "/dashboard/manage-teams"},
  { key: "projects", label: "Projects", icon: FolderKanban },
];



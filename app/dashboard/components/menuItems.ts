import {
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  ShowChart,
  SmartToy,
  Group,
  SettingsSuggest,
  Hub,
} from "@mui/icons-material";

export const menuItems = [
  { name: "Dashboard", icon: DashboardIcon, href: "/dashboard" },
  { name: "Reports", icon: DescriptionIcon, href: "/dashboard/reports" },
  { name: "Analytics", icon: ShowChart, href: "/dashboard/analytics" },
  { name: "AI SEO", icon: SmartToy, href: "/dashboard/ai-seo" },
  { name: "Clients", icon: Group, href: "/dashboard/clients" },
  { name: "Quick Setup", icon: SettingsSuggest, href: "/dashboard/setup" },
  { name: "Integrations", icon: Hub, href: "/dashboard/integrations" },
];

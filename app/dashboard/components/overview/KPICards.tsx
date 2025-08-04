
import KPI from "./KPI";

export default function DashboardKPIs() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <KPI title="SEO Score" value="78" delta="+6" />
      <KPI title="Top Pages" value="5" delta="+2" />
      <KPI title="Conversions" value="3.4%" delta="-1%" down />
      <KPI title="Revenue" value="$12,847" delta="+15%" />
    </div>
  );
}

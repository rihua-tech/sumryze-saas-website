import { ArrowDown, ArrowUp } from "lucide-react";
import clsx from "clsx";

type KPIProps = {
  title: string;
  value: string | number;
  delta: string;
  down?: boolean;
};

export default function KPI({ title, value, delta, down = false }: KPIProps) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-3 transition-colors space-y-1.5">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <div className="flex items-center space-x-1">
        {down ? (
          <ArrowDown className="h-4 w-4 text-red-500" />
        ) : (
          <ArrowUp className="h-4 w-4 text-green-500" />
        )}
        <span
          className={clsx(
            "text-sm font-medium",
            down ? "text-red-500" : "text-green-500"
          )}
        >
          {delta}
        </span>
      </div>
    </div>
  );
}

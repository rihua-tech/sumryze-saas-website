import { LinkIcon } from "lucide-react";



export default function KpiCardPlaceholder({
  title,
  onConnect,
}: {
  title: string;
  onConnect?: () => void;
}) {
  return (
   <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-3 transition-colors space-y-1.5">
  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
    {title}
  </p>
  <p className="text-xs text-gray-500 dark:text-gray-400">
    Connect GA4 to view.
  </p>
  {onConnect && (
    <button
      onClick={onConnect}
      className="mt-1 inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
    >
      <LinkIcon className="w-3 h-3" />
      Connect
    </button>
  )}
</div>

  );
}

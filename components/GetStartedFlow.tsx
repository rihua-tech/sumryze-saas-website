import { CheckCircle } from "lucide-react";

export function GetStartedFlow() {
  return (
    <div className="bg-green-50 rounded-xl p-4 w-full max-w-[230px] space-y-4 text-sm">
      <h3 className="text-green-800 font-semibold">Get Started with Sumryze</h3>

      <div className="flex items-start gap-2">
        <CheckCircle className="text-green-600 mt-1 w-5 h-5" />
        <div className="flex-1">
          <p className="text-gray-800 font-medium">Connect Google Search Console</p>
          <p className="text-gray-600 text-xs">We’ll begin to fetch your SEO metrics.</p>
          <a href="#" className="text-green-700 text-xs font-medium hover:underline">Connect Now</a>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <CheckCircle className="text-green-600 mt-1 w-5 h-5" />
        <div className="flex-1">
          <p className="text-gray-800 font-medium">Personalize Your SEO Report Branding</p>
          <p className="text-gray-600 text-xs">Customize your logo, theme & email header.</p>
          <a href="#" className="text-green-700 text-xs font-medium hover:underline">Customize</a>
        </div>
      </div>
    </div>
  );
}

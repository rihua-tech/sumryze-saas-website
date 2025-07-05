import { Check, X } from "lucide-react"

export default function ComparePlans() {
  return (
    <section className="w-full py-8 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
       
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
         
          Compare Our Plans
        </h2>
        <p className="text-base text-gray-500 mb-12">
          Find the right plan for your agency’s growth
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Starter */}
          <div className="border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Starter</h3>
            <p className="text-sm text-gray-600 mb-6">
              Perfect for freelancers starting with automation.
            </p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center text-sm gap-2 text-gray-800">
                <Check className="w-5 h-5 text-green-600" /> 5 reports / month
              </li>
              <li className="flex items-center text-sm gap-2 text-gray-800">
                <Check className="w-5 h-5 text-green-600" /> Email support
              </li>
              <li className="flex items-center text-sm gap-2 text-gray-400 line-through">
                <X className="w-5 h-5" /> White-label export
              </li>
            </ul>
          </div>

          {/* Professional */}
          <div className="border-2 border-indigo-600 bg-indigo-50 rounded-2xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow">

              Most Popular
            </span>
            <h3 className="text-2xl font-bold text-indigo-800 mb-3">Professional</h3>
            <p className="text-sm text-indigo-700 mb-6">
              Best for growing agencies needing automation + branding.
            </p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center text-sm gap-2 text-gray-900">
                <Check className="w-5 h-5 text-green-600" /> 25 reports / month
              </li>
              <li className="flex items-center text-sm gap-2 text-gray-900">
                <Check className="w-5 h-5 text-green-600" /> White-label export
              </li>
              <li className="flex items-center text-sm gap-2 text-gray-900">
                <Check className="w-5 h-5 text-green-600" /> Automated delivery
              </li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Enterprise</h3>
            <p className="text-sm text-gray-600 mb-6">
              Ideal for large agencies with high-volume needs.
            </p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center text-sm gap-2 text-gray-800">
                <Check className="w-5 h-5 text-green-600" /> Unlimited reports
              </li>
              <li className="flex items-center text-sm gap-2 text-gray-800">
                <Check className="w-5 h-5 text-green-600" /> Dedicated account manager
              </li>
              <li className="flex items-center text-sm gap-2 text-gray-800">
                <Check className="w-5 h-5 text-green-600" /> SLA guarantee
              </li>
            </ul>
          </div>
        </div>

       

        <div className="mt-10 mb-2 text-center">
          <a
            href="/pricing"
            className="inline-flex items-center px-5 py-3 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-all text-xs sm:text-sm font-medium shadow"

          >
            See Full Pricing →
          </a>
        </div>
      </div>
    </section>
  )
}


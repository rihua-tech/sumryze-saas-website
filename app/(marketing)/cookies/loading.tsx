export default function CookiesLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header Skeleton */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
          </div>

          {/* Hero Section Skeleton */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
            </div>

            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Skeleton - Desktop Only */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1 max-w-4xl">
            <div className="space-y-8">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8"
                >
                  <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6 animate-pulse"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

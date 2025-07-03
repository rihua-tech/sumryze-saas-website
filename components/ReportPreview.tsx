
import React from "react";

interface ReportPreviewProps {
  agencyName: string;
  reportType: string;
  summary: string;
  siteScore: number;
  pagesAnalyzed: number;
  criticalIssues: number;
  date: string;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({
  agencyName,
  reportType,
  summary,
  siteScore,
  pagesAnalyzed,
  criticalIssues,
  date,
}) => {
  return (
    <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 sm:p-8 rounded-lg space-y-4 shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <p className="text-sm sm:text-base text-gray-500">Client:</p>
          <h3 className="text-xl sm:text-2xl font-bold text-indigo-700">
            {agencyName}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-sm sm:text-base text-gray-500">Report Type:</p>
          <p className="text-sm sm:text-base font-semibold text-gray-700">
            {reportType}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-1">
        <p className="text-sm sm:text-base text-gray-600">Summary:</p>
        <p className="text-base sm:text-lg font-medium text-gray-900">
          {summary}
        </p>
        <p className="text-sm text-gray-500">
          Prepared by {agencyName} • {date}
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
        <div className="bg-white rounded-md shadow p-4 text-center">
          <p className="text-sm text-gray-500 mb-1">Site Score</p>
          <p className="text-2xl font-bold text-indigo-600">{siteScore}/100</p>
        </div>
        <div className="bg-white rounded-md shadow p-4 text-center">
          <p className="text-sm text-gray-500 mb-1">Pages Analyzed</p>
          <p className="text-2xl font-bold text-indigo-600">{pagesAnalyzed}</p>
        </div>
        <div className="bg-white rounded-md shadow p-4 text-center">
          <p className="text-sm text-gray-500 mb-1">Issues Found</p>
          <p className="text-2xl font-bold text-red-500">
            {criticalIssues} Critical
          </p>
        </div>
      </div>
    </div>
  );
};

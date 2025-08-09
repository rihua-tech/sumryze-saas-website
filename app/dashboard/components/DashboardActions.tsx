
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Share2, Pencil } from "lucide-react";

export default function DashboardActions({
  isLoading,
  onAudit,
  onDownload,
  onGenerateBlog,
  onShare,
}: any) {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-4 border-t border-gray-700 mt-6">
      {/* Run Audit */}
      <Button
        variant="outline"
        onClick={onAudit}
        disabled={isLoading.audit}
      >
        {isLoading.audit ? (
          "Auditing..."
        ) : (
          <>
            <RefreshCw className="w-4 h-4 mr-2" />
           Generate SEO Report
          </>
        )}
      </Button>

      {/* Download PDF */}
      <Button
      className="bg-gray-200 hover:bg-gray-100 dark:bg-secondary dark:hover:bg-secondary/80"
        variant="secondary"
        onClick={onDownload}
        disabled={isLoading.download}
      >
        {isLoading.download ? (
          "Downloading..."
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </>
        )}
      </Button>

      {/* Share Report */}
      <Button
      className="bg-gray-200 hover:bg-gray-100 dark:bg-secondary dark:hover:bg-secondary/80"
        variant="secondary"
        onClick={onShare}
        disabled={isLoading.share}
      >
        {isLoading.share ? (
          "Sharing..."
        ) : (
          <>
            <Share2 className="w-4 h-4 mr-2" />
            Share Report
          </>
        )}
      </Button>
      
       {/* Generate Blog */}
      <Button
        onClick={onGenerateBlog}
        disabled={isLoading.blog}
      >
        {isLoading.blog ? (
          "Generating..."
        ) : (
          <>
            <Pencil className="w-4 h-4 mr-2" />
        Open AI SEO
          </>
        )}
      </Button>


    </div>
  );
}

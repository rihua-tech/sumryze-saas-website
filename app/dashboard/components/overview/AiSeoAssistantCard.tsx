"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LlmContentQuickCard() {
  const [value, setValue] = useState("");
  const router = useRouter();
  const base = "/dashboard/llm-content";
  const isUrl = (s: string) => /^https?:\/\/\S+$/i.test(s.trim());

  const submit = () => {
    const v = value.trim();
    const enc = encodeURIComponent(v);
    if (!v) return router.push(`${base}?action=blog&picker=topics#generate-blog`);
    if (isUrl(v)) return router.push(`${base}?action=blog&url=${enc}#generate-blog`);
    router.push(`${base}?action=blog&topic=${enc}#generate-blog`);
  };

  return (
    <div className="rounded-xl border p-6 shadow bg-white dark:bg-gray-900 dark:border-gray-700">
      <h3 className="text-lg font-semibold">🧠 LLM Content Assistant</h3>
      <p className="mb-5 mt-3 text-sm text-muted-foreground">
        Create SEO-ready content for Google & AI Overviews.
      </p>

      <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-base font-semibold mb-4"
              onClick={submit}>
        📄 Generate Article
      </Button>

      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Enter a topic or paste a URL…"
        className="w-full rounded-md px-4 py-9 text-sm"
        aria-label="Topic or URL"
      />

     
    </div>
  );
}

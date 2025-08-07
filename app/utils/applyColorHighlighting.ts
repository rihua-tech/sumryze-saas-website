// utils/applyColorHighlighting.ts

export function applyColorHighlighting(text: string): string {
  return text
    // 🔹 Remove bold markdown syntax (e.g., **+6%** → +6%)
    .replace(/\*\*(\+\$?\d+(?:,\d+)?(?:\.\d+)?%?)\*\*/g, '$1')
    .replace(/\*\*(–\$?\d+(?:,\d+)?(?:\.\d+)?%?)\*\*/g, '$1')

    // ✅ Highlight +values like +6%, +$5000 in green
    .replace(/(\+\$?\d{1,3}(?:,\d{3})*(?:\.\d+)?%?)/g,
      '<span class="text-green-500 text-lg font-semibold">$1</span>')

    // ✅ Highlight –values like –9%, –$400 in red (en dash)
    .replace(/(–\$?\d{1,3}(?:,\d{3})*(?:\.\d+)?%?)/g,
      '<span class="text-red-500 text-lg font-semibold">$1</span>');
    
}

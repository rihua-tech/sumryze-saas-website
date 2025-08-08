


// app/utils/applyColorHighlighting.ts
export default function applyColorHighlighting(text: string): string {
  //  (sign)? $ ? digits (,digits)* (.digits)? %?
  const regex = /([+\-])?\$?\d[\d,]*(?:\.\d+)?%?/g;

  return text.replace(regex, (match, sign) => {
    let cls = "text-yellow-600  text-lg";            // plain number  ➜ blue
    if (sign === "+") cls = "text-green-500 text-lg"; // up-trend   ➜ green
    if (sign === "-") cls = "text-red-500 text-lg";   // down-trend ➜ red
    return `<span class="${cls} font-medium">${match}</span>`;
  });
}

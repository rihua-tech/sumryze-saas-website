// lib/utils.ts
import clsx, { type ClassValue } from "clsx";   // ✅ default import
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));              // spread is safest
}

export async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const res = await fetch(`${baseUrl}${endpoint}`, options);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

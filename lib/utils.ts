

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// 用于合并 Tailwind className 的函数
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ✅ 通用的 API 请求函数（前端调用后端）
export const fetchFromAPI = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const res = await fetch(`${baseUrl}${endpoint}`, options);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
};

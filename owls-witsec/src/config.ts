import type { DemoSite } from "./types";

export const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export const PROXY_BASE_URL = "https://api.allorigins.win/get";

export const TERMINAL_LOG_DELAY_MS = 400;
export const REDIRECT_DELAY_MS = 2000;
export const CERTIFICATE_POPUP_DELAY_MS = 2000;
export const MAX_PROXY_CONTENT_LENGTH = 2000;
export const INITIAL_VISITOR_COUNT = 249;

export const STORAGE_KEYS = {
  apiKey: "owls_api_key",
  transformed: "owls_transformed",
  threat: "owls_threat",
  visitorCount: "owls_visitor_count",
} as const;

export const DEMO_CONTENT: Record<DemoSite, string> = {
  apple:
    "Apple: Think Different. Our goal is to design products that are at once beautiful and functional. The new iPhone features a Pro-grade camera system.",
  google:
    "Google: Our mission is to organize the world's information and make it universally accessible and useful. Search across images, news, and maps.",
  twitter:
    "Twitter/X: What's happening in the world and what people are talking about right now. From breaking news to entertainment, get the full story.",
};

/**
 * Resolve API key with priority:
 * 1. Form input value
 * 2. Session-cached key
 * 3. Vite env var (VITE_GEMINI_API_KEY from .env)
 */
export function resolveApiKey(formValue: string): string | null {
  const key =
    formValue.trim() ||
    sessionStorage.getItem(STORAGE_KEYS.apiKey) ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    "";

  return key || null;
}

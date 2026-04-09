export const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent";

export const TERMINAL_LOG_DELAY_MS = 400;
export const REDIRECT_DELAY_MS = 2000;
export const CERTIFICATE_POPUP_DELAY_MS = 2000;
export const INITIAL_VISITOR_COUNT = 249;

export const STORAGE_KEYS = {
  apiKey: "owls_api_key",
  transformed: "owls_transformed",
  threat: "owls_threat",
  devName: "owls_dev_name",
  visitorCount: "owls_visitor_count",
} as const;

export const DEMO_TEXT = `I'm Alex, a frontend developer who has strong feelings about border-radius. I build React apps and cry about CSS. My stack: TypeScript, Tailwind (I know, I know), and Redux which I don't fully understand but won't admit. Hot take: the best code is code you delete. My cat Mr. Whiskers reviews all my PRs. He has never approved one. Make it colorful and chaotic.`;

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

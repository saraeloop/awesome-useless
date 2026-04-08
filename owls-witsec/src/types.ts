export interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
  error?: {
    message: string;
  };
}

export interface ProxyResponse {
  contents: string;
  status: {
    url: string;
    http_code: number;
  };
}

export type DemoSite = "apple" | "google" | "twitter";

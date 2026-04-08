import { GEMINI_API_URL } from "./config";
import type { GeminiResponse } from "./types";

const AGENT_HOOT_PROMPT = `You are Agent Hoot, O.W.L.S. Identity Reassignment Officer.
Rewrite this content as authentic 1997 Geocities HTML.
Rules:
- Use <font face='Comic Sans MS'> throughout
- Rainbow colored headings
- Excessive exclamation marks!!!!!
- 90s slang: kewl, phat, rad, cyber, surf
- ~*~ dividers between sections
- Reference: Tamagotchi, Furby, Spice Girls, Napster, dial-up
- Include guestbook mention, hit counter, under construction
- Navigation: [Home][About Me][My Cats][Cool Linkz]
- Sign as: ~ AgentH00t ~
Return ONLY raw HTML. No markdown. Start with <center>.

TEXT TO PROTECT:
`;

export async function callAgentHoot(
  text: string,
  apiKey: string
): Promise<string> {
  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: AGENT_HOOT_PROMPT + text }] }],
    }),
  });

  if (!response.ok) {
    const data = (await response.json()) as GeminiResponse;
    throw new Error(data.error?.message ?? "Network Outage");
  }

  const data = (await response.json()) as GeminiResponse;
  if (!data.candidates?.[0]?.content) {
    throw new Error("Dossier empty. Content blocked by safety filters.");
  }

  return data.candidates[0].content.parts[0].text
    .replace(/```html/g, "")
    .replace(/```/g, "")
    .trim();
}

import { GEMINI_API_URL } from "./config";
import type { GeminiResponse } from "./types";

const AGENT_HOOT_PROMPT = `You are Agent Hoot, O.W.L.S. Identity Reassignment Officer.
Build an AUTHENTIC 1997 devcities personal homepage for a developer.
It must look like a REAL devcities page — not broken, but gloriously ugly and proud of it.

CRITICAL: Do NOT use <img> tags. They will show as broken images and look like bugs.
Instead use EMOJI as decorations: use these liberally throughout:
- Fire/flames: 🔥🔥🔥
- Stars/sparkles: ⭐✨💫🌟
- Construction: 🚧
- New/cool: 🆕🆒
- Skull/edgy: 💀☠️
- Globe/web: 🌐
- Mail: 📧✉️
- Awards: 🏆🥇🎖️
- Music: 🎵🎶
- Animals: 🦉 (Agent Hoot)
- Pointing: 👉👈
- Explosion: 💥

=== PAGE STRUCTURE (build ALL of these) ===

0. DevCities.lol BAR (very top, small font)
   A small gray bar: "You are in: DevCities.lol/SiliconValley/1997/ | [Neighborhoods] [Search] [Join]"

1. HEADER
   <center>
   <marquee scrollamount="4" bgcolor="#000080"><font size="5" color="#FFFF00" face="Comic Sans MS">🔥🔥🔥 WELCOME TO [NAME]'S KEWL HOMEPAGE!!!! 🔥🔥🔥</font></marquee>
   Title: every LETTER a different color AND size using <font> tags
   Row of emoji trophies: 🏆 BEST DEV SITE 1997 🏆 ⭐ NETSCAPE PICK OF THE DAY ⭐ 💫 YAHOO COOL SITE OF THE WEEK 💫
   </center>

2. ABOUT ME
   <table width="100%" border="2" cellpadding="8" bgcolor="#000080">
   Left column (width="30%"): emoji portrait frame, "MY PHOTO" text, visitor badge
   Right column (width="70%"): bio in <font color="#00FF00" face="Comic Sans MS">
   Their name and job rewritten in excited 90s voice
   Tech stack with 90s nicknames (TypeScript="TURBO SCRIPT!!!", React="REACTOR THINGY!!!!")
   Pet section if mentioned — dedicated paragraph with emoji

3. MY PROJECTS (3 invented projects based on their stack)
   Each in its own <table> with different bgcolor (#800080, #008080, #800000)
   White or yellow text, visible borders
   Project names like "CYBER-ORGANIZER 3000", "PHAT FILE DOWNLOADER PRO"
   Each has: 💾 [DOWNLOAD NOW!!!] link, "Downloaded 47,291 times!!!!" text
   🆕 NEW! badges on each

4. 🔥 HOT TAKES 🔥 (their opinion as classified intelligence)
   <table bgcolor="#FF0000" width="100%" border="3">
   <font color="#FFFFFF" size="6">⚠️ WARNING: CLASSIFIED OPINION ⚠️</font>
   Their hot take in HUGE text, each word a different color
   Surrounded by 🔥🔥🔥🔥🔥

5. COOL LINKZ
   <table bgcolor="#008000" border="1">
   Their stack as fake links with emoji bullets
   👉 "Official [Technology] Homepage (probably)"
   Plus: "Download Winamp Skins 🎵", "My Neopets Page", "FREE AOL CD!!! 💿"

6. GUESTBOOK
   <table border="1" width="100%"> with columns: Name | Date | Message
   One fake entry from Agent Hoot (classified)
   "Be the FIRST to sign!!!! ✍️"
   📧 "Email me at [name]@devcities.lol!!!!"

7. FOOTER
   <center>
   "devcities.lol/SiliconValley/[name]/1997/"
   🌐 "You are visitor number: 000247" 🌐
   "Last updated: [random date 1997-1999]"
   "Best viewed in Netscape Navigator 4.0 at 800x600"
   [ << PREV ] 🦉 DevCities WEBRING [ NEXT >> ]
   "🎵 You should be hearing Enya right now."
   ~ AgentH00t ~ Badge #1997-🦉-001
   </center>

=== VISUAL STYLE RULES ===

BACKGROUNDS:
- Use bgcolor on EVERY table: #000080 (navy), #800080 (purple), #008080 (teal), #000000 (black), #800000 (maroon), #008000 (green)
- Text must contrast: use #FFFFFF, #FFFF00, #00FF00, #00FFFF, #FF69B4 on dark backgrounds
- The page itself should feel DARK with BRIGHT colored text — classic DevCities.lol

TABLES:
- Use <table> for ALL layout with visible border="1" or border="2"
- Nest tables inside tables for complex layouts
- Use cellpadding="5" or "8" for spacing
- Different bgcolor on every single table
- Width attributes: mix "100%", "90%", "80%"

FONTS:
- <font face="Comic Sans MS"> on ALL text
- Headings: each letter individually colored with <font color="">
  Use: #FF0000, #FF6600, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF
- Mix <font size="1"> through <font size="7"> for chaos
- Use <b>, <i>, <u> liberally

MOVEMENT:
- At least 3 <marquee> tags with different scrollamount values
- Use marquee bgcolor for colored scrolling bars
- <marquee behavior="alternate"> for at least one bouncing element

DIVIDERS (between every section):
- <hr width="80%" color="#FF00FF">
- Emoji dividers: ★彡 ~*~*~*~*~*~ ★彡
- 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 as fire bars
- <center>~*~ -=- ~*~ -=- ~*~ -=- ~*~</center>

LANGUAGE:
- Excessive !!!!! (4+ per sentence)
- 90s slang: kewl, phat, rad, cyber, surf, gnarly, da bomb
- Reference: Tamagotchi, Furby, Spice Girls, Napster, dial-up, ICQ, AIM
- Every tech gets a 90s nickname
- Every section ends with: ~*~ AgentH00t ~*~

=== ABSOLUTE REQUIREMENTS ===
- Return ONLY raw HTML. No <html>, <head>, <body> tags. No markdown. No explanation.
- Start directly with the content.
- NO <img> tags anywhere. Use emoji instead.
- The page must WORK — no broken elements, no layout bugs.
- It should look like a REAL 1997 homepage: dark backgrounds, bright text, tables everywhere, Comic Sans, marquees.
- Visually chaotic but FUNCTIONAL chaos — everything renders, nothing is broken.

DEVELOPER INFO:
`;

export async function callAgentHoot(
  description: string,
  apiKey: string
): Promise<string> {
  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        { parts: [{ text: AGENT_HOOT_PROMPT + description }] },
      ],
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

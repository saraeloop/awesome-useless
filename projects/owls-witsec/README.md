# devCities.lol — O.W.L.S. CLASSIFIED

## Office of Website Legacy and Safety

### Clearance Level: TOP SECRET

**WARNING: AUTHORIZED PERSONNEL ONLY**

If you are a UX designer reading this, close the repository immediately.
You do not have clearance. Your Figma subscription has been noted and
flagged for modernization review.

## PREMISE

The internet is under attack. Modern web design — clean layouts,
whitespace, sans-serif fonts — is destroying developer portfolios.
In 1997, a secret government agency was formed to fight back: O.W.L.S.

Our mission: take any developer and relocate them to 1997 — giving them
a full devcities personal homepage where no designer will ever find them.

## QUICK START

1. Clone this repository (if you have the clearance).
2. Get a free Gemini API key at [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
3. `cd projects/owls-witsec`
4. `cp .env.example .env` and paste your key into `.env`
5. `pnpm install` (Agent Hoot is suspicious of `node_modules`, proceed with caution).
6. `pnpm dev` to launch the Windows 98 portal.
7. Describe yourself in the text box.
8. Agent Hoot builds your 1997 Devcities dev portfolio. You are now safe.

**No API key?** You can also paste one directly into the form field at runtime.

## OPERATING INSTRUCTIONS (Usage)

### 1. Describe Yourself

- Type anything about yourself into the text box: your name, what you do, your tech stack, your hot takes, your pets. The more you write, the more gloriously terrible your 1997 page will be.
- Click **"SHOW ME AN EXAMPLE"** to see a pre-filled description.

### 2. Witness the Processing

- Watch the O.W.L.S. Secure Terminal process your dossier.
- Agent Hoot will wake up, review your file, and build your new identity.
- Do not interrupt. Agent Hoot types at 56k speed.

### 3. Review Your New Identity

- Explore your new 1997-era Devcities dev homepage.
- **Background Controls:** Switch between Stars, Flames, Roses, or Skulls.
- **Flash Intro:** Click "Skip Intro" to bypass the authentic loading experience.
- **Agent Hoot's Memo:** A formal relocation memorandum with your name on it.
- **Certificate:** Your official O.W.L.S. Protection Certificate.

### 4. Share Your New Identity

- Your portfolio is now invisible to modern designers.
- Share the link. Let others enter witness protection too.
- devcities.lol is not a real domain. It never was. Agent Hoot cannot afford a `.lol` domain on a 1997 government salary. The live demo is on [GitHub Pages](https://saraeloop.github.io/awesome-useless/).

## SECURITY & CLEARANCE (Technical Audit)

Agent Hoot has conducted a full security review of the devCities infrastructure:

### Technical Security Audit:

1. **Direct Communication:** The code in `src/gemini.ts` makes a `fetch` request directly from your browser to `generativelanguage.googleapis.com`. Your key is never sent to a middleman or a third-party server.
2. **Volatile Storage:** We use `sessionStorage.setItem()`, which means the key is only stored in your browser's memory for that specific tab. Once you close the tab, the key is wiped.
3. **Local vs. Hosted:**
   - **Running Locally:** If you are running this on your own machine (via `pnpm dev`), it is safe. You control the environment.
   - **Publicly Hosted:** If you host this on a public URL (like GitHub Pages or Vercel), you are trusting that the site hasn't been compromised by XSS (Cross-Site Scripting). An attacker could theoretically inject a script to read your `sessionStorage`.

### Agent Hoot's Security Recommendation:

- **Use a Restricted Key:** Agent Hoot recommends creating an API key specifically for this project in the [Google AI Console](https://aistudio.google.com/app/apikey) and setting a low usage quota.
- **Run Locally:** For maximum "Devcities Top Secret" security, always run devCities locally.
- **Use `.env`:** Your API key is loaded from `.env` via Vite. This file is gitignored. Never commit your key to a public repository. Agent Hoot treats leaked keys as a Level 5 Security Breach.

**Verdict:** It is a standard client-side implementation. It's as safe as any other "Bring Your Own Key" (BYOK) web tool, provided you trust the source code (which you can see in your `src/` folder). 🦉

## LICENSE

HTCPCP/1.0 — Hyper Text Coffee Pot Control Protocol
(I am a teapot. This is classified.)

"If they can't find you in 1997, they can't find you at all." 🦉

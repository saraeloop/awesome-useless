# O.W.L.S. — CLASSIFIED

## Office of Website Legacy and Safety

### Clearance Level: GEOCITIES TOP SECRET

**WARNING: AUTHORIZED PERSONNEL ONLY**

If you are a UX designer reading this, close the repository immediately.
You do not have clearance. Your Figma subscription has been noted and
flagged for modernization review.

## PREMISE

The internet is under attack. Modern web design — clean layouts,
whitespace, sans-serif fonts — is destroying websites with personality.
In 1997, a secret government agency was formed to fight back: O.W.L.S.

Our mission: take any website and hide it in 1997 — giving it a full
Geocities identity where no designer will ever find it.

## QUICK START

1. Clone this repository (if you have the clearance).
2. Get a free Gemini API key at [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
3. `cd owls-witsec`
4. `cp .env.example .env` and paste your key into `.env`
5. `pnpm install` (Agent Hoot is suspicious of `node_modules`, proceed with caution).
6. `pnpm dev` to launch the Windows 98 portal.
7. Your website is now safe in 1997.

**No API key?** You can also paste one directly into the form field at runtime.

## OPERATING INSTRUCTIONS (Usage)

### 1. Apply for Protection
- **Paste modern content:** Enter the modern, whitespace-filled text you wish to hide.
- **Select threat level:** Agent Hoot must know if Tailwind CSS or Figma are involved.
- **Provide Clearance (Gemini API Key):** The key powers the Identity Reassignment Officer (Agent Hoot).
- **Demo Mode:** Click a corporate logo to auto-fill high-contrast modern content.

### 2. Witness the Processing
- Watch the O.W.L.S. Secure Terminal perform the relocation. 
- Do not interrupt the 1997-era dial-up noises. This is a delicate process.

### 3. Review New Identity
- Explore your website's new 1997-era home.
- **Background Controls:** Switch between Stars, Flames, Roses, or Skulls.
- **Flash Intro:** Click "Skip Intro" to reveal the content after 5 seconds of loading.
- **Agent Hoot's Memo:** Read the formal relocation memorandum.
- **Certificate:** Review and close your official O.W.L.S. Protection Certificate.

### 4. Share Safely
- Your website is now invisible to modern designers. 
- Sign the guestbook (mentally) and return to the HQ for more protection requests.

## SECURITY & CLEARANCE (Technical Audit)

Agent Hoot has conducted a full security review of the O.W.L.S. portal infrastructure:

### Technical Security Audit:

1. **Direct Communication:** The code in `js/chaos.js` makes a `fetch` request directly from your browser to `generativelanguage.googleapis.com`. Your key is never sent to a middleman or a third-party server.
2. **Volatile Storage:** We use `sessionStorage.setItem()`, which means the key is only stored in your browser's memory for that specific tab. Once you close the tab, the key is wiped.
3. **Local vs. Hosted:**
   - **Running Locally:** If you are running this on your own machine (via `pnpm dev` or opening `index.html`), it is safe. You control the environment.
   - **Publicly Hosted:** If you host this on a public URL (like GitHub Pages or Vercel), you are trusting that the site hasn't been compromised by XSS (Cross-Site Scripting). An attacker could theoretically inject a script to read your `sessionStorage`.

### Agent Hoot's Security Recommendation:

- **Use a Restricted Key:** Agent Hoot recommends creating an API key specifically for this project in the [Google AI Console](https://aistudio.google.com/app/apikey) and setting a low usage quota.
- **Run Locally:** For maximum "Geocities Top Secret" security, always run the O.W.L.S. portal locally.
- **Use `.env`:** Your API key is loaded from `owls-witsec/.env` via Vite. This file is gitignored. Never commit your key to a public repository. Agent Hoot treats leaked keys as a Level 5 Security Breach.

**Verdict:** It is a standard client-side implementation. It's as safe as any other "Bring Your Own Key" (BYOK) web tool, provided you trust the source code (which you can see in your `js/` folder). 🦉

## LICENSE

HTCPCP/1.0 — Hyper Text Coffee Pot Control Protocol
(I am a teapot. This is classified.)

"If they can't find you in 1997, they can't find you at all." 🦉

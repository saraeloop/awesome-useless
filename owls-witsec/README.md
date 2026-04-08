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

## DEPLOYMENT TO 1997 (Installation)

1. Clone this repository (if you have the clearance).
2. Open `index.html` in a browser (Netscape Navigator 4.0 preferred).
3. Apply for Witness Protection.

## FIELD AGENT POSITIONS (Contributing)

We accept applications for field agents who can:

- Increase the blink rate of text.
- Source higher-quality "Under Construction" GIFs.
- Optimize the Enya MIDI player.

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
- **Never Hardcode:** Do not replace the `YOUR_KEY_HERE` constant in `app.js` with your real key if you plan to commit the code to a public repository like GitHub. Agent Hoot treats leaked keys as a Level 5 Security Breach.

**Verdict:** It is a standard client-side implementation. It's as safe as any other "Bring Your Own Key" (BYOK) web tool, provided you trust the source code (which you can see in your `js/` folder). 🦉

## LICENSE

HTCPCP/1.0 — Hyper Text Coffee Pot Control Protocol
(I am a teapot. This is classified.)

"If they can't find you in 1997, they can't find you at all." 🦉

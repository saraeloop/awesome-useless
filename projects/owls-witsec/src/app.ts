import { callAgentHoot } from "./gemini";
import {
  resolveApiKey,
  DEMO_TEXT,
  STORAGE_KEYS,
  TERMINAL_LOG_DELAY_MS,
  REDIRECT_DELAY_MS,
  INITIAL_VISITOR_COUNT,
} from "./config";
import { getElement, updateVisitorCounter } from "./dom-utils";

document.addEventListener("DOMContentLoaded", () => {
  console.log("\u{1F989} O.W.L.S. SYSTEM ONLINE. Agent Hoot is watching.");

  const intakeForm = getElement<HTMLDivElement>("intake-form");
  const terminalScreen = getElement<HTMLDivElement>("terminal-screen");
  const terminalOutput = getElement<HTMLDivElement>("terminal-output");
  const terminalFinal = getElement<HTMLDivElement>("terminal-final");
  const submitBtn = getElement<HTMLButtonElement>("submit-btn");
  const textarea = getElement<HTMLTextAreaElement>("dev-description");
  const apiKeyInput = getElement<HTMLInputElement>("api-key");
  const apiKeySection = getElement<HTMLDivElement>("api-key-section");

  // Hide API key section entirely if env key is set; otherwise allow toggle
  if (import.meta.env.VITE_GEMINI_API_KEY) {
    apiKeySection.style.display = "none";
    getElement("toggle-api-key").style.display = "none";
  } else {
    const cachedKey = sessionStorage.getItem(STORAGE_KEYS.apiKey);
    if (cachedKey) {
      apiKeyInput.value = cachedKey;
      apiKeySection.classList.remove("hidden");
    }
  }

  // Toggle API key section
  getElement("toggle-api-key").addEventListener("click", () => {
    apiKeySection.classList.toggle("hidden");
    if (!apiKeySection.classList.contains("hidden")) {
      apiKeyInput.focus();
    }
  });

  // Visitor Counter
  updateVisitorCounter(
    ".visitor-counter span",
    STORAGE_KEYS.visitorCount,
    INITIAL_VISITOR_COUNT
  );

  // Demo Button
  getElement<HTMLButtonElement>("demo-btn").addEventListener("click", () => {
    textarea.value = DEMO_TEXT;
  });

  // Extract a name from freeform text (best effort)
  function extractName(text: string): string {
    const patterns = [
      /(?:I'm|I am|my name is|name:)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
      /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?),/,
    ];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) return match[1];
    }
    return "Developer";
  }

  // Terminal log helper
  async function log(msg: string, color = "#00ff00"): Promise<void> {
    const p = document.createElement("p");
    p.textContent = msg;
    p.style.color = color;
    p.style.margin = "2px 0";
    terminalOutput.appendChild(p);
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
    await new Promise((r) => setTimeout(r, TERMINAL_LOG_DELAY_MS));
  }

  // Submit handler
  submitBtn.addEventListener("click", async () => {
    localStorage.removeItem(STORAGE_KEYS.transformed);
    localStorage.removeItem(STORAGE_KEYS.devName);
    terminalOutput.innerHTML = "";
    terminalFinal.classList.add("hidden");

    const description = textarea.value.trim();
    const apiKey = resolveApiKey(apiKeyInput.value);

    if (!description) {
      alert("ERROR 418: Agent Hoot cannot build a page from nothing. Tell him about yourself.");
      return;
    }

    if (!apiKey) {
      alert(
        "ERROR 418: Security Clearance (API Key) Required. Set VITE_GEMINI_API_KEY in .env or enter it below."
      );
      apiKeySection.classList.remove("hidden");
      apiKeyInput.focus();
      return;
    }

    sessionStorage.setItem(STORAGE_KEYS.apiKey, apiKey);

    const devName = extractName(description);

    intakeForm.classList.add("hidden");
    terminalScreen.classList.remove("hidden");

    try {
      await log("> O.W.L.S. SECURE TERMINAL v1.97.1", "white");
      await log(`> DOSSIER RECEIVED. SUBJECT: ${devName}`);

      // Run terminal animation and API call in parallel
      async function runTerminalAnimation(): Promise<void> {
        const lines: Array<[string, string?]> = [
          ["> INITIALIZING CYBER-UPLINK TO 1997..."],
          ["> CONTACTING AGENT HOOT..."],
          ["> Agent Hoot is asleep at his desk."],
          ["> Agent Hoot has been woken up."],
          ["> Agent Hoot is not happy about this."],
          ["> Feeding Agent Hoot classified liquid (not coffee)..."],
          ["> Agent Hoot is reviewing your dossier..."],
          ["> Agent Hoot is suspicious of your tech stack."],
          ["> Agent Hoot has never heard of TypeScript."],
          ["> Agent Hoot is Googling TypeScript."],
          ["> Agent Hoot does not trust Google. Using AltaVista."],
          ['> AltaVista has no results for "TypeScript".'],
          ["> Agent Hoot is proceeding without understanding TypeScript."],
          ["> This is fine.", "#ffd700"],
          ["> Locating available devCities neighborhood..."],
          ["> SiliconValley/ \u2014 FULL", "red"],
          ["> Heartland/ \u2014 FULL", "red"],
          ["> WestHollywood/ \u2014 FULL", "red"],
          ["> Area51/ \u2014 AVAILABLE (suspicious but available)", "#ffd700"],
          [`> Assigned: devCities.lol/Area51/${devName.replace(/\s+/g, "")}/`],
          ["> Installing Comic Sans... [DONE]"],
          ["> Uninstalling taste... [DONE]"],
          ["> Adding visitor counter... [SET TO 000247]"],
          ["> Contacting Webring administrator..."],
          ["> Webring administrator is also Agent Hoot."],
          ["> Agent Hoot has approved your webring application."],
          ["> Agent Hoot is proud of you."],
          ["> Agent Hoot will not say this again."],
          ["> Adding Enya MIDI soundtrack..."],
          ["> Enya has been notified."],
          ["> Enya is honored.", "#ffd700"],
          // Overflow lines if API is slow
          ["> Agent Hoot is still typing.", "#ffd700"],
          ["> Agent Hoot is still typing..", "#ffd700"],
          ["> Agent Hoot is still typing...", "#ffd700"],
          ["> Agent Hoot types at 56k speed. Please wait.", "#ffd700"],
          ["> Agent Hoot has been typing since 1997. Almost done.", "#ffd700"],
        ];

        for (const [msg, color] of lines) {
          await log(msg, color);
        }
      }

      const [, transformed] = await Promise.all([
        runTerminalAnimation(),
        callAgentHoot(description, apiKey),
      ]);

      await log("> Agent Hoot has finished typing.", "#ffd700");
      await log("> Agent Hoot needs a moment.");
      await log("> Agent Hoot is proud of this work.");
      await log("> YOUR 1997 IDENTITY IS READY.", "#00ff00");
      await log(
        "> Welcome to devCities. They will never find you here.",
        "#00ff00"
      );
      await log("\u{1F989} PROTECTION GRANTED.", "#00ff00");

      localStorage.setItem(STORAGE_KEYS.transformed, transformed);
      localStorage.setItem(STORAGE_KEYS.devName, devName);

      terminalFinal.classList.remove("hidden");
      setTimeout(() => {
        window.location.href = "output.html";
      }, REDIRECT_DELAY_MS);
    } catch (err) {
      await log("!!! CRITICAL SYSTEM FAILURE !!!", "red");
      await log(
        `> ERROR: ${err instanceof Error ? err.message : "Unknown"}`,
        "white"
      );
      await log("> AGENT HOOT HAS DISCONNECTED.", "red");

      const btn = document.createElement("button");
      btn.textContent = "\u{1F989} RETURN TO HQ & TRY AGAIN";
      btn.style.cssText =
        "margin-top:20px; padding:10px; cursor:pointer; background:#fff; border:2px outset #ccc;";
      btn.onclick = () => {
        intakeForm.classList.remove("hidden");
        terminalScreen.classList.add("hidden");
      };
      terminalOutput.appendChild(btn);
    }
  });
});

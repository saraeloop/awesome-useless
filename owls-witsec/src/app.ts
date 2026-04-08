import { callAgentHoot } from "./gemini";
import {
  resolveApiKey,
  DEMO_CONTENT,
  STORAGE_KEYS,
  PROXY_BASE_URL,
  TERMINAL_LOG_DELAY_MS,
  REDIRECT_DELAY_MS,
  INITIAL_VISITOR_COUNT,
  MAX_PROXY_CONTENT_LENGTH,
} from "./config";
import { getElement, updateVisitorCounter } from "./dom-utils";
import type { DemoSite, ProxyResponse } from "./types";

document.addEventListener("DOMContentLoaded", () => {
  console.log("\u{1F989} O.W.L.S. SYSTEM ONLINE. Agent Hoot is watching.");

  const intakeForm = getElement<HTMLDivElement>("intake-form");
  const terminalScreen = getElement<HTMLDivElement>("terminal-screen");
  const terminalOutput = getElement<HTMLDivElement>("terminal-output");
  const terminalFinal = getElement<HTMLDivElement>("terminal-final");
  const submitBtn = getElement<HTMLButtonElement>("submit-btn");
  const textarea = getElement<HTMLTextAreaElement>("website-content");
  const urlInput = getElement<HTMLInputElement>("website-url");
  const apiKeyInput = getElement<HTMLInputElement>("api-key");

  // Hide API key field if env key is configured; otherwise restore cached key
  if (import.meta.env.VITE_GEMINI_API_KEY) {
    (apiKeyInput.closest(".field-row-stacked") as HTMLElement).style.display = "none";
  } else {
    const cachedKey = sessionStorage.getItem(STORAGE_KEYS.apiKey);
    if (cachedKey) apiKeyInput.value = cachedKey;
  }

  // Visitor Counter
  updateVisitorCounter(
    ".visitor-counter span",
    STORAGE_KEYS.visitorCount,
    INITIAL_VISITOR_COUNT
  );

  // Demo Buttons
  for (const site of Object.keys(DEMO_CONTENT) as DemoSite[]) {
    getElement<HTMLButtonElement>(`demo-${site}`).addEventListener(
      "click",
      () => {
        textarea.value = DEMO_CONTENT[site];
        urlInput.value = "";
      }
    );
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
    terminalOutput.innerHTML = "";
    terminalFinal.classList.add("hidden");

    const content = textarea.value.trim();
    const url = urlInput.value.trim();
    const apiKey = resolveApiKey(apiKeyInput.value);

    if (!content && !url) {
      alert("ERROR 418: Cannot brew content from nothing.");
      return;
    }

    if (!apiKey) {
      alert(
        "ERROR 418: Security Clearance (API Key) Required. Set VITE_GEMINI_API_KEY in .env or enter it below."
      );
      (apiKeyInput.closest(".field-row-stacked") as HTMLElement).style.display = "";
      apiKeyInput.focus();
      return;
    }

    sessionStorage.setItem(STORAGE_KEYS.apiKey, apiKey);

    intakeForm.classList.add("hidden");
    terminalScreen.classList.remove("hidden");

    try {
      await log("> O.W.L.S. SECURE TERMINAL v1.97.1", "white");
      await log("> INITIALIZING CYBER-UPLINK...");

      let targetContent = content;

      if (url) {
        await log(`> INTERCEPTING: ${url}...`);
        const proxyUrl = `${PROXY_BASE_URL}?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        const data = (await response.json()) as ProxyResponse;
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = data.contents;
        targetContent =
          tempDiv.innerText.substring(0, MAX_PROXY_CONTENT_LENGTH) || content;
        await log("> DATA STREAM INTERCEPTED.", "#00ff00");
      }

      await log("> CONTACTING AGENT HOOT FOR REASSIGNMENT...");

      const transformed = await callAgentHoot(targetContent, apiKey);

      await log("> 1997 CYBER-STREAM RECEIVED.", "#ffd700");
      await log(
        `> PREVIEW: ${transformed.substring(0, 100).replace(/<[^>]*>/g, "")}...`,
        "#ffd700"
      );
      await log("> NEUTRALIZING WHITESPACE... [OK]");
      await log("> INJECTING RAINBOWS... [OK]");
      await log("> SIGNING DOSSIER... [OK]");
      await log("> RELOCATION SUCCESSFUL. WELCOME TO 1997.", "#00ff00");

      localStorage.setItem(STORAGE_KEYS.transformed, transformed);
      localStorage.setItem(
        STORAGE_KEYS.threat,
        getElement<HTMLSelectElement>("threat-level").value
      );

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

import {
  STORAGE_KEYS,
  CERTIFICATE_POPUP_DELAY_MS,
} from "./config";
import { getElement } from "./dom-utils";

declare global {
  interface Window {
    setBG: (type: string) => void;
    closeCert: () => void;
    skipFlash: () => void;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const transformed = localStorage.getItem(STORAGE_KEYS.transformed);
  const threat = localStorage.getItem(STORAGE_KEYS.threat);
  const outputDiv = getElement<HTMLDivElement>("transformed-content");
  const certThreat = document.getElementById("cert-threat");

  if (certThreat) certThreat.textContent = threat ?? "Classified";

  // Hit counter
  const count = localStorage.getItem(STORAGE_KEYS.visitorCount) ?? "000249";
  const counterDisplay = document.querySelector(".counter-digits");
  if (counterDisplay) {
    counterDisplay.textContent = String(count).padStart(6, "0");
  }

  if (transformed) {
    outputDiv.innerHTML = transformed;
    console.log("\u{1F989} O.W.L.S. - 1997 Content Restored.");
  } else {
    outputDiv.innerHTML =
      "<p>ERROR 418: Identity Reassignment failed. Agent Hoot has lost the dossier. Please return to HQ.</p>";
  }

  // Global controls for inline onclick handlers in output.html
  window.setBG = (type: string) => {
    document.body.className = type;
  };
  window.closeCert = () => {
    getElement("certificate-popup").classList.add("hidden");
  };
  window.skipFlash = () => {
    getElement("flash-intro-box").classList.add("hidden");
  };

  // Auto-pop certificate
  setTimeout(() => {
    const cert = document.getElementById("certificate-popup");
    if (cert) cert.classList.remove("hidden");
  }, CERTIFICATE_POPUP_DELAY_MS);
});

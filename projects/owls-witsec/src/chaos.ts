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
  const devName = localStorage.getItem(STORAGE_KEYS.devName) ?? "Developer";
  const outputDiv = getElement<HTMLDivElement>("transformed-content");

  // Personalize certificate
  const certThreat = document.getElementById("cert-threat");
  const certDevName = document.getElementById("cert-dev-name");
  const certPath = document.getElementById("cert-path");
  const certName = document.getElementById("cert-name");
  const memoSubject = document.getElementById("memo-subject");
  const memoName = document.getElementById("memo-name");

  if (certThreat) certThreat.textContent = threat ?? "Classified";
  if (certDevName) certDevName.textContent = devName;
  if (certPath) certPath.textContent = devName.replace(/\s+/g, "").toLowerCase();
  if (certName) certName.textContent = `"${devName}'s Kool Homepage 1997!!!!"`;
  if (memoSubject) memoSubject.textContent = devName;
  if (memoName) memoName.textContent = devName;

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

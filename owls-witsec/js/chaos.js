// Chaos JS for output.html
document.addEventListener('DOMContentLoaded', () => {
    const transformed = localStorage.getItem('owls_transformed');
    const threat = localStorage.getItem('owls_threat');
    const outputDiv = document.getElementById('transformed-content');
    const certThreat = document.getElementById('cert-threat');

    if (certThreat) certThreat.textContent = threat || "Classified";

    // Hit counter
    const count = localStorage.getItem('owls_visitor_count') || '000249';
    const counterDisplay = document.querySelector('.counter-digits');
    if (counterDisplay) counterDisplay.textContent = count.toString().padStart(6, '0');

    if (transformed) {
        outputDiv.innerHTML = transformed;
        console.log("🦉 O.W.L.S. - 1997 Content Restored.");
    } else {
        outputDiv.innerHTML = "<p>ERROR 418: Identity Reassignment failed. Agent Hoot has lost the dossier. Please return to HQ.</p>";
    }

    // Controls
    window.setBG = (type) => document.body.className = type;
    window.closeCert = () => document.getElementById('certificate-popup').classList.add('hidden');
    window.skipFlash = () => document.getElementById('flash-intro-box').classList.add('hidden');

    // Auto-pop certificate after a few seconds
    setTimeout(() => {
        const cert = document.getElementById('certificate-popup');
        if (cert) cert.classList.remove('hidden');
    }, 2000);
});

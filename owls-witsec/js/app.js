// O.W.L.S. Main Application Logic
const DEMO_API_KEY = "YOUR_KEY_HERE";

document.addEventListener('DOMContentLoaded', () => {
    console.log("HTTP 418: I am a teapot. Agent Hoot is also a teapot. This is classified.");

    const intakeForm = document.getElementById('intake-form');
    const terminalScreen = document.getElementById('terminal-screen');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalFinal = document.getElementById('terminal-final');
    const submitBtn = document.getElementById('submit-btn');
    const textarea = document.getElementById('website-content');
    const apiKeyInput = document.getElementById('api-key');

    // Demo Data
    const demos = {
        apple: "Apple.com: A minimal masterpiece of whitespace, expensive fonts, and rounded corners. It makes people feel wealthy just by scrolling. It is too clean. It must be hidden.",
        google: "Google.com: The search bar is centered. There is too much white space. Where are the blinking banners? Where is the personality? It is a sterile void.",
        twitter: "Twitter/X: A chaotic storm of modern UI components. Constant updates, 'For You' feeds, and a dark mode that is suspiciously sleek. Agent Hoot is very worried about the rebranding."
    };

    document.getElementById('demo-apple').addEventListener('click', () => textarea.value = demos.apple);
    document.getElementById('demo-google').addEventListener('click', () => textarea.value = demos.google);
    document.getElementById('demo-twitter').addEventListener('click', () => textarea.value = demos.twitter);

    submitBtn.addEventListener('click', async () => {
        const content = textarea.value.trim();
        const apiKey = apiKeyInput.value.trim() || DEMO_API_KEY;

        if (!content) {
            alert("ERROR 418: Cannot brew content from nothing. We are a teapot.");
            return;
        }

        if (apiKey === "YOUR_KEY_HERE") {
             alert("ERROR 418: Security Clearance Required. Agent Hoot needs a valid API key (or you need to edit app.js).");
             return;
        }

        // Save to session storage
        sessionStorage.setItem('owls_content', content);
        sessionStorage.setItem('owls_api_key', apiKey);
        sessionStorage.setItem('owls_threat', document.getElementById('threat-level').options[document.getElementById('threat-level').selectedIndex].text);

        // Show terminal
        intakeForm.classList.add('hidden');
        terminalScreen.classList.remove('hidden');

        await runTerminalSequence();
    });

    async function runTerminalSequence() {
        const lines = [
            "O.W.L.S. SECURE TERMINAL v1.97",
            "================================",
            "> Receiving intake request...",
            "> Verifying threat level... [CONFIRMED]",
            "> Contacting Agent Hoot...",
            "> Agent Hoot is finishing his coffee...",
            "> Agent Hoot does not drink coffee. He drinks classified liquid.",
            "> Scanning for Tailwind CSS... [DETECTED. NEUTRALIZING.]",
            "> Stripping modern fonts...",
            "> Uninstalling whitespace...",
            "> Installing Comic Sans... [DONE]",
            "> Locating available Geocities neighborhood...",
            "> Assigned: geocities.com/AgentHoot/WITSEC/protected/",
            "> Generating new identity...",
            "> Adding visitor counter... [SET TO 000247]",
            "> WARNING: Flash Player 6.0 required for next step",
            "> Installing dancing baby GIF...",
            "> Adding Enya MIDI soundtrack...",
            "> Contacting webring administration...",
            "> IDENTITY REASSIGNMENT COMPLETE",
            "> Agent Hoot has signed your certificate.",
            "> Welcome to 1997. They will never find you here.",
            "================================"
        ];

        for (const line of lines) {
            const p = document.createElement('p');
            p.textContent = line;
            terminalOutput.appendChild(p);
            // Auto scroll
            terminalScreen.scrollTop = terminalScreen.scrollHeight;
            await new Promise(r => setTimeout(r, 400));
        }

        terminalFinal.classList.remove('hidden');
        
        // Wait a bit and redirect
        setTimeout(() => {
            window.location.href = 'output.html';
        }, 2000);
    }
});

// O.W.L.S. Main Application Logic
const DEMO_API_KEY = "YOUR_KEY_HERE";

document.addEventListener('DOMContentLoaded', () => {
    console.log("HTTP 418: I am a teapot. Agent Hoot is also a teapot. This is classified.");

    // Visitor Counter Logic
    let count = localStorage.getItem('owls_visitor_count');
    if (!count) {
        count = 249;
    }
    count = parseInt(count) + 1;
    localStorage.setItem('owls_visitor_count', count);
    
    const counterDisplay = document.querySelector('.visitor-counter span');
    if (counterDisplay) {
        counterDisplay.textContent = count.toString().padStart(6, '0');
    }

    const intakeForm = document.getElementById('intake-form');
    const terminalScreen = document.getElementById('terminal-screen');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalFinal = document.getElementById('terminal-final');
    const submitBtn = document.getElementById('submit-btn');
    const textarea = document.getElementById('website-content');
    const apiKeyInput = document.getElementById('api-key');

    // Demo Data - Modern Corporate Copy for high contrast transformation
    const demos = {
        apple: "Apple: Think Different. Our goal is to design products that are at once beautiful and functional. Experience the seamless integration of hardware, software, and services. The new iPhone features a Pro-grade camera system and an A-series chip for unparalleled performance and efficiency.",
        google: "Google: Our mission is to organize the world’s information and make it universally accessible and useful. We believe in the power of technology to solve problems and connect people. Search across images, news, and maps to find exactly what you need with our advanced AI-driven algorithms.",
        twitter: "Twitter/X: What's happening in the world and what people are talking about right now. From breaking news and entertainment to sports and politics, get the full story with all the live commentary. Join the global conversation and share your thoughts with the community."
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
            "> Adding visitor counter... [SET TO 000249]",
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

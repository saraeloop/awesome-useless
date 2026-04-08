// O.W.L.S. Main Application Logic - BULLETPROOF v1.97.1
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// API key loaded from .env via Vite (VITE_GEMINI_API_KEY)
// Falls back to form input if not set. See .env.example for setup.
const ENV_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

document.addEventListener('DOMContentLoaded', () => {
    console.log("🦉 O.W.L.S. SYSTEM ONLINE. Agent Hoot is watching.");

    const intakeForm = document.getElementById('intake-form');
    const terminalScreen = document.getElementById('terminal-screen');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalFinal = document.getElementById('terminal-final');
    const submitBtn = document.getElementById('submit-btn');
    const textarea = document.getElementById('website-content');
    const urlInput = document.getElementById('website-url');
    const apiKeyInput = document.getElementById('api-key');

    // Hide API key field if env key is configured; otherwise restore cached key
    const cachedKey = sessionStorage.getItem('owls_api_key');
    if (ENV_API_KEY) {
        apiKeyInput.closest('.field-row-stacked').style.display = 'none';
    } else if (cachedKey) {
        apiKeyInput.value = cachedKey;
    }

    // Visitor Counter
    let count = localStorage.getItem('owls_visitor_count') || 249;
    count = parseInt(count) + 1;
    localStorage.setItem('owls_visitor_count', count);
    const counterDisplay = document.querySelector('.visitor-counter span');
    if (counterDisplay) counterDisplay.textContent = count.toString().padStart(6, '0');

    // Demo Content
    const demos = {
        apple: "Apple: Think Different. Our goal is to design products that are at once beautiful and functional. The new iPhone features a Pro-grade camera system.",
        google: "Google: Our mission is to organize the world’s information and make it universally accessible and useful. Search across images, news, and maps.",
        twitter: "Twitter/X: What's happening in the world and what people are talking about right now. From breaking news to entertainment, get the full story."
    };

    document.getElementById('demo-apple').addEventListener('click', () => { textarea.value = demos.apple; urlInput.value = ""; });
    document.getElementById('demo-google').addEventListener('click', () => { textarea.value = demos.google; urlInput.value = ""; });
    document.getElementById('demo-twitter').addEventListener('click', () => { textarea.value = demos.twitter; urlInput.value = ""; });

    submitBtn.addEventListener('click', async () => {
        // 1. CLEAR PREVIOUS ATTEMPT
        localStorage.removeItem('owls_transformed');
        terminalOutput.innerHTML = "";
        terminalFinal.classList.add('hidden');

        const content = textarea.value.trim();
        const url = urlInput.value.trim();
        
        // PRIORITY: 1. Input Field, 2. Session Cache, 3. Env Variable
        const apiKey = apiKeyInput.value.trim() || sessionStorage.getItem('owls_api_key') || ENV_API_KEY;

        if (!content && !url) {
            alert("ERROR 418: Cannot brew content from nothing.");
            return;
        }

        if (!apiKey) {
            alert("ERROR 418: Security Clearance (API Key) Required. Set VITE_GEMINI_API_KEY in .env or enter it below.");
            apiKeyInput.closest('.field-row-stacked').style.display = '';
            apiKeyInput.focus();
            return;
        }

        // Cache the key
        sessionStorage.setItem('owls_api_key', apiKey);

        // Show Terminal
        intakeForm.classList.add('hidden');
        terminalScreen.classList.remove('hidden');

        try {
            await log("> O.W.L.S. SECURE TERMINAL v1.97.1", "white");
            await log("> INITIALIZING CYBER-UPLINK...");
            
            let targetContent = content;

            // URL FETCH
            if (url) {
                await log(`> INTERCEPTING: ${url}...`);
                const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
                const response = await fetch(proxyUrl);
                const data = await response.json();
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data.contents;
                targetContent = tempDiv.innerText.substring(0, 2000) || content;
                await log("> DATA STREAM INTERCEPTED.", "#00ff00");
            }

            await log("> CONTACTING AGENT HOOT FOR REASSIGNMENT...");
            
            // API CALL
            const transformed = await callAgentHoot(targetContent, apiKey);
            
            await log("> 1997 CYBER-STREAM RECEIVED.", "#ffd700");
            await log(`> PREVIEW: ${transformed.substring(0, 100).replace(/<[^>]*>/g, '')}...`, "#ffd700");
            
            await log("> NEUTRALIZING WHITESPACE... [OK]");
            await log("> INJECTING RAINBOWS... [OK]");
            await log("> SIGNING DOSSIER... [OK]");
            await log("> RELOCATION SUCCESSFUL. WELCOME TO 1997.", "#00ff00");

            localStorage.setItem('owls_transformed', transformed);
            localStorage.setItem('owls_threat', document.getElementById('threat-level').value);
            
            terminalFinal.classList.remove('hidden');
            setTimeout(() => window.location.href = 'output.html', 2000);

        } catch (err) {
            await log("!!! CRITICAL SYSTEM FAILURE !!!", "red");
            await log(`> ERROR: ${err.message}`, "white");
            await log("> AGENT HOOT HAS DISCONNECTED.", "red");
            
            const btn = document.createElement('button');
            btn.textContent = "🦉 RETURN TO HQ & TRY AGAIN";
            btn.style.cssText = "margin-top:20px; padding:10px; cursor:pointer; background:#fff; border:2px outset #ccc;";
            btn.onclick = () => {
                intakeForm.classList.remove('hidden');
                terminalScreen.classList.add('hidden');
            };
            terminalOutput.appendChild(btn);
        }
    });

    async function log(msg, color = "#00ff00") {
        const p = document.createElement('p');
        p.textContent = msg;
        p.style.color = color;
        p.style.margin = "2px 0";
        terminalOutput.appendChild(p);
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
        await new Promise(r => setTimeout(r, 400));
    }

    async function callAgentHoot(text, key) {
        const prompt = `You are Agent Hoot, O.W.L.S. Identity Reassignment Officer.
Rewrite this content as authentic 1997 Geocities HTML.
Rules:
- Use <font face='Comic Sans MS'> throughout
- Rainbow colored headings
- Excessive exclamation marks!!!!!
- 90s slang: kewl, phat, rad, cyber, surf
- ~*~ dividers between sections
- Reference: Tamagotchi, Furby, Spice Girls, Napster, dial-up
- Include guestbook mention, hit counter, under construction
- Navigation: [Home][About Me][My Cats][Cool Linkz]
- Sign as: ~ AgentH00t ~
Return ONLY raw HTML. No markdown. Start with <center>.

TEXT TO PROTECT:
${text}`;

        const response = await fetch(`${API_URL}?key=${key}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error ? error.error.message : "Network Outage");
        }

        const data = await response.json();
        if (!data.candidates || !data.candidates[0].content) {
            throw new Error("Dossier empty. Content blocked by safety filters.");
        }

        return data.candidates[0].content.parts[0].text.replace(/```html/g, '').replace(/```/g, '').trim();
    }
});

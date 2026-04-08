// O.W.L.S. Main Application Logic
const DEMO_API_KEY = "YOUR_KEY_HERE";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

document.addEventListener('DOMContentLoaded', () => {
    console.log("HTTP 418: I am a teapot. Agent Hoot is also a teapot. This is classified.");

    const intakeForm = document.getElementById('intake-form');
    const terminalScreen = document.getElementById('terminal-screen');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalFinal = document.getElementById('terminal-final');
    const submitBtn = document.getElementById('submit-btn');
    const textarea = document.getElementById('website-content');
    const urlInput = document.getElementById('website-url');
    const apiKeyInput = document.getElementById('api-key');

    // Visitor Counter
    let count = localStorage.getItem('owls_visitor_count') || 249;
    count = parseInt(count) + 1;
    localStorage.setItem('owls_visitor_count', count);
    const counterDisplay = document.querySelector('.visitor-counter span');
    if (counterDisplay) counterDisplay.textContent = count.toString().padStart(6, '0');

    // Demo Data
    const demos = {
        apple: "Apple: Think Different. Our goal is to design products that are at once beautiful and functional. Experience the seamless integration of hardware, software, and services. The new iPhone features a Pro-grade camera system and an A-series chip for unparalleled performance and efficiency.",
        google: "Google: Our mission is to organize the world’s information and make it universally accessible and useful. We believe in the power of technology to solve problems and connect people. Search across images, news, and maps to find exactly what you need with our advanced AI-driven algorithms.",
        twitter: "Twitter/X: What's happening in the world and what people are talking about right now. From breaking news and entertainment to sports and politics, get the full story with all the live commentary. Join the global conversation and share your thoughts with the community."
    };

    document.getElementById('demo-apple').addEventListener('click', () => { textarea.value = demos.apple; urlInput.value = ""; });
    document.getElementById('demo-google').addEventListener('click', () => { textarea.value = demos.google; urlInput.value = ""; });
    document.getElementById('demo-twitter').addEventListener('click', () => { textarea.value = demos.twitter; urlInput.value = ""; });

    submitBtn.addEventListener('click', async () => {
        let content = textarea.value.trim();
        const url = urlInput.value.trim();
        const apiKey = apiKeyInput.value.trim() || DEMO_API_KEY;

        if (!content && !url) {
            alert("ERROR 418: Cannot brew content from nothing. We are a teapot.");
            return;
        }

        if (apiKey === "YOUR_KEY_HERE") {
             alert("ERROR 418: Security Clearance Required. Agent Hoot needs a valid API key.");
             return;
        }

        intakeForm.classList.add('hidden');
        terminalScreen.classList.remove('hidden');

        try {
            await updateTerminal("O.W.L.S. SECURE TERMINAL v1.97", "white");
            await updateTerminal("================================");
            
            if (url) {
                await updateTerminal(`> REQUESTING ACCESS TO: ${url}...`);
                const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
                const response = await fetch(proxyUrl);
                const data = await response.json();
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data.contents;
                content = tempDiv.innerText.substring(0, 3000);
                await updateTerminal(`> INTERCEPTED SUCCESS: Data stream stabilized.`, "#00ff00");
            }

            await updateTerminal("> CONTACTING AGENT HOOT FOR IDENTITY REASSIGNMENT...");
            
            // ACTUAL API CALL DURING TERMINAL
            const transformed = await transformContent(content, apiKey);
            
            await updateTerminal("> RAW CYBER-STREAM RECEIVED FROM 1997:", "#ffd700");
            await updateTerminal(transformed.substring(0, 300) + "...", "#ffd700");
            
            await updateTerminal("> STRIPPING MODERN FONTS... [OK]");
            await updateTerminal("> INJECTING COMIC SANS... [OK]");
            await updateTerminal("> INSTALLING DANCING BABY... [OK]");
            await updateTerminal("> WELCOME TO 1997. THEY WILL NEVER FIND YOU.", "#00ff00");
            
            localStorage.setItem('owls_transformed', transformed);
            localStorage.setItem('owls_threat', document.getElementById('threat-level').options[document.getElementById('threat-level').selectedIndex].text);
            
            terminalFinal.classList.remove('hidden');
            setTimeout(() => window.location.href = 'output.html', 2000);

        } catch (err) {
            await updateTerminal(`> CRITICAL FAILURE: ${err.message}`, "red");
            await updateTerminal("> ABORTING RELOCATION. STAY WHERE YOU ARE.", "red");
            setTimeout(() => { if(confirm("Agent Hoot failed. Return to HQ?")) window.location.reload(); }, 3000);
        }
    });

    async function updateTerminal(msg, color = "#00ff00") {
        const p = document.createElement('p');
        p.textContent = msg;
        p.style.color = color;
        terminalOutput.appendChild(p);
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
        await new Promise(r => setTimeout(r, 400));
    }

    async function transformContent(content, apiKey) {
        const prompt = `You are Agent Hoot, O.W.L.S. Identity Reassignment Officer. Rewrite this into 1997 Geocities HTML. Rules: Comic Sans, rainbow colors, excessive !!!!, 90s slang (kewl, phat), decorative ~*~ dividers. Return ONLY raw HTML. CONTENT: ${content}`;
        const response = await fetch(`${API_URL}?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data.candidates[0].content.parts[0].text.replace(/```html/g, '').replace(/```/g, '').trim();
    }
});

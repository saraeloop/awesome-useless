// Chaos JS for output.html
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

document.addEventListener('DOMContentLoaded', async () => {
    // Visitor Counter Sync
    const count = localStorage.getItem('owls_visitor_count') || '000249';
    const counterDisplay = document.querySelector('.counter-digits');
    if (counterDisplay) {
        counterDisplay.textContent = count.toString().padStart(6, '0');
    }

    const content = sessionStorage.getItem('owls_content');
    const apiKey = sessionStorage.getItem('owls_api_key');
    const threat = sessionStorage.getItem('owls_threat');
    const outputDiv = document.getElementById('transformed-content');

    // Update Cert
    document.getElementById('cert-threat').textContent = threat;

    // Background selection
    window.setBG = (type) => {
        document.body.className = type;
    };

    window.closeCert = () => {
        document.getElementById('certificate-popup').classList.add('hidden');
    };

    window.skipFlash = () => {
        console.log("🦉 O.W.L.S. - Bypassing Flash Intro...");
        document.getElementById('flash-intro-box').classList.add('hidden');
    };

    // Flash Intro behavior
    setTimeout(() => {
        const fallback = document.getElementById('flash-fallback');
        if (fallback) fallback.classList.remove('hidden');
    }, 5000);

    // Auto-skip flash after 10 seconds just in case
    setTimeout(() => {
        skipFlash();
    }, 10000);

    if (!content || !apiKey) {
        outputDiv.innerHTML = "<p>ERROR 418: No classified content found. Redirecting to HQ...</p>";
        setTimeout(() => window.location.href = 'index.html', 3000);
        return;
    }

    try {
        console.log("🦉 O.W.L.S. - Starting transformation process...");
        const transformed = await transformContent(content, apiKey);
        if (transformed) {
            outputDiv.innerHTML = transformed;
            console.log("🦉 O.W.L.S. - Transformation successful!");
        } else {
            throw new Error("Agent Hoot returned an empty dossier. Possible safety filter interference.");
        }
        
        // Show cert after content loads
        setTimeout(() => {
            document.getElementById('certificate-popup').classList.remove('hidden');
        }, 1000);
    } catch (error) {
        console.error("🦉 O.W.L.S. CRITICAL ERROR:", error);
        outputDiv.innerHTML = `
            <div style="background: red; color: white; padding: 20px; border: 5px solid black; font-family: 'Comic Sans MS', cursive;">
                <h2>🚨 ERROR 418: I AM A TEAPOT 🚨</h2>
                <p>Agent Hoot has encountered a classified obstruction:</p>
                <p style="background: black; color: yellow; padding: 10px;">${error.message}</p>
                <p>Check the browser console (F12) for more top-secret details.</p>
                <button onclick="window.location.href='index.html'" style="padding: 10px; cursor: pointer;">RETURN TO HQ</button>
            </div>
        `;
    }
});

async function transformContent(content, apiKey) {
    const prompt = `You are Agent Hoot, Identity Reassignment Officer for O.W.L.S.
Rewrite the provided website content as if a 1997 Geocities webmaster wrote it. Rules:
- Excessive exclamation marks!!!!!
- 90s slang: kewl, phat, rad, cyber, surf
- Random CAPS for emphasis
- ~*~ and -=- decorative dividers
- Reference: Tamagotchi, Furby, Spice Girls, dial-up, ICQ, AIM, Napster
- Include: guestbook mention, hit counter, under construction notice
- Navigation: [Home] [About Me] [My Cats] [Cool Linkz] [Sign Guestbook]
- End sections with: 'Thx 4 visiting!!! Come back soon!!!'
- Add: 'Best viewed in Netscape Navigator. IE users are NARCs'
- Sign: '~ AgentH00t ~'
Return as HTML with inline Comic Sans and rainbow color styles. 
CONTENT TO REWRITE:
${content}`;

    const response = await fetch(`${API_URL}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`O.W.L.S. Server Reject: ${errorData.error ? errorData.error.message : response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No candidates returned. The content might have been flagged by the 1997 Content Safety Board.");
    }

    let html = data.candidates[0].content.parts[0].text;
    
    // Basic cleanup of LLM markdown if it adds it
    html = html.replace(/```html/g, '').replace(/```/g, '');
    
    return html.trim();
}

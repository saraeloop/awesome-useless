// Chaos JS for output.html
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

document.addEventListener('DOMContentLoaded', async () => {
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

    // Flash Intro behavior
    setTimeout(() => {
        document.getElementById('flash-fallback').classList.remove('hidden');
    }, 5000);

    if (!content || !apiKey) {
        outputDiv.innerHTML = "<p>ERROR 418: No classified content found. Redirecting to HQ...</p>";
        setTimeout(() => window.location.href = 'index.html', 3000);
        return;
    }

    try {
        const transformed = await transformContent(content, apiKey);
        outputDiv.innerHTML = transformed;
        // Show cert after content loads
        setTimeout(() => {
            document.getElementById('certificate-popup').classList.remove('hidden');
        }, 1000);
    } catch (error) {
        console.error(error);
        outputDiv.innerHTML = `<p>ERROR 418: I AM A TEAPOT. Agent Hoot has encountered a 56k connection error: ${error.message}</p>`;
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

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    let html = data.candidates[0].content.parts[0].text;
    
    // Basic cleanup of LLM markdown if it adds it
    html = html.replace(/```html/g, '').replace(/```/g, '');
    
    return html;
}
